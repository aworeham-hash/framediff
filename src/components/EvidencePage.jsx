import { useState, useEffect } from 'react'
import { DOMAINS, FRAMEWORK_EVIDENCE } from '../data/evidence'
import { SP80053_EVIDENCE } from '../data/evidence-80053'
import { getFramework } from '../data/registry'

function CameraIcon() {
  return (
    <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
}

export function EvidencePage({ onSelectFramework, onHome, initialFramework }) {
  const ids = Object.keys(FRAMEWORK_EVIDENCE)
  const [active, setActive] = useState(
    initialFramework && FRAMEWORK_EVIDENCE[initialFramework] ? initialFramework : 'soc2'
  )
  const [query, setQuery] = useState('')

  useEffect(() => {
    document.title = 'Compliance Evidence Collection Guide — What to Screenshot | FrameDiff'
    return () => { document.title = 'FrameDiff - Compliance Framework Version Tracker' }
  }, [])

  const fw = getFramework(active)
  const entries = FRAMEWORK_EVIDENCE[active] || []

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 py-10">
        <button onClick={onHome} className="text-xs text-gray-400 hover:text-blue-600 transition-colors mb-6 inline-flex items-center gap-1">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          Home
        </button>
        <h1 className="text-2xl font-bold text-gray-950 tracking-tight">Evidence collection guide</h1>
        <p className="text-sm text-gray-500 mt-1.5 mb-6 leading-relaxed max-w-2xl">
          What auditors actually want to see, control area by control area — with a concrete example of
          a screenshot that works as evidence. Capture screenshots with the system clock or a dated URL
          visible, and note the scope (which system, which population) alongside each one.
        </p>

        {/* Framework selector */}
        <div className="flex flex-wrap gap-1.5 mb-8">
          {ids.map(id => {
            const f = getFramework(id)
            return (
              <button
                key={id}
                onClick={() => setActive(id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                  active === id
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-blue-200 hover:text-blue-700'
                }`}
              >
                {f?.shortName || id}
              </button>
            )
          })}
        </div>

        {fw && (
          <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
            <h2 className="text-sm font-bold text-gray-900">{fw.name}</h2>
            <button
              onClick={() => onSelectFramework(active)}
              className="text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              View version changes →
            </button>
          </div>
        )}

        {active === 'nist-sp800-53' && (
          <div className="mb-6 space-y-3">
            <div className="rounded-lg border border-blue-100 bg-blue-50/50 px-4 py-3">
              <p className="text-xs text-blue-900 leading-relaxed">
                <strong>Control-level guidance:</strong> evidence examples for all {SP80053_EVIDENCE.length} SP 800-53
                Rev 5 base controls across 20 families. Control enhancements — e.g. AC-6(1), AC-6(2) — inherit
                the base control's guidance scoped to the enhancement's specific condition.
              </p>
            </div>
            <input
              type="search"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Filter controls — try AC-6, encryption, backup…"
              className="w-full text-sm border border-gray-200 rounded-lg px-3.5 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="space-y-2">
              {SP80053_EVIDENCE
                .filter(c => {
                  if (!query) return true
                  const q = query.toLowerCase()
                  return c.id.toLowerCase().includes(q) || c.name.toLowerCase().includes(q) || c.ev.toLowerCase().includes(q)
                })
                .map(c => (
                  <div key={c.id} className="border border-gray-200 rounded-lg px-4 py-3">
                    <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
                      <code className="text-xs font-bold text-gray-800 font-mono bg-gray-100 border border-gray-200 px-1.5 py-0.5 rounded">{c.id}</code>
                      <span className="text-sm font-semibold text-gray-800">{c.name}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="mt-0.5 text-blue-500 flex-shrink-0"><CameraIcon /></span>
                      <p className="text-sm text-gray-600 leading-relaxed">{c.ev}</p>
                    </div>
                  </div>
                ))}
            </div>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest pt-4">Family-level summary</h3>
          </div>
        )}

        <div className="space-y-3">
          {entries.map(e => {
            const d = DOMAINS[e.domain]
            if (!d) return null
            return (
              <div key={`${active}-${e.code}`} className="border border-gray-200 rounded-xl overflow-hidden">
                <div className="px-4 py-3 flex items-center gap-3 flex-wrap">
                  <code className="text-xs font-bold text-gray-800 font-mono bg-gray-100 border border-gray-200 px-1.5 py-0.5 rounded flex-shrink-0">
                    {e.code}
                  </code>
                  <span className="text-sm font-semibold text-gray-800">{e.name}</span>
                  <span className="text-[10px] text-gray-400 ml-auto">{d.name}</span>
                </div>
                <div className="px-4 pb-3">
                  <p className="text-sm text-gray-600 leading-relaxed">{d.what}</p>
                </div>
                <div className="px-4 py-3 bg-blue-50/40 border-t border-blue-100">
                  <div className="flex items-start gap-2 text-blue-900">
                    <span className="mt-0.5 text-blue-500"><CameraIcon /></span>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-blue-500 mb-0.5">Example screenshot evidence</p>
                      <p className="text-sm leading-relaxed">{d.screenshot}</p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-10 pt-4 border-t border-gray-100 space-y-2">
          <p className="text-xs text-gray-400 leading-relaxed">
            <strong className="text-gray-500">Good screenshot hygiene:</strong> include the date/time and the
            system name in frame; capture the full window, not a crop; redact credentials and personal data;
            and file each screenshot against the control ID and the period it covers.
          </p>
          <p className="text-xs text-gray-400 leading-relaxed">
            Examples are illustrative and tool-agnostic. Your auditor or assessor determines what is
            sufficient for your scope — always confirm evidence expectations at the start of the engagement.
          </p>
        </div>
      </div>
    </div>
  )
}
