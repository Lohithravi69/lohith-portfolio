#!/usr/bin/env node
// Simple image recompression tool using sharp
// Usage: node tools/recompress-images.js --src=./public/assets --quality=80

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const argv = require('minimist')(process.argv.slice(2));
const src = argv.src || './public/assets';
const quality = parseInt(argv.quality || argv.q || '80', 10);

if (!fs.existsSync(src)) {
  console.error('Source folder not found:', src);
  process.exit(1);
}

async function processFile(file) {
  const ext = path.extname(file).toLowerCase();
  const full = path.join(src, file);
  try {
    if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
      const out = path.join(src, path.basename(file, ext) + '.webp');
      await sharp(full).webp({ quality }).toFile(out);
      console.log('Converted', file, '→', path.basename(out));
    } else if (ext === '.webp') {
      // Re-encode webp to tune quality
      const out = path.join(src, path.basename(file));
      const tmp = out + '.tmp';
      await sharp(full).webp({ quality }).toFile(tmp);
      fs.renameSync(tmp, out);
      console.log('Re-encoded webp', file);
    }
  } catch (e) {
    console.error('Failed processing', file, e.message);
  }
}

(async function main(){
  const files = fs.readdirSync(src).filter(f => fs.statSync(path.join(src, f)).isFile());
  for (const f of files) {
    await processFile(f);
  }
  console.log('Done');
})();
