# Monetization Plan

This document covers the go-to-market strategy for when FrameDiff moves beyond personal use. Nothing here is urgent — get the product working and useful first.

---

## When to Start Thinking About Monetization

Move to Phase 5 when:
- You've used the app personally for 4–8 weeks and genuinely find it useful
- At least 3 frameworks are fully populated with quality data
- The UI is stable — no major layout or usability issues
- You'd be comfortable sharing a link with a stranger

---

## Pricing Model

**Recommended: Freemium with subscription**

| Tier | Price | What's Included |
|---|---|---|
| Free | $0 | NIST CSF and PCI DSS comparisons; summary view only |
| Pro | $19/month or $179/year | All 9 framework families; full drill-down detail; PDF export; email alerts for new framework versions |

**Why freemium:** The hardest problem is getting discovered. Giving away the two most-searched frameworks drives organic traffic and lets people experience the product before committing. NIST CSF and PCI DSS are the most Googled compliance framework topics.

**Alternative pricing options (consider later):**
- One-time lifetime purchase: $99. Works well on Gumroad. No recurring revenue but lowers buyer friction significantly.
- Team plan: $49/month for up to 5 seats. Relevant if consulting firms become users.

---

## Target Customers

**Primary:**
- GRC managers at mid-market companies (100–2,000 employees) who manage compliance personally without a dedicated platform
- Compliance consultants who advise multiple clients and need to stay current across frameworks
- Internal auditors preparing for SOC 2, ISO 27001, or PCI DSS transitions after a major version release

**Secondary:**
- Security engineers at startups maintaining compliance-as-code (need to know what changed to update their control mapping)
- GRC students and recent certifications (CISA, CRISC, CISSP) learning framework differences

**Who this is NOT for:**
- Enterprise companies with Vanta/Drata/Hyperproof already deployed (those platforms handle this in their own way, though imperfectly)
- Non-technical business users who don't know what a control framework is

---

## Distribution Channels

### Organic (Start Here — No Cost)
1. **Reddit:** Post in r/sysadmin, r/netsec, r/soc2, r/compliance as a genuine "I built this for myself" story. These communities reward useful tools shared authentically. Avoid r/entrepreneur and r/startups — wrong audience.
2. **LinkedIn:** Share in GRC and security groups. A post framed as "I couldn't find this tool so I built it" performs well with compliance professionals.
3. **Hacker News:** Submit to the "Show HN" thread. GRC is niche but the HN audience includes many security engineers.
4. **Product Hunt:** Launch on a Tuesday or Wednesday. Get 5–10 upvotes from real users before launch day for momentum.

### Partnerships / Content (Phase 5+)
- **Newsletter sponsorships:** CISO Series, Compliance Weekly, Risky Business. Typical rate: $200–$500 per mention. Start with newsletter that reaches compliance practitioners specifically.
- **Guest posts:** Write a "What changed in NIST CSF 2.0" article for security blogs (Dark Reading, SC Magazine). Include a natural link to FrameDiff.
- **Conference presence:** RSA, AWS re:Inforce, GRC conferences have "startup spotlight" tracks. Low cost, high-value audience.

### SEO (Longer Term)
Framework-specific landing pages indexed by Google:
- `/nist-csf-2-0-changes` — "What changed in NIST CSF 2.0?"
- `/pci-dss-v4-changes` — "What's new in PCI DSS v4.0?"
- `/iso-27001-2022-changes` — "ISO 27001 2022 vs 2013"

These are high-intent searches. People Googling these terms are exactly the target customer. Current top results are PDFs and blog posts — a clean, interactive comparison would rank well with proper on-page SEO.

---

## Technical Setup for Monetization

**Authentication:** Clerk.com
- Free up to 10,000 monthly active users
- Drop-in React components, minimal code
- Stores subscription tier in user metadata

**Payments:** Stripe
- Stripe Checkout handles the payment flow (no custom card UI)
- Stripe Customer Portal handles subscription management (cancel, upgrade, update card)
- Vercel serverless functions handle Stripe webhooks

**Implementation order:**
1. Add Clerk (auth) — gates premium content
2. Add Stripe subscription product ($19/month, $179/year)
3. Connect Stripe webhook → updates Clerk user metadata with `plan: "pro"`
4. Gate premium framework components with `user.publicMetadata.plan === "pro"` check

**Estimated implementation time with Claude:** 1–2 days

---

## Revenue Projections (Conservative)

| Metric | Month 3 | Month 6 | Month 12 |
|---|---|---|---|
| Free users | 200 | 800 | 2,500 |
| Paid conversion rate | 3% | 4% | 5% |
| Paying subscribers | 6 | 32 | 125 |
| Monthly Revenue (MRR) | $114 | $608 | $2,375 |

These are conservative — conversion rates for tools with a clear professional use case and no direct competitors can be higher. The ceiling is higher if distribution works.

---

## Legal Considerations Before Launch

**Copyright (most important):**
- ISO 27001 and SOC 2 content: confirm the "metadata only" approach is implemented correctly in the app. No control text, no paraphrasing of control text. Structural data and change summaries only.
- Attribution: For frameworks where you use official change summaries (PCI DSS), include clear attribution to PCI SSC.

**Terms of Service and Privacy Policy:**
- Required before accepting payment
- Use a generator (Termly.io, iubenda) for a first draft — takes 30 minutes
- Key points to cover: no warranty on accuracy (compliance decisions should be verified with official sources), data handling, refund policy

**Disclaimer:**
- Add a clear disclaimer on every page: "FrameDiff provides informational summaries of compliance framework changes. Always refer to official framework documentation for compliance decisions. FrameDiff is not affiliated with NIST, PCI SSC, ISO, AICPA, DISA, or any framework publisher."

---

## Competitive Monitoring

If a competitor launches something similar, assess:
1. Do they have better data coverage?
2. Do they have a better UI?
3. Is their pricing lower?

The most defensible advantages are: framework coverage depth (especially niche ones like IRS 4812 and STIGs), update speed (being first to publish new version changes), and simplicity (not becoming another bloated GRC platform).
