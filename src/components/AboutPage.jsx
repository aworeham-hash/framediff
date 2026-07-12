import { useEffect } from 'react'

export function AboutPage({ onHome }) {
  useEffect(() => {
    document.title = 'About — FrameDiff'
    return () => { document.title = 'FrameDiff — Compliance Framework Version Tracker' }
  }, [])

  return (
    <div className="h-full overflow-y-auto">
      {/* Sticky top bar */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-8 py-3 flex items-center gap-3">
        <button onClick={onHome} className="text-xs text-gray-400 hover:text-gray-700 transition-colors font-medium">
          FrameDiff
        </button>
        <span className="text-gray-200">/</span>
        <span className="text-xs font-semibold text-gray-700">About & Disclaimer</span>
      </div>

      <div className="max-w-3xl mx-auto px-8 py-12 space-y-10">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-950 tracking-tight">About FrameDiff</h1>
          <p className="text-gray-500 text-sm mt-2 leading-relaxed max-w-2xl">
            FrameDiff is a free compliance changelog tool for GRC practitioners, auditors, and security teams.
            It tracks year-over-year changes across major security and compliance frameworks — so you can understand
            what actually changed between versions without reading hundreds of pages of documentation.
          </p>
        </div>

        {/* What FrameDiff is */}
        <section className="space-y-3">
          <h2 className="text-base font-semibold text-gray-900">What FrameDiff does</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[
              { icon: '📋', title: 'Control-level diffs', desc: 'See exactly which controls were added, removed, or modified — not just summary counts.' },
              { icon: '🔍', title: 'Text comparison', desc: 'Compare old and new requirement language side-by-side with highlighted divergence.' },
              { icon: '📅', title: 'Version history', desc: 'Navigate between framework versions to trace how requirements evolved over time.' },
              { icon: '⚡', title: 'Filter & search', desc: 'Filter by change type, search by control ID, or jump directly to a control family.' },
            ].map(item => (
              <div key={item.title} className="flex gap-3 p-4 rounded-lg border border-gray-100 bg-gray-50">
                <span className="text-xl flex-shrink-0">{item.icon}</span>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{item.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Disclaimer */}
        <section className="space-y-3">
          <h2 className="text-base font-semibold text-gray-900">Important disclaimer</h2>
          <div className="rounded-lg border border-amber-200 bg-amber-50 px-5 py-4 space-y-3">
            <p className="text-sm text-amber-900 leading-relaxed font-medium">
              FrameDiff is an independent, unofficial reference tool. It is not affiliated with, endorsed by,
              or sponsored by any standards body, government agency, or framework publisher.
            </p>
            <p className="text-sm text-amber-800 leading-relaxed">
              Framework data on FrameDiff is provided for informational and educational purposes only.
              While we strive for accuracy, we make no warranties — express or implied — about the completeness,
              accuracy, or fitness for any particular purpose of the information presented.
            </p>
            <p className="text-sm text-amber-800 leading-relaxed">
              <strong>Always verify compliance requirements against the official published versions</strong> of each framework.
              FrameDiff should not be used as the sole basis for compliance decisions, audit assertions, or legal interpretations.
            </p>
          </div>
        </section>

        {/* Framework-specific copyright notices */}
        <section className="space-y-3">
          <h2 className="text-base font-semibold text-gray-900">Framework copyright notices</h2>
          <div className="space-y-2">
            {[
              {
                name: 'NIST CSF / NIST SP 800-53 / IRS Publication 4812',
                status: 'public-domain',
                note: 'Published by U.S. government agencies. Works of the U.S. Federal Government are in the public domain.',
              },
              {
                name: 'HIPAA Security Rule',
                status: 'public-domain',
                note: 'Codified in the Code of Federal Regulations (45 CFR Parts 160 and 164). U.S. Federal Government work — public domain.',
              },
              {
                name: 'DISA STIGs',
                status: 'public-domain',
                note: 'Published by the Defense Information Systems Agency. U.S. Federal Government work — public domain.',
              },
              {
                name: 'SOX / PCAOB Standards',
                status: 'mixed',
                note: 'Statutory text of the Sarbanes-Oxley Act is public domain. PCAOB standards are subject to PCAOB copyright — FrameDiff shows structural metadata only.',
              },
              {
                name: 'PCI DSS',
                status: 'restricted',
                note: '© PCI Security Standards Council, LLC. FrameDiff shows summary information and highlights, not verbatim requirement text.',
              },
              {
                name: 'ISO/IEC 27001',
                status: 'restricted',
                note: '© ISO/IEC. Full text requires purchase from ISO. FrameDiff shows metadata and structural changes only.',
              },
              {
                name: 'SOC 2 Trust Services Criteria',
                status: 'restricted',
                note: '© AICPA. Full criteria text requires AICPA licensing. FrameDiff shows metadata and structural changes only.',
              },
            ].map(item => (
              <div key={item.name} className="flex gap-3 items-start py-3 px-4 rounded-lg border border-gray-100">
                <span className={`text-xs font-semibold px-2 py-0.5 rounded border flex-shrink-0 mt-0.5 ${
                  item.status === 'public-domain' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                  item.status === 'mixed' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                  'bg-gray-100 text-gray-600 border-gray-200'
                }`}>
                  {item.status === 'public-domain' ? 'Public domain' : item.status === 'mixed' ? 'Mixed' : 'Restricted'}
                </span>
                <div>
                  <p className="text-xs font-semibold text-gray-900">{item.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{item.note}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact / feedback */}
        <section className="space-y-3">
          <h2 className="text-base font-semibold text-gray-900">Errors & feedback</h2>
          <p className="text-sm text-gray-500 leading-relaxed">
            Found an inaccuracy? Have a framework you'd like to see added? We want to know.
            FrameDiff is maintained by a small team and depends on community feedback to stay accurate.
          </p>
          <a
            href="https://github.com/aworeham-hash/framediff/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
            Open an issue on GitHub
          </a>
        </section>

        {/* Legal */}
        <section className="space-y-3 pb-8 border-t border-gray-100 pt-8">
          <p className="text-xs text-gray-400 leading-relaxed">
            FrameDiff is provided "as is" without warranty of any kind. Use at your own risk.
            Framework names, acronyms, and logos are the property of their respective owners.
            FrameDiff is not a law firm and does not provide legal advice.
          </p>
          <p className="text-xs text-gray-400">
            For Terms of Service and Privacy Policy, see{' '}
            <a href="https://framediff.vercel.app" className="underline hover:text-gray-600">framediff.vercel.app</a>.
          </p>
        </section>

      </div>
    </div>
  )
}
