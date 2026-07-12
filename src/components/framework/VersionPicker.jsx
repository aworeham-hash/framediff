import { useMemo } from 'react'
import { resolveTransition, canResolve } from '../../utils/transitions'

export function VersionPicker({ framework, fromVersion, toVersion, onChange }) {
  const versions = framework?.versions || []

  // Which "to" options are reachable from the current "from"
  const reachableFrom = useMemo(() => {
    const set = new Set()
    versions.forEach(v => {
      if (v !== fromVersion && canResolve(framework, fromVersion, v)) set.add(v)
    })
    return set
  }, [framework, fromVersion, versions])

  // Which "from" options can reach the current "to"
  const reachableTo = useMemo(() => {
    const set = new Set()
    versions.forEach(v => {
      if (v !== toVersion && canResolve(framework, v, toVersion)) set.add(v)
    })
    return set
  }, [framework, toVersion, versions])

  if (versions.length < 2) return null

  const handleFromChange = (newFrom) => {
    if (newFrom === toVersion) {
      // Auto-pick the next reachable "to"
      const newTo = versions.find(v => v !== newFrom && canResolve(framework, newFrom, v)) || toVersion
      onChange(newFrom, newTo)
    } else {
      onChange(newFrom, toVersion)
    }
  }

  const handleToChange = (newTo) => {
    if (newTo === fromVersion) {
      const newFrom = versions.find(v => v !== newTo && canResolve(framework, v, newTo)) || fromVersion
      onChange(newFrom, newTo)
    } else {
      onChange(fromVersion, newTo)
    }
  }

  const resolved = resolveTransition(framework, fromVersion, toVersion)
  const isChained = resolved?.chained

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs text-gray-500 font-medium">Compare versions</span>

        {/* FROM dropdown */}
        <div className="relative">
          <select
            value={fromVersion}
            onChange={e => handleFromChange(e.target.value)}
            className="appearance-none bg-white border border-gray-200 text-gray-900 text-sm font-semibold rounded-lg pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            {versions.map(v => (
              <option key={v} value={v} disabled={!reachableTo.has(v) && v !== fromVersion}>
                {v}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5">
            <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        <div className="flex items-center gap-1 text-gray-400">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>

        {/* TO dropdown */}
        <div className="relative">
          <select
            value={toVersion}
            onChange={e => handleToChange(e.target.value)}
            className="appearance-none bg-white border border-gray-200 text-gray-900 text-sm font-semibold rounded-lg pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            {versions.map(v => (
              <option key={v} value={v} disabled={!reachableFrom.has(v) && v !== toVersion}>
                {v}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5">
            <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* No path warning */}
        {!resolved && fromVersion !== toVersion && (
          <span className="text-xs text-amber-600 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-md">
            No comparison path available
          </span>
        )}
      </div>

      {/* Chaining notice */}
      {isChained && resolved.chainedThrough && (
        <div className="flex items-center gap-1.5 text-xs text-blue-600 bg-blue-50 border border-blue-100 rounded-md px-3 py-1.5">
          <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>
            Chained comparison via:{' '}
            <span className="font-medium">{resolved.chainedThrough.join(' then ')}</span>
          </span>
        </div>
      )}
    </div>
  )
}
