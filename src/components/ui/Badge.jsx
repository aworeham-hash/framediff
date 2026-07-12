export function CopyrightBadge({ copyright }) {
  if (copyright === 'public-domain') {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
        Full text available
      </span>
    )
  }
  if (copyright === 'restricted-summary-only') {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
        Summaries only
      </span>
    )
  }
  if (copyright === 'restricted-metadata-only') {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-orange-50 text-orange-700 border border-orange-200">
        Metadata only
      </span>
    )
  }
  return null
}

// Legacy exports kept for any remaining references
export function ChangeTypeBadge({ type }) {
  const styles = {
    added:        'bg-emerald-50 text-emerald-700 border-emerald-200',
    removed:      'bg-red-50 text-red-700 border-red-200',
    modified:     'bg-blue-50 text-blue-700 border-blue-200',
    restructured: 'bg-amber-50 text-amber-700 border-amber-200',
    renamed:      'bg-purple-50 text-purple-700 border-purple-200',
  }
  const labels = { added: 'Added', removed: 'Removed', modified: 'Modified', restructured: 'Restructured', renamed: 'Renamed' }
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold border ${styles[type] || 'bg-gray-50 text-gray-600 border-gray-200'}`}>
      {labels[type] || type}
    </span>
  )
}

export function SignificanceDot({ level }) {
  const styles = {
    high:   { dot: 'bg-red-400',   text: 'text-red-500',   label: 'High impact' },
    medium: { dot: 'bg-amber-400', text: 'text-amber-500', label: 'Medium impact' },
    low:    { dot: 'bg-gray-300',  text: 'text-gray-400',  label: 'Low impact' },
  }
  const s = styles[level] || styles.low
  return (
    <span className="flex items-center gap-1.5">
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
      <span className={`text-xs ${s.text}`}>{s.label}</span>
    </span>
  )
}
