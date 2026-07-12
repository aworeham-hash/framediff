import { useState, useMemo } from 'react'
import { getFramework, getDefaultTransition } from '../../data/registry'
import { useFilteredChanges } from '../../hooks/useFilteredChanges'
import { VersionPicker } from './VersionPicker'
import { SummaryCards } from './SummaryCards'
import { Highlights } from './Highlights'
import { ChangeList } from './ChangeList'
import { MetadataOnlyBanner } from './MetadataOnlyBanner'
import { ComingSoonPage } from './ComingSoonPage'
import { FilterTabs } from '../ui/FilterTabs'
import { SearchBar } from '../ui/SearchBar'
import { CopyrightBadge } from '../ui/Badge'

export function FrameworkPage({ frameworkId }) {
  const framework = getFramework(frameworkId)
  const [filter, setFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Initialize with latest transition
  const defaultTransitionKey = framework ? getDefaultTransition(framework) : null
  const [selectedTransitionKey, setSelectedTransitionKey] = useState(defaultTransitionKey)

  // Reset state when framework changes
  const stableTransitionKey = (framework?.transitions && framework.transitions[selectedTransitionKey])
    ? selectedTransitionKey
    : defaultTransitionKey

  if (!framework) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        Framework not found.
      </div>
    )
  }

  // Coming soon frameworks
  if (framework.comingSoon) {
    return <ComingSoonPage framework={framework} />
  }

  const transition = framework.transitions?.[stableTransitionKey]
  const allChanges = transition?.changes || []

  const filteredChanges = useFilteredChanges(allChanges, filter, searchQuery)

  // Change counts for filter tabs
  const changeCounts = useMemo(() => {
    const counts = {}
    allChanges.forEach(c => {
      counts[c.type] = (counts[c.type] || 0) + 1
    })
    return counts
  }, [allChanges])

  const handleTransitionChange = (key) => {
    setSelectedTransitionKey(key)
    setFilter('all')
    setSearchQuery('')
  }

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter)
  }

  return (
    <div className="max-w-4xl mx-auto px-8 py-8 space-y-6">

      {/* Framework header */}
      <div>
        <div className="flex items-start justify-between mb-1">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                {framework.publisher}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">{framework.name}</h1>
          </div>
          <CopyrightBadge copyright={framework.copyright} />
        </div>
        {framework.description && (
          <p className="text-sm text-gray-500 mt-1 max-w-2xl">{framework.description}</p>
        )}
      </div>

      {/* Copyright banner (for restricted frameworks) */}
      {framework.copyright !== 'public-domain' && (
        <MetadataOnlyBanner
          copyright={framework.copyright}
          source={framework.source}
          frameworkName={framework.shortName || framework.name}
        />
      )}

      {/* Version picker */}
      {framework.transitions && Object.keys(framework.transitions).length > 0 ? (
        <div className="flex items-center justify-between">
          <VersionPicker
            transitions={framework.transitions}
            selectedKey={stableTransitionKey}
            onChange={handleTransitionChange}
          />
          {framework.officialChangelogUrl && (
            <a
              href={framework.officialChangelogUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Official changelog
            </a>
          )}
        </div>
      ) : null}

      {transition ? (
        <>
          {/* Summary cards */}
          <SummaryCards
            summary={transition.summary}
            activeFilter={filter}
            onFilterChange={handleFilterChange}
          />

          {/* Highlights */}
          {transition.summary?.highlights?.length > 0 && (
            <Highlights highlights={transition.summary.highlights} />
          )}

          {/* Filter + search */}
          <div className="space-y-3">
            <FilterTabs
              activeFilter={filter}
              onChange={handleFilterChange}
              counts={changeCounts}
            />
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>

          {/* Result count */}
          {(searchQuery || filter !== 'all') && (
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                Showing <span className="font-semibold text-gray-900">{filteredChanges.length}</span> of{' '}
                <span className="font-semibold text-gray-900">{allChanges.length}</span> changes
              </p>
              {(searchQuery || filter !== 'all') && (
                <button
                  onClick={() => { setFilter('all'); setSearchQuery('') }}
                  className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                >
                  Clear filters
                </button>
              )}
            </div>
          )}

          {/* Change list */}
          <ChangeList
            changes={filteredChanges}
            filter={filter}
            searchQuery={searchQuery}
          />

          {/* Footer note */}
          <div className="pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-400">
              Data last updated: {framework.lastDataUpdate} ·{' '}
              Source:{' '}
              <a href={framework.source} target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-600">
                {framework.publisher} official publication
              </a>
            </p>
          </div>
        </>
      ) : (
        <div className="text-center py-12 text-gray-400">
          <p>No transition data available for this framework yet.</p>
        </div>
      )}
    </div>
  )
}
