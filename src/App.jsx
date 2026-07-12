import { useState, useEffect, useCallback } from 'react'
import { Sidebar } from './components/layout/Sidebar'
import { FrameworkPage } from './components/framework/FrameworkPage'
import { HomePage } from './components/HomePage'
import { CommandPalette } from './components/ui/CommandPalette'

export default function App() {
  const [selectedFrameworkId, setSelectedFrameworkId] = useState(null)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() =>
    localStorage.getItem('sidebar-collapsed') === 'true'
  )
  const [recentlyViewed, setRecentlyViewed] = useState([])
  const [cmdKOpen, setCmdKOpen] = useState(false)

  // Hash-based routing — framework pages are bookmarkable
  useEffect(() => {
    const syncFromHash = () => {
      const id = window.location.hash.slice(1)
      setSelectedFrameworkId(id || null)
    }
    syncFromHash()
    window.addEventListener('hashchange', syncFromHash)
    return () => window.removeEventListener('hashchange', syncFromHash)
  }, [])

  // Cmd+K / Ctrl+K opens command palette
  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setCmdKOpen(true)
      }
      if (e.key === 'Escape') setCmdKOpen(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const handleSelectFramework = useCallback((id) => {
    setSelectedFrameworkId(id)
    window.location.hash = id
    setRecentlyViewed(prev => [id, ...prev.filter(x => x !== id)].slice(0, 5))
    window.scrollTo(0, 0)
    setCmdKOpen(false)
  }, [])

  const handleHome = useCallback(() => {
    setSelectedFrameworkId(null)
    window.location.hash = ''
    window.scrollTo(0, 0)
  }, [])

  const handleSidebarToggle = () => {
    setSidebarCollapsed(c => {
      const next = !c
      localStorage.setItem('sidebar-collapsed', String(next))
      return next
    })
  }

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      <Sidebar
        selectedId={selectedFrameworkId}
        onSelect={handleSelectFramework}
        onHome={handleHome}
        collapsed={sidebarCollapsed}
        onToggleCollapse={handleSidebarToggle}
        recentlyViewed={recentlyViewed}
        onOpenSearch={() => setCmdKOpen(true)}
      />

      <main className="flex-1 overflow-y-auto min-w-0">
        {selectedFrameworkId ? (
          <FrameworkPage
            key={selectedFrameworkId}
            frameworkId={selectedFrameworkId}
          />
        ) : (
          <HomePage onSelectFramework={handleSelectFramework} />
        )}
      </main>

      {cmdKOpen && (
        <CommandPalette
          onSelect={handleSelectFramework}
          onClose={() => setCmdKOpen(false)}
        />
      )}
    </div>
  )
}
