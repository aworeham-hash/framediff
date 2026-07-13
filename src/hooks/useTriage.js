import { useState, useCallback } from 'react'

// Gap-assessment triage state, persisted per framework in localStorage.
// Map of changeId -> 'relevant' | 'na' | 'done'
const storageKey = (frameworkId) => `triage:${frameworkId}`

export function useTriage(frameworkId) {
  const [triage, setMap] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(storageKey(frameworkId))) || {}
    } catch {
      return {}
    }
  })

  const setTriage = useCallback((changeId, value) => {
    setMap(prev => {
      const next = { ...prev }
      if (value) next[changeId] = value
      else delete next[changeId]
      try { localStorage.setItem(storageKey(frameworkId), JSON.stringify(next)) } catch { /* full/blocked */ }
      return next
    })
  }, [frameworkId])

  const clearTriage = useCallback(() => {
    setMap({})
    try { localStorage.removeItem(storageKey(frameworkId)) } catch { /* noop */ }
  }, [frameworkId])

  return { triage, setTriage, clearTriage }
}
