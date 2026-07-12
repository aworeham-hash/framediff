# Framework Coverage Guide

This document covers every framework in scope: versions, data sources, copyright status, and auto-pull feasibility. Reference this before adding data for any framework.

---

## Framework Priority Order

1. NIST CSF — best public data, highest demand, build first
2. NIST SP 800-53 — structured JSON on GitHub, near-trivial to add
3. PCI DSS — high commercial demand, free official summaries available
4. ISO 27001/27002 — very high demand but copyright-restricted
5. SOC 2 TSC — high demand, copyright-restricted
6. HIPAA — public law, easier data, federal/healthcare audience
7. SOX / PCAOB — public standards, finance/audit audience
8. IRS 4812 — niche but unique value for IRS contractor GRC work
9. STIGs — broad coverage, structured XML data, large audience

---

## NIST Cybersecurity Framework (CSF)

**ID:** `nist-csf`
**Copyright:** Public domain (US government work)
**Full text in app:** Yes

**Versions:**
| Version | Released | Key Change |
|---|---|---|
| 1.0 | February 2014 | Initial release — 5 Functions, 22 Categories, 98 Subcategories |
| 1.1 | April 2018 | Added Identity Management to Access Control; supply chain risk management; self-assessment guidance; authentication/identity clarifications |
| 2.0 | February 2024 | Added 6th Function (Govern); restructured from 98 to 106 Subcategories; expanded scope beyond critical infrastructure; new Implementation Examples; updated informative references |

**Data sources:**
- CSF 1.0: https://www.nist.gov/publications/framework-improving-critical-infrastructure-cybersecurity-version-10
- CSF 1.1 redline (shows changes from 1.0): https://www.nist.gov/system/files/documents/2018/04/16/csf-v1.1-ipd-redline-04-05-2018-final.pdf
- CSF 2.0: https://nvlpubs.nist.gov/nistpubs/CSWP/NIST.CSWP.29.pdf
- CSF 2.0 JSON reference: https://csrc.nist.gov/extensions/nudp/services/json/csf/download?olirID=...

**Auto-pull:** Check NIST CSF page for new publications. NIST also publishes CSF data in Excel format at https://www.nist.gov/cyberframework/csf-20-reference-tool

**Notes for data entry:** CSF is organized as Function → Category → Subcategory. When logging changes, use the full ID (e.g., GV.OC-01 for CSF 2.0, or PR.AC-1 for CSF 1.1).

---

## NIST SP 800-53

**ID:** `nist-sp800-53`
**Copyright:** Public domain (US government work)
**Full text in app:** Yes

**Versions:**
| Version | Released | Key Change |
|---|---|---|
| Rev 3 | August 2009 | First major standardized control catalog |
| Rev 4 | April 2013 | Added 8 new control families; expanded to 256 controls; added Program Management (PM) family |
| Rev 5 | September 2020 | Removed "federal" scope (applicable to all orgs); added 66 new controls; 3 controls consolidated; reorganized control baselines into SP 800-53B; added privacy controls integration; control families renumbered |

**Data sources:**
- Rev 5 JSON (machine-readable): https://github.com/usnistgov/oscal-content/tree/main/nist.gov/SP800-53
- Rev 4 PDF: https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-53r4.pdf
- Rev 5 PDF: https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-53r5.pdf
- Rev 4 → Rev 5 summary of changes (Appendix E of Rev 5 PDF): pages 430–460 of Rev 5 PDF

**Auto-pull:** NIST GitHub repo at https://github.com/usnistgov/oscal-content — watch for new commits to the SP800-53 directory. This is the cleanest auto-pull target in the entire project.

**Notes for data entry:** Controls use ID format: Family-## (e.g., AC-1, IA-5, SI-4). Rev 5 reorganized some control IDs. Map old IDs to new IDs where renamed.

---

## PCI DSS

**ID:** `pci-dss`
**Copyright:** PCI Security Standards Council — standard text is copyrighted. Summary of Changes documents are freely distributed.
**Full text in app:** No — show summaries and change metadata only. Link to pcisecuritystandards.org for full text.

**Versions:**
| Version | Released | Key Change |
|---|---|---|
| v3.0 | November 2013 | Clarifications to requirements 1, 2, 8, 11 |
| v3.1 | April 2015 | SSL/TLS migration requirements added |
| v3.2 | April 2016 | Multi-factor authentication expanded; PCI DSS compliance for service providers |
| v3.2.1 | May 2018 | Minor clarifications; last 3.x version |
| v4.0 | March 2022 | Major overhaul: customized approach introduced; 64 new requirements; MFA required for all CDE access; targeted risk analysis; enhanced phishing controls; stronger encryption standards |
| v4.0.1 | June 2024 | Clarifications only; no new requirements; corrected errata from v4.0 |

**Data sources:**
- PCI DSS Document Library: https://www.pcisecuritystandards.org/document_library/
- "Summary of Changes" PDFs: Published for every version transition — freely downloadable from the document library
- Key document: "PCI DSS v3.2.1 to v4.0 Summary of Changes" — 30 pages covering every change

**Auto-pull:** Monitor https://www.pcisecuritystandards.org/document_library/ for new document uploads. Hash the page or check Last-Modified headers. No API available.

**Notes for data entry:** Requirements use format: Req #.#.# (e.g., Req 8.3.6). v4.0 reorganized some requirement numbers. Always note old vs. new requirement ID when a requirement was moved.

---

## ISO 27001 / ISO 27002

**ID:** `iso-27001`
**Copyright:** International Organization for Standardization — full text is strictly copyrighted. ISO 27001 costs approximately $180 USD to purchase. ISO 27002 costs approximately $230 USD.
**Full text in app:** No — show structural and metadata changes only.

**What we CAN show (no copyright issue):**
- Total control count per version
- Control ID mapping (old ID → new ID)
- New control additions (by name and ID only, not text)
- Removed controls (by name and ID only)
- Annex A restructuring (how controls were reorganized into themes/domains)
- Version comparison statistics (added X, removed Y, renamed Z)
- Link to ISO store for full text

**Versions:**
| Version | Released | Key Change |
|---|---|---|
| ISO 27001:2005 | 2005 | Original standard; 11 control clauses, 133 controls |
| ISO 27001:2013 | 2013 | Reduced to 114 controls in 14 clauses; aligned with Annex SL; updated risk assessment approach |
| ISO 27001:2022 | October 2022 | Reduced back to 93 controls restructured into 4 themes (Organizational, People, Physical, Technological); 11 new controls added; 23 controls renamed; 57 controls merged into 24; new attribute tagging system |

**ISO 27001:2022 new controls (names only — do not reproduce descriptions):**
- 5.7 Threat intelligence
- 5.23 Information security for use of cloud services
- 5.30 ICT readiness for business continuity
- 6.8 Information security event reporting
- 7.4 Physical security monitoring
- 8.9 Configuration management
- 8.10 Information deletion
- 8.11 Data masking
- 8.12 Data leakage prevention
- 8.16 Monitoring activities
- 8.23 Web filtering
- 8.28 Secure coding

**Data sources:**
- ISO 27001:2022 overview (free, no control text): https://www.iso.org/standard/75652.html
- Community-published control mapping tables (widely available from consulting firms — verify accuracy): search "ISO 27001 2013 to 2022 mapping"
- BSI Group publishes a free transition guide summarizing structural changes

**Auto-pull:** Not possible — ISO does not have a public API or free document access. Monitor ISO's "what's new" pages manually. ISO standards update every 5+ years.

**Notes for data entry:** ISO 27001:2022 uses a new attribute system (Control type, Information security properties, Cybersecurity concepts, Operational capabilities, Security domains). Include the attributes in the data where possible.

---

## SOC 2 Trust Service Criteria (TSC)

**ID:** `soc2`
**Copyright:** American Institute of CPAs (AICPA) — copyrighted.
**Full text in app:** No — show Trust Service Category structure and point-of-focus changes only. Link to AICPA for full criteria.

**What we CAN show:**
- Trust Service Category structure changes
- Points of Focus added/removed (by name/number only)
- Common Criteria (CC) changes (additions, removals, renames)
- Additional Criteria for Availability, Confidentiality, Processing Integrity, Privacy changes
- Supplemental criteria additions

**Versions:**
| Version | Released | Key Change |
|---|---|---|
| Trust Service Principles (2009) | 2009 | Original 5 principles: Security, Availability, Processing Integrity, Confidentiality, Privacy |
| TSC 2016 | 2016 | Restructured to criteria-based vs. principles; introduced Common Criteria concept |
| TSC 2017 | December 2016 (effective 2017) | Updated for COSO 2013 alignment; restructured CC series; added CC9 series for risk mitigation |
| TSC 2022 updates | 2022 | Clarifications to CC6, CC7; new Points of Focus for cloud and SaaS environments |

**Data sources:**
- AICPA TSC 2017 overview: https://www.aicpa-cima.com/resources/landing/trust-services-criteria
- AICPA publishes free "at a glance" documents summarizing changes — check aicpa-cima.com

**Auto-pull:** Not possible (AICPA paywalls full documents). Monitor AICPA website for announcements.

---

## HIPAA

**ID:** `hipaa`
**Copyright:** US federal law — public domain.
**Full text in app:** Yes

**Key regulatory milestones:**
| Version | Effective | Key Change |
|---|---|---|
| HIPAA 1996 | August 1996 | Original act — privacy and portability requirements |
| Privacy Rule | April 2003 | 45 CFR Parts 160, 164 — patient rights, PHI protections |
| Security Rule | April 2005 | 45 CFR Part 164, Subpart C — administrative, physical, technical safeguards for ePHI |
| HITECH Act | February 2010 | Extended HIPAA to business associates; breach notification requirements; increased penalties |
| Omnibus Rule | March 2013 | Implemented HITECH changes; expanded BA liability; updated breach notification; new patient rights |
| Proposed Security Rule Update | March 2024 | HHS proposed significant Security Rule modernization — MFA requirements, encryption mandates, vulnerability scanning |

**Data sources:**
- HHS HIPAA for Professionals: https://www.hhs.gov/hipaa/for-professionals/index.html
- 45 CFR Part 164 (Security Rule text): https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-C/part-164
- Proposed Security Rule update (NPRM): Federal Register, March 7, 2024

**Auto-pull:** Monitor HHS.gov and Federal Register for new HIPAA rules. Federal Register has an API: https://www.federalregister.gov/api/v1/

**Notes for data entry:** HIPAA changes are regulatory (rule amendments), not numbered like control frameworks. Track by 45 CFR section number (e.g., §164.312(a)(1) - Access Control).

---

## SOX / PCAOB Auditing Standards

**ID:** `sox-pcaob`
**Copyright:** PCAOB standards are publicly available. SOX itself is US federal law.
**Full text in app:** Yes

**Key milestones:**
| Standard | Effective | Key Change |
|---|---|---|
| SOX Act 2002 | July 2002 | Section 302 (CEO/CFO certification); Section 404 (internal control reporting); Section 409 (real-time disclosure) |
| PCAOB AS 2 | June 2004 | First ICFR audit standard for auditors (replaced by AS 5) |
| PCAOB AS 5 | November 2007 | Replaced AS 2; risk-based approach; scalable for company size |
| PCAOB AS 2201 | December 2017 | Codified AS 5 (renumbered); no substantive change |
| PCAOB AS 2101 | 2017 | Planning the Audit — updated requirements |
| PCAOB QC 1000 | 2024 | New quality control standard — significant overhaul of CPA firm QC systems |

**Data sources:**
- PCAOB Standards: https://pcaobus.org/Standards/Auditing
- PCAOB AS 2201 (ICFR): https://pcaobus.org/Standards/Auditing/Pages/AS2201.aspx
- PCAOB RSS feed for new standard releases: https://pcaobus.org/news/rss

**Auto-pull:** PCAOB RSS feed is the most reliable auto-pull source in this category.

---

## IRS Publication 4812

**ID:** `irs-4812`
**Copyright:** US government work — public domain.
**Full text in app:** Yes

**About:** IRS Publication 4812 (Contractor Security Controls) defines security control requirements for contractors who access Federal Tax Information (FTI). It is based on NIST SP 800-53 but contains IRS-specific requirements and tailoring.

**Versions:** IRS revises 4812 periodically. Track by publication date on IRS.gov.

**Data sources:**
- IRS Publication 4812: https://www.irs.gov/pub/irs-pdf/p4812.pdf
- IRS SAFEGUARDS Program: https://www.irs.gov/privacy-disclosure/safeguards-program

**Auto-pull:** Check IRS.gov PDF hash for changes. Manual review of changes required.

**Notes:** This is a niche standard but uniquely valuable — no other tool covers IRS 4812 changes. GRC professionals doing IRS contractor work have zero good resources for this today.

---

## DISA STIGs

**ID:** `stigs`
**Copyright:** Public domain (DISA / US Department of Defense)
**Full text in app:** Yes

**About:** Security Technical Implementation Guides (STIGs) are DISA-published hardening guides for specific technology products. There are 500+ individual STIGs. This app covers the top 15 most commonly used.

**STIGs in Scope (Phase 3):**

| Product | STIG Title | Current Version Track |
|---|---|---|
| Windows Server 2019 | Windows Server 2019 STIG | Track V2Rx |
| Windows Server 2022 | Windows Server 2022 STIG | Track V2Rx |
| Windows 10 | Windows 10 STIG | Track V2Rx |
| Windows 11 | Windows 11 STIG | Track V1Rx |
| RHEL 8 | Red Hat Enterprise Linux 8 STIG | Track V1Rx |
| RHEL 9 | Red Hat Enterprise Linux 9 STIG | Track V1Rx |
| Ubuntu 20.04 | Canonical Ubuntu 20.04 LTS STIG | Track V1Rx |
| Ubuntu 22.04 | Canonical Ubuntu 22.04 LTS STIG | Track V1Rx |
| Cisco IOS XE | Cisco IOS XE Router NDM STIG | Track V1Rx |
| SQL Server 2019 | Microsoft SQL Server 2019 Instance STIG | Track V1Rx |
| SQL Server 2019 DB | Microsoft SQL Server 2019 Database STIG | Track V1Rx |
| Apache 2.4 | Apache Server 2.4 Unix STIG | Track V2Rx |
| IIS 10 | IIS 10.0 Server STIG | Track V2Rx |
| VMware ESXi 7 | VMware vSphere 7.0 ESXi STIG | Track V1Rx |
| Docker | Docker Enterprise 2.x Linux/Unix STIG | Track V2Rx |

**Data sources:**
- DISA STIG Library: https://public.cyber.mil/stigs/downloads/
- STIGs are published as ZIP files containing XCCDF XML
- Each STIG check has a Vulnerability ID (V-######) and Rule ID (SV-######)

**Auto-pull:** Compare XCCDF XML file hashes for each product. DISA updates STIGs quarterly. Changes include: new checks added (new V-IDs), removed checks, severity changes (CAT I/II/III), and check content updates.

**Notes for data entry:** STIG changes are tracked at the check level (V-ID). For each version transition, log: new V-IDs added, V-IDs removed, V-IDs with severity changes, V-IDs with updated check content.
