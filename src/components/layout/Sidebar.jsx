import { FRAMEWORK_GROUPS } from '../../utils/constants'
import { getFramework } from '../../data/registry'
import { LogoMark } from '../brand/Logo'

function getInitials(fw) {
  if (!fw) return '??'
  const s = fw.shortName || fw.name
  const words = s.replace(/[^a-zA-Z0-9 ]/g, '').split(/\s+/).filter(Boolean)
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase()
  return s.slice(0, 2).toUpperCase()
}

const GROUP_COLORS = {
  'NIST': 'bg-blue-500',
  'Payment Security': 'bg-violet-500',
  'ISO Standards': 'bg-amber-500',
  'Trust & Audit': 'bg-teal-500',
  'Healthcare & Federal': 'bg-rose-500',
  'Technical Hardening': 'bg-indigo-500',
  'Defense Industrial Base': 'bg-emerald-500',
  'Financial Services': 'bg-cyan-500',
}

function getGroupColor(frameworkId) {
  for (const group of FRAMEWORK_GROUPS) {
    if (group.frameworks.includes(frameworkId)) {
      return GROUP_COLORS[group.name] || 'bg-slate-500'
    }
  }
  return 'bg-slate-500'
}

function FrameworkItem({ id, isActive, onClick, collapsed }) {
  const fw = getFramework(id)
  if (!fw) return null
  const isComingSoon = fw.comingSoon === true
  const color = getGroupColor(id)
  const initials = getInitials(fw)

  if (collapsed) {
    return (
      <div className="relative group/tip flex justify-center">
        <button
          onClick={() => !isComingSoon && onClick(id)}
          disabled={isComingSoon}
          title={fw.shortName || fw.name}
          className={`w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold transition-all ${
            isActive
              ? `${color} text-white shadow-sm`
              : isComingSoon
                ? 'bg-slate-800 text-slate-600 cursor-default'
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white cursor-pointer'
          }`}
        >
          {initials}
        </button>
        <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 z-50 pointer-events-none opacity-0 group-hover/tip:opacity-100 transition-opacity">
          <div className="bg-gray-900 text-white text-xs px-2.5 py-1.5 rounded-md whitespace-nowrap shadow-lg">
            {fw.shortName || fw.name}
            {isComingSoon && <span className="text-slate-400 ml-1.5">· Soon</span>}
            <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <button
      onClick={() => !isComingSoon && onClick(id)}
      disabled={isComingSoon}
      className={`w-full text-left px-3 py-2.5 rounded-md flex items-center gap-2.5 transition-all ${
        isActive
          ? 'bg-blue-600 text-white'
          : isComingSoon
            ? 'text-slate-600 cursor-default'
            : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
      }`}
    >
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${isActive ? 'bg-white' : isComingSoon ? 'bg-slate-700' : color}`} />
      <div className="min-w-0 flex-1">
        <div className="text-sm font-medium truncate">{fw.shortName || fw.name}</div>
        {!isComingSoon && fw.latestVersion && (
          <div className={`text-xs mt-0.5 ${isActive ? 'text-blue-200' : 'text-slate-600'}`}>
            {fw.latestVersion}
          </div>
        )}
      </div>
      {isComingSoon && (
        <span className="flex-shrink-0 text-xs text-slate-600">Soon</span>
      )}
    </button>
  )
}

export function Sidebar({ selectedId, onSelect, onHome, onAbout, onNavigate, collapsed, onToggleCollapse, recentlyViewed, onOpenSearch, isMobileDrawer = false }) {
  return (
    <aside className={`bg-slate-950 flex flex-col h-full flex-shrink-0 border-r border-slate-800 transition-all duration-200 ${collapsed ? 'w-14' : isMobileDrawer ? 'w-full' : 'w-60'}`}>

      <button
        onClick={onHome}
        className={`border-b border-slate-800 hover:bg-slate-900 transition-colors group flex-shrink-0 ${collapsed ? 'px-0 py-4 flex justify-center' : 'px-4 py-4 text-left'}`}
      >
        <div className={`flex items-center ${collapsed ? 'justify-center' : 'gap-2.5'}`}>
          <LogoMark size={28} />
          {!collapsed && (
            <div>
              <div className="text-white font-semibold text-sm leading-tight tracking-tight">
                FrameDiff
              </div>
              <div className="text-slate-500 text-xs mt-0.5">Compliance changelog</div>
            </div>
          )}
        </div>
      </button>

      {!collapsed && (
        <div className="px-2 pt-3 pb-1 flex-shrink-0">
          <button
            onClick={onOpenSearch}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-md bg-slate-800 hover:bg-slate-700 transition-colors text-slate-400 hover:text-slate-200 text-sm"
          >
            <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="flex-1 text-left text-xs">Search frameworks...</span>
            <kbd className="text-xs bg-slate-700 text-slate-500 px-1.5 py-0.5 rounded font-mono">Cmd+K</kbd>
          </button>
        </div>
      )}
      {collapsed && (
        <div className="px-0 pt-2 pb-1 flex justify-center flex-shrink-0">
          <button
            onClick={onOpenSearch}
            title="Search (Cmd+K)"
            className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      )}

      <nav className={`flex-1 overflow-y-auto scrollbar-thin ${collapsed ? 'py-2 px-1.5 space-y-1' : 'py-2 px-2'}`}>
        {recentlyViewed.length > 0 && !collapsed && (
          <div className="mb-4">
            <p className="text-xs font-semibold text-slate-600 uppercase tracking-widest px-3 mb-1">Recent</p>
            <div className="space-y-0.5">
              {recentlyViewed.map(id => (
                <FrameworkItem key={id} id={id} isActive={selectedId === id} onClick={onSelect} collapsed={false} />
              ))}
            </div>
          </div>
        )}

        {FRAMEWORK_GROUPS.map(group => (
          <div key={group.name} className={collapsed ? 'mb-3' : 'mb-4'}>
            {!collapsed && (
              <p className="text-xs font-semibold text-slate-600 uppercase tracking-widest px-3 mb-1">
                {group.name}
              </p>
            )}
            {collapsed && <div className="w-5 h-px bg-slate-800 mx-auto mb-2" />}
            <div className={`${collapsed ? 'space-y-1.5 flex flex-col items-center' : 'space-y-0.5'}`}>
              {group.frameworks.map(id => (
                <FrameworkItem
                  key={id}
                  id={id}
                  isActive={selectedId === id}
                  onClick={onSelect}
                  collapsed={collapsed}
                />
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className={`border-t border-slate-800 flex-shrink-0 ${collapsed ? 'py-2 flex flex-col items-center gap-2' : 'px-3 py-3'}`}>
        {collapsed ? (
          <div className="relative group/tip flex justify-center">
            <button
              onClick={onAbout}
              title="About & Disclaimer"
              className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-500 hover:text-white transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 z-50 pointer-events-none opacity-0 group-hover/tip:opacity-100 transition-opacity">
              <div className="bg-gray-900 text-white text-xs px-2.5 py-1.5 rounded-md whitespace-nowrap shadow-lg">
                About &amp; Disclaimer
                <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900" />
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={onAbout}
            className="w-full text-left px-1 mb-2 text-xs text-slate-600 hover:text-slate-300 transition-colors flex items-center gap-1.5"
          >
            <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            About &amp; Disclaimer
          </button>
        )}

        {!collapsed && (
          <div className="px-1 mb-2 flex items-center gap-3 text-xs text-slate-700">
            <button onClick={() => onNavigate && onNavigate('/updates')} className="hover:text-slate-400 transition-colors">Updates</button>
            <button onClick={() => onNavigate && onNavigate('/evidence')} className="hover:text-slate-400 transition-colors">Evidence</button>
            <button onClick={() => onNavigate && onNavigate('/terms')} className="hover:text-slate-400 transition-colors">Terms</button>
            <button onClick={() => onNavigate && onNavigate('/privacy')} className="hover:text-slate-400 transition-colors">Privacy</button>
          </div>
        )}

        <button
          onClick={onToggleCollapse}
          title={isMobileDrawer ? 'Close menu' : collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className={`flex items-center justify-center rounded-md bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors ${
            collapsed ? 'w-9 h-9' : 'w-full py-2 gap-2 text-xs font-medium'
          }`}
        >
          <svg
            className={`w-4 h-4 transition-transform ${collapsed ? 'rotate-180' : ''}`}
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
          {!collapsed && <span>{isMobileDrawer ? 'Close' : 'Collapse'}</span>}
        </button>
      </div>
    </aside>
  )
}
