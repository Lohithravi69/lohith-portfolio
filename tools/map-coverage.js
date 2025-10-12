const fs = require('fs');
const path = require('path');

function extractStyle(html) {
  const startTag = '<style>';
  const endTag = '</style>';
  const i = html.indexOf(startTag);
  if (i === -1) return null;
  const j = html.indexOf(endTag, i);
  if (j === -1) return null;
  return html.slice(i + startTag.length, j);
}

function expandToRule(css, start, end) {
  // expand start backward to previous '}' or to 0, then forward to next '}'
  let s = start;
  while (s > 0 && css[s] !== '}') s--;
  // if we stopped at '}', move one char forward to start of next rule
  if (css[s] === '}') s = s + 1;
  let e = end;
  while (e < css.length && css[e] !== '}') e++;
  if (e < css.length && css[e] === '}') e = e + 1;
  return css.slice(s, e).trim();
}

function main() {
  const repo = path.resolve(__dirname, '..');
  const covPath = path.join(repo, 'tools', 'coverage-report.json');
  const htmlPath = path.join(repo, 'index.html');
  if (!fs.existsSync(covPath) || !fs.existsSync(htmlPath)) {
    console.error('Missing files: expected tools/coverage-report.json and index.html');
    process.exit(2);
  }
  const cov = JSON.parse(fs.readFileSync(covPath, 'utf8'));
  const html = fs.readFileSync(htmlPath, 'utf8');
  const css = extractStyle(html);
  if (!css) {
    console.error('No <style> block found in index.html');
    process.exit(3);
  }

  const entry = cov.find(e => e.url && e.url.includes('localhost')) || cov[0];
  if (!entry || !entry.ranges) {
    console.error('No coverage ranges found');
    process.exit(4);
  }

  console.log('Inline CSS length:', css.length, 'bytes');
  console.log('Unused ranges (count):', entry.ranges.length);
  console.log('----');
  entry.ranges.forEach((r, idx) => {
    const start = r.start;
    const end = r.end;
    const snippet = css.slice(Math.max(0, start - 40), Math.min(css.length, end + 40));
    const rule = expandToRule(css, start, end);
    console.log(`#${idx + 1} range ${start}-${end} (len ${end - start})`);
    console.log('Contained rule(s):');
    console.log(rule ? rule.split('\n').slice(0, 20).join('\n') : '[no enclosing rule]');
    console.log('--- snippet (with 40ch context) ---');
    console.log(snippet.replace(/\n/g, '\n'));
    console.log('--------------------------------------------------------\n');
  });
}

main();
