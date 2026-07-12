# FrameDiff — Setup Guide

## Prerequisites

- [Node.js 18+](https://nodejs.org/) — download and install if you don't have it
- A terminal (Terminal on Mac, Command Prompt or PowerShell on Windows)

---

## 3-Step Quick Start

### Step 1 — Install dependencies

> **⚠️ Important:** Delete the `node_modules` folder first if it already exists in this folder — it was partially created and will cause errors. Just drag it to the trash or run `rm -rf node_modules` in the terminal.

Open a terminal in this folder and run:

```bash
npm install
```

This installs React, Vite, and Tailwind CSS. Takes about 30–60 seconds.

### Step 2 — Start the dev server

```bash
npm run dev
```

You'll see output like:

```
  VITE v5.0.8  ready in 312 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### Step 3 — Open your browser

Go to **http://localhost:5173**

That's it. The app runs entirely in your browser — no backend, no database, no API keys.

---

## Project Structure

```
framediff/
├── data/
│   ├── schemas/              # JSON schema for validation
│   └── frameworks/
│       ├── nist-csf/         # ✅ Full data (1.0→1.1, 1.1→2.0)
│       ├── nist-sp800-53/    # ✅ Full data (Rev4→Rev5)
│       ├── pci-dss/          # ✅ Full data (3.2.1→4.0, 4.0→4.0.1)
│       ├── iso-27001/        # ✅ Metadata only (2013→2022)
│       ├── soc2/             # 🔜 Coming soon
│       ├── hipaa/            # 🔜 Coming soon
│       ├── sox/              # 🔜 Coming soon
│       ├── irs-4812/         # 🔜 Coming soon
│       └── stigs/            # 🔜 Coming soon
├── docs/                     # Architecture, framework guides, content maintenance
├── skills/                   # Claude skills for adding framework data
├── src/
│   ├── components/
│   │   ├── framework/        # FrameworkPage, ChangeItem, ChangeList, etc.
│   │   ├── layout/           # Sidebar
│   │   └── ui/               # Badge, FilterTabs, SearchBar, EmptyState
│   ├── data/
│   │   └── registry.js       # Imports all JSON and exports lookup functions
│   ├── hooks/
│   │   └── useFilteredChanges.js
│   └── utils/
│       └── constants.js      # Change types, significance levels, framework groups
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## Adding New Framework Data

Use the Claude skill included in `skills/add-framework-data/`:

1. Open a Claude Cowork session with this folder connected
2. Type: "add framework data" and follow the prompts
3. The skill handles copyright rules, significance classification, and JSON formatting

See `docs/content-maintenance.md` for the manual process and monthly monitoring checklist.

---

## Building for Production

```bash
npm run build
```

Output goes to `dist/`. The entire app is a static site — deploy to Vercel, Netlify, GitHub Pages, or any static host.

### Deploy to Vercel (recommended, free)

1. Push this folder to a GitHub repository
2. Go to [vercel.com](https://vercel.com) → New Project → Import your repo
3. Vercel auto-detects Vite — no configuration needed
4. Every push to `main` auto-deploys

---

## Troubleshooting

**"npm: command not found"** — Install Node.js from nodejs.org first.

**Port 5173 in use** — Vite will automatically try 5174, 5175, etc. Check the terminal output for the actual URL.

**Blank page** — Open browser dev tools (F12) → Console tab and check for errors. Usually a missing JSON file if you've added a new framework.

**JSON validation error** — Run your JSON through the schema at `data/schemas/framework-schema.json` using a tool like [jsonschemavalidator.net](https://www.jsonschemavalidator.net/).
