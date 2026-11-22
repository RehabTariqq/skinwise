# SkinWise

**Live demo: https://skinwise-rouge.vercel.app/**

SkinWise is a skincare education app that explains common skin concerns in plain language. It covers what may contribute to a concern, general care approaches, and how common ingredients are used. It is educational only and is not medical advice.

## Features

- **Explore concerns:** 15 concerns across acne and pores, skin texture, skin appearance and other concerns, with search and category filters
- **Concern guides:** what it is, common characteristics, possible contributing factors, general approaches, commonly used ingredients, possible irritants and when to see a professional
- **Ingredient library:** 8 common ingredients with uses, precautions and general usage information
- **Questionnaire:** rule-based educational suggestions from your answers, with no AI or external services
- **Skin journal:** add, edit and delete daily observations
- **Favorites and history:** save concerns, ingredients and guides, and review what you explored
- **Private by design:** everything runs in your browser and is saved in localStorage, with no backend, accounts or API keys

## Tech stack

React 19, TypeScript, Vite, Tailwind CSS 4, Lucide React

## Project structure

```
src/
  components/   shared UI (header, cards, disclaimer)
  data/         skincare knowledge base (concerns, ingredients, guides)
  lib/          localStorage hook, router, store, questionnaire logic
  pages/        Home, Explore, Ingredients, Quiz, Journal, Favorites, About
  types.ts      TypeScript interfaces
```

## Run locally

```
npm install
npm run dev
```

Open http://localhost:5173. Build for production with `npm run build`.

## Deployment

Deployed on Vercel: import the repo, keep the Vite defaults (build `npm run build`, output `dist`) and deploy. Netlify also works, and `netlify.toml` is included.

## Disclaimer

SkinWise does not diagnose skin conditions or identify exact causes, and skin concerns often have several causes. Patch test new products, and see a dermatologist for severe, persistent or worsening concerns.
