import { useMemo } from 'react'

export function useFilteredChanges(changes = [], filter = 'all', searchQuery = '') {
  return useMemo(() => {
    let result = changes

    // Filter by change type
    if (filter !== 'all') {
      result = result.filter(c => c.type === filter)
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(c =>
        c.title?.toLowerCase().includes(q) ||
        c.area?.toLowerCase().includes(q) ||
        c.rationale?.toLowerCase().includes(q) ||
        c.controlId?.old?.toLowerCase().includes(q) ||
        c.controlId?.new?.toLowerCase().includes(q) ||
        c.oldText?.toLowerCase().includes(q) ||
        c.newText?.toLowerCase().includes(q) ||
        c.tags?.some(t => t.toLowerCase().includes(q))
      )
    }

    return result
  }, [changes, filter, searchQuery])
}
