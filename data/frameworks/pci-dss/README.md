# PCI DSS — Data Notes

**Status:** Pending (Phase 2)
**Priority:** 3
**Copyright:** PCI SSC — standard text copyrighted. "Summary of Changes" documents are freely distributed and approved for use.
**Full text in app:** No — summaries and change metadata only.

## Versions to Cover
- v3.2.1 → v4.0 (March 2022): Major overhaul — 64 new requirements, customized approach, major restructuring
- v4.0 → v4.0.1 (June 2024): Minor — errata and clarifications only, no new requirements

## Official Sources
Download all "Summary of Changes" PDFs from: https://www.pcisecuritystandards.org/document_library/

Key documents:
- "PCI DSS v3.2.1 to v4.0 Summary of Changes" — primary source for v3.2.1 → v4.0 data
- "PCI DSS v4.0 to v4.0.1 Summary of Changes" — errata list
- "PCI DSS v4.0 at a Glance" — good for highlights

## Requirement ID Format
`Requirement {#}.{#}.{#}` — e.g., `Req 8.3.6`, `Req 1.3.2`

Note: v4.0 renumbered some requirements. Always include both old and new requirement ID when changed.

## Copyright Handling
- oldText and newText in JSON must be null
- title can include the requirement name/short description (this is factual, not the protected requirement text)
- rationale can include plain-English explanation of why the change was made
- Always include a link to https://www.pcisecuritystandards.org for full text

## Key v3.2.1 → v4.0 Changes to Note
- Customized Approach introduced (alternative to prescriptive requirements)
- MFA required for ALL access to Cardholder Data Environment (not just remote)
- 64 new requirements (including 51 "future-dated" requirements, effective March 31, 2025)
- Targeted Risk Analysis (TRA) introduced for several requirements
- Enhanced anti-phishing controls (new Req 5.4.x)
- Stronger password complexity requirements
- Payment page script management (new Req 6.4.x)
- E-commerce security enhancements

## Auto-Pull Strategy
Monitor: https://www.pcisecuritystandards.org/document_library/
Check for new PDFs by comparing page content hash monthly. No API available.
PCI SSC also has a mailing list for document updates — subscribe at their site.

## Data File
`pci-dss.json` — create using the `add-framework-data` Claude skill. Paste in content from the official Summary of Changes PDFs as the source.
