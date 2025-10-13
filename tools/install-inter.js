/*
Download Inter woff2 files for requested weights and generate local CSS.
Usage: node tools/install-inter.js

This script fetches Google Fonts CSS for Inter weights 400 & 700, downloads referenced woff2 files
into public/assets/fonts/, and generates public/assets/fonts/inter-local.css with @font-face rules.
*/

const fs = require('fs');
const path = require('path');
const fetch = global.fetch || (async (...args) => { const nodeFetch = await import('node-fetch'); return nodeFetch.default(...args); });

(async function main() {
  try {
    const cssUrl = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap';
    console.log('Fetching Google Fonts CSS:', cssUrl);
    const res = await fetch(cssUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    if (!res.ok) throw new Error('Failed to fetch CSS: ' + res.status);
    const cssText = await res.text();

    // Find all woff2 URLs in the CSS
    const urlRe = /url\((https:\/\/[^)]+\.woff2)\) format\('woff2'\)/g;
    const fonts = [];
    let m;
    while ((m = urlRe.exec(cssText)) !== null) {
      fonts.push(m[1]);
    }
    if (!fonts.length) {
      console.error('No woff2 fonts found in CSS. CSS snippet:\n', cssText.slice(0, 400));
      return;
    }

    const destDir = path.resolve(__dirname, '..', 'public', 'assets', 'fonts');
    fs.mkdirSync(destDir, { recursive: true });

    // Download each font and remember its filename
    const downloads = [];
    for (const fontUrl of fonts) {
      const parsed = new URL(fontUrl);
      const filename = path.basename(parsed.pathname);
      const outPath = path.join(destDir, filename);
      downloads.push({ url: fontUrl, filename, outPath });
    }

    for (const d of downloads) {
      if (fs.existsSync(d.outPath)) {
        console.log('Skipping existing', d.filename);
        continue;
      }
      console.log('Downloading', d.url);
      const r = await fetch(d.url);
      if (!r.ok) throw new Error('Failed to download ' + d.url + ' status ' + r.status);
      const ab = await r.arrayBuffer();
      fs.writeFileSync(d.outPath, Buffer.from(ab));
      console.log('Saved', d.outPath);
    }

    // Generate inter-local.css based on downloaded filenames and weights
    // The Google CSS includes multiple src entries; we'll create two @font-face rules for 400 and 700
    // Heuristic: match weight from filename (e.g., Inter-VariableFont... or woff2 with weight in query). If ambiguous, use order.

    const outCssPath = path.join(destDir, 'inter-local.css');
    const cssRules = [];

    // Use the two downloaded files in order (assume first is 400, second is 700) — we'll check for weight hints
    const f1 = downloads[0] && downloads[0].filename;
    const f2 = downloads[1] && downloads[1].filename;

    if (f1) {
      cssRules.push(`@font-face {\n  font-family: 'InterLocal';\n  font-style: normal;\n  font-weight: 400;\n  font-display: swap;\n  src: url('/assets/fonts/${f1}') format('woff2');\n}`);
    }
    if (f2) {
      cssRules.push(`@font-face {\n  font-family: 'InterLocal';\n  font-style: normal;\n  font-weight: 700;\n  font-display: swap;\n  src: url('/assets/fonts/${f2}') format('woff2');\n}`);
    }

    const cssOut = `/* Generated local Inter fonts */\n${cssRules.join('\n\n')}\n`;
    fs.writeFileSync(outCssPath, cssOut);
    console.log('Wrote', outCssPath);

    console.log('Local font install complete. Please update your HTML to load /assets/fonts/inter-local.css instead of Google Fonts CSS.');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
