// Tri-state gap-assessment control: Relevant / N/A / Done
const STATES = [
  { key: 'relevant', label: 'Relevant', active: 'bg-blue-600 text-white border-blue-600', title: 'Mark as relevant to your organization' },
  { key: 'done', label: 'Done', active: 'bg-emerald-600 text-white border-emerald-600', title: 'Mark as addressed' },
  { key: 'na', label: 'N/A', active: 'bg-gray-500 text-white border-gray-500', title: 'Mark as not applicable' },
]

export function TriageControl({ value, onChange, compact = false }) {
  return (
    <span
      className="inline-flex items-center gap-0.5 flex-shrink-0"
      onClick={e => e.stopPropagation()}
    >
      {STATES.map(s => (
        <button
          key={s.key}
          title={s.title}
          onClick={() => onChange(value === s.key ? null : s.key)}
          className={`${compact ? 'px-1.5' : 'px-2'} py-0.5 rounded text-[10px] font-semibold border transition-colors ${
            value === s.key ? s.active : 'bg-white text-gray-400 border-gray-200 hover:border-gray-300 hover:text-gray-600'
          }`}
        >
          {s.label}
        </button>
      ))}
    </span>
  )
}

export function TriageProgress({ changes, triage, onClear, onExportReport, onExportJson, onImportJson }) {
  const total = changes.length
  const counts = { relevant: 0, na: 0, done: 0 }
  changes.forEach(c => { if (triage[c.id]) counts[triage[c.id]]++ })
  const reviewed = counts.relevant + counts.na + counts.done
  if (total === 0) return null

  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50/60 px-4 py-3">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2 text-xs">
          <svg className="w-3.5 h-3.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
          <span className="font-semibold text-gray-700">Gap assessment</span>
          <span className="text-gray-500">
            {reviewed} of {total} reviewed
            {reviewed > 0 && <> · <span className="text-blue-600 font-medium">{counts.relevant} relevant</span> · <span className="text-emerald-600 font-medium">{counts.done} done</span> · <span className="text-gray-500">{counts.na} n/a</span></>}
          </span>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          {onExportReport && reviewed > 0 && (
            <button onClick={onExportReport} className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors">
              Export gap report (PDF)
            </button>
          )}
          {onExportJson && reviewed > 0 && (
            <button onClick={onExportJson} className="text-xs text-gray-400 hover:text-blue-600 transition-colors" title="Download triage state to share with a teammate">
              Export
            </button>
          )}
          {onImportJson && (
            <label className="text-xs text-gray-400 hover:text-blue-600 transition-colors cursor-pointer" title="Load a teammate's exported triage state">
              Import
              <input type="file" accept=".json" className="hidden" onChange={onImportJson} />
            </label>
          )}
          <span className="text-[10px] text-gray-400">Saved in your browser</span>
          {reviewed > 0 && (
            <button onClick={onClear} className="text-xs text-gray-400 hover:text-red-600 transition-colors">Reset</button>
          )}
        </div>
      </div>
      <div className="mt-2 h-1.5 bg-gray-200 rounded-full overflow-hidden flex">
        <div className="bg-emerald-500 h-full transition-all" style={{ width: `${(counts.done / total) * 100}%` }} />
        <div className="bg-blue-500 h-full transition-all" style={{ width: `${(counts.relevant / total) * 100}%` }} />
        <div className="bg-gray-400 h-full transition-all" style={{ width: `${(counts.na / total) * 100}%` }} />
      </div>
    </div>
  )
}
