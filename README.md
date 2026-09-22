# Lohith R — Software Engineer & AI/ML Portfolio

[![Live Site](https://img.shields.io/badge/Live_Portfolio-GitHub_Pages-6366f1?style=for-the-badge&logo=github)](https://lohithravi69.github.io/lohith-portfolio/)
[![React 18](https://img.shields.io/badge/React-18.3-61dafb?style=for-the-badge&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646cff?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-10b981?style=for-the-badge)](LICENSE)

An interactive, high-performance portfolio engineered with **React 18**, **Vite**, and a **Vanilla CSS design system**. Built to showcase intelligent AI/ML models, real-time disaster response telemetry, enterprise full-stack web applications, and algorithmic problem-solving milestones.

🔗 **Live Deployment:** [https://lohithravi69.github.io/lohith-portfolio/](https://lohithravi69.github.io/lohith-portfolio/)  
📄 **Canonical Resume:** [Lohith_R_Resume.pdf](https://lohithravi69.github.io/lohith-portfolio/Lohith_R_Resume.pdf)

---

## 🌟 Key Architecture & Features

### 1. ⚡ Live GitHub API Sync (15+ Repositories)
- Fetches real-time repository metadata, commit activity, stars, forks, and primary languages dynamically from `@Lohithravi69`.
- Automatically indexes newly published repositories without manual updates.
- Interactive category filtering (AI/ML, Full-Stack Web, Disaster Tech, Cloud/Tools, Algorithms).

### 2. 🌓 Dynamic OS & Browser Theme Synchronization
- Automatically queries `window.matchMedia('(prefers-color-scheme: dark)')` to mirror the user's OS and browser day/night theme in real-time.
- Live event listeners ensure instant switching when the operating system changes themes.
- High-contrast, custom glassmorphism design tokens for both Dark and Light palettes with user override persistence via `localStorage`.

### 3. 📬 Production-Ready Direct Email Delivery
- Integrated with FormSubmit AJAX endpoint delivering messages directly to `lohithravi69@gmail.com`.
- Zero-backend serverless form processing with client-side validation and immediate `mailto:` fallback.

### 4. 🏆 Verified Credentials & Interactive Modals
- Verified industry certificates:
  - **Appin Technology Coimbatore** — Cybersecurity & Ethical Hacking Internship
  - **KreupAI Technologies LLC** — Full-Stack Developer Internship
  - **Forage / Tata Group** — Data Visualisation & Analytics Job Simulation
  - **freeCodeCamp** — Responsive Web Design
- High-resolution WebP modal viewer with direct PDF downloads and credential ID verification.

### 5. 📱 Responsive Flexbox Carousels & Micro-Animations
- Continuous horizontal flexbox sliders with hover-activated floating navigation arrows.
- Interactive particle network canvas background and confetti animations.
- Accessible touch targets (min 44px) and zero horizontal overflow across 320px–4K displays.

---

## 🛠️ Tech Stack

| Domain | Technologies |
| :--- | :--- |
| **Frontend Framework** | React 18 (Hooks, Suspense, Custom Contexts) |
| **Build Tooling** | Vite 5.4, PostCSS, ESLint |
| **Styling & System** | Vanilla CSS3 (Custom Properties, Glassmorphism, CSS Containment & Isolation) |
| **Icons & Media** | Lucide React, Official Brand SVGs (GitHub, LinkedIn, LeetCode, HackerRank) |
| **Animations** | HTML5 Canvas Particle Engine, Canvas Confetti, CSS Keyframe Beams |
| **CI / CD Deployment** | GitHub Actions Pages Pipeline (`deploy-pages.yml`), Lighthouse CI, Axe Accessibility |

---

## 🚀 Local Development

### Prerequisites
- Node.js (v18.0.0 or later)
- npm (v9.0.0 or later)

### Quickstart

```bash
# 1. Clone the repository
git clone https://github.com/Lohithravi69/lohith-portfolio.git
cd lohith-portfolio

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Visit `http://localhost:5173/` in your browser.

### Production Build

```bash
# Compile and bundle assets to dist/
npm run build

# Preview production build locally
npm run preview
```

---

## 📂 Project Structure

```
lohith-portfolio/
├── .github/
│   └── workflows/          # GitHub Actions CI/CD workflows
├── public/
│   ├── assets/             # Compressed WebP thumbnails, portrait photos, and SVGs
│   ├── Lohith_R_Resume.pdf # Canonical resume PDF
│   └── robots.txt          # SEO crawler instructions
├── src/
│   ├── components/
│   │   ├── Navbar.jsx      # Sticky glass navbar with theme toggle
│   │   ├── Hero.jsx        # Typing effect, particle canvas, quick links
│   │   ├── About.jsx       # Biography, principles, mentorship quotes
│   │   ├── Skills.jsx      # Flexbox carousel of skills & pillars
│   │   ├── Projects.jsx    # Real-time GitHub sync & project modals
│   │   ├── Education.jsx   # Verified certificates & timeline
│   │   ├── Contact.jsx     # Functional email delivery form
│   │   ├── Icons.jsx       # Official SVG brand vectors
│   │   └── Footer.jsx      # Footer with back-to-top & social links
│   ├── data/
│   │   ├── projects.js     # Curated project metadata
│   │   ├── skills.js       # Technical competencies
│   │   └── education.js    # Verified credentials & academic milestones
│   ├── App.jsx             # Theme engine & active section observer
│   ├── main.jsx            # React root mount
│   └── index.css           # Complete design system & custom properties
├── index.html              # OpenGraph meta tags, SEO schema, fonts
├── package.json
└── vite.config.js
```

---

## 📬 Contact & Connect

- **Email:** [lohithravi69@gmail.com](mailto:lohithravi69@gmail.com)
- **LinkedIn:** [linkedin.com/in/lohith-ravi-22b9a32a0](https://linkedin.com/in/lohith-ravi-22b9a32a0)
- **GitHub:** [github.com/Lohithravi69](https://github.com/Lohithravi69)
- **LeetCode:** [leetcode.com/u/1FhDezcHg0/](https://leetcode.com/u/1FhDezcHg0/)
- **HackerRank:** [hackerrank.com/profile/lohithravi69](https://www.hackerrank.com/profile/lohithravi69)

---

**© 2026 Lohith R. Open-source under the MIT License.**
