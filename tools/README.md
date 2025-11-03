Image generation helper

This folder contains a small Node script to generate AVIF and WebP variants from your source images.

Usage

1. Install dependencies (sharp is already listed in devDependencies):

```powershell
npm install
```

2. Run the generator (default: `images` -> `public/assets`, quality 80):

```powershell
node tools/generate-image-variants.js --src=images --dest=public/assets --quality=80 --sizes=1,2
```

Options
- --src: source folder with original images (jpg/png). Default: `images`
- --dest: output folder for generated assets. Default: `public/assets`
- --quality: encoding quality for WebP/AVIF (integer)
- --sizes: comma-separated scales to produce (e.g. `1,2` produces `name.avif` and `name@2x.avif`)

Notes
- The script writes to `public/assets/` so the site can reference optimized images.
- It is intentionally simple so you can plug it into your build pipeline (CI or a local npm script).
- If you prefer not to use AVIF or 2x sizes, pass `--sizes=1`.
