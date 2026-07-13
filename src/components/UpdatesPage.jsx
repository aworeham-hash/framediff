import { frameworksData } from '../data/registry'
import { DEADLINES } from '../data/deadlines'
import { useEffect } from 'react'

const KIND_STYLES = {
  deadline: 'bg-red-50 text-red-700 border-red-200',
  expected: 'bg-amber-50 text-amber-700 border-amber-200',
  recurring: 'bg-blue-50 text-blue-700 border-blue-200',
  watch: 'bg-gray-50 text-gray-600 border-gray-200',
}
const KIND_LABELS = { deadline: 'Hard deadline', expected: 'Expected', recurring: 'Recurring', watch: 'Watching' }

function releaseEntries() {
  const entries = []
  for (const fw of Object.values(frameworksData)) {
    for (const t of Object.values(fw.transitions || {})) {
      if (!t.toReleaseDate) continue
      entries.push({
        date: t.toReleaseDate,
        frameworkId: fw.id,
        frameworkName: fw.shortName || fw.name,
        title: `${fw.shortName || fw.name}: ${t.fromVersion} → ${t.toVersion}`,
        changes: (t.changes || []).length,
        highlight: t.summary?.highlights?.[0] || '',
      })
    }
  }
  return entries.sort((a, b) => b.date.localeCompare(a.date))
}

export function UpdatesPage({ onSelectFramework, onHome }) {
  useEffect(() => {
    document.title = 'Compliance Framework Updates & Deadlines - FrameDiff'
    return () => { document.title = 'FrameDiff - Compliance Framework Version Tracker' }
  }, [])

  const releases = releaseEntries()

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 py-10">
        <button onClick={onHome} className="text-xs text-gray-400 hover:text-blue-600 transition-colors mb-6 inline-flex items-center gap-1">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          Home
        </button>
        <h1 className="text-2xl font-bold text-gray-950 tracking-tight">Updates & deadlines</h1>
        <p className="text-sm text-gray-500 mt-1.5 mb-8">
          Upcoming compliance dates and recent framework releases, in one place. Sources verified July 2026.
        </p>

        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Upcoming dates</h2>
        <div className="space-y-2 mb-10">
          {DEADLINES.map(d => (
            <button
              key={d.title}
              onClick={() => onSelectFramework(d.frameworkId)}
              className="w-full text-left border border-gray-200 hover:border-blue-200 hover:bg-blue-50/30 rounded-lg px-4 py-3 transition-colors"
            >
              <div className="flex items-center gap-3 flex-wrap">
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${KIND_STYLES[d.kind]}`}>{KIND_LABELS[d.kind]}</span>
                <span className="text-xs font-semibold text-gray-900">{d.dateLabel}</span>
                <span className="text-sm font-medium text-gray-700 flex-1 min-w-0">{d.title}</span>
              </div>
              <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">{d.detail}</p>
            </button>
          ))}
        </div>

        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Recent framework releases</h2>
        <div className="space-y-2">
          {releases.map(r => (
            <button
              key={r.title}
              onClick={() => onSelectFramework(r.frameworkId)}
              className="w-full text-left border border-gray-200 hover:border-blue-200 hover:bg-blue-50/30 rounded-lg px-4 py-3 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-gray-400 flex-shrink-0 w-20">{r.date}</span>
                <span className="text-sm font-medium text-gray-800 flex-1 min-w-0 truncate">{r.title}</span>
                <span className="text-xs text-gray-400 flex-shrink-0">{r.changes} changes</span>
              </div>
              {r.highlight && <p className="text-xs text-gray-500 mt-1 leading-relaxed line-clamp-2 pl-[92px]">{r.highlight}</p>}
            </button>
          ))}
        </div>

        <p className="text-xs text-gray-400 mt-10 pt-4 border-t border-gray-100">
          Dates reflect official publisher announcements and may change. Always confirm with the framework publisher before planning compliance work.
        </p>
      </div>
    </div>
  )
}
