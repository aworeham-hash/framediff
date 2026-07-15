import { LogoMark } from './brand/Logo'

const TABS = [
  { path: '/', label: 'Frameworks', icon: 'M4 6h16M4 10h16M4 14h16M4 18h16' },
  { path: '/evidence', label: 'Evidence Guide', icon: 'M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z M15 13a3 3 0 11-6 0 3 3 0 016 0z' },
  { path: '/mapping', label: 'Crosswalk', icon: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4' },
  { path: '/scoping', label: 'Scoping', icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },
  { path: '/updates', label: 'Updates & Deadlines', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
]

// Prominent site-wide tab navigation used on the homepage and section pages.
export function SiteNav({ active, onNavigate, showLogo = true }) {
  const compact = active === '/' // homepage hero carries the big brand; keep nav slim
  return (
    <div className="sticky top-0 z-20 bg-white/95 backdrop-blur border-b border-gray-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-8">
        <div className={`flex items-center justify-between ${compact ? 'py-2' : 'py-3'}`}>
          {showLogo && !compact && (
            <button onClick={() => onNavigate && onNavigate('/')} className="flex items-center gap-3 flex-shrink-0">
              <LogoMark size={34} />
              <div className="text-left">
                <div className="font-bold text-gray-900 text-base tracking-tight leading-none">FrameDiff</div>
                <div className="hidden sm:block text-[11px] text-gray-400 mt-0.5">The compliance framework changelog</div>
              </div>
            </button>
          )}
          {compact && (
            <div className="flex items-center gap-2">
              <LogoMark size={24} />
              <span className="font-bold text-gray-900 text-sm tracking-tight">FrameDiff</span>
            </div>
          )}
          <a
            href="#alerts"
            onClick={e => {
              e.preventDefault()
              if (active === '/') document.getElementById('alerts')?.scrollIntoView({ behavior: 'smooth' })
              else if (onNavigate) onNavigate('/')
            }}
            className="hidden sm:inline text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-3.5 py-2 transition-colors flex-shrink-0"
          >
            Get alerts
          </a>
        </div>
        {/* Major tabs */}
        <nav className="flex gap-1 -mb-px overflow-x-auto scrollbar-thin" aria-label="Site sections">
          {TABS.map(t => {
            const isActive = active === t.path
            return (
              <button
                key={t.path}
                onClick={() => onNavigate && onNavigate(t.path)}
                className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors ${
                  isActive
                    ? 'border-blue-600 text-blue-700'
                    : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300'
                }`}
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {t.icon.split(' M').map((d, i) => (
                    <path key={i} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={(i ? 'M' : '') + d} />
                  ))}
                </svg>
                {t.label}
              </button>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
