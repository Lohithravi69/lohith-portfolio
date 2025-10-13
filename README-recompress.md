Image recompression helper

Run this locally to recompress images in `public/assets` using `sharp` (already in devDependencies).

From repository root (PowerShell):

```powershell
# ensure dependencies are installed
npm install

# recompress images at quality 80
npm run recompress

# or provide custom src and quality
node tools/recompress-images.js --src=./public/assets --quality=75
```

Notes
- This is safe: it writes new .webp files or re-encodes existing .webp files in place.
- Review the results locally before pushing. Keep backups if you have originals you need to preserve.
