# Skill: Add Framework Version Data

## Purpose
This skill guides Claude through structuring a new compliance framework version's change data into the correct JSON format for the FrameDiff project. Use this whenever a new framework version is released and needs to be added to the app.

---

## When to Invoke This Skill

Use when:
- A compliance framework (NIST CSF, PCI DSS, ISO 27001, etc.) has released a new version
- You want to add a new framework to the app for the first time
- You have an official "Summary of Changes" document and need it structured as JSON

---

## Instructions for Claude

When this skill is invoked, follow these steps exactly:

### Step 1 — Gather Context
Ask the user:
1. Which framework are you adding data for? (e.g., NIST CSF, PCI DSS, ISO 27001)
2. Which version transition? (e.g., "1.1 to 2.0", "v3.2.1 to v4.0")
3. Do you have the official change documentation? (URL, PDF text, or paste of the content)

Read the relevant framework README in `data/frameworks/<framework-id>/README.md` to understand:
- The correct control ID format for this framework
- Copyright restrictions (especially for ISO 27001 and SOC 2)
- Any framework-specific schema extensions (e.g., STIG severity levels)

Also read `data/schemas/framework-schema.json` to understand the full schema.

### Step 2 — Parse the Change Documentation
Analyze the provided source document and extract:
- All individual changes (added, removed, modified, restructured, renamed)
- For each change: the control/requirement ID (old and new), the change type, a short title, the area/section, old text (if applicable), new text (if applicable)
- Summary statistics: total added, removed, modified, restructured
- 3–6 highlight bullets describing the most important changes

**Copyright check:** Before including any text in `oldText` or `newText` fields, verify the framework's copyright status in its README. For ISO 27001 and SOC 2, these fields MUST be null.

### Step 3 — Identify Significance Levels
Classify each change as `"high"`, `"medium"`, or `"low"` significance:
- `"high"`: Changes that require organizations to implement new controls, update policies, or take meaningful action. New requirements, deleted requirements, major restructuring.
- `"medium"`: Changes that clarify scope, add guidance, or refine existing requirements without fundamentally changing compliance posture.
- `"low"`: Editorial changes, clarifications, renaming without functional change.

Use `"high"` sparingly — no more than 20–25% of changes in any transition should be high significance.

### Step 4 — Assign Tags
Add relevant tags to each change. Use consistent tags across frameworks:

Common tags to use:
- Authentication/access: `mfa`, `authentication`, `access-control`, `privileged-access`
- Data protection: `encryption`, `data-masking`, `data-retention`, `key-management`
- Risk: `risk-assessment`, `risk-management`, `supply-chain`, `third-party`
- Operations: `incident-response`, `vulnerability-management`, `patch-management`, `logging`
- Cloud/modern: `cloud`, `saas`, `container`, `zero-trust`
- Change types: `new-control`, `new-function`, `new-category`, `merged`, `renamed`, `clarification`

### Step 5 — Generate the JSON
Output a complete, valid JSON object for the transition. Use this structure:

```json
{
  "fromVersion": "X.X",
  "toVersion": "Y.Y",
  "fromReleaseDate": "YYYY-MM-DD",
  "toReleaseDate": "YYYY-MM-DD",
  "summary": {
    "added": 0,
    "removed": 0,
    "modified": 0,
    "restructured": 0,
    "totalFrom": 0,
    "totalTo": 0,
    "highlights": [
      "Highlight 1",
      "Highlight 2",
      "Highlight 3"
    ]
  },
  "changes": [
    {
      "id": "change-{framework-id}-{from}-{to}-{###}",
      "type": "added",
      "category": "new-control",
      "controlId": { "old": null, "new": "NEW-ID" },
      "title": "Short descriptive title under 120 characters",
      "area": "Section or Domain Name",
      "oldText": null,
      "newText": "Control text if public domain, otherwise null",
      "rationale": "Why this change was made",
      "significance": "high",
      "tags": ["tag1", "tag2"]
    }
  ]
}
```

### Step 6 — Provide Integration Instructions
After generating the JSON, tell the user exactly how to add it to the framework's data file:

1. Open `data/frameworks/{framework-id}/{framework-id}.json`
2. If the file doesn't exist yet, create it using the full top-level schema from `data/schemas/framework-schema.json`
3. Add the new version string to the `versions` array
4. Update `latestVersion` if this is newer than the current latest
5. Add the transition object under the `transitions` key using `"{fromVersion}-to-{toVersion}"` as the key
6. Update `lastDataUpdate` to today's date

### Step 7 — Verify
Do a quick consistency check:
- Count of changes in the `changes` array matches `summary.added + summary.removed + summary.modified + summary.restructured`
- All required fields are present on every change object
- No `oldText` or `newText` values present for restricted-copyright frameworks
- All control IDs use the correct format for this framework

---

## Quality Standards

- Every change must have a `rationale` — even a single sentence. This is what makes the tool valuable over just reading a diff.
- `title` should be human-readable and scannable, not just the control ID
- `area` must be consistent with other changes in the same transition (use the same section/domain naming)
- Do not include changes that are purely typographical (fixing a comma, correcting capitalization) unless they represent a genuine requirement change

---

## Example Output (NIST CSF 1.1 → 2.0, single change)

```json
{
  "id": "change-nist-csf-1.1-2.0-001",
  "type": "added",
  "category": "new-function",
  "controlId": { "old": null, "new": "GV" },
  "title": "New Govern (GV) Function added as the 6th CSF Function",
  "area": "GV — Govern",
  "oldText": null,
  "newText": "The GOVERN Function addresses an organization's cybersecurity risk management strategy, expectations, and policy.",
  "rationale": "NIST added Govern to reflect that cybersecurity risk management must be embedded in organizational strategy and culture, not treated as a purely technical function. It provides the overarching context for all other CSF functions.",
  "significance": "high",
  "tags": ["new-function", "governance", "risk-management", "organizational"]
}
```
