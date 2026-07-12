# NIST CSF — Data Notes

**Status:** Pending (Phase 1 — build this first)
**Priority:** 1 — Start here
**Copyright:** Public domain — full text OK

## Versions to Cover
- 1.0 → 1.1 (April 2018): Moderate changes — supply chain, identity mgmt additions
- 1.1 → 2.0 (February 2024): Major — new Govern function, restructured subcategories

## Official Sources
- CSF 2.0 publication: https://nvlpubs.nist.gov/nistpubs/CSWP/NIST.CSWP.29.pdf
- CSF 1.1 → 2.0 comparison (NIST resource): https://www.nist.gov/cyberframework/csf-20-reference-tool
- CSF 1.0 → 1.1 redline: https://www.nist.gov/system/files/documents/2018/04/16/csf-v1.1-ipd-redline-04-05-2018-final.pdf

## Control ID Format
`{Function}.{Category}-{##}` — e.g., `GV.OC-01`, `PR.AA-05`, `DE.CM-09`

Functions: GV (Govern, new in 2.0), ID (Identify), PR (Protect), DE (Detect), RS (Respond), RC (Recover)

## Known Complexity
The 1.1 → 2.0 transition involved significant restructuring. Some subcategories were merged, some were split, and the entire Govern function was added. The NIST reference tool at the link above has a crosswalk table — use it as the primary data source.

## Data File
`nist-csf.json` — create this using the `add-framework-data` Claude skill when ready to populate.
