import { useState } from 'react'

const TYPE_STYLES = {
  added:        { bar: 'bg-emerald-500', badge: 'bg-emerald-50 text-emerald-700 border-emerald-200', label: 'Added' },
  removed:      { bar: 'bg-red-400',     badge: 'bg-red-50 text-red-700 border-red-200',             label: 'Removed' },
  modified:     { bar: 'bg-blue-500',    badge: 'bg-blue-50 text-blue-700 border-blue-200',           label: 'Modified' },
  restructured: { bar: 'bg-amber-400',   badge: 'bg-amber-50 text-amber-700 border-amber-200',        label: 'Restructured' },
  renamed:      { bar: 'bg-purple-400',  badge: 'bg-purple-50 text-purple-700 border-purple-200',     label: 'Renamed' },
}

const IMPACT_STYLES = {
  high:   { dot: 'bg-red-400',   text: 'text-red-600',   label: 'High impact' },
  medium: { dot: 'bg-amber-400', text: 'text-amber-600', label: 'Medium impact' },
  low:    { dot: 'bg-gray-300',  text: 'text-gray-400',  label: 'Low impact' },
}

function truncate(str, n) {
  if (!str || str.length <= n) return str
  return str.slice(0, n).trimEnd() + '…'
}

// Find the character index where two strings first diverge, backed up to a word boundary
function findDivergence(a, b) {
  let i = 0
  const minLen = Math.min(a.length, b.length)
  while (i < minLen && a[i] === b[i]) i++
  while (i > 0 && a[i - 1] !== ' ' && a[i - 1] !== '.') i--
  return i
}

// Extract { context, oldTail, newTail } — the part that actually differs, with a short shared context prefix
function extractDiff(oldText, newText) {
  if (!oldText || !newText) return null
  const div = findDivergence(oldText, newText)

  // Find the nearest sentence/clause break before the divergence point to use as context anchor
  const before = oldText.slice(0, div)
  const lastBreak = Math.max(
    before.lastIndexOf('. ') + 2,
    before.lastIndexOf(': ') + 2,
    before.lastIndexOf('; ') + 2,
  )
  const contextStart = lastBreak > 0 && div - lastBreak < 200 ? lastBreak : Math.max(0, div - 100)
  const hasContext = contextStart > 0

  return {
    context:    hasContext ? '…' + oldText.slice(contextStart, div) : oldText.slice(0, div),
    oldTail:    oldText.slice(div),
    newTail:    newText.slice(div),
    hasContext,
  }
}

// Auto-generate bullet points from the portion that was added/changed
function computeChangeBullets(oldText, newText) {
  if (!oldText || !newText) return []
  const div = findDivergence(oldText, newText)
  const added = newText.slice(div).trim().replace(/^[;:,\s—–]+/, '')
  if (added.length < 15) return []

  const bullets = added
    .replace(/\.\s+(?=[A-Z])/g, '.|SPLIT|')
    .replace(/;\s*/g, '|SPLIT|')
    .replace(/\s*—\s*/g, '|SPLIT|')
    .split('|SPLIT|')
    .map(s => s.trim().replace(/^[-•→]\s*/, '').replace(/[;,.]$/, '').trim())
    .filter(s => s.length > 18)
    .slice(0, 5)

  return bullets
}

function DiffPreview({ change }) {
  const { type, oldText, newText } = change

  if (type === 'modified' && oldText && newText) {
    const diff = extractDiff(oldText, newText)
    const bullets = computeChangeBullets(oldText, newText)

    return (
      <div className="mt-3 space-y-2.5">

        {/* What changed — bullet summary */}
        {bullets.length > 0 && (
          <div className="bg-slate-50 border border-slate-200 rounded-md px-3 py-2.5">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">What changed</p>
            <ul className="space-y-1.5">
              {bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                  <span className="text-blue-400 mt-0.5 flex-shrink-0 font-bold">→</span>
                  <span className="leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Context-anchored before / after — shows only the diverging portion */}
        {diff && (diff.oldTail || diff.newTail) && (
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-md border border-red-100 bg-red-50 px-3 py-2">
              <p className="text-xs font-semibold text-red-500 uppercase tracking-widest mb-1.5">Before</p>
              <p className="text-xs leading-relaxed text-red-900">
                {diff.hasContext && (
                  <span className="text-red-400 italic">{diff.context} </span>
                )}
                <span className="line-through decoration-red-300">{truncate(diff.oldTail, 220)}</span>
              </p>
            </div>
            <div className="rounded-md border border-emerald-100 bg-emerald-50 px-3 py-2">
              <p className="text-xs font-semibold text-emerald-600 uppercase tracking-widest mb-1.5">After</p>
              <p className="text-xs leading-relaxed text-emerald-900">
                {diff.hasContext && (
                  <span className="text-emerald-500 italic">{diff.context} </span>
                )}
                <span className="font-medium">{truncate(diff.newTail, 220)}</span>
              </p>
            </div>
          </div>
        )}
      </div>
    )
  }

  if (type === 'removed' && oldText) {
    return (
      <div className="mt-3 rounded-md border border-red-100 bg-red-50 px-3 py-2">
        <p className="text-xs font-semibold text-red-500 uppercase tracking-widest mb-1">Removed</p>
        <p className="text-xs text-red-800 leading-relaxed">{truncate(oldText, 280)}</p>
      </div>
    )
  }

  if (newText) {
    // For "added" controls, break the requirement text into bullet points too
    const bullets = type === 'added' ? newText
      .replace(/\.\s+(?=[A-Z])/g, '.|SPLIT|')
      .replace(/;\s*/g, '|SPLIT|')
      .split('|SPLIT|')
      .map(s => s.trim().replace(/[;,.]$/, '').trim())
      .filter(s => s.length > 20)
      .slice(0, 6) : []

    return (
      <div className="mt-3 rounded-md border border-emerald-100 bg-emerald-50 px-3 py-2.5">
        <p className="text-xs font-semibold text-emerald-600 uppercase tracking-widest mb-1.5">
          {type === 'added' ? 'New requirement' : 'Current text'}
        </p>
        {bullets.length > 1 ? (
          <ul className="space-y-1.5">
            {bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-emerald-800">
                <span className="text-emerald-400 mt-0.5 flex-shrink-0">→</span>
                <span className="leading-relaxed">{b}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-xs text-emerald-800 leading-relaxed">{truncate(newText, 280)}</p>
        )}
      </div>
    )
  }

  return null
}

export function ChangeItem({ change, forceExpanded = false }) {
  const [localExpanded, setLocalExpanded] = useState(false)
  const expanded = forceExpanded || localExpanded
  const style = TYPE_STYLES[change.type] || TYPE_STYLES.modified
  const impact = IMPACT_STYLES[change.significance]

  const controlId = change.controlId?.new || change.controlId?.old
  const hasIdChange = change.controlId?.old && change.controlId?.new && change.controlId.old !== change.controlId.new
  const idDisplay = hasIdChange ? `${change.controlId.old} → ${change.controlId.new}` : controlId
  const hasFullDetail = change.oldText || change.newText || change.rationale

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white hover:border-gray-300 transition-colors">
      <div className="flex">
        <div className={`w-1 flex-shrink-0 ${style.bar}`} />

        <div className="flex-1 min-w-0 px-4 py-3.5">

          {/* Top row: type + control ID + impact */}
          <div className="flex items-center gap-2 flex-wrap mb-2">
            <span className={`text-xs font-semibold px-2 py-0.5 rounded border ${style.badge}`}>
              {style.label}
            </span>
            {idDisplay && (
              <span className="font-mono text-xs bg-gray-100 text-gray-700 border border-gray-200 px-1.5 py-0.5 rounded">
                {idDisplay}
              </span>
            )}
            {impact && (
              <span className="flex items-center gap-1 ml-auto flex-shrink-0">
                <span className={`w-1.5 h-1.5 rounded-full ${impact.dot}`} />
                <span className={`text-xs ${impact.text}`}>{impact.label}</span>
              </span>
            )}
          </div>

          {/* Title + area */}
          <p className="text-sm font-semibold text-gray-900 leading-snug">{change.title}</p>
          {change.area && (
            <p className="text-xs text-gray-400 mt-0.5">{change.area}</p>
          )}

          {/* Inline diff with bullets */}
          <DiffPreview change={change} />

          {/* Rationale preview */}
          {change.rationale && !expanded && (
            <p className="text-xs text-gray-500 mt-3 leading-relaxed">
              <span className="font-semibold text-gray-600">Why: </span>
              {truncate(change.rationale, 200)}
            </p>
          )}

          {/* Expanded: full text */}
          {expanded && (
            <div className="mt-4 pt-4 border-t border-gray-100 space-y-4">
              {change.type === 'modified' && change.oldText && change.newText && (
                <div className="space-y-2">
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1">Full previous text</p>
                    <div className="text-sm text-red-900 bg-red-50 border border-red-100 rounded-lg p-3 leading-relaxed">{change.oldText}</div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1">Full current text</p>
                    <div className="text-sm text-emerald-900 bg-emerald-50 border border-emerald-100 rounded-lg p-3 leading-relaxed">{change.newText}</div>
                  </div>
                </div>
              )}
              {change.type === 'removed' && change.oldText && (
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1">Full removed text</p>
                  <div className="text-sm text-red-900 bg-red-50 border border-red-100 rounded-lg p-3 leading-relaxed">{change.oldText}</div>
                </div>
              )}
              {change.type !== 'modified' && change.type !== 'removed' && change.newText && (
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1">Full text</p>
                  <div className="text-sm text-emerald-900 bg-emerald-50 border border-emerald-100 rounded-lg p-3 leading-relaxed">{change.newText}</div>
                </div>
              )}
              {change.rationale && (
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1.5">Why this changed</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{change.rationale}</p>
                </div>
              )}
              {change.tags && change.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-gray-100">
                  {change.tags.map(tag => (
                    <span key={tag} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Expand toggle */}
          {hasFullDetail && (
            <button
              onClick={() => setLocalExpanded(e => !e)}
              className="mt-3 text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 transition-colors"
            >
              {expanded ? 'Show less' : 'Show full text & rationale'}
              <svg className={`w-3 h-3 transition-transform ${expanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          )}

        </div>
      </div>
    </div>
  )
}
