# FrameDiff — Compliance Framework Version Tracker

A web app that shows clean, structured comparisons of what changed between versions of major GRC compliance frameworks. Built for GRC professionals who are tired of hunting through 30-page PDFs every time a standard releases a new version.

---

## What This Is

FrameDiff gives you a single place to answer the question: **"What actually changed between version X and version Y?"** — for every major framework, with a summary view for quick scanning and drill-down detail when you need it.

No login required. No bloated GRC platform. Just the changes.

---

## Project Folder Structure

```
GRC Project/
├── README.md                     ← You are here
├── PROJECT_SUMMARY.md            ← Product vision, market context, goals
├── ROADMAP.md                    ← Phased build plan with milestones
│
├── docs/
│   ├── architecture.md           ← Tech stack, component design, hosting
│   ├── frameworks.md             ← Coverage plan, sources, copyright guide per framework
│   ├── data-structure.md         ← JSON schema, examples, how to organize data
│   ├── content-maintenance.md    ← How to update data when frameworks release new versions
│   └── monetization.md           ← Future pricing, target market, go-to-market plan
│
├── data/
│   ├── schemas/
│   │   └── framework-schema.json ← Master JSON schema for all framework data files
│   └── frameworks/
│       ├── nist-csf/             ← NIST Cybersecurity Framework data & notes
│       ├── nist-sp800-53/        ← NIST SP 800-53 data & notes
│       ├── pci-dss/              ← PCI DSS data & notes
│       ├── iso-27001/            ← ISO 27001/27002 data & notes (metadata only — copyrighted)
│       ├── soc2/                 ← SOC 2 Trust Service Criteria data & notes
│       ├── hipaa/                ← HIPAA data & notes
│       ├── sox/                  ← SOX / PCAOB standards data & notes
│       ├── irs-4812/             ← IRS Publication 4812 data & notes
│       └── stigs/                ← DISA STIGs data & notes (scoped to top 15 products)
│
├── src/                          ← App source code (populated in Phase 1)
│   └── README.md
│
├── scripts/                      ← Auto-pull and data update scripts (Phase 3)
│   └── README.md
│
└── skills/
    ├── add-framework-data/
    │   └── SKILL.md              ← Claude skill: structure new framework version data
    └── parse-framework-changes/
        └── SKILL.md              ← Claude skill: parse a framework change document into JSON
```

---

## Quick Reference: Framework Status

| Framework | Versions Covered | Copyright | Full Text OK | Auto-Pull |
|---|---|---|---|---|
| NIST CSF | 1.0 → 1.1 → 2.0 | Public domain | Yes | Yes (NIST.gov) |
| NIST SP 800-53 | Rev 4 → Rev 5 | Public domain | Yes | Yes (GitHub) |
| PCI DSS | v3.2.1 → v4.0 → v4.0.1 | PCI SSC (restricted) | Summaries only | Partial |
| ISO 27001/27002 | 2005 → 2013 → 2022 | ISO (copyrighted) | No — metadata only | No |
| SOC 2 TSC | 2016 → 2017 → 2022 | AICPA (copyrighted) | No — metadata only | No |
| HIPAA | 1996 → 2003 → 2013 → 2025 | Public law | Yes | Partial |
| SOX / PCAOB | AS 5 → AS 2201 + updates | PCAOB (public) | Yes | Yes (PCAOB.org) |
| IRS 4812 | Per published version | Public domain | Yes | Partial |
| STIGs | Top 15 products, per version | Public domain (DISA) | Yes | Yes (DISA portal) |

---

## Build Status

| Phase | Description | Status |
|---|---|---|
| Phase 0 | Project planning & documentation | ✅ In Progress |
| Phase 1 | MVP: NIST CSF UI + data | Pending |
| Phase 2 | Add NIST 800-53 + PCI DSS + ISO 27001 | Pending |
| Phase 3 | Complete framework library | Pending |
| Phase 4 | Auto-pull automation | Pending |
| Phase 5 | Monetization & launch | Pending |

---

## Getting Started (Once Code Is Built)

1. Clone the repo
2. `npm install`
3. `npm run dev` — runs at localhost:3000
4. To add a new framework version: use the `add-framework-data` Claude skill (see `skills/add-framework-data/SKILL.md`)

---

## Key Decisions Log

- **ISO 27001 / SOC 2**: Showing metadata and structural changes only (control IDs, counts, new categories) — not control text — to respect copyright. This is the legally safe approach and is still highly useful.
- **STIGs**: Scoped to top 15 most common products rather than all 500+ DISA STIGs. Scope can expand later.
- **Personal use first**: No auth required, no backend initially. Monetization path documented in `docs/monetization.md` for when ready.
- **Data in JSON**: All framework data lives in version-controlled JSON files so content can be updated without touching app code.
