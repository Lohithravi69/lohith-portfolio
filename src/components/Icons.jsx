import React from 'react';

/**
 * Official GitHub Invertocat Logo (Solid Vector)
 */
export function GithubIcon({ size = 18, className = "", style = {} }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={{ display: "inline-block", verticalAlign: "middle", flexShrink: 0, ...style }}
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

/**
 * Official LinkedIn 'in' Logo (Solid Brand Vector with official #0A66C2 rounded badge)
 */
export function LinkedinIcon({ size = 18, className = "", style = {} }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      style={{ display: "inline-block", verticalAlign: "middle", flexShrink: 0, ...style }}
      aria-hidden="true"
    >
      <rect width="24" height="24" rx="4.5" fill="#0A66C2" />
      <path
        fill="#FFFFFF"
        d="M6.94 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm-.24 4.5H3.3v10.5h3.4V9.5zm5.4 0H8.7v10.5h3.4v-5.6c0-1.5.3-3 2.1-3 1.8 0 1.9 1.6 1.9 3.1v5.5h3.4v-6.2c0-3.1-.7-5.5-4.3-5.5-1.7 0-2.8.9-3.3 1.8v-1.6z"
      />
    </svg>
  );
}

/**
 * Official LeetCode Dual-Tone Brand Icon
 */
export function LeetCodeIcon({ size = 18, className = "", style = {} }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      style={{ display: "inline-block", verticalAlign: "middle", flexShrink: 0, ...style }}
      aria-hidden="true"
    >
      <path
        fill="#FFA116"
        d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226 7.113 6.23l-3.85 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .2 2.362 5.874 5.874 0 0 0 .749 1.621 5.32 5.32 0 0 0 1.661 1.627 5.562 5.562 0 0 0 2.609.654c1.194 0 2.362-.438 3.279-1.233l4.33-3.876a1.377 1.377 0 0 0 .07-1.94 1.378 1.378 0 0 0-1.94-.069l-4.329 3.876c-.57.493-1.309.767-2.08.767a3.16 3.16 0 0 1-1.482-.37 3.02 3.02 0 0 1-.945-.925 3.328 3.328 0 0 1-.424-.922 3.14 3.14 0 0 1-.115-1.341c.046-.226.126-.445.238-.647.214-.388.52-.72.894-.973l4.743-4.228 4.743-4.229a1.378 1.378 0 0 0 0-1.949 1.37 1.37 0 0 0-.966-.404z"
      />
      <path
        fill="currentColor"
        d="M9.825 5.57a1.378 1.378 0 0 0-1.378 1.378v5.51a1.378 1.378 0 0 0 2.756 0V6.948a1.378 1.378 0 0 0-1.378-1.378z"
      />
      <path
        fill="#94A3B8"
        d="M20.479 8.326a1.378 1.378 0 0 0-.974.404L15.173 13.06a1.378 1.378 0 0 0 1.949 1.949l4.332-4.33a1.378 1.378 0 0 0-.975-2.353z"
      />
    </svg>
  );
}

/**
 * Official HackerRank 'H' Logo (Solid Brand Vector with official #00EA64 badge)
 */
export function HackerRankIcon({ size = 18, className = "", style = {} }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      style={{ display: "inline-block", verticalAlign: "middle", flexShrink: 0, ...style }}
      aria-hidden="true"
    >
      <rect width="24" height="24" rx="4.5" fill="#00EA64" />
      <path
        fill="#091E42"
        d="M6 5.5h3.2v4.8h5.6V5.5H18v13h-3.2v-5.2H9.2v5.2H6V5.5z"
      />
    </svg>
  );
}

/**
 * Official Custom Monogram Logo for Lohith R
 */
export function LRLogo({ size = 22, className = "", style = {}, fill = "currentColor" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="-2 -2 120 104"
      fill={fill}
      className={className}
      style={{ display: "inline-block", verticalAlign: "middle", flexShrink: 0, ...style }}
      aria-label="Lohith R Logo"
    >
      <path d="M84.48,4.02 L83.91,3.45 L30.46,3.45 L29.89,4.02 L35.63,14.37 L37.36,16.09 L83.91,16.09 L90.8,18.97 L94.83,22.99 L98.28,30.46 L98.28,36.78 L97.13,40.8 L94.83,44.83 L91.38,48.28 L86.21,51.15 L70.11,51.72 L69.54,52.3 L95.4,96.55 L108.05,96.55 L108.62,94.83 L90.23,62.64 L97.13,59.2 L104.02,52.87 L106.9,48.85 L109.77,41.38 L113.79,41.38 L112.64,45.4 L108.05,54.02 L102.87,59.77 L96.55,63.79 L95.98,65.52 L115.52,100.0 L93.1,100.0 L63.22,48.85 L63.22,47.7 L79.31,47.7 L81.03,48.28 L84.48,47.7 L87.93,45.98 L92.53,41.38 L94.25,37.93 L94.83,32.18 L92.53,26.44 L87.93,21.84 L82.18,19.54 L35.06,19.54 L32.18,16.09 L22.99,0.0 L86.21,0.0 L90.8,1.15 L99.43,5.17 L106.32,11.49 L109.77,16.09 L112.64,22.41 L112.64,22.99 L108.62,22.99 L106.32,17.82 L98.28,9.2 L92.53,5.75 L85.06,4.02 Z" />
      <path d="M0.0,9.2 L4.02,16.09 L4.02,95.98 L4.6,96.55 L70.69,96.55 L71.26,95.98 L67.82,87.93 L64.94,83.91 L16.09,83.91 L16.09,32.76 L20.11,36.21 L20.11,79.89 L20.69,80.46 L67.82,80.46 L78.16,99.43 L78.16,100.0 L0.0,100.0 L0.0,9.77 Z" />
    </svg>
  );
}
