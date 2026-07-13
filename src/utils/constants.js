export const CHANGE_TYPES = {
  added: {
    label: 'Added',
    shortLabel: 'NEW',
    color: 'emerald',
    bgClass: 'bg-emerald-50',
    textClass: 'text-emerald-700',
    borderClass: 'border-emerald-200',
    dotClass: 'bg-emerald-500',
    icon: '+',
  },
  removed: {
    label: 'Removed',
    shortLabel: 'DEL',
    color: 'red',
    bgClass: 'bg-red-50',
    textClass: 'text-red-700',
    borderClass: 'border-red-200',
    dotClass: 'bg-red-500',
    icon: '−',
  },
  modified: {
    label: 'Modified',
    shortLabel: 'MOD',
    color: 'blue',
    bgClass: 'bg-blue-50',
    textClass: 'text-blue-700',
    borderClass: 'border-blue-200',
    dotClass: 'bg-blue-500',
    icon: '~',
  },
  restructured: {
    label: 'Restructured',
    shortLabel: 'RST',
    color: 'amber',
    bgClass: 'bg-amber-50',
    textClass: 'text-amber-700',
    borderClass: 'border-amber-200',
    dotClass: 'bg-amber-500',
    icon: '⟳',
  },
  renamed: {
    label: 'Renamed',
    shortLabel: 'REN',
    color: 'purple',
    bgClass: 'bg-purple-50',
    textClass: 'text-purple-700',
    borderClass: 'border-purple-200',
    dotClass: 'bg-purple-500',
    icon: '→',
  },
}

export const SIGNIFICANCE = {
  high: {
    label: 'High impact',
    dotClass: 'bg-red-400',
    textClass: 'text-red-600',
  },
  medium: {
    label: 'Medium impact',
    dotClass: 'bg-amber-400',
    textClass: 'text-amber-600',
  },
  low: {
    label: 'Low impact',
    dotClass: 'bg-gray-300',
    textClass: 'text-gray-400',
  },
}

export const FILTER_OPTIONS = [
  { key: 'all', label: 'All Changes' },
  { key: 'added', label: 'Added' },
  { key: 'removed', label: 'Removed' },
  { key: 'modified', label: 'Modified' },
  { key: 'restructured', label: 'Restructured' },
  { key: 'renamed', label: 'Renamed' },
]

export const FRAMEWORK_GROUPS = [
  {
    name: 'NIST',
    frameworks: ['nist-csf', 'nist-sp800-53', 'nist-sp800-171'],
  },
  {
    name: 'Payment Security',
    frameworks: ['pci-dss'],
  },
  {
    name: 'ISO Standards',
    frameworks: ['iso-27001'],
  },
  {
    name: 'Trust & Audit',
    frameworks: ['soc2', 'sox'],
  },
  {
    name: 'Healthcare & Federal',
    frameworks: ['hipaa', 'irs-4812'],
  },
  {
    name: 'Defense Industrial Base',
    frameworks: ['cmmc'],
  },
  {
    name: 'Financial Services',
    frameworks: ['nydfs-500'],
  },
  {
    name: 'Technical Hardening',
    frameworks: ['stigs'],
  },
]
