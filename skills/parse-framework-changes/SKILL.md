# Skill: Parse Framework Change Documents

## Purpose
This skill guides Claude through extracting structured change data from raw framework source documents — PDFs, XCCDF XML files, HTML pages, or pasted text. It outputs structured data ready to pass into the `add-framework-data` skill or paste directly into a JSON file.

---

## When to Invoke This Skill

Use when:
- You have a raw framework document (PDF text, XML, HTML, pasted content) and need it parsed into structured change data
- You're comparing two versions of a framework document directly and need Claude to identify what changed
- You want to extract a list of all controls/requirements from a framework document for baseline population
- You have a DISA STIG XCCDF XML file and need to extract check-level changes

---

## Instructions for Claude

### Step 1 — Identify the Document Type
Ask the user which of these they're providing:
1. **Official "Summary of Changes" document** — Published by the framework body listing what changed. Best source.
2. **Two version documents for comparison** — Claude will compare them directly to identify changes.
3. **DISA STIG XCCDF XML** — Structured XML, Claude will parse it systematically.
4. **Pasted text or URL** — Claude will fetch/parse and extract changes.

### Step 2 — Copyright Check
Before parsing, identify the framework and check its copyright status:
- Read `data/frameworks/<framework-id>/README.md` for copyright rules
- If ISO 27001 or SOC 2: flag immediately that `oldText` and `newText` must be null in the output
- For all other frameworks: full text extraction is OK

### Step 3 — Parse Based on Document Type

**For "Summary of Changes" PDFs (PCI DSS, NIST, etc.):**
- These documents list changes in tabular or bulleted format
- Extract: section/requirement reference, nature of change, old text (if shown), new text
- Identify whether each change is: new requirement, removed requirement, clarification/modification, restructuring
- Note any "future-dated" requirements and their effective dates

**For DISA STIG XCCDF XML:**
Parse the XML structure:
```xml
<Group id="V-######">
  <Rule id="SV-######r######_rule" severity="medium">
    <title>Check title</title>
    <description>Description text</description>
    <fixtext>Remediation steps</fixtext>
    <check>Check procedure</check>
  </Rule>
</Group>
```
Extract all V-IDs with their severity, title, and Rule ID. Compare against the prior version's V-IDs to identify:
- New V-IDs (added checks)
- Missing V-IDs (removed checks)
- Same V-ID but different Rule ID suffix (updated content)
- Same V-ID but different severity attribute (severity change)

**For two version documents:**
Do a systematic comparison:
1. Build a list of all controls/requirements in Version A (with IDs)
2. Build a list of all controls/requirements in Version B (with IDs)
3. Identify: in B but not A (added), in A but not B (removed), in both with different content (modified), same content but different ID (restructured/renamed)

**For pasted text:**
Extract whatever change information is present. Note if the source appears incomplete or ambiguous.

### Step 4 — Output Format
Output a structured list of changes in this intermediate format (before full JSON):

```
FRAMEWORK: [name]
TRANSITION: [fromVersion] → [toVersion]
SOURCE: [document name/URL]
TOTAL CHANGES FOUND: [#]

--- ADDED (# total) ---
[ID]: [Title]
  Area: [section]
  New text: [text or "RESTRICTED"]
  Rationale: [why]

--- REMOVED (# total) ---
[ID]: [Title]
  Area: [section]
  Old text: [text or "RESTRICTED"]
  Rationale: [why removed]

--- MODIFIED (# total) ---
[Old ID] → [New ID]: [Title]
  Area: [section]
  Old text: [text or "RESTRICTED"]
  New text: [text or "RESTRICTED"]
  Nature of change: [what specifically changed]
  Rationale: [why]

--- RESTRUCTURED (# total) ---
[Old ID] → [New ID]: [Title]
  Area: [section]
  Note: [Content unchanged, moved to new location]
```

### Step 5 — Flag Ambiguities
Note any cases where:
- A change's type is ambiguous (is it a modification or a restructuring?)
- The source document doesn't make the intent clear
- Multiple interpretations are possible
- The framework-specific ID format differs from what you expected

### Step 6 — Hand Off to add-framework-data Skill
After parsing, tell the user:
"The parsed change list above is ready. To convert this to final JSON format and add it to the project, invoke the `add-framework-data` skill with this data as input."

---

## XCCDF XML Quick Reference

Severity mapping:
- `severity="high"` → CAT I (most critical)
- `severity="medium"` → CAT II
- `severity="low"` → CAT III

Version identification in XCCDF:
- `<Benchmark>` element has a `version` attribute and child `<plain-text id="release-info">` showing the version/release
- Example: `<plain-text id="release-info">Release: 2 Benchmark Date: 23 Jan 2025</plain-text>` = V1R2

---

## Example: Parsing a PCI DSS Summary of Changes

If the user provides the PCI DSS v3.2.1 to v4.0 Summary of Changes PDF text:

1. Identify the table format (PCI SSC uses a structured table with columns: Requirement, Change, Reasoning)
2. Extract each row as a change object
3. Map PCI DSS change types ("Clarification", "Additional guidance", "Evolving requirement", "New requirement") to FrameDiff types (modified, modified, modified, added)
4. Note requirement numbers carefully — v4.0 renumbered some requirements
5. Flag the 51 "future-dated" requirements with their March 31, 2025 effective date in the rationale

---

## Tips for Better Parsing

- When given a URL, fetch the page and look for a linked PDF or structured change table
- For NIST publications, the "Changes from Previous Version" appendix is usually the last 20–30 pages — focus there
- If the document is very long (100+ pages), ask the user to paste just the changes section
- For ISO 27001, the official "Annex A mapping" tables published by BSI Group and other certification bodies are the most reliable source for structural change data
- Always verify totals: if a document says "X requirements were added," your extracted list should have X added items
