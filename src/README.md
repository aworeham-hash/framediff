# Source Code

This folder will contain the React application code, populated in Phase 1.

## When to Build

Start building when:
- All Phase 0 planning documentation is complete (done ✅)
- You're ready to begin Phase 1 of the roadmap
- Open a new Claude session in this GRC Project folder and say: "I'm ready to build Phase 1 of FrameDiff. Please read the project README and ROADMAP, then start building the React app."

## What Gets Built Here

```
src/
├── App.jsx
├── main.jsx
├── components/
│   ├── layout/
│   ├── framework/
│   └── ui/
├── hooks/
├── data/
└── utils/
```

Full component detail is in `docs/architecture.md`.

## Tech Stack
- React (via Vite)
- Tailwind CSS
- No backend required for Phase 1–3

## Setup Commands (When Ready)
```bash
npm create vite@latest . -- --template react
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm install
npm run dev
```
