import { FRAMEWORK_GROUPS } from '../utils/constants'
import { getFramework } from '../data/registry'
import { LogoMark } from './brand/Logo'
import { DEADLINES } from '../data/deadlines'
import { AlertSignup } from './AlertSignup'

const GROUP_ACCENT = {
  'NIST': { bg: 'bg-blue-500', light: 'bg-blue-50 text-blue-700 border-blue-100' },
  'Payment Security': { bg: 'bg-violet-500', light: 'bg-violet-50 text-violet-700 border-violet-100' },
  'ISO Standards': { bg: 'bg-amber-500', light: 'bg-amber-50 text-amber-700 border-amber-100' },
  'Trust & Audit': { bg: 'bg-teal-500', light: 'bg-teal-50 text-teal-700 border-teal-100' },
  'Healthcare & Federal': { bg: 'bg-rose-500', light: 'bg-rose-50 text-rose-700 border-rose-100' },
  'Technical Hardening': { bg: 'bg-indigo-500', light: 'bg-indigo-50 text-indigo-700 border-indigo-100' },
}

const PUBLISHER_LIGHT = {
  'NIST': 'bg-blue-50 text-blue-700 border-blue-100',
  'PCI SSC': 'bg-violet-50 text-violet-700 border-violet-100',
  'ISO': 'bg-amber-50 text-amber-700 border-amber-100',
  'AICPA': 'bg-teal-50 text-teal-700 border-teal-100',
  'PCAOB': 'bg-orange-50 text-orange-700 border-orange-100',
  'HHS OCR': 'bg-rose-50 text-rose-700 border-rose-100',
  'IRS': 'bg-slate-50 text-slate-700 border-slate-200',
  'DISA': 'bg-indigo-50 text-indigo-700 border-indigo-100',
}

function FrameworkCard({ id, onClick }) {
  const fw = getFramework(id)
  if (!fw) return null
  const isComingSoon = fw.comingSoon === true
  const transitionCount = fw.transitions ? Object.keys(fw.transitions).length : 0
  const changeCount = fw.transitions
    ? Object.values(fw.transitions).reduce((sum, t) => sum + (t.changes?.length || 0), 0)
    : 0
  const publisherClass = PUBLISHER_LIGHT[fw.publisher] || 'bg-gray-50 text-gray-600 border-gray-100'

  return (
    <button
      onClick={() => !isComingSoon && onClick(id)}
      disabled={isComingSoon}
      className={`group w-full text-left flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-4 border-b border-gray-100 transition-all last:border-b-0 ${
        isComingSoon
          ? 'cursor-default opacity-40 bg-white'
          : 'cursor-pointer hover:bg-blue-50/40'
      }`}
    >
      {/* Publisher badge */}
      <div className="hidden sm:block flex-shrink-0 w-[72px]">
        <span className={`inline-flex items-center justify-center px-2 py-0.5 rounded-md text-xs font-semibold border w-full ${publisherClass}`}>
          {fw.publisher}
        </span>
      </div>

      {/* Name + description */}
      <div className="flex-1 min-w-0">
        <div className={`text-sm font-semibold transition-colors ${isComingSoon ? 'text-gray-400' : 'text-gray-900 group-hover:text-blue-700'}`}>
          {fw.shortName || fw.name}
        </div>
        {!isComingSoon && fw.description && (
          <div className="text-xs text-gray-400 mt-0.5 truncate max-w-sm">
            {fw.description.split('.')[0]}.
          </div>
        )}
      </div>

      {/* Stats */}
      {isComingSoon ? (
        <span className="flex-shrink-0 text-xs text-gray-300 bg-gray-50 border border-gray-100 px-2 py-0.5 rounded-full">
          Coming soon
        </span>
      ) : (
        <div className="flex-shrink-0 flex items-center gap-3 text-right">
          <div className="text-right">
            <div className="text-xs font-semibold text-gray-700">{changeCount}</div>
            <div className="text-xs text-gray-400">changes</div>
          </div>
          <div className="text-right">
            <div className="text-xs font-semibold text-gray-700">{transitionCount}</div>
            <div className="text-xs text-gray-400">{transitionCount === 1 ? 'version' : 'versions'}</div>
          </div>
        </div>
      )}

      {/* Arrow */}
      <div className={`flex-shrink-0 w-5 transition-transform ${isComingSoon ? 'invisible' : 'text-gray-300 group-hover:text-blue-400 group-hover:translate-x-0.5'}`}>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </button>
  )
}

export function HomePage({ onSelectFramework, onNavigate }) {
  const allFrameworks = FRAMEWORK_GROUPS.flatMap(g => g.frameworks)
  const available = allFrameworks.filter(id => {
    const fw = getFramework(id)
    return fw && !fw.comingSoon
  })
  const totalChanges = allFrameworks.reduce((sum, id) => {
    const fw = getFramework(id)
    if (!fw || !fw.transitions) return sum
    return sum + Object.values(fw.transitions).reduce((s, t) => s + (t.changes?.length || 0), 0)
  }, 0)

  return (
    <div className="h-full overflow-y-auto bg-white">

      {/* Top nav bar */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur border-b border-gray-100 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <LogoMark size={36} />
          <div>
            <div className="font-bold text-gray-900 text-base tracking-tight leading-none">FrameDiff</div>
            <div className="hidden sm:block text-[11px] text-gray-400 mt-0.5">The compliance framework changelog</div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => onNavigate && onNavigate('/updates')} className="hidden sm:inline text-xs font-medium text-gray-500 hover:text-gray-900 transition-colors">
            Updates & deadlines
          </button>
          <button onClick={() => onNavigate && onNavigate('/about')} className="hidden sm:inline text-xs font-medium text-gray-500 hover:text-gray-900 transition-colors">
            About
          </button>
          <a
            href="#alerts"
            onClick={e => { e.preventDefault(); document.getElementById('alerts')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-3.5 py-2 transition-colors"
          >
            Get alerts
          </a>
          <a
            href="https://github.com/aworeham-hash/framediff"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-600 transition-colors"
            title="GitHub"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>

      {/* Hero section */}
      <div className="bg-gradient-to-b from-gray-50 to-white border-b border-gray-100 px-5 sm:px-8 py-12 sm:py-16">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full border border-blue-100 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
            Free for GRC teams, auditors, and security professionals
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-950 tracking-tight leading-tight mb-5">
            The changelog for<br />compliance frameworks.
          </h1>
          <p className="text-gray-500 text-lg leading-relaxed max-w-xl mb-8">
            See exactly which controls were added, removed, or modified between framework versions
            — with the rationale behind each update. No more hunting through 300-page PDFs.
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap gap-6">
            {[
              { value: String(available.length), label: 'frameworks live' },
              { value: String(totalChanges) + '+', label: 'tracked changes' },
              { value: allFrameworks.length + ' in', label: 'total roadmap' },
              { value: '100%', label: 'free to use' },
            ].map(stat => (
              <div key={stat.label}>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-xs text-gray-400 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming compliance dates */}
      <div className="border-b border-gray-100 bg-amber-50/30 px-5 sm:px-8 py-5">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
              <svg className="w-3.5 h-3.5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Upcoming compliance dates
            </h2>
            <button onClick={() => onNavigate && onNavigate('/updates')} className="text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors">
              View all →
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {DEADLINES.filter(d => d.date).slice(0, 3).map(d => (
              <button
                key={d.title}
                onClick={() => onSelectFramework(d.frameworkId)}
                className="text-left bg-white border border-gray-200 hover:border-blue-200 rounded-lg px-3.5 py-3 transition-colors"
              >
                <div className="text-xs font-bold text-gray-900">{d.dateLabel}</div>
                <div className="text-xs text-gray-500 mt-1 leading-snug">{d.title}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* How it works strip */}
      <div className="border-b border-gray-100 bg-white px-5 sm:px-8 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-8">
            {[
              {
                step: '01',
                title: 'Pick a framework',
                desc: 'Choose from NIST CSF, PCI DSS, HIPAA, STIGs, and more.',
              },
              {
                step: '02',
                title: 'Select a version transition',
                desc: 'See what changed from Rev 8 to Rev 9, or 2013 to 2025.',
              },
              {
                step: '03',
                title: 'Drill into each control',
                desc: 'Compare old vs. new text with highlighted changes and rationale.',
              },
            ].map(item => (
              <div key={item.step} className="flex gap-3">
                <div className="text-xs font-bold text-blue-400 font-mono mt-0.5 flex-shrink-0 w-5">{item.step}</div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">{item.title}</div>
                  <div className="text-xs text-gray-400 mt-1 leading-relaxed">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Frameworks list */}
      <div className="max-w-3xl mx-auto px-5 sm:px-8 py-10">
        <div className="space-y-8">
          {FRAMEWORK_GROUPS.map(group => {
            const accent = GROUP_ACCENT[group.name] || { bg: 'bg-gray-400', light: 'bg-gray-50 text-gray-600' }
            const availableInGroup = group.frameworks.filter(id => {
              const fw = getFramework(id)
              return fw && !fw.comingSoon
            }).length
            return (
              <div key={group.name}>
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-2 h-2 rounded-full ${accent.bg} flex-shrink-0`} />
                  <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                    {group.name}
                  </h2>
                  <div className="flex-1 h-px bg-gray-100" />
                  <span className="text-xs text-gray-300">
                    {availableInGroup}/{group.frameworks.length} live
                  </span>
                </div>
                <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                  {group.frameworks.map(id => (
                    <FrameworkCard key={id} id={id} onClick={onSelectFramework} />
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Trust signals */}
        <div className="mt-12 pt-8 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
          {[
            {
              icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              ),
              title: 'Verified sources',
              desc: 'All data sourced directly from official framework publications and re-verified against publisher sources (last audit: July 2026).',
            },
            {
              icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              ),
              title: 'Copyright compliant',
              desc: 'Full text shown only for public-domain frameworks. Restricted frameworks show metadata only.',
            },
            {
              icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              ),
              title: 'Always free',
              desc: 'No account required. No paywalls. Built for the GRC community.',
            },
          ].map(item => (
            <div key={item.title} className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 mt-0.5">
                {item.icon}
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-700">{item.title}</div>
                <div className="text-xs text-gray-400 mt-0.5 leading-relaxed">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Alert signup */}
        <div className="mt-12 scroll-mt-20" id="alerts">
          <AlertSignup />
        </div>

        {/* Footer */}
        <div className="mt-10 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-start justify-between gap-4">
          <p className="text-xs text-gray-400 leading-relaxed max-w-lg">
            FrameDiff is an independent reference tool. Not affiliated with NIST, PCI SSC, ISO, AICPA, DISA, IRS, HHS OCR, or any framework publisher.
            Always verify requirements against official publications.
          </p>
          <div className="flex-shrink-0 flex gap-4 text-xs text-gray-400">
            <a
              href="https://github.com/aworeham-hash/framediff"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-600 transition-colors"
            >
              GitHub
            </a>
            <button onClick={() => onNavigate && onNavigate('/about')} className="hover:text-gray-600 transition-colors">
              About
            </button>
            <button onClick={() => onNavigate && onNavigate('/terms')} className="hover:text-gray-600 transition-colors">
              Terms
            </button>
            <button onClick={() => onNavigate && onNavigate('/privacy')} className="hover:text-gray-600 transition-colors">
              Privacy
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
