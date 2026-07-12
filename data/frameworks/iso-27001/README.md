# ISO 27001 / ISO 27002 — Data Notes

**Status:** Pending (Phase 2)
**Priority:** 4
**Copyright:** International Organization for Standardization — STRICTLY COPYRIGHTED
**Full text in app:** NO — metadata and structural changes only

## CRITICAL: Copyright Rules for This Framework
ISO 27001 and ISO 27002 are purchased standards. The full text costs ~$180–$230 USD per standard.

What we CAN include in the JSON data:
- Control names (e.g., "5.23 Information security for use of cloud services")
- Control IDs (e.g., A.12.1.1 for 2013, or 8.1 for 2022)
- Control counts per version
- Annex A theme/domain structure
- Attribute types (Control type, IS properties, Cybersecurity concepts, etc.)
- Plain-English rationale for why a change was made (NOT paraphrasing the control text)

What we CANNOT include:
- Control text (the actual requirement language)
- Guidance text from ISO 27002
- Paraphrased versions of control text

## Versions to Cover
- ISO 27001:2013 → ISO 27001:2022 (October 2022): Major — 93 controls in 4 themes vs. 114 controls in 14 clauses

Note: ISO 27001:2005 to 2013 can be added later. The 2013 → 2022 transition is what matters most right now (all 2013 certifications expired October 31, 2025).

## Official Sources
- ISO 27001:2022 overview page (free): https://www.iso.org/standard/75652.html
- ISO 27002:2022 overview page (free): https://www.iso.org/standard/75652.html
- BSI Group free transition guide: https://www.bsigroup.com/en-GB/iso-27001/iso-27001-transition/
- Community-published control mapping tables (widely available from consulting firms):
  - Search: "ISO 27001 2013 to 2022 Annex A mapping"
  - Many security consultancies publish free crosswalk tables — verify accuracy against two sources

## Control ID Format
- ISO 27001:2013: `A.{clause}.{section}.{control}` — e.g., `A.12.1.1`, `A.9.4.2`
- ISO 27001:2022: `{#}.{control}` within 4 themes — e.g., `5.1` (Organizational), `6.1` (People), `7.1` (Physical), `8.1` (Technological)

## Key 2013 → 2022 Changes
Structural:
- 114 controls in 14 Annex A clauses (2013) → 93 controls in 4 themes (2022)
- New attribute tagging system (control type, IS properties, cybersecurity concepts, operational capabilities, security domains)

Control changes:
- 11 new controls added (listed in frameworks.md)
- 23 controls renamed
- 57 controls from 2013 merged into 24 controls in 2022
- No controls were removed entirely — all 2013 controls map to at least one 2022 control

## Transition Mapping Table (IDs only — no text)
The mapping from 2013 A-clause controls to 2022 controls is publicly documented by ISO and widely republished. Use a verified crosswalk table for populating the JSON. Include old/new IDs and titles only.

## Data File
`iso-27001.json` — create using the `add-framework-data` Claude skill. Emphasize the copyright restrictions when invoking the skill.
