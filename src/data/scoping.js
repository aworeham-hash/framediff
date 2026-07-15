// Framework applicability questions. Each yes answer maps to frameworks with
// a plain-English reason. Advisory only — legal applicability decisions need counsel.

export const SCOPING_QUESTIONS = [
  {
    id: "dod",
    q: "Do you hold (or bid on) US Department of Defense contracts?",
    detail: "Prime or subcontract, including handling Federal Contract Information (FCI) or Controlled Unclassified Information (CUI).",
    frameworks: [
      { id: "cmmc", why: "CMMC certification requirements are phasing into DoD contracts under 32 CFR Part 170. Level depends on whether you handle FCI (Level 1) or CUI (Level 2+)." },
      { id: "nist-sp800-171", why: "DFARS 252.204-7012 requires implementing NIST SP 800-171 (currently Rev 2) if you handle CUI — CMMC Level 2 verifies exactly these 110 requirements." },
    ],
  },
  {
    id: "cui",
    q: "Do you handle Controlled Unclassified Information (CUI) from any federal agency?",
    detail: "Non-DoD examples: GSA, DHS, or grant-funded research data marked CUI.",
    frameworks: [
      { id: "nist-sp800-171", why: "SP 800-171 is the government-wide standard for protecting CUI in nonfederal systems, imposed through contracts and agreements." },
    ],
  },
  {
    id: "federal",
    q: "Do you operate systems for a federal agency, or sell cloud services to one?",
    detail: "Includes FedRAMP-authorized offerings and systems covered by agency ATOs.",
    frameworks: [
      { id: "nist-sp800-53", why: "SP 800-53 baselines are the control set behind FISMA ATOs and FedRAMP authorizations." },
      { id: "stigs", why: "DoD (and many civilian) system configurations must follow DISA STIG hardening baselines." },
    ],
  },
  {
    id: "cards",
    q: "Do you store, process, or transmit payment card data — or can your systems affect its security?",
    detail: "E-commerce, point of sale, or handling cardholder data for others.",
    frameworks: [
      { id: "pci-dss", why: "PCI DSS applies contractually via card brands and acquirers to any entity in the cardholder data environment or that can affect it." },
    ],
  },
  {
    id: "phi",
    q: "Do you handle Protected Health Information (PHI)?",
    detail: "Healthcare providers, health plans, clearinghouses — or their vendors (business associates).",
    frameworks: [
      { id: "hipaa", why: "The HIPAA Security Rule applies to covered entities and business associates handling electronic PHI. Watch the proposed 2025 Security Rule update." },
    ],
  },
  {
    id: "nydfs",
    q: "Are you licensed by the New York Department of Financial Services?",
    detail: "Banks, insurers, mortgage lenders, money transmitters, and virtual currency businesses operating in NY.",
    frameworks: [
      { id: "nydfs-500", why: "23 NYCRR Part 500 applies to DFS-licensed entities; the Second Amendment obligations fully phased in by November 2025." },
    ],
  },
  {
    id: "public",
    q: "Are you a US public company (or preparing to IPO)?",
    detail: "SEC registrants subject to Sarbanes-Oxley.",
    frameworks: [
      { id: "sox", why: "SOX 404 requires ICFR assessment; PCAOB auditing standards (including QC 1000, effective December 15, 2026) govern your auditors." },
    ],
  },
  {
    id: "b2b",
    q: "Do enterprise customers ask about your security program (SOC 2, ISO 27001)?",
    detail: "SaaS vendors and service providers whose customers require attestation or certification.",
    frameworks: [
      { id: "soc2", why: "SOC 2 (2017 TSC with 2022 points of focus) is the default North American trust attestation for service organizations." },
      { id: "iso-27001", why: "ISO/IEC 27001:2022 certification (including Amendment 1:2024) is the international equivalent, often requested by EU/global customers." },
    ],
  },
  {
    id: "fti",
    q: "Do you receive Federal Tax Information (FTI) as an IRS contractor or agency partner?",
    detail: "Tax software, state agencies, or contractors processing FTI.",
    frameworks: [
      { id: "irs-4812", why: "IRS Publication 4812 (Rev. 12-2025) defines contractor security and privacy controls for FTI, including the new cloud and AI requirements." },
    ],
  },
]

// Always-recommended baseline
export const SCOPING_BASELINE = {
  id: "nist-csf",
  why: "NIST CSF 2.0 is voluntary but recommended for every organization as the organizing framework for a security program — and it maps to everything else you implement.",
}
