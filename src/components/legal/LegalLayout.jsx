export function LegalLayout({ title, updated, onHome, children }) {
  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-2xl mx-auto px-8 py-12">
        <button
          onClick={onHome}
          className="text-xs text-gray-400 hover:text-blue-600 transition-colors mb-6 inline-flex items-center gap-1"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to FrameDiff
        </button>
        <h1 className="text-2xl font-bold text-gray-950 tracking-tight">{title}</h1>
        <p className="text-xs text-gray-400 mt-1 mb-8">Last updated: {updated}</p>
        <div className="space-y-6 text-sm text-gray-600 leading-relaxed [&_h2]:text-base [&_h2]:font-semibold [&_h2]:text-gray-900 [&_h2]:mt-2">
          {children}
        </div>
      </div>
    </div>
  )
}
