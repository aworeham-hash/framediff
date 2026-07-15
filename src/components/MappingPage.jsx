import { useState, useEffect } from 'react'
import { DOMAINS, FRAMEWORK_EVIDENCE } from '../data/evidence'
import { getFramework } from '../data/registry'
import { SiteNav } from './SiteNav'

// Control-theme crosswalk: pivots the shared control domains across all
// frameworks. Family/requirement level — honest about granularity, with
// pointers to NIST's official control-level mappings (OLIR/CPRT).

export function MappingPage({ onSelectFramework, onNavigate }) {
  const [domain, setDomain] = useState('mfa')

  useEffect(() => {
    document.title = 'Compliance Framework Crosswalk — NIST, ISO, SOC 2, PCI, HIPAA Mapping - FrameDiff'
    return () => { document.title = 'FrameDiff - Compliance Framework Version Tracker' }
  }, [])

  const d = DOMAINS[domain]
  const rows = Object.entries(FRAMEWORK_EVIDENCE)
    .map(([fid, entries]) => ({ fid, matches: entries.filter(e => e.domain === domain) }))
    .filter(r => r.matches.length > 0)

  return (
    <div className="h-full overflow-y-auto">
      <SiteNav active="/mapping" onNavigate={onNavigate} />
      <div className="max-w-3xl mx-auto px-5 sm:px-8 py-10">
        <h1 className="text-2xl font-bold text-gray-950 tracking-tight">Framework crosswalk</h1>
        <p className="text-sm text-gray-500 mt-1.5 mb-6 leading-relaxed max-w-2xl">
          Pick a control theme and see where it lives in every framework — the fastest way to answer
          "we built this for framework A; what does it satisfy in framework B?" This crosswalk works at the
          control-family / requirement level. For official control-by-control mappings, use NIST's{' '}
          <a href="https://csrc.nist.gov/projects/olir" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800">OLIR program</a>{' '}
          and the <a href="https://csrc.nist.gov/projects/cprt" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800">CPRT</a>.
        </p>

        {/* Domain selector */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {Object.entries(DOMAINS).map(([key, dd]) => (
            <button
              key={key}
              onClick={() => setDomain(key)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                domain === key
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-blue-200 hover:text-blue-700'
              }`}
            >
              {dd.name}
            </button>
          ))}
        </div>

        {d && (
          <div className="rounded-lg border border-blue-100 bg-blue-50/50 px-4 py-3 mb-6">
            <p className="text-sm font-semibold text-gray-900">{d.name}</p>
            <p className="text-xs text-gray-600 mt-1 leading-relaxed">{d.what}</p>
          </div>
        )}

        <div className="border border-gray-200 rounded-xl overflow-hidden divide-y divide-gray-100">
          {rows.map(({ fid, matches }) => {
            const fw = getFramework(fid)
            return (
              <div key={fid} className="px-5 py-3.5 flex items-start gap-4 hover:bg-gray-50/60 transition-colors">
                <button
                  onClick={() => onSelectFramework(fid)}
                  className="text-sm font-semibold text-gray-900 hover:text-blue-700 transition-colors w-40 flex-shrink-0 text-left"
                >
                  {fw?.shortName || fid}
                </button>
                <div className="flex flex-wrap gap-1.5 min-w-0">
                  {matches.map(m => (
                    <span key={m.code} className="inline-flex items-center gap-1.5 text-xs bg-gray-50 border border-gray-200 rounded-md px-2 py-1">
                      <code className="font-mono font-bold text-gray-700">{m.code}</code>
                      <span className="text-gray-500">{m.name}</span>
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        <p className="text-xs text-gray-400 mt-6 leading-relaxed">
          Theme-level equivalence means the areas address the same control objective — it does not mean
          one-for-one requirement equality. Depth, specificity, and assessment expectations differ between
          frameworks; verify against the official texts before claiming coverage.
        </p>
      </div>
    </div>
  )
}
