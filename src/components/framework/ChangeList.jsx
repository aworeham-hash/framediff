import { ChangeItem } from './ChangeItem'
import { EmptyState } from '../ui/EmptyState'

export function ChangeList({ changes, filter, searchQuery }) {
  if (changes.length === 0) {
    return <EmptyState searchQuery={searchQuery} filter={filter} />
  }

  // Group by area for cleaner reading
  const grouped = {}
  changes.forEach(change => {
    const area = change.area || 'Other'
    if (!grouped[area]) grouped[area] = []
    grouped[area].push(change)
  })

  const areas = Object.keys(grouped)

  // If all changes are in one area, or no meaningful grouping, render flat
  if (areas.length <= 1 || changes.length <= 5) {
    return (
      <div className="space-y-2">
        {changes.map(change => (
          <ChangeItem key={change.id} change={change} />
        ))}
      </div>
    )
  }

  // Grouped view
  return (
    <div className="space-y-6">
      {areas.map(area => (
        <div key={area}>
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{area}</h3>
            <span className="text-xs bg-gray-100 text-gray-400 px-1.5 py-0.5 rounded font-medium">
              {grouped[area].length}
            </span>
          </div>
          <div className="space-y-2">
            {grouped[area].map(change => (
              <ChangeItem key={change.id} change={change} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
