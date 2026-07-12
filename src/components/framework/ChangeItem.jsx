import { useState } from 'react'
import { ChangeTypeBadge, SignificanceDot } from '../ui/Badge'
import { CHANGE_TYPES } from '../../utils/constants'

function ControlIdTag({ id, label }) {
  if (!id) return null
  return (
    <span className="inline-flex items-center gap-1 text-xs font-mono bg-gray-100 text-gray-700 px-2 py-0.5 rounded border border-gray-200">
      {label && <span className="text-gray-400">{label}</span>}
      {id}
    </span>
  )
}

function TextBlock({ label, text, type }) {
  const colors = {
    old: 'bg-red-50 border-red-100 text-red-900',
    new: 'bg-emerald-50 border-emerald-100 text-emerald-900',
    neutral: 'bg-gray-50 border-gray-200 text-gray-800',
  }
  return (
    <div>
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">{label}</p>
      <div className={`text-sm p-3 rounded-lg border ${colors[type] || colors.neutral} leading-relaxed`}>
        {text}
      </div>
    </div>
  )
}

export function ChangeItem({ change }) {
  const [expanded, setExpanded] = useState(false)
  const config = CHANGE_TYPES[change.type]

  const hasDetail = change.oldText || change.newText || change.rationale
  const controlIdDisplay = change.controlId?.new || change.controlId?.old

  return (
    <div
      className={`border rounded-xl overflow-hidden transition-all ${
        expanded
          ? `${config?.borderClass || 'border-gray-200'} shadow-sm`
          : 'border-gray-200 hover:border-gray-300'
      } bg-white`}
    >
      {/* Header row */}
      <button
        onClick={() => hasDetail && setExpanded(e => !e)}
        className={`w-full text-left px-4 py-3.5 flex items-center gap-3 ${hasDetail ? 'cursor-pointer' : 'cursor-default'}`}
      >
        {/* Type badge */}
        <div className="flex-shrink-0">
          <ChangeTypeBadge type={change.type} />
        </div>

        {/* Control ID */}
        {controlIdDisplay && (
          <div className="flex-shrink-0">
            <ControlIdTag id={controlIdDisplay} />
          </div>
        )}

        {/* Title */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">{change.title}</p>
          {change.area && (
            <p className="text-xs text-gray-400 mt-0.5 truncate">{change.area}</p>
          )}
        </div>

        {/* Right side: significance + tags + expand */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {change.significance && (
            <SignificanceDot level={change.significance} />
          )}
          {hasDetail && (
            <svg
              className={`w-4 h-4 text-gray-400 transition-transform ${expanded ? 'rotate-180' : ''}`}
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          )}
        </div>
      </button>

      {/* Expanded detail */}
      {expanded && hasDetail && (
        <div className="px-4 pb-4 border-t border-gray-100 pt-4 space-y-4">

          {/* Control ID mapping for renamed/restructured */}
          {change.controlId?.old && change.controlId?.new && change.controlId.old !== change.controlId.new && (
            <div className="flex items-center gap-2 text-sm">
              <ControlIdTag id={change.controlId.old} label="was " />
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              <ControlIdTag id={change.controlId.new} label="now " />
            </div>
          )}

          {/* STIG severity change */}
          {change.severity?.old && change.severity?.new && (
            <div className="flex items-center gap-2 text-xs">
              <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded font-semibold">{change.severity.old}</span>
              <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              <span className={`px-2 py-1 rounded font-semibold ${
                change.severity.new === 'CAT I' ? 'bg-red-100 text-red-700' :
                change.severity.new === 'CAT II' ? 'bg-amber-100 text-amber-700' :
                'bg-gray-100 text-gray-700'
              }`}>{change.severity.new}</span>
              <span className="text-gray-400">severity change</span>
            </div>
          )}

          {/* Text blocks */}
          {change.type === 'modified' && change.oldText && change.newText ? (
            <div className="space-y-3">
              <TextBlock label="Previous version" text={change.oldText} type="old" />
              <TextBlock label="Current version" text={change.newText} type="new" />
            </div>
          ) : change.type === 'removed' && change.oldText ? (
            <TextBlock label="Removed text" text={change.oldText} type="old" />
          ) : change.newText ? (
            <TextBlock label="New text" text={change.newText} type="new" />
          ) : null}

          {/* Rationale */}
          {change.rationale && (
            <div>
              <div className="flex items-center gap-1.5 mb-1.5">
                <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Why this changed</p>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">{change.rationale}</p>
            </div>
          )}

          {/* Tags */}
          {change.tags && change.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-gray-100">
              {change.tags.map(tag => (
                <span key={tag} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full font-medium">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
