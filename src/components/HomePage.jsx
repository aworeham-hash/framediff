import { FRAMEWORK_GROUPS } from '../utils/constants'
import { getFramework } from '../data/registry'

const PUBLISHER_COLORS = {
  'NIST': 'bg-blue-50 text-blue-700 border-blue-100',
  'PCI SSC': 'bg-violet-50 text-violet-700 border-violet-100',
  'ISO': 'bg-amber-50 text-amber-700 border-amber-100',
  'AICPA': 'bg-teal-50 text-teal-700 border-teal-100',
  'PCAOB': 'bg-orange-50 text-orange-700 border-orange-100',
  'HHS': 'bg-rose-50 text-rose-700 border-rose-100',
  'IRS': 'bg-slate-50 text-slate-700 border-slate-200',
  'DISA': 'bg-indigo-50 text-indigo-700 border-indigo-100',
}

function FrameworkRow({ id, onClick }) {
  const fw = getFramework(id)
  if (!fw) return null

  const isComingSoon = fw.comingSoon === true
  const transitionCount = fw.transitions ? Object.keys(fw.transitions).length : 0
  const publisherClass = PUBLISHER_COLORS[fw.publisher] || 'bg-gray-50 text-gray-600 border-gray-100'

  return (
    <button
      onClick={() => !isComingSoon && onClick(id)}
      disabled={isComingSoon}
      className={`w-full text-left flex items-center gap-4 px-4 py-3.5 border-b border-gray-100 transition-all last:border-b-0 ${
        isComingSoon
          ? 'cursor-default opacity-50'
          : 'hover:bg-blue-50/50 cursor-pointer group'
      }`}
    >
      {/* Publisher badge */}
      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold border w-16 justify-center flex-shrink-0 ${publisherClass}`}>
        {fw.publisher}
      </span>

      {/* Name */}
      <div className="flex-1 min-w-0">
        <span className={`text-sm font-medium text-gray-900 group-hover:text-blue-700 transition-colors ${isComingSoon ? '' : ''}`}>
          {fw.name}
        </span>
      </div>

      {/* Latest version */}
      <span className="text-xs text-gray-400 font-mono flex-shrink-0 w-28 text-right">
        {fw.latestVersion || '—'}
      </span>

      {/* Transitions / status */}
      <span className="flex-shrink-0 w-28 text-right">
        {isComingSoon ? (
          <span className="text-xs text-gray-400">Coming soon</span>
        ) : (
          <span className="text-xs text-gray-500">
            {transitionCount} {transitionCount === 1 ? 'version diff' : 'version diffs'}
          </span>
        )}
      </span>

      {/* Arrow */}
      <span className={`flex-shrink-0 ${isComingSoon ? 'invisible' : 'text-gray-300 group-hover:text-blue-400 transition-colors'}`}>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
        </svg>
      </span>
    </button>
  )
}

export function HomePage({ onSelectFramework }) {
  const allFrameworks = FRAMEWORK_GROUPS.flatMap(g => g.frameworks)
  const available = allFrameworks.filter(id => {
    const fw = getFramework(id)
    return fw && !fw.comingSoon
  })

  return (
    <div className="h-full overflow-y-auto">
      {/* Top bar */}
      <div className="border-b border-gray-100 px-10 py-4 flex items-center justify-between sticky top-0 bg-white z-10">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-blue-600 flex items-center justify-center">
            <span className="text-white font-bold text-xs font-mono">∆</span>
          </div>
          <span className="font-semibold text-gray-900 text-sm">FrameDiff</span>
        </div>
        <span className="text-xs text-gray-400">
          {available.length} frameworks available · {allFrameworks.length} in roadmap
        </span>
      </div>

      <div className="max-w-3xl mx-auto px-10 py-14">

        {/* Hero */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-gray-950 tracking-tight leading-tight mb-4">
            The changelog for GRC teams.
          </h1>
          <p className="text-gray-500 text-base leading-relaxed max-w-xl">
            See exactly what changed between framework versions — every control added, removed, or modified — with the rationale behind each update. No more hunting through 300-page PDFs.
          </p>
        </div>

        {/* Framework table */}
        {FRAMEWORK_GROUPS.map(group => (
          <div key={group.name} className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                {group.name}
              </h2>
              <div className="flex-1 h-px bg-gray-100" />
            </div>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              {group.frameworks.map(id => (
                <FrameworkRow key={id} id={id} onClick={onSelectFramework} />
              ))}
            </div>
          </div>
        ))}

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-gray-100">
          <p className="text-xs text-gray-400 leading-relaxed">
            FrameDiff provides informational summaries of compliance framework changes. Always refer to official documentation for compliance decisions.
            Not affiliated with NIST, PCI SSC, ISO, AICPA, DISA, IRS, or any framework publisher.
          </p>
        </div>
      </div>
    </div>
  )
}
