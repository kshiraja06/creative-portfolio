# Kshiraja Portfolio

A single-page portfolio with separate project pages for each work category.

## Structure

```
portfolio/
├── index.html          # Home: about, works folders, contact
├── styles.css          # Global styles
├── js/
│   ├── main.js         # Home page animations and navigation
│   ├── nav.js          # Shared header navigation (work pages)
│   ├── lightbox.js     # Image lightbox (galleries)
│   ├── worldbuilding.js
│   ├── concept.js
│   ├── animatic.js
│   ├── illustrations.js
│   ├── interactions.js
│   └── graphic-design.js
├── work/               # Project pages (opened from work folders)
│   ├── worldbuilding.html
│   ├── concept.html
│   ├── animatic.html
│   ├── visual-design.html
│   ├── graphic-design.html
│   ├── illustrations.html
│   └── interactions.html
├── assets/             # Images and UI elements
├── fonts/
├── vercel.json
└── package.json
```

## Local development

```bash
npm run dev
```

Open `http://localhost:8000`

## Deploy

```bash
vercel --prod
```

Old root-level project URLs redirect to `/work/` automatically via `vercel.json`.
