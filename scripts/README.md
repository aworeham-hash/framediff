# Auto-Pull Scripts

This folder will contain Python scripts for automatically detecting new framework versions, populated in Phase 4.

## Planned Scripts

| Script | Framework(s) | Method |
|---|---|---|
| `check_nist_csf.py` | NIST CSF | Monitor nist.gov/cyberframework page |
| `check_nist_800_53.py` | NIST SP 800-53 | GitHub API — watch usnistgov/oscal-content repo |
| `check_pci_dss.py` | PCI DSS | Monitor pcisecuritystandards.org/document_library page |
| `check_stigs.py` | All 15 STIGs | Download and hash-compare XCCDF ZIPs from DISA |
| `check_pcaob.py` | SOX / PCAOB | Monitor pcaobus.org RSS feed |
| `check_hipaa.py` | HIPAA | Monitor Federal Register API for HHS/HIPAA entries |
| `check_irs_4812.py` | IRS 4812 | Hash-compare IRS PDF at irs.gov/pub/irs-pdf/p4812.pdf |
| `notify.py` | All | Send email notification with detected changes |

## GitHub Actions Workflow
Scripts run weekly via GitHub Actions (`.github/workflows/check-framework-updates.yml`).
On detection of a change, the workflow creates a GitHub Issue with:
- Which framework updated
- What version was detected
- Link to source
- Draft JSON snippet if auto-parseable (NIST, STIGs)

## Running Locally
```bash
pip install requests beautifulsoup4 lxml
python scripts/check_stigs.py
```

## Build When
Phase 4. App needs to be fully working (Phase 3 complete) before automating updates.
