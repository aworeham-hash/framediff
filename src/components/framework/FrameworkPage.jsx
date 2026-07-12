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

  const defaultTransitionKey = framework ? getDefaultTransition(framework) : null
  const [selectedTransitionKey, setSelectedTransitionKey] = useState(defaultTransitionKey)

  const stableTransitionKey = (framework?.transitions && framework.transitions[selectedTransitionKey])
    ? selectedTransitionKey
    : defaultTransitionKey

  if (!framework) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400 text-sm">
        Framework not found.
      </div>
    )
  }

  if (framework.comingSoon) {
    return <ComingSoonPage framework={framework} />
  }

  const transition = framework.transitions?.[stableTransitionKey]
  const allChanges = transition?.changes || []
  const filteredChanges = useFilteredChanges(allChanges, filter, searchQuery)

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

  return (
    <div className="h-full overflow-y-auto">

      {/* Sticky top bar */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-400 font-medium">{framework.publisher}</span>
          <span className="text-gray-200">/</span>
          <span className="text-xs font-semibold text-gray-700">{framework.shortName || framework.name}</span>
        </div>
        <div className="flex items-center gap-3">
          <CopyrightBadge copyright={framework.copyright} />
          {framework.officialChangelogUrl && (
            <a
              href={framework.officialChangelogUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-blue-600 transition-colors"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Official source
            </a>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-8 py-8 space-y-6">

        {/* Framework title */}
        <div>
          <h1 className="text-2xl font-bold text-gray-950 tracking-tight">{framework.name}</h1>
          {framework.description && (
            <p className="text-sm text-gray-500 mt-1.5 leading-relaxed max-w-2xl">{framework.description}</p>
          )}
        </div>

        {/* Copyright banner */}
        {framework.copyright !== 'public-domain' && (
          <MetadataOnlyBanner
            copyright={framework.copyright}
            source={framework.source}
            frameworkName={framework.shortName || framework.name}
          />
        )}

        {/* Version picker */}
        {framework.transitions && Object.keys(framework.transitions).length > 0 && (
          <VersionPicker
            transitions={framework.transitions}
            selectedKey={stableTransitionKey}
            onChange={handleTransitionChange}
          />
        )}

        {transition ? (
          <>
            {/* Summary stats */}
            <SummaryCards
              summary={transition.summary}
              activeFilter={filter}
              onFilterChange={setFilter}
            />

            {/* Key highlights */}
            {transition.summary?.highlights?.length > 0 && (
              <Highlights highlights={transition.summary.highlights} />
            )}

            {/* Filter + search */}
            <div className="space-y-2">
              <FilterTabs
                activeFilter={filter}
                onChange={setFilter}
                counts={changeCounts}
              />
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
            </div>

            {/* Result count + clear */}
            {(searchQuery || filter !== 'all') && (
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  Showing <span className="font-semibold text-gray-900">{filteredChanges.length}</span> of{' '}
                  <span className="font-semibold text-gray-900">{allChanges.length}</span> changes
                </p>
                <button
                  onClick={() => { setFilter('all'); setSearchQuery('') }}
                  className="text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors"
                >
                  Clear filters
                </button>
              </div>
            )}

            {/* Changes */}
            <ChangeList
              changes={filteredChanges}
              filter={filter}
              searchQuery={searchQuery}
            />

            {/* Footer */}
            <div className="pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-400">
                Last updated: {framework.lastDataUpdate} ·{' '}
                <a href={framework.source} target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-600 transition-colors">
                  {framework.publisher} official publication
                </a>
              </p>
            </div>
          </>
        ) : (
          <div className="text-center py-16 text-gray-400 text-sm">
            No transition data available yet.
          </div>
        )}
      </div>
    </div>
  )
}
