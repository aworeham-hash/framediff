# Product Roadmap

> **Vision:** The compliance changelog used by a million GRC professionals worldwide.
> Affordable, accurate, and faster than reading a PDF.

---

## Name Options

The product needs a name that works for broad adoption — memorable, professional,
not too technical, and brandable at scale. "FrameDiff" is fine for now but won't
resonate with a non-technical audience.

| Name | Why It Works |
|---|---|
| **ControlShift** | Ctrl+Shift is a keyboard shortcut everyone knows. "Control" = compliance controls. "Shift" = something changed. Clever double meaning. ⭐ Top pick |
| **PolicyPulse** | Professional and accessible. "Pulse" implies staying current — checking the heartbeat of your policies. Appeals beyond security teams. |
| **ShiftLog** | Clean, minimal. Shift = change, Log = record. Easy to say, spell, and brand. |
| **Driftlog** | "Compliance drift" is a real industry term. A log that tracks drift from standards. Unique and memorable. |
| **DeltaLog** | Delta (Δ) = change. Already in the logo. Clean and professional. |

**Action:** Check domain availability (Namecheap or Cloudflare Registrar) and pick
one before the public launch. Register .com and .io if possible.

---

## Current Status

**Live at:** framediff.vercel.app

**Frameworks with full data:**
- NIST CSF (1.0 → 1.1 → 2.0)
- NIST SP 800-53 (Rev 4 → Rev 5)
- PCI DSS (3.2.1 → 4.0 → 4.0.1)
- ISO 27001 (2013 → 2022, metadata only)
- SOX / PCAOB (AS5 → AS2201 → QC 1000)
- IRS Publication 4812 (Rev 8 → Rev 9 → Rev 12)

**Still coming soon:**
- HIPAA (2013 → 2024 Security Rule update)
- SOC 2 (2017 → 2022 TSC, metadata only)
- STIGs (scoped to top ~15 products)

---

## Phase 1 — Complete the Foundation
**Goal:** All frameworks populated. Product is genuinely useful before any marketing.

- [ ] Write HIPAA 2013 → 2024 data
- [ ] Write SOC 2 2017 → 2022 TSC data
- [ ] Scope and write top STIGs (Windows Server, RHEL, SQL Server, Chrome, IIS)
- [ ] Mobile responsive layout check
- [ ] Add `<title>` and `<meta description>` to each framework page for SEO
- [ ] Write Terms of Service and Privacy Policy (Termly.io — 30 min)
- [ ] Register domain
- [ ] Point domain to Vercel

---

## Phase 2 — Make It Discoverable
**Goal:** Organic search traffic before any paid spend.
**Trigger:** Start this when all frameworks are populated.

### SEO Strategy

Framework update searches are high-intent, permanent, and underserved. Someone
Googling "what changed in NIST CSF 2.0" is exactly the target user. Current top
results are dense PDFs and generic blog posts — a clean interactive tool ranks well.

**Priority keywords:**

| Keyword | Monthly Searches | Competition |
|---|---|---|
| "NIST CSF 2.0 changes" | ~2,400 | Low |
| "PCI DSS v4 changes" | ~1,900 | Low |
| "ISO 27001 2022 vs 2013" | ~1,600 | Low |
| "NIST 800-53 Rev 5 changes" | ~880 | Very low |
| "SOC 2 TSC 2022 changes" | ~590 | Very low |
| "IRS 4812 Rev 12 changes" | Minimal | Zero |

**How to rank:**

1. Each framework page gets a proper `<title>`: e.g. "NIST CSF 2.0 Changes — What's New vs 1.1 | ControlShift"
2. Add a `/guides` section — one long-form article per major framework transition (1,200–1,500 words). Real content that earns the ranking and links naturally to the interactive tool.
3. Submit sitemap.xml to Google Search Console on launch day
4. Get 3–5 backlinks early. One Reddit post + one LinkedIn post is enough to start.

**Do NOT do yet:** Paid ads, cold outreach, Product Hunt. Wait until a first-time visitor would naturally come back.

### Organic Launch Posts

Run these in order, spaced 1–2 weeks apart:

1. **Reddit** (r/netsec, r/sysadmin, r/compliance) — "I built a tool to track compliance framework changes so I didn't have to read 300-page PDFs anymore." Authentic, not promotional. Link in comments.
2. **LinkedIn** — "I was spending hours every year manually diffing framework updates. I built something better." Tag 2–3 GRC contacts you know personally.
3. **Hacker News Show HN** — Short, honest, technical. "Show HN: Interactive compliance framework changelog."
4. **Product Hunt** — Launch on a Tuesday or Wednesday. Line up 5–10 genuine upvotes from real users before launch day for early momentum.

---

## Phase 3 — Freemium Launch
**Goal:** First paying customers, recurring revenue.
**Trigger:** After Phase 2 brings consistent organic traffic (50+ daily visitors).

### Pricing — Built for a Million Users

The goal is broad adoption, not high per-seat pricing. At $9/month, the decision
is a no-brainer for anyone with a compliance role. No budget approval needed.

| Tier | Price | Includes |
|---|---|---|
| **Free** | $0/mo | All 9 framework comparisons, full change detail, highlights |
| **Pro** | **$9/mo** or $79/yr | + New version email alerts, PDF/Excel export, saved control notes |
| **Team** | **$29/mo** (5 seats) | + Team shared notes, admin dashboard, Slack/Teams alerts |

**Why $9 not $19:**
At $9/month — 10,000 paying users = $90K MRR. 50,000 paying users = $450K MRR.
Those numbers are reachable with 500K–1M free users and a 1–5% conversion rate.
$19/month cuts the addressable user base in half for no product reason.

### Pro Features to Build

**Version alerts** ← highest retention value
- User selects which frameworks to watch
- Email when a new version publishes
- Weekly digest option
- Stack: cron job (Vercel) + Resend.com for email. ~2 days to build.

**PDF/Excel export**
- Export any transition's change list to formatted PDF or Excel
- Zero backend needed — jsPDF + SheetJS run client-side
- ~1 day to build

**Saved notes**
- Annotate specific controls: "This affects our AWS env — assigned to Sarah"
- Mark controls as "relevant" or "N/A" for your org
- Stack: Supabase (free tier is plenty). ~1–2 days to build.

### Technical Implementation Order

1. **Clerk.com** for auth — free up to 10K MAU, drop-in React components (~1 day)
2. **Stripe** — Checkout for subscribing, Customer Portal for managing. Webhook updates Clerk user metadata. (~1 day)
3. **Gate export** behind Pro check (~half day)
4. **Build alerts** with Resend.com (~2 days)
5. **Build notes** with Supabase (~2 days)

Total: ~1 week of focused sessions.

---

## Phase 4 — Growth Features
**Goal:** Increase retention, word-of-mouth, and team stickiness.
**Trigger:** Consistent MRR, organic growth plateau.

- **More frameworks:** GDPR, CCPA, FedRAMP, CMMC, COBIT, CIS Controls
- **Control mapping:** User uploads their control library → tool shows which controls are affected by a given framework update
- **Slack/Teams integration:** Alert a channel when a framework you're tracking updates
- **API access** (Pro/Team tier): Programmatic access for compliance-as-code workflows
- **RSS feeds:** Per-framework changelog feeds for tooling integration
- **Side-by-side framework compare:** NIST CSF vs ISO 27001 control mapping
- **CISA KEV cross-reference:** Flag control changes that relate to active exploited vulnerabilities

---

## Phase 5 — Scale
**Goal:** Category-defining product, serious revenue.
**Timeline:** 12–24 months post-launch.

- **White-label for consulting firms** — GRC consultants brand the tool for their clients
- **Enterprise tier** — SSO, audit logs, custom framework uploads, SLA, dedicated support
- **Certification study mode** — CISSP, CISM, ISO Lead Auditor exam prep using framework diffs
- **Compliance news feed** — Curated regulatory news alongside framework diffs
- **Mobile app** — Lightweight version for staying current on the go

---

## Revenue Model at Scale

| Stage | Free Users | Paid (1–5% conv.) | MRR |
|---|---|---|---|
| Phase 3 launch | 5,000 | 50 | $450 |
| 6 months live | 25,000 | 250–1,250 | $2K–$11K |
| 12 months live | 100,000 | 1,000–5,000 | $9K–$45K |
| 24 months live | 500,000 | 5,000–25,000 | $45K–$225K |
| At scale | 1,000,000 | 10,000–50,000 | $90K–$450K |

Organic growth only assumed. Any distribution push compresses these timelines.

---

## Competitive Moat

What makes this defensible as competitors emerge:

1. **Data depth** — Per-control diffs with rationale, not just summaries
2. **Coverage breadth** — IRS 4812, STIGs, SOX — frameworks the big players ignore
3. **Update speed** — First to publish when frameworks release new versions
4. **Simplicity** — Not another bloated GRC platform. Just the changelog.
5. **Price** — $9 is not a budget conversation. Enterprise tools charge $50K/year for worse data.

---

## Legal Checklist Before Public Launch

- [ ] Terms of Service (Termly.io — 30 min)
- [ ] Privacy Policy (Termly.io — 30 min)
- [ ] ISO 27001 and SOC 2 copyright compliance confirmed (metadata-only approach)
- [ ] Attribution for PCI DSS content
- [ ] Disclaimer on every page (already implemented)
- [ ] Domain registered
- [ ] LLC formed before first paying customer (LegalZoom or Stripe Atlas — ~$500)

---

## Immediate Next Steps

1. `git push` the current redesign (diff/bullets fix)
2. HIPAA data
3. SOC 2 data
4. STIGs scoping
5. Pick name + register domain
6. Add SEO meta tags to framework pages
