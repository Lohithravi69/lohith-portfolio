Lighthouse summary — parsed from local artifacts

Parsed on: 2025-10-13

Files parsed:
- tmp-lh-artifact-new/lighthouse-report/lighthouse-report.html (latest)
- tmp-lh-artifact-main/lighthouse-report.html
- tmp-lh-artifact-2/lighthouse-report.html
- tmp-lh-artifact/lighthouse-report.html

Summary (key metrics)

1) tmp-lh-artifact-new (latest)
- FCP: 2440.77 ms (2.4 s)
- LCP: 2440.77 ms (2.4 s)
- Total byte weight: 100,298 bytes (98 KiB)
- Top transfer contributors:
  - Inter woff2: 48,464 B
  - Hero image (lumoro.webp): 27,583 B
  - Root / favicon entries: ~11,489 B each

2) tmp-lh-artifact-main
- FCP: 1644.30 ms (1.6 s)
- LCP: 1644.30 ms (1.6 s)
- Total byte weight: 369,458 bytes (361 KiB)
- Top transfer contributors:
  - Font Awesome webfonts (fa-solid / fa-brands): ~127 KB and ~105 KB
  - Inter woff2

3) tmp-lh-artifact-2
- FCP: 3209.67 ms (3.2 s)
- LCP: 3209.67 ms (3.2 s)
- Total byte weight: ~369,468 bytes (361 KiB)
- Top contributors: Font Awesome webfonts + Inter

4) tmp-lh-artifact
- FCP: 1606.79 ms (1.6 s)
- LCP: 1606.79 ms (1.6 s)
- Total byte weight: 346,908 bytes (339 KiB)
- Top contributors: Font Awesome webfonts + Inter

Headline takeaway
- Total payload reduced substantially in the latest run (≈ 369 KB → 98 KB; ~73% reduction). This matches work done to remove Font Awesome and other large third-party assets.
- Latest run still shows an Inter woff2 request (~48 KB) and a hero image (~27 KB). If the goal is to eliminate external font transfers, there may be a leftover reference to Inter; search `index.html` for `fonts.gstatic`, `fonts.googleapis`, or `inter` to confirm.
- FCP/LCP in the latest single run were higher than some previous runs (2.4 s vs 1.6 s). Lighthouse run variance, test environment, caching, or a missing preload path could explain this; re-running Lighthouse after confirming preload URLs and removing any leftover font references is recommended.

Vercel preview check (quick result)
- Attempted to access: https://lohith-portfolio-crhmbj34k-lohithravi69s-projects.vercel.app/
- Result: The preview is protected by Vercel deployment protection. The server returned an authentication/redirect page and instructions indicating the deployment requires a bypass token to be accessed by automated agents.
- Evidence: page content contains Vercel auth UI and text about `x-vercel-protection-bypass` and how to construct a bypass URL. This is different than a 404 — the preview exists but is gated.

Next recommended steps (I can run these)
1. Quick checks & fixes (safe, low risk):
   - Search and remove leftover Google Fonts / Inter references in `index.html`.
   - Verify the hero image preload `href` matches the served path (no stray `/public/` prefix) and fix if necessary.
   - Commit small fixes and re-run Lighthouse to get an updated artifact.

2. If you want Inter back:
   - Create a WOFF2 subset and self-host it (or use font-display:swap/optional). I can scaffold a script to subset and generate WOFF2 files.

3. Vercel preview access:
   - To programmatically fetch the preview from CI/agents, generate a Vercel protection bypass token and use the `?x-vercel-set-bypass-cookie=true&x-vercel-protection-bypass=$TOKEN` query parameters (see Vercel docs). Alternatively, disable deployment protection on that preview if you want it publicly accessible.

If you want me to proceed, say which steps to run (1: quick code checks/fixes and commit; 2: re-run Lighthouse and produce updated summary; 3: help get preview access or reconfigure Vercel).