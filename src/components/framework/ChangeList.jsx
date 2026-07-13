import { useState } from 'react'
import { ChangeItem } from './ChangeItem'
import { EmptyState } from '../ui/EmptyState'

function parseControlId(id) {
  if (!id) return { prefix: 'ZZZ', nums: [999, 999, 999] }
  const first = id.split(',')[0].trim()
  const nistMatch = first.match(/^([A-Z]{2,}(?:\.[A-Z]{2,})?)-(\d+)(?:\((\d+)\))?/i)
  if (nistMatch) {
    return {
      prefix: nistMatch[1].toUpperCase(),
      nums: [parseInt(nistMatch[2] || '0'), parseInt(nistMatch[3] || '0'), 0],
    }
  }
  const reqMatch = first.match(/(?:requirement|section|req\.?)\s*([\d.]+)/i)
  if (reqMatch) {
    const parts = reqMatch[1].split('.').map(n => parseInt(n) || 0)
    return { prefix: 'REQ', nums: [parts[0] || 0, parts[1] || 0, parts[2] || 0] }
  }
  const numMatch = first.match(/^(\d+)$/)
  if (numMatch) return { prefix: 'NUM', nums: [parseInt(numMatch[1]), 0, 0] }
  const revMatch = first.match(/rev\.?\s*(\d+)/i)
  if (revMatch) return { prefix: 'REV', nums: [parseInt(revMatch[1]), 0, 0] }
  return { prefix: first.toUpperCase(), nums: [0, 0, 0] }
}

function compareControlIds(a, b) {
  const pa = parseControlId(a)
  const pb = parseControlId(b)
  if (pa.prefix !== pb.prefix) return pa.prefix.localeCompare(pb.prefix)
  for (let i = 0; i < 3; i++) {
    const diff = pa.nums[i] - pb.nums[i]
    if (diff !== 0) return diff
  }
  return 0
}

function sortAreas(areas) {
  return [...areas].sort((a, b) => {
    const codeA = a.split(' — ')[0].trim()
    const codeB = b.split(' — ')[0].trim()
    return compareControlIds(codeA, codeB)
  })
}

function sortChanges(changes) {
  return [...changes].sort((a, b) => {
    const idA = a.controlId?.new || a.controlId?.old || ''
    const idB = b.controlId?.new || b.controlId?.old || ''
    return compareControlIds(idA, idB)
  })
}

// View mode toggle button
function ViewToggle({ mode, onChange }) {
  return (
    <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-0.5">
      <button
        onClick={() => onChange('cards')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
          mode === 'cards'
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        </svg>
        Cards
      </button>
      <button
        onClick={() => onChange('document')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
          mode === 'document'
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        Document
      </button>
    </div>
  )
}

export function ChangeList({ changes, filter, searchQuery, fromVersion, toVersion, triage = {}, onTriageChange }) {
  const [allExpanded, setAllExpanded] = useState(false)
  const [viewMode, setViewMode]       = useState('cards')

  if (changes.length === 0) {
    return <EmptyState searchQuery={searchQuery} filter={filter} />
  }

  const isDocument = viewMode === 'document'

  // Group by area
  const grouped = {}
  const areaOrder = []
  changes.forEach(change => {
    const area = change.area || 'Other'
    if (!grouped[area]) { grouped[area] = []; areaOrder.push(area) }
    grouped[area].push(change)
  })

  const sortedAreas    = sortAreas(areaOrder)
  const sortedGrouped  = {}
  sortedAreas.forEach(area => { sortedGrouped[area] = sortChanges(grouped[area]) })

  const toAnchor = (area) => area.toLowerCase().replace(/[^a-z0-9]+/g, '-')

  // Flat sorted (used when 1 area or few items)
  const flat = sortChanges(changes)
  const singleGroup = sortedAreas.length <= 1 || changes.length <= 4

  const toolbar = (
    <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
      {/* Jump links (only in card multi-group mode) */}
      {!singleGroup && !isDocument && (
        <div className="flex flex-wrap gap-1.5 flex-1 min-w-0">
          {sortedAreas.map(area => {
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
                <span className="text-gray-400 font-sans font-normal">{sortedGrouped[area].length}</span>
              </a>
            )
          })}
        </div>
      )}

      <div className="flex items-center gap-3 ml-auto flex-shrink-0">
        <ViewToggle mode={viewMode} onChange={setViewMode} />
        {!isDocument && changes.length > 3 && (
          <button
            onClick={() => setAllExpanded(e => !e)}
            className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 transition-colors"
          >
            {allExpanded ? 'Collapse all' : 'Expand all'}
            <svg className={`w-3 h-3 transition-transform ${allExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        )}
      </div>
    </div>
  )

  if (singleGroup || isDocument) {
    return (
      <div>
        {toolbar}
        <div className={isDocument ? 'space-y-5' : 'space-y-2'}>
          {flat.map(change => (
            <ChangeItem
              key={change.id}
              change={change}
              forceExpanded={allExpanded}
              documentMode={isDocument}
              fromVersion={fromVersion}
              toVersion={toVersion}
              triageValue={triage[change.id]}
              onTriageChange={onTriageChange}
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div>
      {toolbar}
      <div className="space-y-8">
        {sortedAreas.map(area => {
          const areaChanges = sortedGrouped[area]
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
                  <ChangeItem
                    key={change.id}
                    change={change}
                    forceExpanded={allExpanded}
                    documentMode={false}
                    fromVersion={fromVersion}
                    toVersion={toVersion}
                    triageValue={triage[change.id]}
                    onTriageChange={onTriageChange}
                  />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
