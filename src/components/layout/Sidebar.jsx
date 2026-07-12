import { FRAMEWORK_GROUPS } from '../../utils/constants'
import { getFramework } from '../../data/registry'

function FrameworkItem({ id, isActive, onClick }) {
  const fw = getFramework(id)
  if (!fw) return null

  const isComingSoon = fw.comingSoon === true
  const hasData = !isComingSoon && fw.transitions && Object.keys(fw.transitions).length > 0

  return (
    <button
      onClick={() => onClick(id)}
      disabled={isComingSoon}
      className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between group transition-all ${
        isActive
          ? 'bg-slate-700 text-white'
          : isComingSoon
            ? 'text-slate-500 cursor-default'
            : 'text-slate-300 hover:bg-slate-800 hover:text-white'
      }`}
    >
      <div className="min-w-0">
        <div className={`text-sm font-medium truncate ${isComingSoon ? 'text-slate-500' : ''}`}>
          {fw.shortName || fw.name}
        </div>
        {!isComingSoon && fw.latestVersion && (
          <div className="text-xs text-slate-500 mt-0.5">
            Latest: v{fw.latestVersion}
          </div>
        )}
      </div>
      {isComingSoon && (
        <span className="ml-2 flex-shrink-0 text-xs bg-slate-700 text-slate-400 px-1.5 py-0.5 rounded font-medium">
          Soon
        </span>
      )}
      {isActive && !isComingSoon && (
        <svg className="w-4 h-4 text-slate-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      )}
    </button>
  )
}

export function Sidebar({ selectedId, onSelect }) {
  return (
    <aside className="w-64 bg-slate-900 flex flex-col h-screen flex-shrink-0">
      {/* Brand */}
      <div className="px-5 py-5 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded bg-emerald-500 flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-sm font-mono">∆</span>
          </div>
          <div>
            <h1 className="text-white font-bold text-base leading-none">FrameDiff</h1>
            <p className="text-slate-400 text-xs mt-0.5">Compliance changes tracker</p>
          </div>
        </div>
      </div>

      {/* Framework navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 scrollbar-thin space-y-5">
        {FRAMEWORK_GROUPS.map(group => (
          <div key={group.name}>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 mb-1.5">
              {group.name}
            </p>
            <div className="space-y-0.5">
              {group.frameworks.map(id => (
                <FrameworkItem
                  key={id}
                  id={id}
                  isActive={selectedId === id}
                  onClick={onSelect}
                />
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-slate-800">
        <p className="text-xs text-slate-500">
          Data sourced from official framework publications.
          Always verify with primary sources.
        </p>
      </div>
    </aside>
  )
}
