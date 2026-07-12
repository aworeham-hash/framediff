export function MetadataOnlyBanner({ copyright, source, frameworkName }) {
  const isMetadataOnly = copyright === 'restricted-metadata-only'
  const isSummaryOnly = copyright === 'restricted-summary-only'

  if (!isMetadataOnly && !isSummaryOnly) return null

  return (
    <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl">
      <div className="w-5 h-5 rounded-full bg-amber-200 flex items-center justify-center flex-shrink-0 mt-0.5">
        <svg className="w-3 h-3 text-amber-700" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
      </div>
      <div>
        <p className="text-sm font-semibold text-amber-800">
          {isMetadataOnly ? 'Structural changes only' : 'Change summaries only'}
        </p>
        <p className="text-xs text-amber-700 mt-0.5">
          {frameworkName} is a copyrighted standard.{' '}
          {isMetadataOnly
            ? 'FrameDiff shows control IDs, names, structural mapping, and change counts — not the full control text.'
            : 'FrameDiff shows official change summaries but not the complete requirement text.'
          }{' '}
          {source && (
            <>
              Access the full standard at{' '}
              <a
                href={source}
                target="_blank"
                rel="noopener noreferrer"
                className="underline font-medium hover:text-amber-900"
              >
                the official source
              </a>.
            </>
          )}
        </p>
      </div>
    </div>
  )
}
