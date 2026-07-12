# Data Structure Guide

All framework comparison data is stored as JSON files in `data/frameworks/<framework-id>/`. This document explains the schema, field meanings, and how to populate new data.

The authoritative schema is in `data/schemas/framework-schema.json`.

---

## File Naming Convention

```
data/frameworks/
  nist-csf/
    nist-csf.json         ← Main data file
    README.md             ← Human notes about sources, decisions, known gaps
  nist-sp800-53/
    nist-sp800-53.json
    README.md
  ...
```

---

## Top-Level Schema

```json
{
  "id": "nist-csf",
  "name": "NIST Cybersecurity Framework",
  "shortName": "NIST CSF",
  "description": "A voluntary framework of cybersecurity standards and best practices for critical infrastructure protection.",
  "copyright": "public-domain",
  "showFullText": true,
  "source": "https://www.nist.gov/cyberframework",
  "officialChangelogUrl": "https://www.nist.gov/cyberframework/csf-20-reference-tool",
  "lastDataUpdate": "2024-11-01",
  "versions": ["1.0", "1.1", "2.0"],
  "latestVersion": "2.0",
  "transitions": {
    "1.0-to-1.1": { ... },
    "1.1-to-2.0": { ... }
  }
}
```

### Top-Level Field Definitions

| Field | Type | Description |
|---|---|---|
| `id` | string | Unique identifier, matches folder name. Lowercase, hyphenated. |
| `name` | string | Full official name |
| `shortName` | string | Abbreviated name used in UI |
| `description` | string | 1–2 sentence description shown in sidebar |
| `copyright` | enum | `"public-domain"`, `"restricted-summary-only"`, `"restricted-metadata-only"` |
| `showFullText` | boolean | If false, app shows restricted banner and hides change detail text |
| `source` | string | Official source URL |
| `officialChangelogUrl` | string | Direct link to official change documentation |
| `lastDataUpdate` | string | ISO date when this JSON was last updated (YYYY-MM-DD) |
| `versions` | array | All tracked versions in chronological order |
| `latestVersion` | string | Current/most recent version |
| `transitions` | object | Keys are version-pair strings (see below) |

---

## Transition Object Schema

```json
"1.1-to-2.0": {
  "fromVersion": "1.1",
  "toVersion": "2.0",
  "fromReleaseDate": "2018-04-16",
  "toReleaseDate": "2024-02-26",
  "summary": {
    "added": 18,
    "removed": 10,
    "modified": 42,
    "restructured": 6,
    "totalFrom": 108,
    "totalTo": 106,
    "highlights": [
      "Added new Govern (GV) function — the first new function since CSF 1.0",
      "Expanded scope beyond critical infrastructure to all organizations",
      "Introduced Implementation Examples for each subcategory",
      "Updated Informative References to current standards"
    ]
  },
  "changes": [ ... array of Change objects ... ]
}
```

### Transition Field Definitions

| Field | Type | Description |
|---|---|---|
| `fromVersion` | string | Source version |
| `toVersion` | string | Destination version |
| `fromReleaseDate` | string | ISO date of source version release |
| `toReleaseDate` | string | ISO date of destination version release |
| `summary.added` | number | Count of new controls/requirements added |
| `summary.removed` | number | Count of controls/requirements removed |
| `summary.modified` | number | Count of controls/requirements with changed text |
| `summary.restructured` | number | Count of controls moved or renumbered (same content, new location) |
| `summary.totalFrom` | number | Total control count in source version |
| `summary.totalTo` | number | Total control count in destination version |
| `summary.highlights` | array | 3–6 plain-English bullets describing the most important changes |
| `changes` | array | List of individual change objects |

---

## Change Object Schema

```json
{
  "id": "change-nist-csf-1.1-2.0-001",
  "type": "added",
  "category": "new-function",
  "controlId": {
    "new": "GV.OC-01"
  },
  "title": "New Govern (GV) Function",
  "area": "GV — Govern",
  "oldText": null,
  "newText": "Organizational cybersecurity risk strategy, expectations, and policy are established, communicated, and monitored.",
  "rationale": "NIST added Govern to reflect that cybersecurity risk management must be integrated at the organizational strategy level, not just technical controls.",
  "significance": "high",
  "tags": ["new-function", "governance", "risk-management"]
}
```

### Change Object Field Definitions

| Field | Type | Description |
|---|---|---|
| `id` | string | Unique ID: `change-{framework-id}-{from}-{to}-{###}` |
| `type` | enum | `"added"`, `"removed"`, `"modified"`, `"restructured"`, `"renamed"` |
| `category` | string | Freeform grouping (e.g., "new-function", "clarification", "severity-change", "new-control") |
| `controlId.old` | string or null | Control/requirement ID in the source version |
| `controlId.new` | string or null | Control/requirement ID in the destination version |
| `title` | string | Short human-readable name for this change |
| `area` | string | The section/function/domain/clause this change belongs to |
| `oldText` | string or null | Full text from source version. `null` if control is new or if copyright restricts. |
| `newText` | string or null | Full text from destination version. `null` if control was removed or if copyright restricts. |
| `rationale` | string | Why NIST/PCI SSC/etc. made this change (from official documentation or best interpretation) |
| `significance` | enum | `"high"`, `"medium"`, `"low"` — affects sort order and visual treatment |
| `tags` | array | Free-form tags for filtering (e.g., "mfa", "encryption", "supply-chain") |

---

## Copyright Restrictions in Data

For restricted frameworks (ISO 27001, SOC 2), the data files follow the same schema but with specific constraints:

- `"copyright": "restricted-metadata-only"` or `"restricted-summary-only"`
- `"showFullText": false`
- All `oldText` and `newText` fields must be `null`
- `title` fields can contain control names (e.g., "5.23 Information security for use of cloud services")
- `rationale` can contain plain-English description of the change's purpose, but not the control text itself

Example for ISO 27001 restricted change:
```json
{
  "id": "change-iso-27001-2013-2022-045",
  "type": "added",
  "category": "new-control",
  "controlId": {
    "old": null,
    "new": "5.23"
  },
  "title": "5.23 Information security for use of cloud services",
  "area": "5 — Organizational Controls",
  "oldText": null,
  "newText": null,
  "rationale": "New control addressing the need for policies governing acquisition, use, management, and exit from cloud services — a gap in the 2013 standard that predated widespread cloud adoption.",
  "significance": "high",
  "tags": ["cloud", "new-control", "organizational"]
}
```

---

## STIG-Specific Schema Extensions

STIGs use the same base schema but the `controlId` field uses STIG-specific identifiers:

```json
{
  "id": "change-stigs-winserver2022-v2r1-v2r2-001",
  "type": "modified",
  "category": "severity-change",
  "controlId": {
    "old": "V-254239",
    "new": "V-254239"
  },
  "stigCheckId": "SV-254239r991589_rule",
  "title": "Windows Server 2022 must have the built-in Windows Defender Firewall enabled",
  "area": "Firewall Configuration",
  "severity": {
    "old": "CAT II",
    "new": "CAT I"
  },
  "oldText": "...",
  "newText": "...",
  "rationale": "Severity elevated to CAT I based on increased exploitation of disabled firewall configurations.",
  "significance": "high",
  "tags": ["firewall", "severity-change", "windows"]
}
```

STIG-specific additions:
- `stigCheckId` — the Rule ID (SV-######r######_rule format)
- `severity.old` / `severity.new` — CAT I, CAT II, or CAT III (severity level change tracking)

---

## Populating New Data

When adding a new framework version's changes, use the `add-framework-data` Claude skill (in `skills/add-framework-data/SKILL.md`). The skill will walk you through the process and output correctly structured JSON ready to drop into the appropriate file.

**Quick reference — common mistakes to avoid:**
- Don't skip `null` fields — they must be explicitly `null`, not omitted
- Keep `title` under 80 characters (used in compact list view)
- `significance: "high"` should be used sparingly — only for changes that meaningfully affect compliance posture
- For NIST CSF, include the full subcategory ID (e.g., GV.OC-01, not just OC-01)
- For PCI DSS, always include both old and new requirement numbers if a requirement was renumbered
