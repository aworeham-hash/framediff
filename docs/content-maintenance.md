# Content Maintenance Guide

How to keep FrameDiff current when frameworks release new versions.

---

## How to Know When a Framework Updates

### Auto-detected (Phase 4+)
Once GitHub Actions automation is in place, you'll get an email when changes are detected for:
- NIST CSF and SP 800-53 (NIST GitHub repo watch)
- DISA STIGs (DISA portal file hash check)
- PCAOB standards (RSS feed)

### Manual monitoring (required until Phase 4, and for restricted frameworks)
Check these sources monthly or set a browser bookmark folder:

| Framework | Where to Check | Frequency |
|---|---|---|
| NIST CSF | https://www.nist.gov/cyberframework | Quarterly |
| NIST SP 800-53 | https://github.com/usnistgov/oscal-content | Monthly |
| PCI DSS | https://www.pcisecuritystandards.org/document_library/ | Quarterly |
| ISO 27001/27002 | https://www.iso.org/standard/75652.html | Annually |
| SOC 2 TSC | https://www.aicpa-cima.com/resources/landing/trust-services-criteria | Annually |
| HIPAA | https://www.hhs.gov/hipaa/for-professionals/index.html | Monthly |
| PCAOB | https://pcaobus.org/Standards | Quarterly |
| IRS 4812 | https://www.irs.gov/pub/irs-pdf/p4812.pdf | Annually |
| STIGs | https://public.cyber.mil/stigs/downloads/ | Monthly (DISA updates quarterly) |

**Pro tip:** Subscribe to these mailing lists / alerts:
- NIST CSRC mailing list: https://csrc.nist.gov/email
- PCI SSC mailing list: https://www.pcisecuritystandards.org/subscribe/
- DISA STIG notifications: https://public.cyber.mil/stigs/

---

## When a New Framework Version Is Released

### Step 1 — Assess the scope
- Is this a minor revision (clarifications/errata) or a major version (structural changes)?
- Minor: might warrant a note in the existing transition, or a new minor transition entry
- Major: requires a full new transition object in the JSON data file

### Step 2 — Gather the official change documentation
Every major framework publishes some form of official change documentation:
- NIST: Official publication PDF includes a "Changes from Previous Version" appendix
- PCI DSS: Official "Summary of Changes" PDF from PCI SSC document library
- ISO 27001: ISO publishes a "what's new" document (sometimes requires purchase or partner access)
- STIGs: DISA includes a "Release Memo" in each STIG ZIP with a list of all changes

Download and save these to the framework's folder in `data/frameworks/<id>/sources/`.

### Step 3 — Use the Claude skill to structure the data
Open a new Claude session and invoke the `add-framework-data` skill. Paste in the official change documentation or the source URL. Claude will:
1. Parse the changes
2. Structure them into the correct JSON format per `data/schemas/framework-schema.json`
3. Assign types (added/removed/modified/restructured) and significance levels
4. Output JSON ready to copy into the data file

Review Claude's output against the original source document before saving.

### Step 4 — Update the JSON file
Add the new transition object to the framework's JSON file. Update:
- `versions` array (add the new version string)
- `latestVersion` field
- `transitions` object (add the new `"X.Y-to-X.Z"` key)
- `lastDataUpdate` field (today's date)

### Step 5 — Test in the app
- Run `npm run dev` locally
- Navigate to the framework in the sidebar
- Confirm the new version appears in the version picker
- Spot-check 5–10 individual changes against the official source document
- Confirm the summary counts are correct

### Step 6 — Deploy
Push to GitHub main. Vercel auto-deploys within 30 seconds.

---

## Data Quality Checklist

Before publishing any new transition data, verify:

- [ ] All change `type` values are accurate (added / removed / modified / restructured)
- [ ] `controlId.old` and `controlId.new` use the correct ID format for this framework
- [ ] `significance: "high"` is reserved for changes that genuinely affect compliance posture
- [ ] For restricted frameworks (ISO, SOC 2): `oldText` and `newText` are both `null`
- [ ] `summary.added`, `removed`, `modified`, `restructured` match the actual count of change objects
- [ ] `highlights` array has 3–6 bullets covering the most important changes
- [ ] `lastDataUpdate` is set to today's date
- [ ] `source` and `officialChangelogUrl` link to real, accessible URLs
- [ ] No typos in control IDs

---

## Handling Minor Revisions vs. Major Versions

**Minor revision (e.g., PCI DSS v4.0 → v4.0.1, or STIG V2R1 → V2R2):**
- Add a new transition entry (e.g., `"4.0-to-4.0.1"`)
- Add the new version to the `versions` array
- Minor revisions often have fewer than 20 changes — appropriate to capture all of them
- Note in `highlights` that this is an errata/clarification release

**Major version (e.g., NIST CSF 1.1 → 2.0, or PCI DSS v3.2.1 → v4.0):**
- Add a full transition entry
- Major versions may have 50–200+ individual changes — prioritize capturing all `"high"` significance changes; moderate significance can be batched
- Include a detailed `highlights` array covering the structural changes

---

## Batch Updates (When Multiple Frameworks Update at Once)

Occasionally multiple frameworks release new versions in a short window (common at year-end and during major threat landscape shifts). To handle multiple updates:
1. Create one data file update per framework (don't combine frameworks in one edit)
2. Use the `parse-framework-changes` skill to process source documents in batches
3. Test each framework independently before deploying
4. Consider releasing as a single "batch update" commit with a clear commit message: `data: add PCI DSS v4.0.1 and NIST SP 800-53 patch update`

---

## What to Do When a Framework is Discontinued or Superseded

Examples: NIST SP 800-53 Rev 4 being "retired" by Rev 5, or PCI DSS 3.x being sunset.

- Do NOT remove old data — GRC professionals frequently need to understand historical changes
- Mark the framework's `latestVersion` as the current active version
- Add a `"sunset"` field to the top-level object if applicable: `"sunset": { "date": "2024-03-31", "replacedBy": "v4.0" }`
- Add a UI note (handled in the app layer) indicating the version is no longer active
