# IRS Publication 4812 — Data Notes

**Status:** Pending (Phase 3)
**Priority:** 8
**Copyright:** US government work — public domain
**Full text in app:** Yes

## About IRS 4812
Publication 4812 (Contractor Security Controls) defines security control requirements for contractors and agencies that receive and process Federal Tax Information (FTI). It is based on NIST SP 800-53 but contains IRS-specific tailoring, additional requirements, and restrictions.

This is a niche standard but uniquely valuable — there is essentially NO tool that documents IRS 4812 version changes. GRC professionals doing IRS contractor work (state agencies, tax software companies, municipalities processing FTI) currently have no good resource for this.

## Versions to Cover
IRS revises 4812 periodically. The version is indicated by the revision date on the document cover page. Track by revision date.

Current known versions:
- Publication 4812 (Rev. 9-2023) — most recent as of project start
- Earlier versions: check IRS.gov for prior versions

## Official Sources
- Current version: https://www.irs.gov/pub/irs-pdf/p4812.pdf
- IRS SAFEGUARDS Program: https://www.irs.gov/privacy-disclosure/safeguards-program
- IRS SAFEGUARDS SSR (System Security Review) requirements: related document on same page

## Control ID Format
IRS 4812 references NIST SP 800-53 control IDs directly (e.g., `AC-2`, `IA-5`). IRS-specific additions use a similar format or are called out as "IRS-specific requirements" in the document.

When logging changes, note:
- Whether the change is to a NIST 800-53 control implementation requirement
- Whether the change introduces a new IRS-specific control or restriction
- The NIST control ID plus any IRS suffix/modifier

## Auto-Pull Strategy
Check IRS.gov PDF hash monthly:
URL: https://www.irs.gov/pub/irs-pdf/p4812.pdf
If the PDF changes, download and parse for new requirements.

No API available — manual review required when a new version is detected.

## Key Audience
- State agencies that receive FTI from IRS
- Tax preparation software companies
- Municipalities that process FTI
- GRC/security teams supporting organizations in the IRS SAFEGUARDS program

## Data File
`irs-4812.json` — track by revision date rather than semantic version number.
