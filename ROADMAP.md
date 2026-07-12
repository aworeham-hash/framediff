# FrameDiff — Project Roadmap

---

## Phase 0 — Planning & Documentation ✅
**Goal:** Clear plan before any code is written. All decisions documented so Claude can build with full context in future sessions.

**Deliverables:**
- [x] Market research — confirmed no direct competitor exists
- [x] Framework coverage plan with copyright analysis
- [x] Technical architecture decision (React + JSON + Vercel)
- [x] Project folder structure
- [x] This roadmap

**Key Decisions Made:**
- ISO 27001 and SOC 2 show metadata/structural changes only (copyright)
- STIGs scoped to top 15 products (not all 500+)
- Start personal use, monetize later
- Data in JSON files, not a database (keeps it simple)

---

## Phase 1 — MVP: First Framework Working in Browser
**Goal:** A real, working web app with NIST CSF comparison fully functional. Deployed and usable.

**Timeline:** 2–3 weeks

**Deliverables:**
- [ ] React app scaffolded (Vite + Tailwind CSS)
- [ ] Framework sidebar component
- [ ] Version picker (dropdown: compare v1.1 → v2.0)
- [ ] Summary card row: # Added / # Removed / # Modified / # Restructured
- [ ] Change list with filter tabs (All / Added / Removed / Modified / Structural)
- [ ] Expandable detail panel for each change (old text vs. new text)
- [ ] NIST CSF data: 1.0 → 1.1 changes (JSON file, manually curated)
- [ ] NIST CSF data: 1.1 → 2.0 changes (JSON file, manually curated)
- [ ] Deployed to Vercel at a real URL
- [ ] Basic responsive layout (works on laptop and desktop)

**Data Sources for This Phase:**
- NIST CSF 1.0 → 1.1: https://www.nist.gov/system/files/documents/2018/04/16/csf-v1.1-ipd-redline-04-05-2018-final.pdf
- NIST CSF 1.1 → 2.0: https://nvlpubs.nist.gov/nistpubs/CSWP/NIST.CSWP.29.pdf (official 2.0 publication includes change notes)

**Done When:** Opening the Vercel URL shows NIST CSF, the 1.1 → 2.0 comparison loads with real data, and both summary and drill-down work.

---

## Phase 2 — Core Framework Library
**Goal:** The three highest-demand frameworks fully in the app. ISO metadata view established as the pattern for copyrighted standards.

**Timeline:** 3–4 weeks after Phase 1

**Deliverables:**
- [ ] NIST SP 800-53 Rev 4 → Rev 5 data (auto-pull from NIST GitHub JSON)
- [ ] PCI DSS v3.2.1 → v4.0 → v4.0.1 data (from PCI SSC Summary of Changes PDFs)
- [ ] ISO 27001 2013 → 2022 (metadata only: control ID mapping, new/removed controls, structural changes)
- [ ] "Metadata only" UI treatment for copyrighted frameworks (clear banner, link to official source)
- [ ] Search bar within a framework's change list
- [ ] Keyboard navigation (arrow keys through change list)
- [ ] Copy-to-clipboard on individual changes
- [ ] "Last updated" timestamp on each framework

**Data Sources for This Phase:**
- NIST SP 800-53: https://github.com/usnistgov/oscal-content (JSON format)
- PCI DSS Summary of Changes: https://www.pcisecuritystandards.org/document_library/
- ISO 27001 2022 vs 2013 analysis: https://www.iso.org/standard/75652.html (use publicly available structural comparison resources)

**Done When:** 4 frameworks are selectable, all comparison data loads correctly, ISO shows metadata view cleanly.

---

## Phase 3 — Complete Framework Library
**Goal:** All 9 framework families in the app. STIGs working with product-level navigation.

**Timeline:** 4–5 weeks after Phase 2

**Deliverables:**
- [ ] SOC 2 Trust Service Criteria 2016 → 2017 → 2022 updates (metadata only)
- [ ] HIPAA: Security Rule 2003 → HITECH 2009 → Omnibus 2013 → 2024/2025 proposed updates
- [ ] SOX / PCAOB: AS 5 → AS 2201 + key PCAOB standard updates
- [ ] IRS Publication 4812: All available versions
- [ ] STIGs: Top 15 products — Windows Server 2019, Windows Server 2022, RHEL 8, RHEL 9, Ubuntu 20.04, Ubuntu 22.04, Cisco IOS XE, SQL Server 2019, Apache 2.4, IIS 10, Windows 10, Windows 11, VMware ESXi, Oracle 19c, Docker
- [ ] STIG navigation: product picker within the STIGs section
- [ ] "Framework family" grouping in sidebar (NIST family, PCI, ISO family, etc.)
- [ ] Export single comparison to PDF (browser print)
- [ ] "What's new" landing section showing most recently updated frameworks

**Done When:** All 9 framework families are in the sidebar, STIGs product picker works, PDF export works.

---

## Phase 4 — Automation & Maintenance
**Goal:** The app stays current without manual checking. New framework versions are detected automatically.

**Timeline:** 3–4 weeks after Phase 3

**Deliverables:**
- [ ] GitHub Actions workflow: weekly check for NIST SP 800-53 updates (GitHub API)
- [ ] GitHub Actions workflow: weekly check for DISA STIG updates (public.cyber.mil)
- [ ] GitHub Actions workflow: weekly check for PCI SSC document library changes
- [ ] Email notification when a new version is detected (sends summary to your email before publishing)
- [ ] Admin review page (password-protected): review pending changes, approve/reject before they go live
- [ ] Version history log: track when each framework was last updated in the app
- [ ] OSCAL format parser for NIST data (handles future NIST publications in OSCAL/JSON)

**Done When:** At least NIST and STIG updates are caught automatically. You receive an email when something new is detected. You can approve and publish without touching code.

---

## Phase 5 — Monetization & Launch
**Goal:** First paying user. Product accessible to others beyond personal use.

**Timeline:** When you decide you're ready (no rush — get Phase 3 fully working first)

**Deliverables:**
- [ ] Authentication added (Clerk.com — easiest to integrate with React/Vercel)
- [ ] Stripe integration: subscription ($15–25/month) or one-time ($99)
- [ ] Free tier: NIST CSF and PCI DSS (most searched)
- [ ] Paid tier: All frameworks + email alerts for new versions + PDF export
- [ ] Landing page: clear value prop, "What changed in [framework]?" hero
- [ ] Domain name (e.g., framediff.com or compliancediff.com)
- [ ] SEO: framework-specific pages indexed by Google (e.g., /nist-csf-2-0-changes)

**Marketing Plan (Low Cost):**
- Post in r/sysadmin, r/netsec, r/compliance, r/soc2 with a genuine "I built this for myself" post
- Share on LinkedIn GRC communities
- Reach out to GRC newsletter authors (CISO Series, Compliance Weekly) for feature inclusion
- List on Product Hunt

**Done When:** Stripe is live, at least one non-you person has paid for access.

---

## Parallel Tracks (Ongoing)

**Content curation** — As frameworks update in the real world, add version data. Use the `add-framework-data` Claude skill to structure new data quickly.

**UI polish** — Ongoing based on personal use. Keep a running list of friction points in a `FEEDBACK.md` file.

**Legal review** — Before launching to paying customers, do a quick review of the ISO / SOC 2 "metadata only" approach with a lawyer or at minimum thorough research. This is the only real legal risk in the product.

---

## Risk Register

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| ISO / SOC 2 copyright claim | Low (if metadata only) | High | Show structural changes only, link to official source, add clear attribution |
| Framework data goes stale | Medium | Medium | Phase 4 automation + manual quarterly review |
| STIGs too complex to maintain | Medium | Low | Scope to top 15 only, add more by demand |
| Build stalls without momentum | Medium | High | Complete Phase 1 first, use it personally — real feedback drives motivation |
| Someone builds the same thing | Low | Medium | First-mover advantage; keep shipping |

---

## Resource Requirements

**To build (with Claude):** No special skills required beyond basic ability to run terminal commands, copy-paste code, and deploy to Vercel. Claude writes the code; you direct and deploy.

**Cost to run:**
- Vercel hosting: Free (personal use), $20/month if adding team features
- GitHub: Free
- Domain name: ~$12/year when ready to launch
- Clerk (auth, Phase 5): Free up to 10,000 MAU
- Stripe: 2.9% + $0.30 per transaction, no monthly fee

**Total cost until monetization: ~$0**
