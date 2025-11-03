// Small Node script to batch-generate WebP images from a source folder using sharp
// Usage: node tools/generate-webp.js --src=./images --dest=./public/assets --quality=80

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

function parseArgs() {
  const args = {};
  process.argv.slice(2).forEach(arg => {
    const [k, v] = arg.replace(/^--/, '').split('=');
    args[k] = v || true;
  });
  return args;
}

(async function main() {
  const args = parseArgs();
  const src = args.src || './images';
  const dest = args.dest || './public/assets';
  const quality = parseInt(args.quality || '80', 10);

  if (!fs.existsSync(src)) {
    console.error('Source folder not found:', src);
    process.exit(1);
  }
  fs.mkdirSync(dest, { recursive: true });

  const files = fs.readdirSync(src).filter(f => /\.(jpe?g|png)$/i.test(f));
  for (const file of files) {
    const inPath = path.join(src, file);
    const outName = path.basename(file, path.extname(file)) + '.webp';
    const outPath = path.join(dest, outName);
    try {
      await sharp(inPath).webp({ quality }).toFile(outPath);
      console.log('Converted', inPath, '->', outPath);
    } catch (err) {
      console.error('Failed to convert', inPath, err.message);
    }
  }
})();
