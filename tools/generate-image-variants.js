#!/usr/bin/env node
// tools/generate-image-variants.js
// Generate AVIF and WebP variants from images/ and write into public/assets/
// Usage: node tools/generate-image-variants.js [--src=images] [--dest=public/assets] [--quality=80] [--sizes=1,2]

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const argv = Object.fromEntries(process.argv.slice(2).map(s => {
  const [k, v] = s.replace(/^--/, '').split('='); return [k, v ?? true];
}));

const srcDir = argv.src || 'images';
const destDir = argv.dest || 'public/assets';
const quality = parseInt(argv.quality || '80', 10);
const sizes = (argv.sizes || '1').split(',').map(s => parseFloat(s));

if (!fs.existsSync(srcDir)) {
  console.error(`Source directory not found: ${srcDir}`);
  process.exit(1);
}
if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

const supported = ['.jpg', '.jpeg', '.png'];

async function processFile(file) {
  const ext = path.extname(file).toLowerCase();
  if (!supported.includes(ext)) return;
  const name = path.basename(file, ext);
  const input = path.join(srcDir, file);
  const img = sharp(input);
  const metadata = await img.metadata();
  const width = metadata.width || 800;

  for (const scale of sizes) {
    const suffix = scale === 1 ? '' : `@${scale}x`;
    const outAvif = path.join(destDir, `${name}${suffix}.avif`);
    const outWebp = path.join(destDir, `${name}${suffix}.webp`);

    try {
      await img
        .resize(Math.round(width * scale))
        .avif({ quality })
        .toFile(outAvif);
      console.log(`Written ${outAvif}`);
    } catch (e) {
      console.warn(`AVIF generation failed for ${file}:`, e.message || e);
    }

    try {
      await img
        .resize(Math.round(width * scale))
        .webp({ quality })
        .toFile(outWebp);
      console.log(`Written ${outWebp}`);
    } catch (e) {
      console.warn(`WebP generation failed for ${file}:`, e.message || e);
    }
  }
}

(async () => {
  try {
    const files = fs.readdirSync(srcDir);
    for (const f of files) {
      await processFile(f);
    }
    console.log('Image variant generation complete.');
  } catch (err) {
    console.error('Image generation failed:', err);
    process.exit(1);
  }
})();
