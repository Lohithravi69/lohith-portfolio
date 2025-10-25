#!/usr/bin/env node
// Simple smoke test for case-study assets and embeds
// Usage: node tools/check-assets.js [baseUrl]
// Environment: runs locally; default baseUrl=http://localhost:8000

const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');

const rawBase = process.argv[2] || process.env.BASE_URL || 'http://localhost:8000';
const baseArg = String(rawBase).trim().replace(/\s+/g,'');
function fullUrl(u) {
  if (!u) return null;
  if (u.startsWith('http://') || u.startsWith('https://') || u.startsWith('//')) return u.replace(/^\/\//, 'https://');
  // make relative paths absolute against baseArg
  return baseArg.replace(/\/$/, '') + '/' + u.replace(/^\//, '');
}

function fetchHead(url, timeout = 1500) {
  return new Promise((resolve) => {
    try {
      const lib = url.startsWith('https://') ? https : http;
      const req = lib.request(url, { method: 'HEAD', timeout }, (res) => {
        resolve({ ok: res.statusCode >= 200 && res.statusCode < 400, status: res.statusCode });
      });
      req.on('error', () => resolve({ ok: false, status: 0 }));
      req.on('timeout', () => { req.destroy(); resolve({ ok: false, status: 0 }); });
      req.end();
    } catch (e) {
      resolve({ ok: false, status: 0 });
    }
  });
}

function fetchGet(url, timeout = 3000) {
  return new Promise((resolve) => {
    try {
      const lib = url.startsWith('https://') ? https : http;
      const req = lib.request(url, { method: 'GET', timeout }, (res) => {
        // consume a small amount then abort
        res.on('data', () => {});
        res.on('end', () => resolve({ ok: res.statusCode >= 200 && res.statusCode < 400, status: res.statusCode }));
      });
      req.on('error', () => resolve({ ok: false, status: 0 }));
      req.on('timeout', () => { req.destroy(); resolve({ ok: false, status: 0 }); });
      req.end();
    } catch (e) {
      resolve({ ok: false, status: 0 });
    }
  });
}

(async function main() {
  const file = path.join(__dirname, '..', 'data', 'case-studies.json');
  if (!fs.existsSync(file)) {
    console.error('Missing data/case-studies.json');
    process.exit(2);
  }
  const raw = fs.readFileSync(file, 'utf8');
  let list = [];
  try {
    list = JSON.parse(raw);
  } catch (e) {
    console.error('Failed to parse case-studies.json', e);
    process.exit(2);
  }

  console.log('Base URL:', baseArg);
  let failures = 0;
  for (const cs of list) {
    const id = cs.id || '<unknown>';
    console.log('\nChecking', id, '-', cs.title || '');
    const images = Array.isArray(cs.images) ? cs.images : (cs.image ? [cs.image] : []);
    for (const img of images) {
      const url = fullUrl(img);
      if (!url) continue;
      process.stdout.write('  image ' + img + ' -> ' + url + ' ... ');
      // Prefer GET for local servers (some hosts have inconsistent HEAD support)
      const get = await fetchGet(url);
      if (get.ok) {
        console.log('OK', get.status);
        continue;
      }
      const head = await fetchHead(url);
      if (head.ok) {
        console.log('OK (HEAD)', head.status);
        continue;
      }
      // If the path is /assets/... try local server mapping /public/assets/... as fallback
      if (img.startsWith('/assets/')) {
        const alt = img.replace('/assets/', '/public/assets/');
        const altUrl = fullUrl(alt);
        process.stdout.write('    trying alternative ' + alt + ' -> ' + altUrl + ' ... ');
        const head2 = await fetchHead(altUrl);
        if (head2.ok) { console.log('OK', head2.status); continue; }
        const get2 = await fetchGet(altUrl);
        if (get2.ok) { console.log('OK (GET)', get2.status); continue; }
        // try id-based fallbacks: some entries use ids like 'fraud-detect' while files are named 'fraud'
        const maybeId = (cs.id || '').split('-')[0];
        if (maybeId && maybeId !== cs.id) {
          const alt2 = '/public/assets/' + maybeId + '.webp';
          const alt2Url = fullUrl(alt2);
          process.stdout.write('    trying id-fallback ' + alt2 + ' -> ' + alt2Url + ' ... ');
          const head3 = await fetchHead(alt2Url);
          if (head3.ok) { console.log('OK', head3.status); continue; }
          const get3 = await fetchGet(alt2Url);
          if (get3.ok) { console.log('OK (GET)', get3.status); continue; }
        }
        // try images/ jpg fallback
        const jpg = '/images/' + (cs.id ? cs.id.split('-')[0] : id) + '.jpg';
        const jpgUrl = fullUrl(jpg);
        process.stdout.write('    trying jpg fallback ' + jpg + ' -> ' + jpgUrl + ' ... ');
        const headJ = await fetchHead(jpgUrl);
        if (headJ.ok) { console.log('OK', headJ.status); continue; }
        const getJ = await fetchGet(jpgUrl);
        if (getJ.ok) { console.log('OK (GET)', getJ.status); continue; }
      }
      console.log('MISSING', head.status || get.status);
      failures++;
    }
    // check embed if same-origin relative
    if (cs.embed && typeof cs.embed === 'string' && cs.embed.startsWith('/')) {
      const embedUrl = fullUrl(cs.embed);
      process.stdout.write('  embed ' + cs.embed + ' -> ' + embedUrl + ' ... ');
      const head = await fetchHead(embedUrl);
      if (head.ok) { console.log('OK', head.status); }
      else {
        const get = await fetchGet(embedUrl);
        if (get.ok) { console.log('OK (GET)', get.status); }
        else { console.log('MISSING', head.status || get.status); failures++; }
      }
    } else if (cs.embed) {
      console.log('  embed (external) ' + cs.embed + ' - skipping absolute URL check');
    }
  }

  console.log('\nSummary: ' + (failures === 0 ? 'All assets reachable' : (failures + ' missing assets')));
  process.exit(failures === 0 ? 0 : 1);
})();
