import { useState, useEffect } from 'react'
import { SCOPING_QUESTIONS, SCOPING_BASELINE } from '../data/scoping'
import { getFramework } from '../data/registry'
import { DEADLINES } from '../data/deadlines'
import { SiteNav } from './SiteNav'

export function ScopingPage({ onSelectFramework, onNavigate }) {
  const [answers, setAnswers] = useState({})

  useEffect(() => {
    document.title = 'Which Compliance Frameworks Apply to You? Scoping Wizard - FrameDiff'
    return () => { document.title = 'FrameDiff - Compliance Framework Version Tracker' }
  }, [])

  const answered = Object.keys(answers).length
  const results = new Map()
  SCOPING_QUESTIONS.forEach(qn => {
    if (answers[qn.id] === true) {
      qn.frameworks.forEach(f => {
        if (!results.has(f.id)) results.set(f.id, [])
        results.get(f.id).push(f.why)
      })
    }
  })

  const setAnswer = (id, val) => setAnswers(prev => ({ ...prev, [id]: val }))
  const done = answered === SCOPING_QUESTIONS.length

  return (
    <div className="h-full overflow-y-auto">
      <SiteNav active="/scoping" onNavigate={onNavigate} />
      <div className="max-w-3xl mx-auto px-5 sm:px-8 py-10">
        <h1 className="text-2xl font-bold text-gray-950 tracking-tight">Which frameworks apply to you?</h1>
        <p className="text-sm text-gray-500 mt-1.5 mb-8 leading-relaxed max-w-2xl">
          Answer {SCOPING_QUESTIONS.length} yes/no questions and get a first-pass applicability map with the
          reason each framework applies. This is an orientation tool, not legal advice — applicability
          decisions belong with your counsel and contracts.
        </p>

        <div className="space-y-3 mb-10">
          {SCOPING_QUESTIONS.map((qn, i) => (
            <div key={qn.id} className={`border rounded-xl px-5 py-4 transition-colors ${answers[qn.id] !== undefined ? 'border-gray-200 bg-gray-50/50' : 'border-blue-200'}`}>
              <div className="flex items-start justify-between gap-4 flex-wrap sm:flex-nowrap">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-900">
                    <span className="text-gray-300 font-mono mr-2">{String(i + 1).padStart(2, '0')}</span>
                    {qn.q}
                  </p>
                  <p className="text-xs text-gray-500 mt-1 sm:pl-7">{qn.detail}</p>
                </div>
                <div className="flex gap-1.5 flex-shrink-0">
                  {[['Yes', true], ['No', false]].map(([label, val]) => (
                    <button
                      key={label}
                      onClick={() => setAnswer(qn.id, val)}
                      className={`px-4 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                        answers[qn.id] === val
                          ? val ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-600 text-white border-gray-600'
                          : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {answered > 0 && (
          <div className="border-t border-gray-200 pt-8">
            <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
              <h2 className="text-sm font-bold text-gray-900">
                Your applicability map {done ? '' : `(${answered}/${SCOPING_QUESTIONS.length} answered)`}
              </h2>
              {results.size > 0 && (
                <button onClick={() => window.print()} className="text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors">
                  Print / save as PDF
                </button>
              )}
            </div>

            {results.size === 0 ? (
              <p className="text-sm text-gray-500">
                No mandatory frameworks identified from your answers so far{done ? ' — a voluntary framework like NIST CSF 2.0 is still the right starting point (see below)' : ''}.
              </p>
            ) : (
              <div className="space-y-3">
                {[...results.entries()].map(([fid, reasons]) => {
                  const fw = getFramework(fid)
                  const deadline = DEADLINES.find(d => d.frameworkId === fid)
                  return (
                    <div key={fid} className="border border-gray-200 rounded-xl px-5 py-4">
                      <div className="flex items-center justify-between gap-3 flex-wrap">
                        <span className="text-sm font-bold text-gray-900">{fw?.name || fid}</span>
                        <button onClick={() => onSelectFramework(fid)} className="text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors">
                          What changed recently →
                        </button>
                      </div>
                      {reasons.map((r, i) => (
                        <p key={i} className="text-xs text-gray-600 mt-1.5 leading-relaxed">{r}</p>
                      ))}
                      {deadline && (
                        <p className="text-xs text-amber-700 bg-amber-50 border border-amber-100 rounded-md px-2.5 py-1.5 mt-2 inline-block">
                          ⏱ {deadline.dateLabel}: {deadline.title}
                        </p>
                      )}
                    </div>
                  )
                })}
              </div>
            )}

            <div className="mt-4 border border-dashed border-gray-300 rounded-xl px-5 py-4">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <span className="text-sm font-bold text-gray-700">{getFramework(SCOPING_BASELINE.id)?.name} <span className="text-xs font-normal text-gray-400">(recommended for everyone)</span></span>
                <button onClick={() => onSelectFramework(SCOPING_BASELINE.id)} className="text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors">
                  What changed recently →
                </button>
              </div>
              <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">{SCOPING_BASELINE.why}</p>
            </div>

            <p className="text-xs text-gray-400 mt-6 leading-relaxed">
              Not covered here: state privacy laws (CCPA/CPRA and siblings), GDPR, sector rules like NERC CIP or
              FERPA, and contract-specific requirements. Treat this as the starting map, then verify against your
              contracts and jurisdictions.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
