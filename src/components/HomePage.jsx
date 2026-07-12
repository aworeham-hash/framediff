import { FRAMEWORK_GROUPS } from '../utils/constants'
import { getFramework } from '../data/registry'

function FrameworkCard({ id, onClick }) {
  const fw = getFramework(id)
  if (!fw) return null

  const isComingSoon = fw.comingSoon === true
  const transitionCount = fw.transitions ? Object.keys(fw.transitions).length : 0

  return (
    <button
      onClick={() => !isComingSoon && onClick(id)}
      disabled={isComingSoon}
      className={`text-left p-4 rounded-xl border transition-all ${
        isComingSoon
          ? 'bg-gray-50 border-gray-100 cursor-default opacity-60'
          : 'bg-white border-gray-200 hover:border-slate-400 hover:shadow-md cursor-pointer'
      }`}
    >
      <div className="flex items-start justify-between mb-2">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          {fw.publisher || 'Standards Body'}
        </span>
        {isComingSoon && (
          <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full font-medium">
            Coming soon
          </span>
        )}
        {!isComingSoon && (
          <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-medium border border-emerald-100">
            Available
          </span>
        )}
      </div>
      <h3 className="font-semibold text-gray-900 text-sm leading-snug">{fw.name}</h3>
      {fw.description && (
        <p className="text-xs text-gray-500 mt-1.5 line-clamp-2">{fw.description}</p>
      )}
      <div className="flex items-center gap-3 mt-3 pt-3 border-t border-gray-100">
        {fw.latestVersion && (
          <span className="text-xs text-gray-500">
            Latest: <span className="font-medium text-gray-700">v{fw.latestVersion}</span>
          </span>
        )}
        {transitionCount > 0 && (
          <span className="text-xs text-gray-500">
            {transitionCount} transition{transitionCount !== 1 ? 's' : ''}
          </span>
        )}
      </div>
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
    <div className="max-w-4xl mx-auto px-8 py-12">
      {/* Hero */}
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Track every compliance framework change,<br />
          <span className="text-emerald-600">version by version.</span>
        </h2>
        <p className="text-gray-500 text-lg max-w-2xl">
          No more hunting through 30-page PDFs. Select a framework on the left to see exactly what changed — with summary cards, filterable change lists, and the rationale behind every update.
        </p>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-6 mb-10 pb-10 border-b border-gray-200">
        <div>
          <p className="text-2xl font-bold text-gray-900">{available.length}</p>
          <p className="text-sm text-gray-500">frameworks available</p>
        </div>
        <div className="w-px h-10 bg-gray-200" />
        <div>
          <p className="text-2xl font-bold text-gray-900">{allFrameworks.length}</p>
          <p className="text-sm text-gray-500">frameworks in roadmap</p>
        </div>
        <div className="w-px h-10 bg-gray-200" />
        <div>
          <p className="text-2xl font-bold text-gray-900">100%</p>
          <p className="text-sm text-gray-500">from official sources</p>
        </div>
      </div>

      {/* Framework grid */}
      {FRAMEWORK_GROUPS.map(group => (
        <div key={group.name} className="mb-8">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            {group.name}
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {group.frameworks.map(id => (
              <FrameworkCard key={id} id={id} onClick={onSelectFramework} />
            ))}
          </div>
        </div>
      ))}

      {/* Disclaimer */}
      <div className="mt-10 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-xs text-gray-500">
          <span className="font-semibold text-gray-700">Disclaimer:</span> FrameDiff provides informational summaries of compliance framework changes.
          Always refer to official framework documentation for compliance decisions.
          FrameDiff is not affiliated with NIST, PCI SSC, ISO, AICPA, DISA, IRS, or any framework publisher.
        </p>
      </div>
    </div>
  )
}
