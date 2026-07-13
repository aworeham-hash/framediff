// Upcoming compliance dates across tracked frameworks.
// Every entry must be verifiable against the cited source. Reviewed: 2026-07-12.
export const DEADLINES = [
  {
    date: '2026-12-15',
    dateLabel: 'December 15, 2026',
    title: 'PCAOB QC 1000 takes effect',
    detail: 'All registered firms must have a QC system designed under the new standard. Postponed once from Dec 15, 2025.',
    frameworkId: 'sox',
    kind: 'deadline',
    source: 'https://pcaobus.org/news-events/news-releases/news-release-detail/pcaob-postpones-effective-date-of-qc-1000-and-related-standards--rules--and-forms',
  },
  {
    date: '2027-07-01',
    dateLabel: 'Expected ~July 2027',
    title: 'HIPAA Security Rule final rule (expected)',
    detail: 'OMB regulatory agenda shows final action on the Security Rule NPRM around July 2027. Timing may change — the 2025 proposals are not yet enforceable.',
    frameworkId: 'hipaa',
    kind: 'expected',
    source: 'https://www.hhs.gov/hipaa/for-professionals/security/hipaa-security-rule-nprm/index.html',
  },
  {
    date: '2026-10-01',
    dateLabel: 'Quarterly (next ~October 2026)',
    title: 'DISA STIG quarterly release',
    detail: 'DISA publishes STIG updates on a quarterly cycle — check public.cyber.mil for the latest benchmark revisions.',
    frameworkId: 'stigs',
    kind: 'recurring',
    source: 'https://public.cyber.mil/stigs/',
  },
  {
    date: null,
    dateLabel: 'Date TBD',
    title: 'PCI DSS next revision (post-RFC)',
    detail: 'PCI SSC ran a request-for-comments on v4.0.1 (June 3 – July 20, 2026) — the standard input step before a new revision is drafted.',
    frameworkId: 'pci-dss',
    kind: 'watch',
    source: 'https://www.pcisecuritystandards.org/document_library/',
  },
]
