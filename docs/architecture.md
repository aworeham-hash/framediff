# Technical Architecture

## Overview

FrameDiff is a client-side React web app. All framework data lives in JSON files checked into the same repository. There is no database and no server-side API for Phase 1–3. This keeps the stack simple, free to host, and fully maintainable without backend engineering knowledge.

---

## Tech Stack

| Layer | Technology | Why |
|---|---|---|
| Frontend framework | React (via Vite) | Industry standard, excellent tooling, Claude knows it well |
| Styling | Tailwind CSS | Utility-first, fast to build clean UIs, no custom CSS files needed |
| Data | JSON files in `/data/frameworks/` | Version-controlled, human-readable, no database required |
| Hosting | Vercel | Free, deploys automatically from GitHub push, zero config |
| Code + data storage | GitHub | Version control for both code and framework data |
| Automation (Phase 4) | GitHub Actions | Free CI/CD, runs Python scripts on schedule |
| Auth (Phase 5 only) | Clerk.com | Simplest auth to integrate with React + Vercel |
| Payments (Phase 5 only) | Stripe | Industry standard, easy React integration |

---

## Component Structure

```
src/
├── App.jsx                    # Root component, routing
├── main.jsx                   # Entry point
│
├── components/
│   ├── layout/
│   │   ├── Sidebar.jsx        # Framework list navigation
│   │   └── Header.jsx         # App header, search bar
│   │
│   ├── framework/
│   │   ├── FrameworkPage.jsx  # Main view for a selected framework
│   │   ├── VersionPicker.jsx  # Dropdown to select version transition
│   │   ├── SummaryCards.jsx   # Summary row: Added / Removed / Modified / Restructured
│   │   ├── ChangeList.jsx     # Filterable list of all changes
│   │   ├── ChangeItem.jsx     # Single expandable change row
│   │   └── MetadataOnlyBanner.jsx  # Banner for copyrighted frameworks (ISO, SOC 2)
│   │
│   └── ui/
│       ├── Badge.jsx          # Change type pill (Added / Removed / Modified)
│       ├── FilterTabs.jsx     # All / Added / Removed / Modified / Structural tabs
│       ├── SearchBar.jsx      # Search within a framework's changes
│       └── EmptyState.jsx     # "No changes match your filter" state
│
├── hooks/
│   ├── useFrameworkData.js    # Loads and parses JSON for selected framework
│   └── useFilteredChanges.js  # Filters/searches the change list
│
├── data/
│   └── index.js               # Imports all JSON files and exports framework registry
│
└── utils/
    ├── constants.js           # Framework IDs, version labels, copyright flags
    └── format.js              # Date formatting, control ID formatting
```

---

## Data Flow

```
User clicks framework in sidebar
        ↓
FrameworkPage loads → calls useFrameworkData("nist-csf")
        ↓
useFrameworkData imports /data/frameworks/nist-csf/nist-csf.json
        ↓
VersionPicker shows available version transitions from JSON
        ↓
User selects "1.1 → 2.0"
        ↓
useFilteredChanges returns changes for that version transition
        ↓
SummaryCards + ChangeList render from filtered data
        ↓
User types in SearchBar → useFilteredChanges re-filters in real time
        ↓
User clicks a ChangeItem → expands to show old/new text
```

---

## JSON Data Architecture

Each framework has one JSON file. The schema is defined in `data/schemas/framework-schema.json`. See `docs/data-structure.md` for full detail.

High-level structure:
```json
{
  "id": "nist-csf",
  "name": "NIST Cybersecurity Framework",
  "shortName": "NIST CSF",
  "copyright": "public-domain",
  "source": "https://www.nist.gov/cyberframework",
  "versions": ["1.0", "1.1", "2.0"],
  "transitions": {
    "1.0-to-1.1": { ... changes ... },
    "1.1-to-2.0": { ... changes ... }
  }
}
```

---

## Hosting & Deployment

**Development:** `npm run dev` → runs at localhost:5173

**Production:** Push to GitHub main branch → Vercel auto-deploys within ~30 seconds

**Vercel setup (one time):**
1. Create account at vercel.com (free)
2. Connect GitHub repo
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Deploy — Vercel gives you a URL like `framediff.vercel.app`

**Custom domain (Phase 5):** Buy domain (Namecheap/Cloudflare), add to Vercel DNS settings — done in 5 minutes.

---

## Auto-Pull Architecture (Phase 4)

GitHub Actions workflows run on a weekly schedule. Each workflow:
1. Fetches the source URL or API for a framework
2. Compares against the current version tracked in the repo
3. If a change is detected, creates a GitHub Issue with the details
4. Optionally: creates a draft PR with updated JSON (for NIST where data is structured)

Frameworks with good auto-pull:
- **NIST SP 800-53**: NIST GitHub API — detect new commits to the oscal-content repo
- **STIGs**: DISA public portal — check XML file hashes for top 15 products
- **PCAOB standards**: RSS feed at pcaobus.org/news/rss

Frameworks requiring manual review after alert:
- PCI DSS (PDF-based)
- ISO 27001 (paid, no public API)
- SOC 2 (AICPA, no public API)
- HIPAA (Federal Register monitoring)

---

## Performance Notes

- All JSON is bundled at build time (no runtime API calls for data). Loads instantly.
- Total data size estimate for all 9 framework families: ~2–5 MB — well within free Vercel limits.
- No images required — all UI is text + CSS.
- Lighthouse target: 95+ on all metrics.

---

## Phase 5 Additions (Auth + Payments)

When ready to monetize, two services get added:

**Clerk (auth):**
- `npm install @clerk/clerk-react`
- Wrap app in `<ClerkProvider>`
- Add `<SignIn />` / `<SignUp />` pages
- Gate premium framework data with `useUser()` hook

**Stripe (payments):**
- Stripe Checkout handles the payment flow (no card UI to build)
- Vercel serverless functions handle webhook for subscription status
- User's subscription tier stored in Clerk user metadata

This does introduce a small backend (Vercel serverless functions) but nothing requiring a dedicated server.
