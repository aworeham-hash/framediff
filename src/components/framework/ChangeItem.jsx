import { useState } from 'react'
import { CHANGE_TYPES } from '../../utils/constants'

const TYPE_STYLES = {
  added:       { bar: 'bg-emerald-500', badge: 'bg-emerald-50 text-emerald-700 border-emerald-200', label: 'Added' },
  removed:     { bar: 'bg-red-400',     badge: 'bg-red-50 text-red-700 border-red-200',             label: 'Removed' },
  modified:    { bar: 'bg-blue-500',    badge: 'bg-blue-50 text-blue-700 border-blue-200',           label: 'Modified' },
  restructured:{ bar: 'bg-amber-400',   badge: 'bg-amber-50 text-amber-700 border-amber-200',        label: 'Restructured' },
  renamed:     { bar: 'bg-purple-400',  badge: 'bg-purple-50 text-purple-700 border-purple-200',     label: 'Renamed' },
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

function ControlId({ id }) {
  if (!id) return null
  return (
    <span className="inline-block font-mono text-xs bg-gray-100 text-gray-700 border border-gray-200 px-1.5 py-0.5 rounded leading-none">
      {id}
    </span>
  )
}

function DiffPreview({ change }) {
  const { type, oldText, newText } = change

  if (type === 'modified' && oldText && newText) {
    return (
      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className="rounded-md border border-red-100 bg-red-50 px-3 py-2">
          <p className="text-xs font-semibold text-red-500 uppercase tracking-wide mb-1">Before</p>
          <p className="text-xs text-red-800 leading-relaxed">{truncate(oldText, 180)}</p>
        </div>
        <div className="rounded-md border border-emerald-100 bg-emerald-50 px-3 py-2">
          <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wide mb-1">After</p>
          <p className="text-xs text-emerald-800 leading-relaxed">{truncate(newText, 180)}</p>
        </div>
      </div>
    )
  }

  if (type === 'removed' && oldText) {
    return (
      <div className="mt-3 rounded-md border border-red-100 bg-red-50 px-3 py-2">
        <p className="text-xs font-semibold text-red-500 uppercase tracking-wide mb-1">Removed</p>
        <p className="text-xs text-red-800 leading-relaxed">{truncate(oldText, 260)}</p>
      </div>
    )
  }

  if (newText) {
    return (
      <div className="mt-3 rounded-md border border-emerald-100 bg-emerald-50 px-3 py-2">
        <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wide mb-1">
          {type === 'added' ? 'New requirement' : 'Current text'}
        </p>
        <p className="text-xs text-emerald-800 leading-relaxed">{truncate(newText, 260)}</p>
      </div>
    )
  }

  return null
}

export function ChangeItem({ change }) {
  const [expanded, setExpanded] = useState(false)
  const style = TYPE_STYLES[change.type] || TYPE_STYLES.modified
  const impact = IMPACT_STYLES[change.significance]

  const controlId = change.controlId?.new || change.controlId?.old
  const hasIdChange = change.controlId?.old && change.controlId?.new && change.controlId.old !== change.controlId.new
  const hasFullDetail = change.oldText || change.newText || change.rationale

  // Show the rename mapping inline
  const idDisplay = hasIdChange
    ? `${change.controlId.old} → ${change.controlId.new}`
    : controlId

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white hover:border-gray-300 transition-colors">

      {/* Colored left bar */}
      <div className="flex">
        <div className={`w-1 flex-shrink-0 ${style.bar}`} />

        <div className="flex-1 min-w-0 px-4 py-3.5">
          {/* Top row: type badge + control ID + impact */}
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

          {/* Title */}
          <p className="text-sm font-semibold text-gray-900 leading-snug">{change.title}</p>

          {/* Area */}
          {change.area && (
            <p className="text-xs text-gray-400 mt-0.5">{change.area}</p>
          )}

          {/* Inline diff preview — always visible */}
          <DiffPreview change={change} />

          {/* Rationale preview */}
          {change.rationale && !expanded && (
            <p className="text-xs text-gray-500 mt-3 leading-relaxed">
              <span className="font-semibold text-gray-600">Why: </span>
              {truncate(change.rationale, 200)}
            </p>
          )}

          {/* Expanded full detail */}
          {expanded && (
            <div className="mt-4 pt-4 border-t border-gray-100 space-y-4">

              {/* Full diff if text was truncated */}
              {change.type === 'modified' && change.oldText && change.newText && (
                <div className="space-y-2">
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Full previous text</p>
                    <div className="text-sm text-red-900 bg-red-50 border border-red-100 rounded-lg p-3 leading-relaxed">{change.oldText}</div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Full current text</p>
                    <div className="text-sm text-emerald-900 bg-emerald-50 border border-emerald-100 rounded-lg p-3 leading-relaxed">{change.newText}</div>
                  </div>
                </div>
              )}
              {change.type === 'removed' && change.oldText && (
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Full removed text</p>
                  <div className="text-sm text-red-900 bg-red-50 border border-red-100 rounded-lg p-3 leading-relaxed">{change.oldText}</div>
                </div>
              )}
              {change.type !== 'modified' && change.type !== 'removed' && change.newText && (
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Full text</p>
                  <div className="text-sm text-emerald-900 bg-emerald-50 border border-emerald-100 rounded-lg p-3 leading-relaxed">{change.newText}</div>
                </div>
              )}

              {/* Full rationale */}
              {change.rationale && (
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Why this changed</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{change.rationale}</p>
                </div>
              )}

              {/* Tags */}
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

          {/* Expand / collapse toggle */}
          {hasFullDetail && (
            <button
              onClick={() => setExpanded(e => !e)}
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
