# HIPAA — Data Notes

**Status:** Pending (Phase 3)
**Priority:** 6
**Copyright:** US federal law — public domain
**Full text in app:** Yes

## Versions to Cover
HIPAA changes are regulatory (rule amendments and proposed rules), not versioned like control frameworks.

Track these milestones:
1. HIPAA 1996 — Original Act
2. Privacy Rule (45 CFR Parts 160/164) — Effective April 2003
3. Security Rule (45 CFR Part 164, Subpart C) — Effective April 2005
4. HITECH Act additions — Effective February 2010
5. Omnibus Rule — Effective March 2013
6. Proposed Security Rule Update (NPRM) — Published March 2024, finalized 2025

## Official Sources
- HHS HIPAA for Professionals: https://www.hhs.gov/hipaa/for-professionals/index.html
- eCFR (current rule text): https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-C/part-164
- Federal Register NPRM (proposed Security Rule update): https://www.federalregister.gov/
  - Search: "HIPAA Security Rule" — published March 7, 2024

## CFR Section ID Format
`45 CFR §{part}.{section}` — e.g., `45 CFR §164.312(a)(1)`

Security Rule safeguard types:
- Administrative Safeguards: §164.308
- Physical Safeguards: §164.310
- Technical Safeguards: §164.312
- Organizational Requirements: §164.314
- Policies and Procedures: §164.316

## Key Changes in the 2024 Proposed Security Rule Update
(Status: May be finalized by the time you read this — check HHS.gov)
- Eliminate "addressable" vs. "required" specification distinction (all become required)
- MFA required for all access to ePHI systems
- Encryption required for all ePHI at rest and in transit
- Network segmentation required
- Vulnerability scanning required every 6 months
- Penetration testing required annually
- Technology asset inventory required
- Incident response plan testing required annually

## Auto-Pull Strategy
Monitor Federal Register for new HIPAA rules:
- Federal Register API: https://www.federalregister.gov/api/v1/
- Search for agency "HHS" and keywords "HIPAA" — can be automated with a simple Python script

## Data File
`hipaa.json` — note: because HIPAA changes are regulatory rather than a numbered control catalog, the JSON structure will track regulatory milestones and specific CFR section changes rather than control-level diffs.
