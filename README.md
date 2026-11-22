# SkinWise

Educational skincare guide: concern explorer, ingredient library, rule-based questionnaire, journal and favorites. Frontend-only (React 19, TypeScript, Vite, Tailwind CSS 4, Lucide). Data lives in `src/data`; journal, favorites and history persist in `localStorage`. **Not medical advice.**

## Run locally
```
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build to dist/
npm run preview
```

## Structure
`src/types.ts` types · `src/data/` knowledge base · `src/lib/` storage, router, store, questionnaire logic · `src/components/` shared UI · `src/pages/` screens

## Deploy
**Vercel:** import the repo; framework Vite, build `npm run build`, output `dist`.
**Netlify:** import the repo; `netlify.toml` already sets build `npm run build` and publish `dist`.
Routing uses URL hashes, so no rewrite rules are needed.
