import { useState } from 'react'
import { ChangeItem } from './ChangeItem'
import { EmptyState } from '../ui/EmptyState'

export function ChangeList({ changes, filter, searchQuery }) {
  const [allExpanded, setAllExpanded] = useState(false)

  if (changes.length === 0) {
    return <EmptyState searchQuery={searchQuery} filter={filter} />
  }

  // Group by area (control family)
  const grouped = {}
  const areaOrder = []
  changes.forEach(change => {
    const area = change.area || 'Other'
    if (!grouped[area]) {
      grouped[area] = []
      areaOrder.push(area)
    }
    grouped[area].push(change)
  })

  // Flat view for small sets
  if (areaOrder.length <= 1 || changes.length <= 4) {
    return (
      <div>
        {changes.length > 3 && (
          <div className="flex justify-end mb-3">
            <button
              onClick={() => setAllExpanded(e => !e)}
              className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 transition-colors"
            >
              {allExpanded ? 'Collapse all' : 'Expand all'}
              <svg className={`w-3 h-3 transition-transform ${allExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        )}
        <div className="space-y-2">
          {changes.map(change => (
            <ChangeItem key={change.id} change={change} forceExpanded={allExpanded} />
          ))}
        </div>
      </div>
    )
  }

  // Create anchor slug from area string
  const toAnchor = (area) => area.toLowerCase().replace(/[^a-z0-9]+/g, '-')

  return (
    <div>
      {/* Jump to section + expand all */}
      <div className="flex items-start justify-between mb-6 gap-4">

        {/* Section jump links */}
        <div className="flex flex-wrap gap-1.5">
          {areaOrder.map(area => {
            const [familyCode] = area.split(' — ')
            return (
              <a
                key={area}
                href={`#section-${toAnchor(area)}`}
                onClick={e => {
                  e.preventDefault()
                  document.getElementById(`section-${toAnchor(area)}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-gray-100 hover:bg-blue-50 hover:text-blue-700 text-xs font-mono font-semibold text-gray-600 transition-colors border border-gray-200 hover:border-blue-200"
              >
                {familyCode}
                <span className="text-gray-400 font-sans font-normal">{grouped[area].length}</span>
              </a>
            )
          })}
        </div>

        {/* Expand / collapse all */}
        <button
          onClick={() => setAllExpanded(e => !e)}
          className="flex-shrink-0 text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 transition-colors"
        >
          {allExpanded ? 'Collapse all' : 'Expand all'}
          <svg className={`w-3 h-3 transition-transform ${allExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Grouped sections */}
      <div className="space-y-8">
        {areaOrder.map(area => {
          const areaChanges = grouped[area]
          const [familyCode, ...rest] = area.split(' — ')
          const familyName = rest.length > 0 ? rest.join(' — ') : null

          return (
            <div key={area} id={`section-${toAnchor(area)}`} className="scroll-mt-20">
              <div className="flex items-baseline gap-2 mb-3 pb-2 border-b border-gray-100">
                <span className="font-mono text-xs font-bold text-gray-900 bg-gray-100 border border-gray-200 px-2 py-0.5 rounded">
                  {familyCode}
                </span>
                {familyName && (
                  <span className="text-sm font-semibold text-gray-700">{familyName}</span>
                )}
                <span className="text-xs text-gray-400 ml-auto">
                  {areaChanges.length} {areaChanges.length === 1 ? 'change' : 'changes'}
                </span>
              </div>

              <div className="space-y-2">
                {areaChanges.map(change => (
                  <ChangeItem key={change.id} change={change} forceExpanded={allExpanded} />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
