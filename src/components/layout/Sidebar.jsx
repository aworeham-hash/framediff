import { FRAMEWORK_GROUPS } from '../../utils/constants'
import { getFramework } from '../../data/registry'

function FrameworkItem({ id, isActive, onClick }) {
  const fw = getFramework(id)
  if (!fw) return null

  const isComingSoon = fw.comingSoon === true

  return (
    <button
      onClick={() => !isComingSoon && onClick(id)}
      disabled={isComingSoon}
      className={`w-full text-left px-3 py-2.5 rounded-md flex items-center justify-between transition-all ${
        isActive
          ? 'bg-blue-600 text-white'
          : isComingSoon
            ? 'text-slate-600 cursor-default'
            : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
      }`}
    >
      <div className="min-w-0">
        <div className={`text-sm font-medium truncate`}>
          {fw.shortName || fw.name}
        </div>
        {!isComingSoon && fw.latestVersion && (
          <div className={`text-xs mt-0.5 ${isActive ? 'text-blue-200' : 'text-slate-600'}`}>
            {fw.latestVersion}
          </div>
        )}
      </div>
      {isComingSoon && (
        <span className="ml-2 flex-shrink-0 text-xs text-slate-600 font-medium">
          Soon
        </span>
      )}
    </button>
  )
}

export function Sidebar({ selectedId, onSelect, onHome }) {
  return (
    <aside className="w-60 bg-slate-950 flex flex-col h-screen flex-shrink-0 border-r border-slate-800">
      {/* Brand — clickable home */}
      <button
        onClick={onHome}
        className="px-5 py-5 border-b border-slate-800 text-left hover:bg-slate-900 transition-colors group"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-md bg-blue-600 flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-sm font-mono leading-none">∆</span>
          </div>
          <div>
            <div className="text-white font-semibold text-sm leading-tight tracking-tight group-hover:text-blue-300 transition-colors">
              FrameDiff
            </div>
            <div className="text-slate-500 text-xs mt-0.5 font-normal">
              Compliance changelog
            </div>
          </div>
        </div>
      </button>

      {/* Framework navigation */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 scrollbar-thin">
        {FRAMEWORK_GROUPS.map(group => (
          <div key={group.name} className="mb-4">
            <p className="text-xs font-semibold text-slate-600 uppercase tracking-widest px-3 mb-1">
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
      <div className="px-4 py-4 border-t border-slate-800">
        <p className="text-xs text-slate-600 leading-relaxed">
          Always verify changes against official framework publications.
        </p>
      </div>
    </aside>
  )
}
