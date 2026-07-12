import { useState, useEffect, useRef } from 'react'
import { FRAMEWORK_GROUPS } from '../../utils/constants'
import { getFramework } from '../../data/registry'

const ALL_FRAMEWORKS = FRAMEWORK_GROUPS.flatMap(g =>
  g.frameworks.map(id => ({ id, group: g.name, fw: getFramework(id) }))
).filter(x => x.fw)

export function CommandPalette({ onSelect, onClose }) {
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef(null)
  const listRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const results = query.trim()
    ? ALL_FRAMEWORKS.filter(({ fw, group }) => {
        const q = query.toLowerCase()
        return (
          fw.name.toLowerCase().includes(q) ||
          (fw.shortName || '').toLowerCase().includes(q) ||
          group.toLowerCase().includes(q) ||
          (fw.publisher || '').toLowerCase().includes(q) ||
          (fw.description || '').toLowerCase().includes(q)
        )
      })
    : ALL_FRAMEWORKS

  const available = results.filter(x => !x.fw.comingSoon)
  const soon = results.filter(x => x.fw.comingSoon)
  const ordered = [...available, ...soon]

  useEffect(() => {
    setActiveIndex(0)
  }, [query])

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex(i => Math.min(i + 1, ordered.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex(i => Math.max(i - 1, 0))
    } else if (e.key === 'Enter') {
      const item = ordered[activeIndex]
      if (item && !item.fw.comingSoon) onSelect(item.id)
    } else if (e.key === 'Escape') {
      onClose()
    }
  }

  // Scroll active item into view
  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-index="${activeIndex}"]`)
    el?.scrollIntoView({ block: 'nearest' })
  }, [activeIndex])

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Palette */}
      <div
        className="relative w-full max-w-xl mx-4 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-gray-100">
          <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search frameworks…"
            className="flex-1 text-sm text-gray-900 placeholder-gray-400 outline-none bg-transparent"
          />
          <kbd className="text-xs bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded font-mono flex-shrink-0">esc</kbd>
        </div>

        {/* Results */}
        <div ref={listRef} className="max-h-80 overflow-y-auto py-1.5">
          {ordered.length === 0 && (
            <div className="px-4 py-8 text-center text-sm text-gray-400">
              No frameworks match "{query}"
            </div>
          )}

          {ordered.map(({ id, group, fw }, i) => (
            <button
              key={id}
              data-index={i}
              onClick={() => !fw.comingSoon && onSelect(id)}
              disabled={fw.comingSoon}
              className={`w-full text-left flex items-center gap-3 px-4 py-2.5 transition-colors ${
                fw.comingSoon
                  ? 'opacity-40 cursor-default'
                  : i === activeIndex
                    ? 'bg-blue-50'
                    : 'hover:bg-gray-50'
              }`}
            >
              {/* Icon */}
              <div className={`w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0 text-xs font-bold text-white ${
                fw.comingSoon ? 'bg-gray-300' : 'bg-blue-600'
              }`}>
                {(fw.shortName || fw.name).slice(0, 2).toUpperCase()}
              </div>

              {/* Text */}
              <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold text-gray-900 truncate">{fw.shortName || fw.name}</div>
                <div className="text-xs text-gray-400 truncate">{group} · {fw.publisher}</div>
              </div>

              {/* Status */}
              {fw.comingSoon ? (
                <span className="text-xs text-gray-400 flex-shrink-0">Soon</span>
              ) : (
                <span className="text-xs text-gray-400 flex-shrink-0 font-mono">{fw.latestVersion}</span>
              )}
            </button>
          ))}
        </div>

        {/* Footer hint */}
        <div className="px-4 py-2 border-t border-gray-100 flex items-center gap-4 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <kbd className="bg-gray-100 px-1 py-0.5 rounded font-mono">↑↓</kbd> navigate
          </span>
          <span className="flex items-center gap-1">
            <kbd className="bg-gray-100 px-1 py-0.5 rounded font-mono">↵</kbd> open
          </span>
          <span className="flex items-center gap-1">
            <kbd className="bg-gray-100 px-1 py-0.5 rounded font-mono">esc</kbd> close
          </span>
        </div>
      </div>
    </div>
  )
}
