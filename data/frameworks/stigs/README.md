# DISA STIGs — Data Notes

**Status:** Pending (Phase 3)
**Priority:** 9
**Copyright:** Public domain (DISA / US Department of Defense)
**Full text in app:** Yes

## Scope Decision
There are 500+ individual DISA STIGs. This app covers the top 15 most commonly deployed products. Additional STIGs can be added on request or based on user demand.

## Products in Scope

| Product | STIG Document Name | Version Tracking |
|---|---|---|
| Windows Server 2019 | Windows Server 2019 STIG | V2Rx (x = release #) |
| Windows Server 2022 | Windows Server 2022 STIG | V2Rx |
| Windows 10 | Windows 10 STIG | V2Rx |
| Windows 11 | Windows 11 STIG | V1Rx |
| RHEL 8 | Red Hat Enterprise Linux 8 STIG | V1Rx |
| RHEL 9 | Red Hat Enterprise Linux 9 STIG | V1Rx |
| Ubuntu 20.04 | Canonical Ubuntu 20.04 LTS STIG | V1Rx |
| Ubuntu 22.04 | Canonical Ubuntu 22.04 LTS STIG | V1Rx |
| Cisco IOS XE | Cisco IOS XE Router NDM STIG | V1Rx |
| SQL Server 2019 (Instance) | Microsoft SQL Server 2019 Instance STIG | V1Rx |
| SQL Server 2019 (Database) | Microsoft SQL Server 2019 Database STIG | V1Rx |
| Apache 2.4 | Apache Server 2.4 Unix STIG | V2Rx |
| IIS 10 | IIS 10.0 Server STIG | V2Rx |
| VMware ESXi 7 | VMware vSphere 7.0 ESXi STIG | V1Rx |
| Docker | Docker Enterprise 2.x Linux/Unix STIG | V2Rx |

## Official Sources
- DISA STIG Library (all STIGs): https://public.cyber.mil/stigs/downloads/
- STIG Viewer (DISA's free tool for reading STIGs): https://public.cyber.mil/stigs/srg-stig-tools/
- STIGs are published as ZIP files containing:
  - XCCDF XML (the actual STIG data — machine parseable)
  - Release Memo (PDF listing changes in this release)
  - Documentation

## STIG ID Format
Each STIG check has two IDs:
- **Vulnerability ID (V-ID):** `V-######` — persistent across releases (same check across versions)
- **Rule ID (SV-ID):** `SV-######r######_rule` — changes with each rule revision

When tracking changes between STIG releases, use V-ID as the stable identifier. The Rule ID suffix changes when the check content is updated.

## Change Types for STIGs
Unlike control frameworks, STIG changes are tracked at the individual check level:
- **New check added** (new V-ID): A new vulnerability check was added to this STIG
- **Check removed** (V-ID retired): A check was removed (vulnerability no longer applicable, or product feature removed)
- **Severity change** (V-ID exists, CAT changes): Same check, elevated or reduced from CAT I / II / III
- **Check content updated** (V-ID exists, new SV-ID suffix): Same vulnerability, updated check content/fix text

## Auto-Pull Strategy
DISA updates STIGs quarterly. Auto-pull approach:
1. Download current STIG ZIP files for all 15 products
2. Compare V-ID lists between current and previous version
3. For matching V-IDs: compare Rule ID suffix (new suffix = content change) and CAT level
4. Parse the Release Memo PDF for human-readable change summary
5. Create GitHub Issue with detected changes for review

DISA STIG download URL pattern: https://dl.dod.cyber.mil/wp-content/uploads/stigs/zip/U_<Product>_STIG.zip

## Data Structure Note
The STIG data JSON will have an additional nesting level — product selection before version comparison:
```json
{
  "id": "stigs",
  "products": {
    "windows-server-2022": {
      "name": "Windows Server 2022",
      "transitions": { "V2R1-to-V2R2": { ... } }
    }
  }
}
```
This is the only framework requiring this structure. The UI will show a product picker within the STIGs section.

## XCCDF XML Parsing
DISA STIGs in XCCDF format are well-structured XML. Key elements:
- `<Group id="V-######">` — wraps each vulnerability
- `<Rule severity="medium">` — check severity (maps to CAT II)
- `<title>` — short title
- `<description>` — full vulnerability description
- `<fixtext>` — remediation guidance
- `<check>` — how to verify compliance

The `parse-framework-changes` Claude skill can parse XCCDF XML when given the file path.
