# lohith-portfolio

This is my personal portfolio website developed as part of the VaultofCodes internship. It showcases my skills, projects, and contact information.

## 🖥️ Technologies Used
- HTML5
- CSS3
- JavaScript (optional)

## 🌐 Website Sections
- Home
- About Me
- Skills
- Projects
- Contact


## 🚀 How to View
1. Clone this repo
2. Open `index.html` in any web browser

## 👨‍💻 Developed By
**Lohith R**  
B.E CSE Student  
PPG Institute of Technology  
[lohithravi69@gmail.com](mailto:lohithravi69@gmail.com)

## ✨ Recent improvements added
- Meta tags (description, Open Graph, Twitter card)
- JSON-LD Person structured data for better search results
- Skip to main content link and visible focus styles for accessibility
- Mobile-friendly nav toggle and reduced-motion support
- Lazy-loaded responsive images (srcset + sizes) to reduce load and CLS
- Contact form with a Vercel-compatible serverless scaffold (`api/contact.js`)

## ⚙️ Serverless contact endpoint
The repo includes `api/contact.js` — a simple Vercel serverless function scaffold that accepts POST requests from the contact form. It currently logs the incoming message and returns success. To send real emails, update `api/contact.js` to call an email provider (SendGrid, AWS SES, Mailgun) and add provider credentials as environment variables in your hosting platform.

Example environment variables:
- `SENDGRID_API_KEY` — SendGrid API key
- `TO_EMAIL` — destination email address for contact messages

## 📦 Deploying on Vercel (recommended)
1. Connect this repository to Vercel or use the Vercel CLI.
2. The `api` directory will be deployed as serverless functions automatically.
3. Add environment variables in Vercel dashboard for your email provider and update `api/contact.js` to use them.

If you want, I can integrate SendGrid (or another provider) into `api/contact.js` now and create a branch + PR with the implementation.

---

## Contact endpoint (SendGrid)

The project includes a serverless endpoint at `api/contact.js` which accepts POST requests `{ name, email, message }`.

- To enable sending emails via SendGrid, set the following environment variables in your deployment provider (for example, Vercel):
	- `SENDGRID_API_KEY` — your SendGrid API key
	- `SENDGRID_FROM` — the email address to send from (optional; defaults to no-reply@yourdomain.com)
	- `SENDGRID_TO` — the recipient email address (optional; defaults to `SENDGRID_FROM`)

- When `SENDGRID_API_KEY` is present, the function will POST to SendGrid's mail/send endpoint. If it's not set, the function will log submissions and return success (useful for local dev).

Be careful to keep your API keys secret and use your platform's environment variable settings (do not check them into source).

## Notes on images & analytics

- Images: responsive `srcset` and WebP fallbacks were added to project thumbnails. Consider pre-generating WebP images for better cache control and using Vercel Image Optimization for production.

- Analytics: a lightweight placeholder for Plausible/umami was added in `index.html`. Replace it with your preferred analytics provider and update the privacy notice as required.

## Case studies (skeleton)

There's a small JSON file at `data/case-studies.json` with a skeleton structure you can extend. The project modal uses `data-*` attributes on project cards; if you prefer richer content the modal can be wired to fetch this JSON and render full case studies.

## Generate WebP images (optional)

I've added a small Node.js utility at `tools/generate-webp.js` that uses `sharp` to convert a folder of JPEG/PNG images to WebP. Example usage:

```powershell
# from repo root
node tools/generate-webp.js --src=./images --dest=./public/assets --quality=80
```

Install dependencies first:

```powershell
npm init -y
npm install sharp
```

This is optional — for small portfolios I recommend using your hosting provider's image optimization (Vercel Image Optimization) or pre-generating WebP images and serving them from `/assets`.

## Interactive demos

You can include interactive demos (CodeSandbox, CodePen, StackBlitz, etc.) in the case study JSON by adding an `embed` URL. The modal will display an iframe with the provided URL when available. Example `case-studies.json` entry:

```json
{
	"id": "safenet",
	"title": "Emergency SOS App",
	"embed": "https://codesandbox.io/embed/your-sandbox-id"
}
```

Make sure the embed provider allows embedding (CSP/X-Frame-Options). If you want, I can add a couple of embedded demos for projects you pick and test the embeds in a deployed preview.

## Lighthouse audits

A GitHub Actions workflow `/.github/workflows/lighthouse-ci.yml` was added to run Lighthouse CI on push to `main` and upload the report.

To run Lighthouse locally, install Chrome/Edge and run:

```powershell
# install lighthouse if needed
npx -y lighthouse http://localhost:8080 --output=html --output-path=./lighthouse-local.html
```

If you don't have Chrome available in CI, the action uses `lhci autorun` which runs headless Chrome on GitHub's Ubuntu runners.
