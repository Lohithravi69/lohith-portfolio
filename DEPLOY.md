# Deployment Notes

This project is a static portfolio site and can be deployed easily to Vercel or Netlify.

Vercel (recommended):
- Push the repository to GitHub.
- On Vercel, choose "Import Project" and select your GitHub repo.
- Vercel will detect a static site. Set the build command to none and the output directory to the repo root (or use `public/` if you serve the site from there).
- Environment variables: NONE required for a static site. If you add Formspree/EmailJS keys, configure them in Vercel's project settings.

Netlify:
- Connect your Git repository.
- Build command: none. Publish directory: repository root or `public/` if you use it.
- Configure environment variables in Site settings if needed.

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

Troubleshooting:
- If images don't display, ensure they are located under `public/assets/` and referenced with that path.
- If animated fonts or icons don't load, check CDN paths.

*** End of file
