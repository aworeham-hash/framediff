export function EmptyState({ searchQuery, filter }) {
  const isFiltered = filter !== 'all' || searchQuery

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <p className="text-sm font-medium text-gray-700">No changes found</p>
      <p className="text-sm text-gray-400 mt-1">
        {isFiltered ? 'Try adjusting your filters or search query.' : 'No changes recorded for this transition.'}
      </p>
    </div>
  )
}
