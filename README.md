# PARI — Interactive Developer Portfolio

React + TypeScript + Vite, with a real-time 3D hero (React Three Fiber + Drei) and GSAP for the hero entrance. Plain CSS design tokens, no backend.

## Requirements
Node.js 20.19+ (or 22+) and npm.

## Commands
```
npm install
npm run dev       # local development
npm run build     # type-check + production build into dist/
npm run preview   # serve dist/ locally
```

## Edit your content
- `src/data/site.ts` — name, title, headline, intro, email, socials, About copy, process, `showExperience`
- `src/data/projects.ts` — projects (title, links, stack; optional `image` in `public/images/`)
- `src/data/skills.ts`, `src/data/experience.ts`
- `index.html` — title, description, canonical, Open Graph (replace every `[YOUR-DOMAIN]`); add `public/og-image.png`

## 3D visual
`src/three/HeroScene.tsx` holds the sculpture (`Sculpture`) and lighting. Replace the geometry/material there. `SceneHost.tsx` handles lazy loading, WebGL detection, pausing offscreen and the CSS fallback.

## Colours and type
All tokens are at the top of `src/styles/global.css` (`--bg`, `--accent`, `--font-*`). Fonts are system stacks (no downloads); add self-hosted `@font-face` files if you want a custom face.

## Deploy (Chabokan or any static host)
1. `npm run build`
2. Upload the **contents** of `dist/` to the site's public web root (e.g. `public_html`).
3. `base: './'` in `vite.config.ts` keeps asset paths relative, so it works at the domain root or in a subfolder. Single-page, so no rewrite rules are needed.
Netlify/Vercel/Cloudflare Pages also work: build command `npm run build`, output `dist`.
