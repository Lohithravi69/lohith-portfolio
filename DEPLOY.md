# Deployment Guide

This project is built with React 18 & Vite 5 and deploys seamlessly to Vercel.

## Vercel Deployment (Automated CI/CD)
1. Push the repository to GitHub:
   ```bash
   git add .
   git commit -m "Deploy: Updated portfolio with Vite React and modern styling"
   git push origin main
   ```
2. On Vercel:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
3. All routing rewrites and static asset caching headers are preconfigured in `vercel.json`.


Continuous checks and previews:
- GitHub Actions already includes htmlhint and a Lighthouse CI workflow.
- Ensure your `index.html` and assets are present in the repository root or `public/` folder.

Form submissions (contact form):
- If you want the contact form to post to a service, use Formspree or EmailJS.
- For Formspree: create a form endpoint and set the `data-endpoint` attribute on the `<form id="contactForm">` element in `index.html` to the provided URL.

Security notes:
- Use fine-grained tokens or Vercel/Netlify environment variables for any secrets.
- Revoke tokens you no longer use.

Accessibility & SEO:
- The repo already contains a pa11y workflow for accessibility checks. Tweak thresholds as needed.
- Lighthouse workflow will run in CI and upload an HTML report to Actions artifacts.

## Lighthouse report (placeholder)

When a Lighthouse run is available the artifact will be downloaded and summarized here. The summary should include:

- Performance: XX
- Accessibility: XX
- Best Practices: XX
- SEO: XX

Top failing audits (examples):

- Serve images with explicit width/height or CSS aspect ratio (fix: add width/height attributes or use aspect-ratio).
- Reduce unused JavaScript (fix: remove or defer large third-party scripts).
- Preconnect to critical origins (fix: add rel="preconnect" links for fonts/CDNs).

Once you download the `lighthouse-report.html`, paste the four category scores and top failing audits here and this file will be updated with a prioritized checklist.

Troubleshooting:
- If images don't display, ensure they are located under `public/assets/` and referenced with that path.
- If animated fonts or icons don't load, check CDN paths.

*** End of file
