import { ChangeItem } from './ChangeItem'
import { EmptyState } from '../ui/EmptyState'

export function ChangeList({ changes, filter, searchQuery }) {
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

  // Render flat if only one group or very few changes
  if (areaOrder.length <= 1 || changes.length <= 4) {
    return (
      <div className="space-y-2">
        {changes.map(change => (
          <ChangeItem key={change.id} change={change} />
        ))}
      </div>
    )
  }

  // Grouped view with section headers
  return (
    <div className="space-y-8">
      {areaOrder.map(area => {
        const areaChanges = grouped[area]
        // Extract short family code if present (e.g. "AC — Access Control" → "AC")
        const [familyCode, ...rest] = area.split(' — ')
        const familyName = rest.length > 0 ? rest.join(' — ') : null

        return (
          <div key={area}>
            {/* Section header */}
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

            {/* Changes within this family */}
            <div className="space-y-2">
              {areaChanges.map(change => (
                <ChangeItem key={change.id} change={change} />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
