const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const PORT = process.env.PORT || 8080;
const ROOT = path.resolve(__dirname, '..');

function startStaticServer() {
  const server = http.createServer((req, res) => {
    try {
      let reqPath = decodeURIComponent(req.url.split('?')[0]);
      if (reqPath === '/' || reqPath === '') reqPath = '/index.html';
      const filePath = path.join(ROOT, reqPath.replace(/^\//, ''));
      if (!filePath.startsWith(ROOT)) {
        res.statusCode = 403; res.end('Forbidden'); return;
      }
      if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        const stream = fs.createReadStream(filePath);
        const ext = path.extname(filePath).toLowerCase();
        const mime = {
          '.html': 'text/html; charset=utf-8',
          '.js': 'application/javascript; charset=utf-8',
          '.css': 'text/css; charset=utf-8',
          '.json': 'application/json; charset=utf-8',
          '.webp': 'image/webp',
          '.png': 'image/png',
          '.jpg': 'image/jpeg',
          '.svg': 'image/svg+xml'
        }[ext] || 'application/octet-stream';
        res.setHeader('Content-Type', mime);
        stream.pipe(res);
      } else {
        res.statusCode = 404; res.end('Not found');
      }
    } catch (e) {
      res.statusCode = 500; res.end('Server error');
    }
  });
  return new Promise((resolve) => server.listen(PORT, () => resolve(server)));
}

async function runCoverage() {
  const server = await startStaticServer();
  console.log(`Static server started on http://localhost:${PORT}`);
  const browser = await puppeteer.launch({ args: ['--no-sandbox','--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.coverage.startCSSCoverage();

  // Visit home page and a few anchors to trigger lazy-loading and reveal styles
  const base = `http://localhost:${PORT}/`;
  await page.goto(base, { waitUntil: 'networkidle2', timeout: 60000 });

  // Scroll through the page to trigger intersection observers / lazy loads
  await autoScroll(page);

  // Give any lazy inits a moment
  await page.waitForTimeout(800);

  const cssCoverage = await page.coverage.stopCSSCoverage();
  await browser.close();
  server.close();

  const report = cssCoverage.map(item => {
    const total = item.text.length;
    const used = item.ranges.reduce((sum, r) => sum + (r.end - r.start), 0);
    return {
      url: item.url || 'inline',
      totalBytes: total,
      usedBytes: used,
      unusedBytes: total - used,
      usedPercent: total ? Math.round((used/total)*10000)/100 : 0,
      ranges: item.ranges
    };
  });

  fs.writeFileSync(path.join(ROOT, 'tools', 'coverage-report.json'), JSON.stringify(report, null, 2));
  console.log('Wrote tools/coverage-report.json');
  // Print a short summary
  report.forEach(r => console.log(`${r.url} — total ${r.totalBytes} bytes, used ${r.usedBytes} bytes (${r.usedPercent}%)`));
}

async function autoScroll(page){
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 250;
      const timer = setInterval(() => {
        window.scrollBy(0, distance);
        totalHeight += distance;
        if (totalHeight >= document.body.scrollHeight){
          clearInterval(timer);
          window.scrollTo(0,0);
          resolve();
        }
      }, 150);
    });
  });
}

runCoverage().catch(err => {
  console.error(err);
  process.exit(1);
});
