# Project Summary — FrameDiff

## The Problem

Every time a major compliance framework releases a new version, GRC professionals face the same ordeal: download a PDF, read through dozens of pages, manually identify what changed, map those changes to their existing control environment, and figure out what they need to update internally. There is no single tool that does this cleanly.

The information exists — NIST publishes version diffs, PCI SSC publishes summaries of changes, DISA updates STIGs — but it's scattered across different websites in different formats with no consistent UX. A GRC manager tracking five frameworks simultaneously has to repeat this process five times, across five different sources, in five different document formats.

This is an unsolved problem. The major GRC platforms (Vanta, Drata, Hyperproof, AuditBoard, Secureframe) focus on cross-framework *mapping* — which controls overlap between standards. None of them provide a clean, structured view of what changed *within* a standard across versions.

---

## The Solution

A lightweight web app that answers one question clearly: **what changed between version X and version Y of this framework?**

Users select a framework from the sidebar, pick a version transition (e.g., NIST CSF 1.1 → 2.0), and immediately see:

- A summary header: X controls added, X removed, X modified, X restructured
- A filterable list of individual changes (tab between Added / Removed / Modified / Structural)
- Expandable detail on each change — old text vs. new text where legally permissible
- A clear note for copyrighted frameworks (ISO 27001, SOC 2) directing to the official source for full text

No login. No bloat. Just the changes, clearly formatted.

---

## Market Context

### What Exists Today
- **Full GRC platforms** (Vanta, Drata, Hyperproof): $20,000–$100,000/year, enterprise-focused, not designed for version comparison
- **Framework publisher PDFs**: Scattered, inconsistent formatting, require manual interpretation
- **Vendor blog posts**: Incomplete, not searchable, no standardized format
- **Manual GRC work**: What most professionals actually do today

### The Gap
There is no standalone, purpose-built tool for compliance framework version comparison. The closest product is a PDF with a table of contents.

### Target Users (Personal Use → Future Customers)
- GRC managers at companies going through compliance transitions
- Compliance consultants managing multiple clients across multiple frameworks
- Internal audit teams preparing for framework version transitions
- Security engineers maintaining compliance-as-code who need to track standard changes

---

## Frameworks in Scope

### Priority 1 — Build First (Public Domain, High Demand)
- **NIST Cybersecurity Framework (CSF)**: 1.0 → 1.1 → 2.0. Massive adoption, CSF 2.0 was a major structural change (added Govern function). Full text OK.
- **NIST SP 800-53**: Rev 4 → Rev 5. Essential for federal, FedRAMP, and DFARS. Available as structured JSON on NIST GitHub. Full text OK.
- **PCI DSS**: v3.2.1 → v4.0 → v4.0.1. High commercial demand. PCI SSC publishes free official summaries of changes. Use summaries, not full standard text.

### Priority 2 — Add Next (Mixed Copyright Status)
- **ISO 27001 / 27002**: 2005 → 2013 → 2022. Widely used internationally. Copyrighted — show structural/metadata changes only (new control categories, ID mapping, count changes).
- **SOC 2 Trust Service Criteria**: 2016 → 2017 → 2022. AICPA copyrighted. Show Trust Service Category changes and point-of-focus updates only.
- **HIPAA**: Security Rule evolution, HITECH additions, Omnibus Rule, proposed 2024–2025 updates. Public law. Full text OK.

### Priority 3 — Complete the Library
- **SOX / PCAOB Auditing Standards**: AS 5 → AS 2201, PCAOB ongoing standard updates. PCAOB publishes publicly. Full text OK.
- **IRS Publication 4812**: Contractor security controls, various versions. Public domain. Niche but uniquely valuable for IRS contractor work.
- **STIGs (DISA)**: Scoped to top 15 most common products (Windows Server 2019/2022, RHEL 8/9, Ubuntu 20/22, Cisco IOS, SQL Server, Apache, IIS). Published as XCCDF XML. Full text OK. Auto-pullable from public.cyber.mil.

---

## Technical Approach

Built as a simple React web app with all framework data stored in JSON files. No database required for personal use. Hosted free on Vercel. Data lives in a GitHub repo so it's version-controlled and easy to update.

When frameworks release new versions, a set of Python scripts (Phase 4) automatically check source URLs and notify for review. For frameworks with structured data (NIST, STIGs), updates can be semi-automated. For others, the `add-framework-data` Claude skill guides manual data entry into the correct JSON format.

Full technical detail in `docs/architecture.md`.

---

## Monetization Path (Future)

When ready to move beyond personal use:

- **Pricing**: $15–$25/month subscription or $99 one-time purchase
- **Free tier**: 2–3 frameworks (NIST CSF, PCI DSS) to drive discovery
- **Paid tier**: All frameworks, export to PDF/Excel, email alerts for new versions
- **Distribution**: Gumroad for one-time, Stripe for subscriptions; target GRC Reddit, LinkedIn security communities, compliance newsletter sponsorships
- **Differentiation**: Only tool purpose-built for framework version comparison. Simple pricing, no enterprise contract required.

Full plan in `docs/monetization.md`.

---

## Success Criteria by Phase

| Phase | Done When... |
|---|---|
| Phase 1 | NIST CSF comparison loads in browser, summary + drill-down work, deployed to Vercel |
| Phase 2 | 4+ frameworks available, ISO metadata view works, search/filter functional |
| Phase 3 | All 9 framework families in the app, STIGs scoped and working |
| Phase 4 | NIST + STIG auto-pull running on schedule, email notification on new version detection |
| Phase 5 | Stripe connected, landing page live, first paying user |
