// NIST SP 800-53 Rev 5 — per-control evidence guidance (base controls).
// Each control: what the evidence must demonstrate + 2-3 concrete screenshot
// examples across common stacks so at least one applies to your environment.
// Enhancements (e.g., AC-6(1)) inherit the base control guidance scoped to the
// enhancement condition. Examples are illustrative; assessors determine sufficiency.

export const SP80053_EVIDENCE = [
  // ══ AC: Access Control ══════════════════════════════════════════════
  { id: "AC-1", name: "Policy and Procedures", what: "An approved, current access control policy that is actually disseminated.",
    examples: [
      "SharePoint/Confluence policy page showing the Access Control Policy with version number, owner, approval date, and last-reviewed date within the past year.",
      "Document management system (e.g., PolicyTech, Drata policy module) showing the approval workflow completed with the approver name and timestamp.",
      "The intranet or LMS screen where employees acknowledge the policy, with the acknowledgment completion report." ] },
  { id: "AC-2", name: "Account Management", what: "Accounts are requested, approved, provisioned, reviewed, and disabled through a controlled lifecycle.",
    examples: [
      "Microsoft Entra ID → Users blade filtered to a sample account, side-by-side with the Jira/ServiceNow provisioning ticket showing manager approval before the creation date.",
      "Okta → Directory → People showing lifecycle state, plus the completed quarterly access review in your IGA tool (SailPoint, Vanta access review export) with reviewer sign-off.",
      "Active Directory Users and Computers showing a disabled account for a departed employee with the disable date matching the HR termination date." ] },
  { id: "AC-3", name: "Access Enforcement", what: "The system actually blocks access that policy says should be blocked.",
    examples: [
      "An access-denied error shown to a test user without the role, next to the application role-assignment page proving the permission matrix is enforced.",
      "AWS IAM policy simulator output showing a deny for an action outside the user's role.",
      "NTFS/SharePoint permissions page for a sensitive folder showing only the authorized group, plus a denied-access audit log entry." ] },
  { id: "AC-4", name: "Information Flow Enforcement", what: "Data flows between network zones or systems are restricted by policy, default-deny.",
    examples: [
      "AWS Security Group / Azure NSG rule list for the boundary showing specific allowed flows and an implicit or explicit deny-all at the bottom.",
      "Palo Alto/Fortinet firewall policy table for the zone pair (e.g., DMZ→internal) showing only approved services, with the hit-count column proving enforcement.",
      "DLP policy page (Microsoft Purview, Zscaler) showing rules that block sensitive data leaving approved channels, plus one blocked-transfer incident." ] },
  { id: "AC-5", name: "Separation of Duties", what: "No single person can both request and approve, or develop and deploy, sensitive actions.",
    examples: [
      "ServiceNow/Jira workflow configuration showing the approval step assigned to a different group than the requester.",
      "GitHub/GitLab branch protection settings requiring review by someone other than the author before merge to production.",
      "ERP role-conflict report (SAP GRC, NetSuite roles) showing no user holds both create-vendor and approve-payment roles." ] },
  { id: "AC-6", name: "Least Privilege", what: "Privileged access is limited to named, justified individuals and regular users have no admin rights.",
    examples: [
      "Entra ID → Roles and administrators → Global Administrator member list (short, named accounts only), plus the completed privileged access review.",
      "Intune/Jamf policy report showing standard users are not local administrators across the fleet.",
      "AWS IAM credential report or Identity Center assignments showing admin permission sets mapped only to the platform team group." ] },
  { id: "AC-7", name: "Unsuccessful Logon Attempts", what: "Accounts lock or throttle after the defined number of failed attempts.",
    examples: [
      "Group Policy → Account Lockout Policy showing threshold and duration values matching your standard.",
      "Entra ID Smart Lockout settings page (lockout threshold/duration), plus a sign-in log entry showing an account lockout event.",
      "Okta → Security → Authentication policy showing the lockout setting, with a System Log entry of a locked account." ] },
  { id: "AC-8", name: "System Use Notification", what: "Users see the approved banner before or at sign-in.",
    examples: [
      "The actual logon screen displaying the banner text (Windows interactive logon message, VPN portal, or SSH banner).",
      "The GPO setting Interactive logon: Message text for users attempting to log on, showing the configured text.",
      "Entra ID/Okta sign-in page customization or terms-of-use screen requiring acceptance before first access." ] },
  { id: "AC-9", name: "Previous Logon Notification", what: "Users are shown their last successful (and failed, if required) logon.",
    examples: [
      "An application session screen showing last successful login date/time after authentication.",
      "Linux /etc/pam.d configuration enabling pam_lastlog with a terminal screenshot of the Last login line." ] },
  { id: "AC-10", name: "Concurrent Session Control", what: "The number of simultaneous sessions per user is limited where required.",
    examples: [
      "VPN/VDI profile (GlobalProtect, Citrix policy) showing the maximum concurrent sessions value.",
      "Application session-management configuration limiting concurrent logins, plus a rejected second-session message." ] },
  { id: "AC-11", name: "Device Lock", what: "Devices lock after the defined idle period and require re-authentication.",
    examples: [
      "Intune configuration profile → Device restrictions showing maximum minutes of inactivity and password-on-wake, with the per-device compliance report.",
      "GPO → Interactive logon: Machine inactivity limit set to your standard (e.g., 900 seconds).",
      "Jamf configuration profile showing screen saver idle time and require-password settings for macOS fleet." ] },
  { id: "AC-12", name: "Session Termination", what: "Sessions end automatically at timeout or defined conditions.",
    examples: [
      "Application or SSO session lifetime settings (Entra ID Conditional Access sign-in frequency, Okta session policy) showing the configured limit.",
      "VPN idle-timeout configuration plus a log entry showing an idle session disconnected.",
      "Database or admin console session timeout parameter (e.g., SSH ClientAliveInterval, RDS idle timeout)." ] },
  { id: "AC-14", name: "Permitted Actions Without Identification or Authentication", what: "Anything reachable without login is explicitly identified and justified.",
    examples: [
      "The SSP section listing unauthenticated actions (often only the public website and status page), with justification.",
      "A browser screenshot of the application root while signed out, showing only the login page is reachable." ] },
  { id: "AC-16", name: "Security and Privacy Attributes", what: "Information carries classification labels that drive handling.",
    examples: [
      "Microsoft Purview sensitivity label policy page plus a document showing an applied label in the Office ribbon.",
      "Google Workspace Drive labels configuration and a labeled file, with the sharing restriction the label enforces." ] },
  { id: "AC-17", name: "Remote Access", what: "Remote access uses approved, encrypted, MFA-protected methods only.",
    examples: [
      "VPN gateway configuration (AnyConnect/GlobalProtect) showing TLS/IPsec settings and the MFA integration page.",
      "Entra ID Conditional Access policy requiring MFA and compliant device for access from outside trusted locations, in the enabled state.",
      "ZTNA (Zscaler ZPA, Cloudflare Access) application policy showing identity plus device-posture requirements." ] },
  { id: "AC-18", name: "Wireless Access", what: "Wireless uses strong authentication/encryption and guest traffic is isolated.",
    examples: [
      "Wireless controller (Meraki/Aruba) SSID configuration showing WPA2/WPA3-Enterprise with 802.1x/RADIUS.",
      "Guest network VLAN/firewall rule showing isolation from corporate subnets.",
      "NPS/RADIUS policy showing certificate or credential requirements for corporate Wi-Fi." ] },
  { id: "AC-19", name: "Access Control for Mobile Devices", what: "Mobile devices accessing org data are enrolled, encrypted, and wipeable.",
    examples: [
      "Intune/Jamf compliance policy (PIN required, encryption on, jailbreak blocked) with the fleet compliance dashboard.",
      "MDM remote-wipe action log for a lost device, or app-protection policy screen (Intune MAM) blocking unmanaged apps from corporate data." ] },
  { id: "AC-20", name: "Use of External Systems", what: "Access to org data from external/unmanaged systems is governed and enforced.",
    examples: [
      "Conditional Access policy blocking or limiting downloads on unmanaged/BYOD devices, shown enabled.",
      "The external-system/BYOD policy section plus the CASB (Defender for Cloud Apps) session policy enforcing it.",
      "Terms of use for third parties before granting portal access, with acceptance records." ] },
  { id: "AC-21", name: "Information Sharing", what: "Sharing decisions are authorized and technically controlled.",
    examples: [
      "SharePoint/OneDrive external sharing settings page showing the restricted mode (e.g., only specific domains).",
      "An approval record for an authorized external share plus the shared-link audit report." ] },
  { id: "AC-22", name: "Publicly Accessible Content", what: "Public content is reviewed so nonpublic information is never posted.",
    examples: [
      "The website content approval workflow (CMS draft→review→publish states) with an example approved page.",
      "A periodic review record of public sites plus a public-bucket scan (S3 public access blocked at the account level)." ] },
  { id: "AC-23", name: "Data Mining Protection", what: "Bulk extraction of protected data stores is detected or throttled.",
    examples: [
      "Database activity monitoring alert rule for anomalous row counts/export volume with one fired example.",
      "SaaS export controls (Salesforce report export restrictions) or DLP alert on mass download." ] },
  { id: "AC-24", name: "Access Control Decisions", what: "Access decisions are made by a defined authority/policy point before access.",
    examples: [
      "Policy engine (Entra Conditional Access, OPA rules repo) showing centralized decision policies applied to in-scope apps.",
      "Architecture diagram identifying the PDP/PEP split for the application." ] },
  { id: "AC-25", name: "Reference Monitor", what: "A tamper-resistant, always-invoked mechanism mediates access where claimed.",
    examples: [
      "SSP architecture section identifying the enforcing kernel/hypervisor (e.g., SELinux enforcing mode screenshot).",
      "getenforce output / SELinux status page showing Enforcing on in-scope systems." ] },

  // ══ AT: Awareness and Training ══════════════════════════════════════
  { id: "AT-1", name: "Policy and Procedures", what: "An approved training policy defining audiences, content, and frequency.",
    examples: [
      "The training policy with approval/review dates and the training matrix (role → required course → frequency).",
      "LMS admin page showing the assigned training campaigns matching the policy cadence." ] },
  { id: "AT-2", name: "Literacy Training and Awareness", what: "Everyone completes security awareness training on schedule, including phishing awareness.",
    examples: [
      "KnowBe4/Proofpoint LMS completion report for the period showing completion percentage and dates for all active staff.",
      "A phishing simulation campaign summary (sent/clicked/reported) with follow-up training assigned to clickers.",
      "New-hire onboarding checklist showing security training completed before or shortly after access grant." ] },
  { id: "AT-3", name: "Role-Based Training", what: "People in security-relevant roles get role-specific training.",
    examples: [
      "Secure-coding course completion report for the developer group (e.g., Secure Code Warrior dashboard).",
      "Admin/incident-responder specialized training certificates mapped to the role roster.",
      "Cloud security training records for the platform team with dates." ] },
  { id: "AT-4", name: "Training Records", what: "Training completion is recorded and retained.",
    examples: [
      "LMS record for one employee showing full course history with completion dates.",
      "The retention setting or archived exports proving records are kept for the policy period." ] },
  { id: "AT-6", name: "Training Feedback", what: "Training effectiveness is measured and fed back.",
    examples: [
      "Post-course survey results dashboard with an improvement action taken.",
      "Phishing click-rate trend chart across campaigns showing measurement over time." ] },

  // ══ AU: Audit and Accountability ════════════════════════════════════
  { id: "AU-1", name: "Policy and Procedures", what: "An approved logging policy defining events, retention, review, and protection.",
    examples: [
      "The logging standard with approval/review dates listing required event categories per system type.",
      "SIEM onboarding runbook showing the required log sources checklist." ] },
  { id: "AU-2", name: "Event Logging", what: "The organization-defined event types are actually being logged.",
    examples: [
      "Windows Advanced Audit Policy GPO (or auditpol /get output) showing required categories enabled (logon, account management, policy change).",
      "AWS CloudTrail settings page showing management (and required data) events on for all regions.",
      "Linux auditd rules file or Entra ID diagnostic settings exporting sign-in/audit logs to the SIEM." ] },
  { id: "AU-3", name: "Content of Audit Records", what: "Records contain who, what, when, where, and outcome.",
    examples: [
      "A sample SIEM event expanded to show timestamp, source system, user, event type, and success/failure fields.",
      "Application log schema documentation plus one real (sanitized) record demonstrating the fields." ] },
  { id: "AU-4", name: "Audit Log Storage Capacity", what: "Log storage is sized and monitored so records are not lost.",
    examples: [
      "Splunk/Sentinel ingestion and storage utilization dashboard with alert thresholds below capacity.",
      "S3/log-archive lifecycle configuration showing sufficient retention capacity for the policy period." ] },
  { id: "AU-5", name: "Response to Audit Logging Process Failures", what: "Someone is alerted when logging breaks.",
    examples: [
      "SIEM health alert rule for a silent log source (no events in N hours) with a resolved example alert.",
      "CloudTrail/GuardDuty alert on trail stopped or logging configuration change." ] },
  { id: "AU-6", name: "Audit Record Review, Analysis, and Reporting", what: "Logs are actually reviewed and findings escalate.",
    examples: [
      "A triaged SIEM alert with analyst notes, disposition, and escalation ticket link.",
      "The weekly/monthly log review record (checklist or dashboard review note) signed and dated.",
      "SOAR case timeline showing automated enrichment plus human review." ] },
  { id: "AU-7", name: "Audit Record Reduction and Report Generation", what: "You can search/filter/report on audit data without altering it.",
    examples: [
      "A saved SIEM search or dashboard used for investigations (screenshot of query and results).",
      "An investigation export/report generated from the log platform with its filter criteria visible." ] },
  { id: "AU-8", name: "Time Stamps", what: "Clocks are synchronized to an authoritative source.",
    examples: [
      "NTP configuration (w32tm /query /status output, chrony sources) pointing at approved sources.",
      "Domain controller PDC emulator time source setting plus two systems showing matching time." ] },
  { id: "AU-9", name: "Protection of Audit Information", what: "Logs cannot be modified or deleted by unauthorized users.",
    examples: [
      "SIEM RBAC page showing analysts have read-only roles and delete restricted to a break-glass admin.",
      "S3 Object Lock / immutable storage setting on the log archive bucket.",
      "Windows event log ACLs or forwarding to a WORM store, showing operators cannot clear logs." ] },
  { id: "AU-10", name: "Non-Repudiation", what: "Actions can be attributed to a specific individual and not plausibly denied.",
    examples: [
      "Unique named accounts enforced (no shared logins) with an audit trail sample tying an action to one person.",
      "Code signing / document signing configuration binding artifacts to individual identities." ] },
  { id: "AU-11", name: "Audit Record Retention", what: "Records are retained for the policy period.",
    examples: [
      "SIEM/index retention configuration page showing the retention value matching policy.",
      "A successful query returning records near the retention boundary (e.g., 11 months old)." ] },
  { id: "AU-12", name: "Audit Record Generation", what: "All in-scope systems generate the required records into the central capability.",
    examples: [
      "SIEM data-source inventory showing every in-scope system reporting with recent last-event timestamps.",
      "The log-onboarding tracker mapping systems to sources with gaps ticketed." ] },
  { id: "AU-13", name: "Monitoring for Information Disclosure", what: "You watch for organizational data exposed publicly.",
    examples: [
      "Dark-web/paste monitoring service alert (Have I Been Pwned domain report, threat intel service) with one triaged finding.",
      "Public cloud storage scan report showing zero public buckets, scheduled recurring." ] },
  { id: "AU-14", name: "Session Audit", what: "Privileged or high-risk sessions can be recorded/replayed where required.",
    examples: [
      "PAM (CyberArk/BeyondTrust) session recording list with one session entry opened.",
      "Bastion/jump-host session logging configuration (AWS SSM session logging to S3)." ] },
  { id: "AU-16", name: "Cross-Organizational Audit Logging", what: "Logging is coordinated with external providers.",
    examples: [
      "Cloud provider audit trail (CloudTrail, Azure Activity Log) integrated into your SIEM, shown as a connected source.",
      "Contract/agreement clause requiring provider log availability plus an example provider log pull." ] },

  // ══ CA: Assessment, Authorization, and Monitoring ═══════════════════
  { id: "CA-1", name: "Policy and Procedures", what: "An approved assessment/authorization policy with cadence.",
    examples: [
      "The assessment policy with approval/review dates and the annual assessment calendar.",
      "GRC tool (e.g., Drata, Hyperproof) control-assessment schedule configuration." ] },
  { id: "CA-2", name: "Control Assessments", what: "Controls are assessed on schedule by defined assessors.",
    examples: [
      "The latest internal assessment report cover (scope, dates, assessor) plus its findings table.",
      "External audit report cover (SOC 2, FedRAMP SAR) with period and firm.",
      "GRC platform screenshot showing control tests executed with dates and results." ] },
  { id: "CA-3", name: "Information Exchange", what: "Connections to external systems are documented and authorized.",
    examples: [
      "A signed ISA/MOU or data-sharing agreement for a connected external system showing data types and protections.",
      "The interconnection inventory listing each external connection with authorization dates." ] },
  { id: "CA-5", name: "Plan of Action and Milestones", what: "Weaknesses are tracked with owners and milestones until closed.",
    examples: [
      "The POA&M register showing an open item with owner, milestone dates, and source finding.",
      "A closed item showing completion date and link to remediation evidence.",
      "Jira security-findings board with SLA fields and status transitions." ] },
  { id: "CA-6", name: "Authorization", what: "A senior official formally accepts risk before operation.",
    examples: [
      "The signed ATO memo or internal go-live risk acceptance with the authorizing official name and date.",
      "The risk acceptance record in your GRC tool showing approver and expiry." ] },
  { id: "CA-7", name: "Continuous Monitoring", what: "Control and risk status is monitored on an ongoing basis, not just at audits.",
    examples: [
      "Continuous-control-monitoring dashboard (Drata/Vanta/Secureframe or SIEM compliance dashboard) showing live control checks.",
      "The monthly security metrics report distributed to leadership.",
      "Vulnerability trend dashboard demonstrating recurring measurement." ] },
  { id: "CA-8", name: "Penetration Testing", what: "Independent penetration tests happen on the defined cycle and findings are remediated.",
    examples: [
      "The latest pentest report cover page (firm, dates, scope) and findings summary table.",
      "Remediation tickets for high findings with closure dates, plus the retest confirmation." ] },
  { id: "CA-9", name: "Internal System Connections", what: "Internal connections between system components are authorized and documented.",
    examples: [
      "The system interconnection table in the SSP listing internal connections with approval entries.",
      "Network diagram plus change ticket authorizing a new internal integration." ] },

  // ══ CM: Configuration Management ════════════════════════════════════
  { id: "CM-1", name: "Policy and Procedures", what: "An approved CM policy covering baselines, change control, and inventory.",
    examples: [
      "The CM policy with approval/review dates.",
      "The change management procedure page showing CAB scope and emergency change path." ] },
  { id: "CM-2", name: "Baseline Configuration", what: "Systems are built from documented, current baselines.",
    examples: [
      "The golden image/AMI pipeline (Packer repo) with version tags and last-build date.",
      "Terraform/IaC repository for in-scope infrastructure showing reviewed merges as the source of truth.",
      "The approved hardening standard document (CIS benchmark adoption) referenced by build runbooks." ] },
  { id: "CM-3", name: "Configuration Change Control", what: "Changes are proposed, approved, tested, and recorded.",
    examples: [
      "A closed ServiceNow/Jira change ticket showing requester, independent approver, test evidence, and implementation date.",
      "GitHub PR for an infrastructure change showing required review approval and passing checks before merge.",
      "CAB meeting minutes listing the change with its approval decision." ] },
  { id: "CM-4", name: "Impact Analyses", what: "Security/privacy impact is analyzed before changes are approved.",
    examples: [
      "The completed security-impact-analysis field inside a real change ticket.",
      "PR template with the security impact section filled in on a merged change." ] },
  { id: "CM-5", name: "Access Restrictions for Change", what: "Only authorized people can change production.",
    examples: [
      "Branch protection rules (no direct pushes, required reviews) for production repos.",
      "Production deployment group membership (small, named) in the CD tool (Octopus/ArgoCD RBAC).",
      "Change-window enforcement or prod DB access restricted to break-glass with logging." ] },
  { id: "CM-6", name: "Configuration Settings", what: "Systems match the approved hardening settings; deviations are documented.",
    examples: [
      "CIS-CAT / Intune security baseline / AWS Config conformance pack results showing compliance percentage for in-scope systems.",
      "One system compliance detail page showing pass/fail per setting.",
      "The documented deviation list with risk acceptance for intentional exceptions." ] },
  { id: "CM-7", name: "Least Functionality", what: "Unnecessary services, ports, and software are disabled or removed.",
    examples: [
      "An nmap/port scan of a sample server showing only expected ports open.",
      "Application allowlisting policy (WDAC/AppLocker) in enforce mode with its event log.",
      "Baseline config showing disabled services list applied (e.g., systemctl list showing masked services)." ] },
  { id: "CM-8", name: "System Component Inventory", what: "A complete, current inventory of in-scope components exists.",
    examples: [
      "CMDB or asset platform (ServiceNow, Lansweeper) filtered to the boundary showing owner and last-seen for each asset.",
      "EDR console device list vs directory count reconciliation showing coverage.",
      "AWS Config resource inventory or tagging report for in-scope accounts." ] },
  { id: "CM-9", name: "Configuration Management Plan", what: "A CM plan defines roles, processes, and tools.",
    examples: [
      "The CM plan document with roles/responsibilities and revision history.",
      "The SSP CM section referencing the tools actually in use." ] },
  { id: "CM-10", name: "Software Usage Restrictions", what: "Software is used within license terms and policy.",
    examples: [
      "Software asset management report (license counts vs installs).",
      "Policy prohibiting unauthorized copying/P2P plus endpoint enforcement of blocked categories." ] },
  { id: "CM-11", name: "User-Installed Software", what: "User installs are prohibited or governed.",
    examples: [
      "Intune/Jamf restriction blocking user app installs, with compliance status.",
      "Local admin rights removal report (e.g., AdminByRequest dashboard) plus the exception approval flow.",
      "Company Portal/Self Service catalog as the only sanctioned install path." ] },
  { id: "CM-12", name: "Information Location", what: "You know where in-scope data lives and control processing location.",
    examples: [
      "The data inventory/map listing systems, storage locations, and regions for in-scope data.",
      "Purview/BigID data discovery scan results confirming locations match the map.",
      "Cloud region policy (Azure Policy allowed-locations) in enforce mode." ] },
  { id: "CM-13", name: "Data Action Mapping", what: "Processing actions on PII are mapped end to end.",
    examples: [
      "The record of processing activities (RoPA) entry for the system showing collection→use→sharing→retention.",
      "A data-flow diagram for PII with processing purposes annotated." ] },
  { id: "CM-14", name: "Signed Components", what: "Only signed/verified software and firmware is installed where required.",
    examples: [
      "WDAC/code-integrity policy requiring signed binaries, with a blocked-unsigned event.",
      "Package repository configuration enforcing signature verification (apt/yum gpgcheck=1).",
      "Secure Boot enabled status report across the fleet from endpoint management." ] },

  // ══ CP: Contingency Planning ════════════════════════════════════════
  { id: "CP-1", name: "Policy and Procedures", what: "An approved contingency policy with RTO/RPO expectations.",
    examples: [
      "The contingency/DR policy with approval/review dates and defined RTO/RPO per tier.",
      "The BIA summary assigning criticality tiers to systems." ] },
  { id: "CP-2", name: "Contingency Plan", what: "A current plan with roles and procedures exists for the system.",
    examples: [
      "The DR plan cover and revision history with named roles and current contacts.",
      "The runbook for failover of the in-scope system with last-updated date." ] },
  { id: "CP-3", name: "Contingency Training", what: "People with contingency roles are trained.",
    examples: [
      "Training/attendance records for the DR team dated within the cycle.",
      "Exercise participation list demonstrating role familiarity." ] },
  { id: "CP-4", name: "Contingency Plan Testing", what: "The plan is tested and lessons feed back.",
    examples: [
      "The DR test/exercise report: date, scenario, results vs RTO/RPO, lessons learned.",
      "The plan changelog entry showing an update driven by test findings." ] },
  { id: "CP-6", name: "Alternate Storage Site", what: "Backups are stored at a geographically separated location.",
    examples: [
      "Backup platform replication settings (Veeam copy job, AWS Backup cross-region) showing the secondary location.",
      "S3 cross-region replication configuration for the backup bucket." ] },
  { id: "CP-7", name: "Alternate Processing Site", what: "A failover processing capability exists and is achievable in RTO.",
    examples: [
      "The standby environment (secondary region infrastructure) shown deployed, with the failover runbook.",
      "DR orchestration tool (Azure Site Recovery) replication health dashboard.",
      "Last failover exercise record with time-to-recover measured." ] },
  { id: "CP-8", name: "Telecommunications Services", what: "Comms/network services have redundancy for recovery.",
    examples: [
      "Dual-ISP/SD-WAN configuration showing both circuits active.",
      "Provider agreement showing priority-of-service or diverse-path provisions." ] },
  { id: "CP-9", name: "System Backup", what: "Backups of information and software occur per policy and are protected.",
    examples: [
      "Backup console job history showing successful scheduled jobs for in-scope systems.",
      "Backup encryption setting page plus access restriction on the backup repository.",
      "Immutability/air-gap configuration (Veeam hardened repo, S3 Object Lock) for ransomware resilience." ] },
  { id: "CP-10", name: "System Recovery and Reconstitution", what: "You can actually restore within objectives — proven by test.",
    examples: [
      "The completed restore-test record: item restored, date, integrity verification, and elapsed time vs RTO.",
      "A database point-in-time-restore exercise output with row-count/application validation." ] },
  { id: "CP-11", name: "Alternate Communications Protocols", what: "Alternate comms exist if primary fails.",
    examples: [
      "The out-of-band channel (Signal bridge, conference bridge) documented in the IR/DR plan with a test record.",
      "Status-page provider configuration independent of primary infrastructure." ] },
  { id: "CP-12", name: "Safe Mode", what: "The system can operate in a restricted safe mode when conditions require.",
    examples: [
      "Documented degraded-mode procedure (read-only mode flag) and the feature-flag configuration that enables it.",
      "An exercise record showing safe-mode activation and behavior." ] },
  { id: "CP-13", name: "Alternative Security Mechanisms", what: "Fallback security mechanisms exist for primary control failure.",
    examples: [
      "Break-glass account procedure with the sealed-credential/vault access log.",
      "Secondary authentication path (offline OTP) documented and tested." ] },

  // ══ IA: Identification and Authentication ═══════════════════════════
  { id: "IA-1", name: "Policy and Procedures", what: "An approved identification/authentication policy.",
    examples: [
      "The IdAM policy with approval/review dates covering MFA, passwords, and identity proofing.",
      "The authentication standard mapped to systems (which methods where)." ] },
  { id: "IA-2", name: "Identification and Authentication (Organizational Users)", what: "Users are uniquely identified and authenticate with MFA where required.",
    examples: [
      "Entra ID Conditional Access policy Require MFA for all users shown Enabled with excluded accounts justified.",
      "Okta authentication policy requiring MFA plus the MFA enrollment report showing coverage.",
      "Duo policy page for VPN/apps with enrollment status dashboard." ] },
  { id: "IA-3", name: "Device Identification and Authentication", what: "Devices authenticate before connecting where required.",
    examples: [
      "802.1x/NAC policy (ISE/ClearPass) requiring device certificates for LAN/Wi-Fi with an authenticated session log.",
      "Conditional Access requiring Entra hybrid joined / compliant device.",
      "mTLS configuration for service/device connections." ] },
  { id: "IA-4", name: "Identifier Management", what: "User/device identifiers are unique, managed, and not reused.",
    examples: [
      "The account naming standard plus directory query showing no duplicate identifiers.",
      "Deprovisioned account shown disabled/retained (not deleted and reissued) per policy." ] },
  { id: "IA-5", name: "Authenticator Management", what: "Passwords/keys/certificates meet policy across their lifecycle.",
    examples: [
      "Entra ID password protection settings (banned passwords, length) or fine-grained password policy.",
      "Secrets vault (1Password/HashiCorp) usage for shared/service credentials with access audit.",
      "Certificate inventory with expiry alerts; default credentials change verified on new systems." ] },
  { id: "IA-6", name: "Authentication Feedback", what: "Authentication feedback does not expose secrets.",
    examples: [
      "Login screen showing masked password entry.",
      "Generic invalid username or password error (no user enumeration)." ] },
  { id: "IA-7", name: "Cryptographic Module Authentication", what: "Cryptographic modules meet required validation (e.g., FIPS 140).",
    examples: [
      "FIPS mode enabled setting (Windows policy, RHEL fips=1) on in-scope systems.",
      "The CMVP certificate number documented for modules in use." ] },
  { id: "IA-8", name: "Identification and Authentication (Non-Organizational Users)", what: "External users are identified and authenticated appropriately.",
    examples: [
      "B2B/guest access configuration (Entra External ID) showing MFA required for guests.",
      "Customer IdP settings (Auth0/Cognito) showing password policy and MFA options enforced." ] },
  { id: "IA-9", name: "Service Identification and Authentication", what: "Services authenticate to each other.",
    examples: [
      "Managed identity / workload identity federation configuration for an in-scope integration (no static keys).",
      "mTLS or signed-JWT service auth configuration between microservices.",
      "API gateway requiring client credentials with the app registration page." ] },
  { id: "IA-10", name: "Adaptive Authentication", what: "Risk conditions trigger stronger authentication.",
    examples: [
      "Entra ID risk-based Conditional Access (sign-in risk → require MFA) shown enabled with a triggered sign-in log.",
      "Okta ThreatInsight/behavior detection policy with a step-up event." ] },
  { id: "IA-11", name: "Re-Authentication", what: "Users re-authenticate for sensitive actions or after time limits.",
    examples: [
      "PIM role activation prompting fresh MFA (activation log).",
      "Sign-in frequency policy for sensitive apps, or sudo re-auth timeout configuration." ] },
  { id: "IA-12", name: "Identity Proofing", what: "Identity is verified before credentialing, at the required assurance.",
    examples: [
      "Onboarding procedure step for ID verification plus a redacted completed verification record (HR I-9/ID check).",
      "Remote-hire video-verification procedure with a completion checklist entry." ] },

  // ══ IR: Incident Response ═══════════════════════════════════════════
  { id: "IR-1", name: "Policy and Procedures", what: "An approved IR policy with severity definitions and obligations.",
    examples: [
      "The IR policy with approval/review dates and severity matrix.",
      "Regulatory notification decision tree (who is notified when) as an appendix." ] },
  { id: "IR-2", name: "Incident Response Training", what: "Responders are trained for their roles.",
    examples: [
      "IR team training completion records within the cycle.",
      "On-call onboarding checklist including IR runbook walkthrough." ] },
  { id: "IR-3", name: "Incident Response Testing", what: "The IR capability is exercised.",
    examples: [
      "Tabletop exercise report with date, scenario, participants, and improvement actions.",
      "Purple-team/simulation exercise summary with detection gaps ticketed." ] },
  { id: "IR-4", name: "Incident Handling", what: "Incidents follow detection→containment→eradication→recovery with records.",
    examples: [
      "A closed incident ticket timeline showing each phase with timestamps and actions.",
      "EDR containment action log (host isolated) linked to the incident record.",
      "Post-incident review document with root cause and follow-ups." ] },
  { id: "IR-5", name: "Incident Monitoring", what: "Incidents are tracked and documented centrally.",
    examples: [
      "The incident register for the period with classification and status columns.",
      "SOAR/ticket dashboard showing incident volume and states." ] },
  { id: "IR-6", name: "Incident Reporting", what: "Incidents are reported internally and externally within required timeframes.",
    examples: [
      "The report-an-incident channel (portal/Slack workflow) plus an example submission.",
      "A regulator/customer notification record with the timeline showing the deadline met." ] },
  { id: "IR-7", name: "Incident Response Assistance", what: "Responders have access to help resources.",
    examples: [
      "IR retainer agreement cover with the provider and hotline.",
      "Internal escalation rota (PagerDuty schedule) for security." ] },
  { id: "IR-8", name: "Incident Response Plan", what: "A current, distributed IR plan exists.",
    examples: [
      "The IR plan cover with revision history, owner, and distribution list.",
      "Evidence of annual review (approval entry or change log)." ] },
  { id: "IR-9", name: "Information Spillage Response", what: "Spills of sensitive data into wrong systems are contained and cleaned.",
    examples: [
      "The spillage procedure plus a sanitized completed spill ticket (purge actions, notified parties).",
      "Purview/DLP incident showing detection and remediation of misplaced data." ] },

  // ══ MA: Maintenance ═════════════════════════════════════════════════
  { id: "MA-1", name: "Policy and Procedures", what: "An approved maintenance policy.",
    examples: [
      "The maintenance policy with approval/review dates.",
      "Maintenance authorization workflow documentation." ] },
  { id: "MA-2", name: "Controlled Maintenance", what: "Maintenance is approved, recorded, and equipment is sanitized off-site.",
    examples: [
      "A maintenance ticket showing approval before work and post-work verification.",
      "Sanitization record for a device sent for repair (drive removed/wiped)." ] },
  { id: "MA-3", name: "Maintenance Tools", what: "Maintenance tools are approved and inspected.",
    examples: [
      "The approved maintenance tool list.",
      "Record of scanning vendor media/tools before connection." ] },
  { id: "MA-4", name: "Nonlocal Maintenance", what: "Remote maintenance uses MFA, approval, and is logged/terminated.",
    examples: [
      "Vendor remote-access session record (time-boxed account, MFA) with session log.",
      "PAM vendor-access workflow showing approval and automatic expiry.",
      "Remote support tool audit log for a maintenance session." ] },
  { id: "MA-5", name: "Maintenance Personnel", what: "Only authorized (or escorted) personnel perform maintenance.",
    examples: [
      "The authorized maintenance personnel list.",
      "Escort log entry for an uncleared technician visit." ] },
  { id: "MA-6", name: "Timely Maintenance", what: "Support ensures critical components are maintained within defined times.",
    examples: [
      "Support contract page showing response/repair SLAs for critical hardware.",
      "Spares inventory or vendor SLA dashboard." ] },
  { id: "MA-7", name: "Field Maintenance", what: "Off-site maintenance is restricted to approved facilities.",
    examples: [
      "Policy restricting field maintenance plus an approved-facility authorization record." ] },

  // ══ MP: Media Protection ════════════════════════════════════════════
  { id: "MP-1", name: "Policy and Procedures", what: "An approved media protection policy.",
    examples: [
      "The media policy with approval/review dates covering marking→disposal." ] },
  { id: "MP-2", name: "Media Access", what: "Only authorized people can access sensitive media.",
    examples: [
      "Locked media safe/cabinet with its access list.",
      "Removable media technical restriction (USB blocked except approved) from endpoint policy." ] },
  { id: "MP-3", name: "Media Marking", what: "Media is marked with classification where required.",
    examples: [
      "A labeled backup tape/drive photo consistent with the marking standard.",
      "Digital label policy applied to removable volumes." ] },
  { id: "MP-4", name: "Media Storage", what: "Media is stored securely.",
    examples: [
      "The locked storage location photo/documentation with access list.",
      "Offsite storage vendor contract with security terms." ] },
  { id: "MP-5", name: "Media Transport", what: "Media in transit is protected and tracked.",
    examples: [
      "Chain-of-custody form for transported media with encryption noted.",
      "Courier tracking record tied to the media log." ] },
  { id: "MP-6", name: "Media Sanitization", what: "Media is sanitized before disposal/reuse with verification.",
    examples: [
      "Destruction certificates from the disposal vendor listing serials and dates.",
      "Internal wipe log (tool, method, verifier signature) per NIST SP 800-88 method.",
      "MDM remote-wipe confirmation for retired mobile devices." ] },
  { id: "MP-7", name: "Media Use", what: "Removable media use is restricted/controlled.",
    examples: [
      "Intune/GPO removable storage policy (block or BitLocker-To-Go required) with compliance status.",
      "EDR device-control events showing blocked unauthorized USB." ] },
  { id: "MP-8", name: "Media Downgrading", what: "Media is downgraded before release where classification requires.",
    examples: [
      "The downgrading procedure and a completed downgrade record, where applicable." ] },

  // ══ PE: Physical and Environmental Protection ═══════════════════════
  { id: "PE-1", name: "Policy and Procedures", what: "An approved physical security policy.",
    examples: [
      "The physical security policy with approval/review dates." ] },
  { id: "PE-2", name: "Physical Access Authorizations", what: "Access lists for controlled areas are authorized and current.",
    examples: [
      "The badge-system authorized list for the server room with issue dates.",
      "The periodic physical-access review record with removals actioned." ] },
  { id: "PE-3", name: "Physical Access Control", what: "Entry to controlled areas is enforced and logged.",
    examples: [
      "Badge reader configuration/photo for the controlled door plus an access log excerpt.",
      "For cloud-hosted scope: the provider SOC 2 report section on data center physical security with your review note.",
      "Server rack lock/cage documentation in a colo facility." ] },
  { id: "PE-4", name: "Access Control for Transmission Medium", what: "Cabling and network rooms are protected.",
    examples: [
      "Locked telecom/IDF closet with its access list.",
      "Facility diagram showing protected cable pathways." ] },
  { id: "PE-5", name: "Access Control for Output Devices", what: "Sensitive output devices are controlled.",
    examples: [
      "Badge-release (pull) printing configuration page.",
      "Printer placement in a controlled area with policy reference." ] },
  { id: "PE-6", name: "Monitoring Physical Access", what: "Physical access is monitored and reviewed.",
    examples: [
      "CCTV coverage of entry points with retention setting.",
      "Physical access log review record (monthly sign-off).",
      "Alarm system monitoring agreement." ] },
  { id: "PE-8", name: "Visitor Access Records", what: "Visitors are logged and records retained.",
    examples: [
      "Visitor management system (Envoy) log excerpt with sponsor and in/out times.",
      "Paper visitor log sample page for the facility." ] },
  { id: "PE-9", name: "Power Equipment and Cabling", what: "Power infrastructure is protected.",
    examples: [
      "Locked electrical room documentation.",
      "UPS/PDU placement in secured space." ] },
  { id: "PE-10", name: "Emergency Shutoff", what: "Emergency power shutoff exists and is protected.",
    examples: [
      "EPO button location/labeling photo near the computing area, protected by cover." ] },
  { id: "PE-11", name: "Emergency Power", what: "UPS/generator supports orderly shutdown or continuity.",
    examples: [
      "UPS runtime spec and the latest test record.",
      "Generator maintenance/test log entry." ] },
  { id: "PE-12", name: "Emergency Lighting", what: "Emergency lighting works.",
    examples: [
      "Emergency lighting test/inspection record." ] },
  { id: "PE-13", name: "Fire Protection", what: "Fire detection/suppression is present and inspected.",
    examples: [
      "Suppression system inspection certificate with date.",
      "Detection panel status photo for the room." ] },
  { id: "PE-14", name: "Environmental Controls", what: "Temperature/humidity are controlled and monitored.",
    examples: [
      "Environmental monitoring dashboard with alert thresholds.",
      "HVAC maintenance record for the server room." ] },
  { id: "PE-15", name: "Water Damage Protection", what: "Water damage risk is mitigated.",
    examples: [
      "Leak detection sensor placement/alerts.",
      "Master shutoff valve location documented and accessible." ] },
  { id: "PE-16", name: "Delivery and Removal", what: "Equipment entering/leaving is authorized and logged.",
    examples: [
      "Asset movement log with authorizations.",
      "Loading dock procedure and an example entry." ] },
  { id: "PE-17", name: "Alternate Work Site", what: "Remote work sites meet security requirements.",
    examples: [
      "Remote work policy plus endpoint compliance (disk encryption, VPN) report for remote users.",
      "Home-office security checklist acknowledgment records." ] },
  { id: "PE-18", name: "Location of System Components", what: "Components are positioned to reduce risk.",
    examples: [
      "Rack/room layout showing equipment away from hazards (windows, water lines)." ] },
  { id: "PE-19", name: "Information Leakage", what: "Emanation risk is addressed where applicable.",
    examples: [
      "Documented assessment of emanation risk (usually not applicable, with rationale)." ] },
  { id: "PE-20", name: "Asset Monitoring and Tracking", what: "Assets are tracked between locations where employed.",
    examples: [
      "Asset tag scanning log or GPS tracking record for transported equipment." ] },
  { id: "PE-21", name: "Electromagnetic Pulse Protection", what: "EMP protection where mission requires.",
    examples: [
      "EMP protection measures documentation for the critical facility, where applicable." ] },
  { id: "PE-22", name: "Component Marking", what: "Components are marked with handling caveats where required.",
    examples: [
      "Marked hardware photo consistent with the marking standard, where applicable." ] },
  { id: "PE-23", name: "Facility Location", what: "Facility siting considered hazards.",
    examples: [
      "Site risk assessment section covering flood/seismic/adjacency risks." ] },

  // ══ PL: Planning ════════════════════════════════════════════════════
  { id: "PL-1", name: "Policy and Procedures", what: "An approved planning policy.",
    examples: [
      "The planning policy with approval/review dates." ] },
  { id: "PL-2", name: "System Security and Privacy Plans", what: "A current SSP describes boundaries and control implementations.",
    examples: [
      "SSP cover and revision table showing the annual update.",
      "The system boundary diagram from the SSP matching current architecture." ] },
  { id: "PL-4", name: "Rules of Behavior", what: "Users acknowledge rules before access.",
    examples: [
      "The acceptable use policy with e-signature/acknowledgment report for all users.",
      "Onboarding workflow step showing AUP acceptance before account activation." ] },
  { id: "PL-7", name: "Concept of Operations", what: "A CONOPS describes intended security operation.",
    examples: [
      "The CONOPS document with revision history." ] },
  { id: "PL-8", name: "Security and Privacy Architectures", what: "A security architecture description exists and is current.",
    examples: [
      "The architecture diagram with trust boundaries, dated and version-controlled.",
      "Architecture decision records for security-relevant choices." ] },
  { id: "PL-9", name: "Central Management", what: "Centrally-managed controls are identified and operated centrally.",
    examples: [
      "MDM/EDR/SSO consoles demonstrating central management, referenced as such in the SSP." ] },
  { id: "PL-10", name: "Baseline Selection", what: "A control baseline was selected from categorization.",
    examples: [
      "The categorization + baseline selection memo (e.g., Moderate baseline) with approval." ] },
  { id: "PL-11", name: "Baseline Tailoring", what: "Tailoring decisions are documented and justified.",
    examples: [
      "The tailoring workbook showing added/removed controls with rationale and approver." ] },

  // ══ PM: Program Management ══════════════════════════════════════════
  { id: "PM-1", name: "Information Security Program Plan", what: "An org-wide program plan exists and is current.",
    examples: [
      "The program plan with approval/review dates." ] },
  { id: "PM-2", name: "Information Security Program Leadership Role", what: "A senior security officer is appointed.",
    examples: [
      "Org chart or appointment memo naming the CISO/security lead." ] },
  { id: "PM-3", name: "Information Security and Privacy Resources", what: "Security is resourced in planning/budget.",
    examples: [
      "Budget line items for security tooling/headcount (redacted amounts acceptable)." ] },
  { id: "PM-4", name: "Plan of Action and Milestones Process", what: "An org-level POA&M process operates.",
    examples: [
      "The consolidated POA&M tracker with owner/milestone columns in use." ] },
  { id: "PM-5", name: "System Inventory", what: "An inventory of organizational systems exists.",
    examples: [
      "The system inventory list with owners and boundaries, current within the cycle." ] },
  { id: "PM-6", name: "Measures of Performance", what: "Security performance is measured and reported.",
    examples: [
      "The monthly KPI dashboard/deck page presented to leadership (patch SLA, phishing rate, MFA coverage)." ] },
  { id: "PM-7", name: "Enterprise Architecture", what: "Security integrates with enterprise architecture.",
    examples: [
      "EA documentation showing security requirements embedded." ] },
  { id: "PM-8", name: "Critical Infrastructure Plan", what: "CIP obligations addressed where applicable.",
    examples: [
      "The critical infrastructure protection plan section, where applicable." ] },
  { id: "PM-9", name: "Risk Management Strategy", what: "An approved risk strategy with tolerance exists.",
    examples: [
      "The risk management strategy with risk appetite statement and review evidence." ] },
  { id: "PM-10", name: "Authorization Process", what: "A defined authorization process with roles.",
    examples: [
      "The authorization procedure naming authorizing officials and the decision record template." ] },
  { id: "PM-11", name: "Mission and Business Process Definition", what: "Protection needs tie to business processes.",
    examples: [
      "The BIA or process-to-system mapping with protection requirements." ] },
  { id: "PM-12", name: "Insider Threat Program", what: "An insider threat capability exists.",
    examples: [
      "The insider threat program charter.",
      "A sanitized insider-risk case record or UEBA alert triage." ] },
  { id: "PM-13", name: "Security and Privacy Workforce", what: "Workforce development for security roles.",
    examples: [
      "Role qualification matrix or certification tracking for the security team." ] },
  { id: "PM-14", name: "Testing, Training, and Monitoring", what: "T/T/M activities are planned and executed org-wide.",
    examples: [
      "The consolidated annual schedule (assessments, exercises, training) with completion status." ] },
  { id: "PM-15", name: "Security and Privacy Groups and Associations", what: "Ongoing contact with security communities.",
    examples: [
      "ISAC membership confirmation or advisory list subscriptions." ] },
  { id: "PM-16", name: "Threat Awareness Program", what: "Threat intel is gathered and shared internally.",
    examples: [
      "A recent internal threat briefing/product.",
      "Threat intel platform feed configuration." ] },
  { id: "PM-17", name: "Protecting CUI on External Systems", what: "Policy governs CUI on external systems.",
    examples: [
      "Policy plus flow-down contract language for providers handling CUI." ] },
  { id: "PM-18", name: "Privacy Program Plan", what: "A privacy program plan exists.",
    examples: [
      "The privacy program plan with approval/review dates." ] },
  { id: "PM-19", name: "Privacy Program Leadership Role", what: "A senior privacy official is appointed.",
    examples: [
      "Appointment memo/org chart naming the privacy officer/DPO." ] },
  { id: "PM-20", name: "Dissemination of Privacy Program Information", what: "Privacy program info is publicly available.",
    examples: [
      "The public privacy page with policies and contact method, current." ] },
  { id: "PM-21", name: "Accounting of Disclosures", what: "PII disclosures are logged.",
    examples: [
      "The disclosure register with recipient/purpose/date entries." ] },
  { id: "PM-22", name: "Personally Identifiable Information Quality Management", what: "PII accuracy is managed.",
    examples: [
      "The data-correction workflow with a completed example." ] },
  { id: "PM-23", name: "Data Governance Body", what: "A data governance body operates.",
    examples: [
      "The governance body charter and recent meeting minutes." ] },
  { id: "PM-24", name: "Data Integrity Board", what: "Matching programs overseen where applicable.",
    examples: [
      "Data integrity board records, where applicable." ] },
  { id: "PM-25", name: "Minimization of PII Used in Testing, Training, and Research", what: "Production PII is not used raw in lower environments.",
    examples: [
      "Masking/synthetic-data pipeline configuration for test data.",
      "A masked dataset sample from the test environment." ] },
  { id: "PM-26", name: "Complaint Management", what: "Privacy complaints are received and resolved.",
    examples: [
      "The complaint intake channel and register with response timestamps." ] },
  { id: "PM-27", name: "Privacy Reporting", what: "Periodic privacy reporting occurs.",
    examples: [
      "The periodic privacy report to leadership/regulator." ] },
  { id: "PM-28", name: "Risk Framing", what: "Risk assumptions/constraints/tolerance are documented.",
    examples: [
      "The risk framing document feeding assessments." ] },
  { id: "PM-29", name: "Risk Management Program Leadership Roles", what: "Risk leadership roles are assigned.",
    examples: [
      "Appointment of the risk executive function." ] },
  { id: "PM-30", name: "Supply Chain Risk Management Strategy", what: "An org-wide SCRM strategy exists.",
    examples: [
      "The SCRM strategy with approval and review evidence." ] },
  { id: "PM-31", name: "Continuous Monitoring Strategy", what: "An org continuous monitoring strategy exists.",
    examples: [
      "The strategy document plus the metrics reporting cadence evidence." ] },
  { id: "PM-32", name: "Purposing", what: "Systems are used for authorized purposes.",
    examples: [
      "System purpose statements in the inventory/SSP." ] },

  // ══ PS: Personnel Security ══════════════════════════════════════════
  { id: "PS-1", name: "Policy and Procedures", what: "An approved personnel security policy.",
    examples: [
      "The personnel security policy with approval/review dates." ] },
  { id: "PS-2", name: "Position Risk Designation", what: "Positions carry risk designations.",
    examples: [
      "The position designation matrix (role → sensitivity) with review evidence." ] },
  { id: "PS-3", name: "Personnel Screening", what: "People are screened before access, per designation.",
    examples: [
      "A redacted background check completion record dated before the start/access date.",
      "The screening requirement matrix by role and the vendor completion report." ] },
  { id: "PS-4", name: "Personnel Termination", what: "Access ends promptly at termination with asset return.",
    examples: [
      "The offboarding checklist for a recent leaver with revocation timestamps vs termination date.",
      "IdP deprovisioning log (Okta/Entra) triggered by the HR system.",
      "Asset return record (laptop, badge) for the leaver." ] },
  { id: "PS-5", name: "Personnel Transfer", what: "Access is re-evaluated on internal transfer.",
    examples: [
      "The transfer ticket showing access adjusted (old roles removed) with dates.",
      "Access review triggered by department change in the IGA tool." ] },
  { id: "PS-6", name: "Access Agreements", what: "NDAs/access agreements are signed before access.",
    examples: [
      "A signed NDA/confidentiality agreement dated before access, from the HR system.",
      "The e-signature completion report for access agreements across staff." ] },
  { id: "PS-7", name: "External Personnel Security", what: "Third-party personnel meet the same requirements.",
    examples: [
      "Contract clause requiring vendor personnel screening plus the vendor attestation.",
      "Contractor onboarding checklist mirroring employee requirements." ] },
  { id: "PS-8", name: "Personnel Sanctions", what: "A sanctions process exists and is used.",
    examples: [
      "The disciplinary process in policy plus a sanitized record showing enforcement." ] },
  { id: "PS-9", name: "Position Descriptions", what: "Security responsibilities are in position descriptions.",
    examples: [
      "A job description for an in-scope role showing security responsibilities." ] },

  // ══ PT: PII Processing and Transparency ═════════════════════════════
  { id: "PT-1", name: "Policy and Procedures", what: "An approved PII processing policy.",
    examples: [
      "The privacy/PII policy with approval/review dates." ] },
  { id: "PT-2", name: "Authority to Process PII", what: "Each processing activity has a documented authority/basis.",
    examples: [
      "The lawful-basis register mapping processing activities to authority." ] },
  { id: "PT-3", name: "Personally Identifiable Information Processing Purposes", what: "Purposes are documented and processing is limited to them.",
    examples: [
      "The purpose register (RoPA purposes column) mapped to systems.",
      "A purpose-limitation check in the new-use approval workflow." ] },
  { id: "PT-4", name: "Consent", what: "Consent is captured and honored where relied on.",
    examples: [
      "The consent screen shown at collection plus the stored consent record.",
      "Consent management platform (OneTrust) configuration and consent log." ] },
  { id: "PT-5", name: "Privacy Notice", what: "A current notice is presented at collection points.",
    examples: [
      "The published privacy notice with last-updated date.",
      "The collection form/screen linking the notice at the point of capture." ] },
  { id: "PT-6", name: "System of Records Notice", what: "SORNs published for applicable federal systems.",
    examples: [
      "The published SORN citation, where applicable." ] },
  { id: "PT-7", name: "Specific Categories of PII", what: "Sensitive PII categories have extra handling.",
    examples: [
      "The SSN minimization plan or sensitive-category handling rules with an enforcement example." ] },
  { id: "PT-8", name: "Computer Matching Requirements", what: "Matching agreements where applicable.",
    examples: [
      "The matching agreement documentation, where applicable." ] },

  // ══ RA: Risk Assessment ═════════════════════════════════════════════
  { id: "RA-1", name: "Policy and Procedures", what: "An approved risk assessment policy and methodology.",
    examples: [
      "The risk policy with approval/review dates and the scoring methodology." ] },
  { id: "RA-2", name: "Security Categorization", what: "The system is categorized and the decision documented.",
    examples: [
      "The FIPS 199 categorization (or internal tiering) memo with approver.",
      "The GRC record showing the categorization and date." ] },
  { id: "RA-3", name: "Risk Assessment", what: "Risk assessments are performed and updated.",
    examples: [
      "The completed risk assessment with date, scope, and scored risks.",
      "The risk register showing periodic updates and new-threat reassessments." ] },
  { id: "RA-5", name: "Vulnerability Monitoring and Scanning", what: "Recurring scans run and findings are remediated within SLA.",
    examples: [
      "Tenable/Qualys/Defender scan schedule page proving recurring coverage of in-scope assets.",
      "The vulnerability aging/SLA report showing criticals closed within your window.",
      "A before/after scan pair for one remediated critical finding." ] },
  { id: "RA-6", name: "Technical Surveillance Countermeasures Survey", what: "TSCM where employed.",
    examples: [
      "TSCM survey record for the high-risk facility, where applicable." ] },
  { id: "RA-7", name: "Risk Response", what: "Risks receive documented responses.",
    examples: [
      "Risk register entries showing response decisions (accept/mitigate/transfer) with approver and date." ] },
  { id: "RA-8", name: "Privacy Impact Assessments", what: "PIAs are completed for applicable systems.",
    examples: [
      "The completed PIA/DPIA with date and approver for an in-scope system." ] },
  { id: "RA-9", name: "Criticality Analysis", what: "Critical components/functions are identified.",
    examples: [
      "The criticality analysis identifying crown-jewel components, feeding the BIA." ] },
  { id: "RA-10", name: "Threat Hunting", what: "Proactive hunts are performed where employed.",
    examples: [
      "A completed hunt record: hypothesis, queries used, findings, and actions.",
      "EDR advanced-hunting saved query results with analyst conclusions." ] },

  // ══ SA: System and Services Acquisition ═════════════════════════════
  { id: "SA-1", name: "Policy and Procedures", what: "An approved acquisition security policy.",
    examples: [
      "The acquisition/SDLC security policy with approval/review dates." ] },
  { id: "SA-2", name: "Allocation of Resources", what: "Security is planned and funded in acquisitions.",
    examples: [
      "Project/budget documentation with security line items for the system." ] },
  { id: "SA-3", name: "System Development Life Cycle", what: "A defined SDLC integrates security at each phase.",
    examples: [
      "The SDLC standard showing security gates, plus a project artifact passing a gate (design review sign-off).",
      "Definition-of-done including security checks in the team backlog tool." ] },
  { id: "SA-4", name: "Acquisition Process", what: "Contracts include security requirements.",
    examples: [
      "Security requirements section from a recent RFP/contract for an in-scope purchase.",
      "The standard security exhibit/DPA used in vendor contracts." ] },
  { id: "SA-5", name: "System Documentation", what: "Admin/user security documentation is available.",
    examples: [
      "The admin guide section covering secure configuration for the system.",
      "Internal runbooks repository showing current system documentation." ] },
  { id: "SA-8", name: "Security and Privacy Engineering Principles", what: "Secure design principles are applied.",
    examples: [
      "Design review record referencing principles (least privilege, defense in depth).",
      "Threat model document for a recent feature." ] },
  { id: "SA-9", name: "External System Services", what: "Outsourced services meet security requirements and are monitored.",
    examples: [
      "The vendor SOC 2/ISO certificate with your documented review and acceptance.",
      "Contract security clauses (breach notice, data handling) in the executed agreement.",
      "Vendor register entry showing risk tier and last review date." ] },
  { id: "SA-10", name: "Developer Configuration Management", what: "Developers control changes and track flaws.",
    examples: [
      "Version control history with protected branches for the system code.",
      "The developer flaw-tracking board with security-bug workflow." ] },
  { id: "SA-11", name: "Developer Testing and Evaluation", what: "Security testing occurs in development.",
    examples: [
      "SAST results (Semgrep/SonarQube) as a required pipeline step on a merged PR.",
      "DAST/dependency scan report for the latest release with triage." ] },
  { id: "SA-15", name: "Development Process, Standards, and Tools", what: "A defined development process/toolchain with security standards.",
    examples: [
      "The secure coding standard plus pipeline configuration enforcing linting/scanning.",
      "Toolchain inventory showing approved build tools and their versions." ] },
  { id: "SA-16", name: "Developer-Provided Training", what: "Developer training for security functions where acquired.",
    examples: [
      "Vendor-provided training materials/records for the acquired system." ] },
  { id: "SA-17", name: "Developer Security and Privacy Architecture and Design", what: "Developer provides security architecture where required.",
    examples: [
      "The vendor security architecture/design document for the acquired system." ] },
  { id: "SA-20", name: "Customized Development of Critical Components", what: "Critical components custom-developed where justified.",
    examples: [
      "The decision record justifying custom development for a critical component." ] },
  { id: "SA-21", name: "Developer Screening", what: "Developer personnel are screened where required.",
    examples: [
      "Contract clause requiring developer screening plus vendor attestation." ] },
  { id: "SA-22", name: "Unsupported System Components", what: "No unsupported/EOL components, or documented exceptions.",
    examples: [
      "Inventory/EOL report (endpoint or dependency) showing zero unsupported items in scope.",
      "The exception record for a remaining EOL system with compensating controls and end date." ] },
  { id: "SA-23", name: "Specialization", what: "Extra assurance applied to critical components.",
    examples: [
      "Documentation of enhanced assurance measures for identified critical components." ] },
  { id: "SA-24", name: "Design for Cyber Resiliency", what: "Resiliency is designed in for critical functions (new in Release 5.2.0).",
    examples: [
      "Architecture documentation showing redundancy/degradation/recovery design decisions.",
      "Chaos/resilience test results for critical services." ] },

  // ══ SC: System and Communications Protection ════════════════════════
  { id: "SC-1", name: "Policy and Procedures", what: "An approved SC policy.",
    examples: [
      "The system/communications protection policy with approval/review dates." ] },
  { id: "SC-2", name: "Separation of System and User Functionality", what: "Admin functions are separated from user-facing services.",
    examples: [
      "Separate management interface/URL restricted by network or identity (admin portal behind VPN/PIM).",
      "Architecture diagram showing management plane isolation." ] },
  { id: "SC-3", name: "Security Function Isolation", what: "Security functions are isolated from non-security functions.",
    examples: [
      "Dedicated security tooling tier/accounts (EDR/SIEM in a separate admin boundary).",
      "SELinux/AppArmor policy isolating security services." ] },
  { id: "SC-4", name: "Information in Shared System Resources", what: "No residual data leaks through shared resources.",
    examples: [
      "Platform documentation of memory/storage isolation guarantees cited in the SSP.",
      "Configuration prohibiting shared temp/scratch reuse across tenants where applicable." ] },
  { id: "SC-5", name: "Denial-of-Service Protection", what: "DoS protections cover public endpoints.",
    examples: [
      "Cloudflare/AWS Shield/WAF configuration for in-scope endpoints.",
      "Rate limiting configuration at the API gateway with a triggered event.",
      "A mitigated attack report or DDoS test summary." ] },
  { id: "SC-6", name: "Resource Availability", what: "Resource limits protect availability.",
    examples: [
      "Kubernetes resource quotas/limits or autoscaling policy pages.",
      "Per-tenant rate limits in the application configuration." ] },
  { id: "SC-7", name: "Boundary Protection", what: "Managed interfaces monitor/control boundary traffic, default-deny.",
    examples: [
      "The boundary diagram plus firewall/security-group rules showing deny-by-default and specific allows.",
      "WAF in blocking mode for public web apps with rule hit statistics.",
      "Egress filtering configuration (proxy/NAT allowlist) for server subnets." ] },
  { id: "SC-8", name: "Transmission Confidentiality and Integrity", what: "Data in transit is encrypted with strong protocols.",
    examples: [
      "SSL Labs (or equivalent) A-grade result for external endpoints showing TLS 1.2+/strong ciphers.",
      "Load balancer TLS policy page (minimum protocol version).",
      "Internal service mesh mTLS setting (Istio PeerAuthentication STRICT)." ] },
  { id: "SC-10", name: "Network Disconnect", what: "Idle network sessions terminate.",
    examples: [
      "VPN/remote session idle timeout setting plus a disconnect log entry." ] },
  { id: "SC-11", name: "Trusted Path", what: "Trusted communication path for sensitive interactions where required.",
    examples: [
      "Secure attention sequence (Ctrl+Alt+Del policy) enabled, or hardware-backed auth prompt documentation." ] },
  { id: "SC-12", name: "Cryptographic Key Establishment and Management", what: "Keys are generated, stored, rotated, and destroyed under control.",
    examples: [
      "AWS KMS/Azure Key Vault key list showing rotation enabled and restricted key-admin roles.",
      "The key management standard with lifecycle rules.",
      "HSM configuration or CloudHSM cluster documentation for high-assurance keys." ] },
  { id: "SC-13", name: "Cryptographic Protection", what: "Approved cryptography is used for defined purposes.",
    examples: [
      "The crypto standards doc (approved algorithms) plus one enforcement example (TLS policy, encryption library config).",
      "FIPS-validated module usage documentation where required." ] },
  { id: "SC-15", name: "Collaborative Computing Devices and Applications", what: "Cameras/mics cannot be remotely activated silently.",
    examples: [
      "Conferencing platform settings showing indicators/consent for recording.",
      "MDM policy restricting camera/mic access by unapproved apps." ] },
  { id: "SC-16", name: "Transmission of Security and Privacy Attributes", what: "Labels travel with data between systems where employed.",
    examples: [
      "Purview label inheritance across services, or tagged message attributes in the integration configuration." ] },
  { id: "SC-17", name: "Public Key Infrastructure Certificates", what: "Certificates are issued under policy and tracked.",
    examples: [
      "The certificate inventory with expiry monitoring/alerts.",
      "Internal CA policy or public CA issuance settings (CAA records)." ] },
  { id: "SC-18", name: "Mobile Code", what: "Mobile code is restricted per policy.",
    examples: [
      "Browser policy (GPO/Intune) controlling plugins/scripts.",
      "Email gateway blocking active content, with a blocked sample." ] },
  { id: "SC-20", name: "Secure Name/Address Resolution Service (Authoritative Source)", what: "Authoritative DNS is signed.",
    examples: [
      "DNSSEC signing status for your zones (registrar/Route 53 DNSSEC page)." ] },
  { id: "SC-21", name: "Secure Name/Address Resolution Service (Recursive or Caching Resolver)", what: "Resolvers validate DNSSEC.",
    examples: [
      "Resolver configuration (BIND dnssec-validation auto, or protective DNS service) shown enabled." ] },
  { id: "SC-22", name: "Architecture and Provisioning for Name/Address Resolution Service", what: "DNS is redundant and role-separated.",
    examples: [
      "Internal/external DNS split architecture diagram with redundant servers." ] },
  { id: "SC-23", name: "Session Authenticity", what: "Sessions resist hijacking/replay.",
    examples: [
      "Secure/HttpOnly/SameSite cookie flags shown in browser dev tools for the app.",
      "Session token rotation on privilege change in the framework configuration." ] },
  { id: "SC-24", name: "Fail in Known State", what: "Failures leave a defined safe state.",
    examples: [
      "Failure-mode documentation/tests showing fail-closed behavior for the security component." ] },
  { id: "SC-25", name: "Thin Nodes", what: "Minimal-functionality endpoints where employed.",
    examples: [
      "Thin/zero client deployment documentation, where applicable." ] },
  { id: "SC-26", name: "Decoys", what: "Honeypots where employed.",
    examples: [
      "Deception platform/honeypot deployment with an example alert, where applicable." ] },
  { id: "SC-27", name: "Platform-Independent Applications", what: "Portable applications where employed.",
    examples: [
      "Documentation of platform-independent choices, where applicable." ] },
  { id: "SC-28", name: "Protection of Information at Rest", what: "At-rest data is encrypted with managed keys.",
    examples: [
      "S3 default encryption / EBS encryption-by-default page for in-scope accounts.",
      "Database TDE status (SQL Server/Oracle) or RDS encryption flag.",
      "BitLocker/FileVault fleet compliance report from MDM." ] },
  { id: "SC-29", name: "Heterogeneity", what: "Component diversity where employed.",
    examples: [
      "Documentation of deliberate diversity (multi-vendor DNS), where applicable." ] },
  { id: "SC-30", name: "Concealment and Misdirection", what: "Where employed.",
    examples: [
      "Concealment technique documentation, where applicable." ] },
  { id: "SC-31", name: "Covert Channel Analysis", what: "For high-assurance systems.",
    examples: [
      "Covert channel analysis documentation, where required." ] },
  { id: "SC-32", name: "System Partitioning", what: "The system is partitioned into isolated components.",
    examples: [
      "Segmentation diagram with enforcement points (VLANs/subnets/namespaces) and the matching firewall policy." ] },
  { id: "SC-34", name: "Non-Modifiable Executable Programs", what: "Immutable execution where employed.",
    examples: [
      "Read-only root filesystem/immutable image configuration, where applicable." ] },
  { id: "SC-35", name: "External Malicious Code Identification", what: "Honeyclients where employed.",
    examples: [
      "External malicious-code identification capability records, where applicable." ] },
  { id: "SC-36", name: "Distributed Processing and Storage", what: "Distribution across locations for resilience.",
    examples: [
      "Multi-AZ/region deployment configuration for critical services." ] },
  { id: "SC-37", name: "Out-of-Band Channels", what: "Sensitive items delivered out-of-band where required.",
    examples: [
      "Credential delivery via separate channel documented in procedure with an example." ] },
  { id: "SC-38", name: "Operations Security", what: "OPSEC protects operational information.",
    examples: [
      "Policy restricting public disclosure of system details plus an example review of external postings." ] },
  { id: "SC-39", name: "Process Isolation", what: "Processes run in isolated address spaces.",
    examples: [
      "Platform isolation cited in the SSP (standard OS/container isolation).",
      "Container runtime security settings (no privileged containers policy)." ] },
  { id: "SC-40", name: "Wireless Link Protection", what: "Wireless links protected against signal attacks where employed.",
    examples: [
      "Point-to-point wireless link encryption configuration, where applicable." ] },
  { id: "SC-41", name: "Port and I/O Device Access", what: "Unused physical ports/devices disabled where required.",
    examples: [
      "USB/device control policy from endpoint management with status.",
      "Disabled console/unused switch ports configuration." ] },
  { id: "SC-42", name: "Sensor Capability and Data", what: "Device sensors are restricted.",
    examples: [
      "MDM policy restricting camera/mic/location by context with the policy screen." ] },
  { id: "SC-43", name: "Usage Restrictions", what: "Usage restrictions for risky components.",
    examples: [
      "Documented allowed/disallowed uses for the component class with enforcement reference." ] },
  { id: "SC-44", name: "Detonation Chambers", what: "Suspicious content detonates in sandboxes where employed.",
    examples: [
      "Email attachment sandboxing (Defender Safe Attachments) policy page with a detonation verdict example." ] },
  { id: "SC-45", name: "System Time Synchronization", what: "System clocks synchronize to authoritative time.",
    examples: [
      "NTP hierarchy configuration and a sample of synced systems (see AU-8 evidence)." ] },
  { id: "SC-46", name: "Cross Domain Policy Enforcement", what: "Cross-domain transfers enforced where domains differ.",
    examples: [
      "Cross-domain solution configuration/policy, where applicable." ] },
  { id: "SC-47", name: "Alternate Communications Paths", what: "Alternate paths for command and control of operations.",
    examples: [
      "Documented alternate communications path with test evidence." ] },
  { id: "SC-48", name: "Sensor Relocation", what: "Where employed.",
    examples: [
      "Sensor placement decision records, where applicable." ] },
  { id: "SC-49", name: "Hardware-Enforced Separation and Policy Enforcement", what: "Where employed.",
    examples: [
      "Hardware separation mechanism documentation, where applicable." ] },
  { id: "SC-50", name: "Software-Enforced Separation and Policy Enforcement", what: "Where employed.",
    examples: [
      "Software separation mechanism documentation, where applicable." ] },
  { id: "SC-51", name: "Hardware-Based Protection", what: "Hardware roots of trust in use.",
    examples: [
      "TPM present/Secure Boot enabled report from Intune/endpoint management across the fleet." ] },

  // ══ SI: System and Information Integrity ════════════════════════════
  { id: "SI-1", name: "Policy and Procedures", what: "An approved system integrity policy.",
    examples: [
      "The SI policy with approval/review dates." ] },
  { id: "SI-2", name: "Flaw Remediation", what: "Flaws are identified and patched within SLA.",
    examples: [
      "Patch compliance dashboard (Intune/WSUS/Automox) for in-scope systems against the SLA policy.",
      "A critical patch deployment record showing release-to-deployed time inside SLA.",
      "Dependency update PRs (Dependabot/Renovate) merged for a critical library CVE." ] },
  { id: "SI-3", name: "Malicious Code Protection", what: "Anti-malware/EDR covers endpoints and updates itself.",
    examples: [
      "EDR console (CrowdStrike/Defender) device coverage vs inventory with sensor versions current.",
      "A quarantined malware detection event with automatic action.",
      "Policy page showing real-time protection and cloud-delivered protection on." ] },
  { id: "SI-4", name: "System Monitoring", what: "Systems are monitored for attacks and anomalies.",
    examples: [
      "SIEM detection rules list mapped to in-scope log sources.",
      "IDS/NDR sensor placement and an investigated alert.",
      "A monthly monitoring coverage review record." ] },
  { id: "SI-5", name: "Security Alerts, Advisories, and Directives", what: "Advisories are received and actioned.",
    examples: [
      "CISA/vendor advisory subscription evidence plus a triage record for a relevant advisory (e.g., KEV item).",
      "The internal advisory Slack channel/ticket showing dissemination and action." ] },
  { id: "SI-6", name: "Security and Privacy Function Verification", what: "Security functions are verified to work.",
    examples: [
      "Automated control-verification checks (EDR healthy, logging flowing) with a run result.",
      "Synthetic test of a security function (test detection) record." ] },
  { id: "SI-7", name: "Software, Firmware, and Information Integrity", what: "Unauthorized changes are detected.",
    examples: [
      "FIM (Wazuh/Tripwire) policy on critical paths with a sample integrity alert.",
      "Signed-image verification in the deploy pipeline (cosign verify step).",
      "AWS Config / drift detection alert on infrastructure change outside pipeline." ] },
  { id: "SI-8", name: "Spam Protection", what: "Email spam/phish protection is enforced.",
    examples: [
      "Email security policy pages (anti-spam, anti-phish, DMARC settings) with quarantine stats.",
      "DMARC aggregate report summary showing enforcement (p=quarantine/reject)." ] },
  { id: "SI-10", name: "Information Input Validation", what: "Inputs are validated.",
    examples: [
      "WAF managed rules (SQLi/XSS) in blocking mode with hit counts.",
      "Framework validation code/config plus SAST results showing injection checks pass." ] },
  { id: "SI-11", name: "Error Handling", what: "Errors do not leak sensitive details.",
    examples: [
      "Production error page showing a generic message, with the correlated detailed log entry visible only server-side.",
      "Framework debug-mode disabled setting in production configuration." ] },
  { id: "SI-12", name: "Information Management and Retention", what: "Information is retained/disposed per policy.",
    examples: [
      "The retention schedule plus platform retention rules (M365 retention policy page) matching it.",
      "Automated deletion job logs for expired data." ] },
  { id: "SI-13", name: "Predictable Failure Prevention", what: "Components with known MTTF are managed.",
    examples: [
      "Hardware refresh schedule or failover provisions for components with predictable failure, where applicable." ] },
  { id: "SI-14", name: "Non-Persistence", what: "Ephemeral components where employed.",
    examples: [
      "Immutable/ephemeral infrastructure policy (instances rebuilt on each deploy) shown in pipeline config." ] },
  { id: "SI-15", name: "Information Output Filtering", what: "Outputs are validated where employed.",
    examples: [
      "Output encoding/filtering configuration with tests, where applicable." ] },
  { id: "SI-16", name: "Memory Protection", what: "Memory protections are enabled.",
    examples: [
      "Endpoint policy report showing DEP/ASLR/exploit protection enabled across the fleet.",
      "Exploit Guard/attack surface reduction rules page in enforce mode." ] },
  { id: "SI-17", name: "Fail-Safe Procedures", what: "Defined fail-safe procedures for failure conditions.",
    examples: [
      "The documented fail-safe procedure for the defined condition with test evidence." ] },
  { id: "SI-18", name: "Personally Identifiable Information Quality Operations", what: "PII is kept accurate; corrections work.",
    examples: [
      "The data-correction workflow with a completed correction example." ] },
  { id: "SI-19", name: "De-Identification", what: "Datasets are de-identified where required.",
    examples: [
      "The masking configuration and a de-identified output sample.",
      "The re-identification risk assessment for the released dataset." ] },
  { id: "SI-20", name: "Tainting", what: "Where employed.",
    examples: [
      "Data tainting/beacon documentation, where applicable." ] },
  { id: "SI-21", name: "Information Refresh", what: "Where employed.",
    examples: [
      "Scheduled information refresh configuration, where applicable." ] },
  { id: "SI-22", name: "Information Diversity", what: "Where employed.",
    examples: [
      "Alternative information source documentation, where applicable." ] },
  { id: "SI-23", name: "Information Fragmentation", what: "Where employed.",
    examples: [
      "Information fragmentation documentation, where applicable." ] },

  // ══ SR: Supply Chain Risk Management ════════════════════════════════
  { id: "SR-1", name: "Policy and Procedures", what: "An approved SCRM policy.",
    examples: [
      "The SCRM policy with approval/review dates." ] },
  { id: "SR-2", name: "Supply Chain Risk Management Plan", what: "A SCRM plan exists and is reviewed.",
    examples: [
      "The SCRM plan with revision history and review evidence." ] },
  { id: "SR-3", name: "Supply Chain Controls and Processes", what: "Supply chain protections operate in procurement.",
    examples: [
      "The procurement workflow showing the security review gate before vendor onboarding.",
      "The vendor risk assessment template in use." ] },
  { id: "SR-4", name: "Provenance", what: "Origin/custody of critical components is documented.",
    examples: [
      "SBOM for a critical application (generated by Syft or a dependency scanner) with review.",
      "Hardware origin documentation from the authorized reseller." ] },
  { id: "SR-5", name: "Acquisition Strategies, Tools, and Methods", what: "Acquisition strategies reduce supply chain risk.",
    examples: [
      "The approved supplier list policy or diversification strategy documentation." ] },
  { id: "SR-6", name: "Supplier Assessments and Reviews", what: "Suppliers are assessed and re-reviewed.",
    examples: [
      "A completed critical-vendor assessment with date/reviewer plus the reassessment schedule.",
      "The vendor register showing last-review dates across suppliers." ] },
  { id: "SR-7", name: "Supply Chain Operations Security", what: "OPSEC for supply chain information.",
    examples: [
      "OPSEC protections for supply chain data documentation, where applicable." ] },
  { id: "SR-8", name: "Notification Agreements", what: "Suppliers must notify you of incidents.",
    examples: [
      "The breach/incident notification clause in an executed vendor contract.",
      "The standard contract exhibit requiring notification within N hours." ] },
  { id: "SR-9", name: "Tamper Resistance and Detection", what: "Tampering is resisted/detected in the supply chain.",
    examples: [
      "Tamper-evident packaging procedure with an inspection photo/record." ] },
  { id: "SR-10", name: "Inspection of Systems or Components", what: "Received components are inspected.",
    examples: [
      "The acceptance/inspection checklist completed for received hardware." ] },
  { id: "SR-11", name: "Component Authenticity", what: "Counterfeits are prevented/detected.",
    examples: [
      "Authorized-reseller purchasing policy plus verification records for critical components.",
      "Counterfeit reporting procedure documentation." ] },
  { id: "SR-12", name: "Component Disposal", what: "Components are disposed of securely.",
    examples: [
      "Certified destruction/return records for disposed components (see also MP-6)." ] },
]
