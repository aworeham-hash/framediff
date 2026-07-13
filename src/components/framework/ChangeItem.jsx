import { useState } from 'react'
import { TriageControl } from './TriageControl'

function TypeBadge({ type }) {
  const styles = {
    added:        'bg-emerald-50 text-emerald-700 border-emerald-200',
    removed:      'bg-red-50 text-red-700 border-red-200',
    modified:     'bg-blue-50 text-blue-700 border-blue-200',
    restructured: 'bg-violet-50 text-violet-700 border-violet-200',
  }
  const labels = { added: 'Added', removed: 'Removed', modified: 'Modified', restructured: 'Restructured' }
  return (
    <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs font-semibold border ${styles[type] || styles.modified}`}>
      {labels[type] || type}
    </span>
  )
}

function SignificanceDot({ significance }) {
  if (!significance || significance === 'low') return null
  const styles = { medium: 'bg-amber-400', high: 'bg-red-500' }
  const labels = { medium: 'Medium impact', high: 'High impact' }
  return (
    <span className="flex items-center gap-1 text-xs text-gray-400">
      <span className={`w-1.5 h-1.5 rounded-full ${styles[significance]}`} />
      {labels[significance]}
    </span>
  )
}

// ── Card / collapsible view ────────────────────────────────────────────────
function ChangeItemCard({ change, forceExpanded, triageValue, onTriageChange }) {
  const [expanded, setExpanded] = useState(false)
  const isOpen = forceExpanded || expanded
  const controlId = change.controlId || {}
  const displayId = controlId.new || controlId.old || '—'
  const idChanged  = controlId.old && controlId.new && controlId.old !== controlId.new

  return (
    <div className={`border rounded-lg overflow-hidden transition-all ${isOpen ? 'border-blue-200 shadow-sm' : 'border-gray-200'}`}>
      <button
        onClick={() => setExpanded(e => !e)}
        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50/70 transition-colors"
      >
        <TypeBadge type={change.type} />
        <code className="text-xs font-bold text-gray-800 font-mono bg-gray-100 border border-gray-200 px-1.5 py-0.5 rounded flex-shrink-0">
          {displayId}
        </code>
        {idChanged && (
          <span className="text-xs text-gray-400 flex-shrink-0">← was {controlId.old}</span>
        )}
        <span className="text-sm text-gray-700 font-medium flex-1 truncate">{change.title}</span>
        {onTriageChange && (
          <TriageControl compact value={triageValue} onChange={v => onTriageChange(change.id, v)} />
        )}
        <SignificanceDot significance={change.significance} />
        {change._viaTransition && (
          <span className="text-xs text-blue-400 flex-shrink-0">{change._viaTransition}</span>
        )}
        <svg className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="border-t border-gray-100 px-4 pb-4 pt-3 space-y-3">
          {(change.oldText || change.newText) && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Before</p>
                {change.oldText
                  ? <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 border border-gray-100 rounded-md p-3">{change.oldText}</p>
                  : <p className="text-sm text-gray-300 italic p-3">Control did not previously exist.</p>}
              </div>
              <div>
                <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-1.5">After</p>
                {change.newText
                  ? <p className="text-sm text-gray-800 leading-relaxed bg-blue-50/40 border border-blue-100 rounded-md p-3">{change.newText}</p>
                  : <p className="text-sm text-gray-300 italic p-3">Control removed.</p>}
              </div>
            </div>
          )}
          {change.rationale && (
            <div className="text-sm text-gray-600 leading-relaxed">
              <span className="font-semibold text-gray-700">Why: </span>{change.rationale}
            </div>
          )}
          {change.tags?.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {change.tags.filter(t => !['metadata-only'].includes(t)).map(tag => (
                <span key={tag} className="text-xs text-gray-400 bg-gray-50 border border-gray-100 px-2 py-0.5 rounded-full">{tag}</span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ── Document / always-expanded view ───────────────────────────────────────
function ChangeItemDocument({ change, fromVersion, toVersion, triageValue, onTriageChange }) {
  const controlId = change.controlId || {}
  const displayId = controlId.new || controlId.old || '—'
  const idChanged  = controlId.old && controlId.new && controlId.old !== controlId.new
  const noText     = !change.oldText && !change.newText
  const viaLabel   = change._viaTransition || null

  const fromLabel = viaLabel
    ? viaLabel.split(' → ')[0]
    : fromVersion || 'Previous'
  const toLabel = viaLabel
    ? viaLabel.split(' → ')[1]
    : toVersion || 'Current'

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-3 bg-gray-50 border-b border-gray-200">
        <TypeBadge type={change.type} />
        <code className="font-mono text-sm font-bold text-gray-900 bg-white border border-gray-200 px-2 py-0.5 rounded flex-shrink-0">
          {displayId}
        </code>
        {idChanged && (
          <span className="text-xs text-gray-400 flex-shrink-0">← was {controlId.old}</span>
        )}
        <span className="text-sm font-semibold text-gray-700 flex-1 min-w-0 truncate">{change.title}</span>
        {onTriageChange && (
          <TriageControl value={triageValue} onChange={v => onTriageChange(change.id, v)} />
        )}
        <SignificanceDot significance={change.significance} />
      </div>

      {/* Before / After columns */}
      {!noText ? (
        <div className="grid grid-cols-2 divide-x divide-gray-100 min-h-[80px]">
          <div className="p-4">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
              Previously <span className="normal-case font-normal text-gray-300">({fromLabel})</span>
            </p>
            {change.oldText
              ? <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">{change.oldText}</p>
              : change.type === 'added'
                ? <p className="text-sm text-gray-300 italic">Did not exist in this version.</p>
                : <p className="text-sm text-gray-300 italic">Full text restricted by copyright.</p>}
          </div>
          <div className="p-4 bg-blue-50/25">
            <p className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-2">
              Now <span className="normal-case font-normal text-blue-300">({toLabel})</span>
            </p>
            {change.newText
              ? <p className="text-sm text-gray-900 leading-relaxed whitespace-pre-wrap">{change.newText}</p>
              : change.type === 'removed'
                ? <p className="text-sm text-gray-300 italic">Control removed in this version.</p>
                : <p className="text-sm text-gray-300 italic">Full text restricted by copyright.</p>}
          </div>
        </div>
      ) : (
        // Metadata-only — show rationale full-width
        <div className="p-4 bg-amber-50/40">
          <p className="text-xs font-semibold text-amber-600 uppercase tracking-wide mb-1.5">Summary only — full text restricted</p>
          <p className="text-sm text-gray-700 leading-relaxed">{change.rationale}</p>
        </div>
      )}

      {/* Rationale (only when we also showed before/after) */}
      {!noText && change.rationale && (
        <div className="px-5 py-3 border-t border-gray-100 bg-white">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Why this changed: </span>
          <span className="text-sm text-gray-600 leading-relaxed">{change.rationale}</span>
        </div>
      )}

      {/* Via-transition label for chained views */}
      {viaLabel && (
        <div className="px-5 py-2 border-t border-dashed border-gray-100 bg-gray-50">
          <span className="text-xs text-gray-400">From transition: <span className="font-medium text-gray-500">{viaLabel}</span></span>
        </div>
      )}
    </div>
  )
}

// ── Public export ──────────────────────────────────────────────────────────
export function ChangeItem({ change, forceExpanded, documentMode, fromVersion, toVersion, triageValue, onTriageChange }) {
  if (documentMode) {
    return <ChangeItemDocument change={change} fromVersion={fromVersion} toVersion={toVersion} triageValue={triageValue} onTriageChange={onTriageChange} />
  }
  return <ChangeItemCard change={change} forceExpanded={forceExpanded} triageValue={triageValue} onTriageChange={onTriageChange} />
}
