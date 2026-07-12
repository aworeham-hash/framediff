# SOC 2 Trust Service Criteria — Data Notes

**Status:** Pending (Phase 3)
**Priority:** 5
**Copyright:** AICPA — copyrighted
**Full text in app:** NO — Trust Service Category structure and Points of Focus names only

## CRITICAL: Copyright Rules for This Framework
The SOC 2 Trust Service Criteria (TSC) are published by the AICPA. Full criteria text is copyrighted.

What we CAN include:
- Trust Service Category names (Security, Availability, Processing Integrity, Confidentiality, Privacy)
- Common Criteria (CC) IDs and names (e.g., CC6.1 "Logical Access Security")
- Points of Focus titles (not descriptions)
- Count of CC criteria per version
- Structural changes (new CC series added, criteria renumbered)

What we CANNOT include:
- Full criteria text
- Points of Focus descriptions
- Supplemental criteria guidance text

## Versions to Cover
- Trust Service Principles (2009) → TSC 2016/2017: Major restructuring to criteria-based model
- TSC 2017 → 2022 updates: Clarifications, new Points of Focus for cloud/SaaS

## Official Sources
- AICPA TSC landing page: https://www.aicpa-cima.com/resources/landing/trust-services-criteria
- AICPA publishes free "at a glance" and transition summary documents — check their website
- Many SOC 2 consultancies publish public change summaries — useful reference material

## Criteria ID Format
`CC{#}.{#}` — e.g., `CC1.1`, `CC6.3`, `CC9.2`
Additional criteria: `A{#}` (Availability), `C{#}` (Confidentiality), `PI{#}` (Processing Integrity), `P{#}` (Privacy)

## Key TSC Changes to Note
2009 → 2017:
- Moved from "principles" to "criteria" model
- Introduced Common Criteria (CC) concept shared across Trust Service Categories
- COSO 2013 alignment
- Added CC9 series (Risk Mitigation)

2017 → 2022 updates:
- New Points of Focus addressing cloud services and SaaS environments
- Clarifications to CC6 (Logical and Physical Access) and CC7 (System Operations)
- No new CC criteria numbers — only Points of Focus additions

## Data File
`soc2.json` — create using the `add-framework-data` Claude skill. Emphasize copyright restrictions when invoking.
