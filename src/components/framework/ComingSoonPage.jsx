export function ComingSoonPage({ framework }) {
  return (
    <div className="max-w-2xl mx-auto px-8 py-16 text-center">
      <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-6">
        <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h2 className="text-xl font-bold text-gray-900 mb-2">{framework.name}</h2>
      <p className="text-gray-500 mb-6">
        Data for this framework is being prepared and will be available soon.
        Check the project roadmap for the planned timeline.
      </p>

      <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 text-left space-y-3">
        <p className="text-sm font-semibold text-gray-700">What's coming:</p>
        <ul className="space-y-2 text-sm text-gray-600">
          {framework.versions && (
            <li className="flex items-start gap-2">
              <span className="text-emerald-500 mt-0.5">→</span>
              Version history: {framework.versions.join(' → ')}
            </li>
          )}
          {framework.source && (
            <li className="flex items-start gap-2">
              <span className="text-emerald-500 mt-0.5">→</span>
              <span>
                Official source:{' '}
                <a href={framework.source} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800">
                  {framework.publisher || framework.shortName}
                </a>
              </span>
            </li>
          )}
          <li className="flex items-start gap-2">
            <span className="text-emerald-500 mt-0.5">→</span>
            Full change comparison with summary + drill-down detail
          </li>
        </ul>
      </div>
    </div>
  )
}
