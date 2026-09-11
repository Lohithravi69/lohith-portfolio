import React from 'react';

export function GithubIcon({ size = 20, className = "", style = {} }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export function LinkedinIcon({ size = 20, className = "", style = {} }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export function LRLogo({ size = 22, className = "", style = {}, fill = "currentColor" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="-2 -2 120 104"
      fill={fill}
      className={className}
      style={{ display: "inline-block", verticalAlign: "middle", ...style }}
      aria-label="Lohith R Logo"
    >
      {/* R shape */}
      <path d="M84.48,4.02 L83.91,3.45 L30.46,3.45 L29.89,4.02 L35.63,14.37 L37.36,16.09 L83.91,16.09 L90.8,18.97 L94.83,22.99 L98.28,30.46 L98.28,36.78 L97.13,40.8 L94.83,44.83 L91.38,48.28 L86.21,51.15 L70.11,51.72 L69.54,52.3 L95.4,96.55 L108.05,96.55 L108.62,94.83 L90.23,62.64 L97.13,59.2 L104.02,52.87 L106.9,48.85 L109.77,41.38 L113.79,41.38 L112.64,45.4 L108.05,54.02 L102.87,59.77 L96.55,63.79 L95.98,65.52 L115.52,100.0 L93.1,100.0 L63.22,48.85 L63.22,47.7 L79.31,47.7 L81.03,48.28 L84.48,47.7 L87.93,45.98 L92.53,41.38 L94.25,37.93 L94.83,32.18 L92.53,26.44 L87.93,21.84 L82.18,19.54 L35.06,19.54 L32.18,16.09 L22.99,0.0 L86.21,0.0 L90.8,1.15 L99.43,5.17 L106.32,11.49 L109.77,16.09 L112.64,22.41 L112.64,22.99 L108.62,22.99 L106.32,17.82 L98.28,9.2 L92.53,5.75 L85.06,4.02 Z" />
      {/* L shape */}
      <path d="M0.0,9.2 L4.02,16.09 L4.02,95.98 L4.6,96.55 L70.69,96.55 L71.26,95.98 L67.82,87.93 L64.94,83.91 L16.09,83.91 L16.09,32.76 L20.11,36.21 L20.11,79.89 L20.69,80.46 L67.82,80.46 L78.16,99.43 L78.16,100.0 L0.0,100.0 L0.0,9.77 Z" />
    </svg>
  );
}

