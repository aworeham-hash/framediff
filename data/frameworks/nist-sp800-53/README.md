# NIST SP 800-53 — Data Notes

**Status:** Pending (Phase 1–2)
**Priority:** 2
**Copyright:** Public domain — full text OK

## Versions to Cover
- Rev 4 → Rev 5 (September 2020): Major overhaul — 66 new controls, removed federal-only scope, privacy controls integrated

## Official Sources
- Rev 5 JSON (machine-readable, perfect for parsing): https://github.com/usnistgov/oscal-content/tree/main/nist.gov/SP800-53
- Rev 5 PDF: https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-53r5.pdf
- Rev 4 → Rev 5 changes: Appendix E of Rev 5 PDF (pages 430–460)
- Rev 5 summary: https://csrc.nist.gov/publications/detail/sp/800-53/rev-5/final

## Control ID Format
`{Family}-{##}` — e.g., `AC-1`, `IA-5`, `SI-4`, `PM-30`

Families: AC, AT, AU, CA, CM, CP, IA, IR, MA, MP, PE, PL, PM, PS, PT, RA, SA, SC, SI, SR

## Auto-Pull Strategy
NIST publishes SP 800-53 content in OSCAL (Open Security Controls Assessment Language) JSON format on GitHub. This is the cleanest auto-pull target in the project.

GitHub repo: https://github.com/usnistgov/oscal-content
Watch for new commits to the `nist.gov/SP800-53/` directory.

Phase 4 GitHub Actions script should:
1. Compare the latest commit hash for this directory to a stored hash
2. If changed, parse the new JSON, diff against existing app data
3. Create a GitHub Issue with the detected changes for review

## Key Rev 4 → Rev 5 Changes to Note
- 66 new controls added (many in new PT family — Privacy)
- 3 controls consolidated into 1
- Program Management (PM) family significantly expanded
- Control baselines moved out of 800-53 into separate SP 800-53B
- Removed the word "federal" throughout — now applicable to all organizations
- New Supply Chain Risk Management (SR) family added

## Data File
`nist-sp800-53.json` — create using the `add-framework-data` Claude skill. The OSCAL JSON from NIST GitHub is the best starting point for populating this.
