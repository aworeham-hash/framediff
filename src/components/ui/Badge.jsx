import { CHANGE_TYPES } from '../../utils/constants'

export function ChangeTypeBadge({ type }) {
  const config = CHANGE_TYPES[type]
  if (!config) return null
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold font-mono border ${config.bgClass} ${config.textClass} ${config.borderClass}`}>
      <span>{config.icon}</span>
      {config.shortLabel}
    </span>
  )
}

export function CopyrightBadge({ copyright }) {
  if (copyright === 'public-domain') {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
        Full text available
      </span>
    )
  }
  if (copyright === 'restricted-summary-only') {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
        Summaries only
      </span>
    )
  }
  if (copyright === 'restricted-metadata-only') {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-orange-50 text-orange-700 border border-orange-200">
        Metadata only
      </span>
    )
  }
  return null
}

export function SignificanceDot({ level }) {
  const colors = {
    high: 'bg-red-400',
    medium: 'bg-amber-400',
    low: 'bg-gray-300',
  }
  const labels = {
    high: 'High impact',
    medium: 'Medium impact',
    low: 'Low impact',
  }
  return (
    <span className="flex items-center gap-1.5" title={labels[level]}>
      <span className={`w-2 h-2 rounded-full ${colors[level] || 'bg-gray-300'}`} />
      <span className="text-xs text-gray-400">{labels[level]}</span>
    </span>
  )
}
