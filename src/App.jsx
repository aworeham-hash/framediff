import { useState, useEffect, useCallback } from 'react'
import { Sidebar } from './components/layout/Sidebar'
import { FrameworkPage } from './components/framework/FrameworkPage'
import { HomePage } from './components/HomePage'
import { AboutPage } from './components/AboutPage'
import { TermsPage } from './components/legal/TermsPage'
import { PrivacyPage } from './components/legal/PrivacyPage'
import { CommandPalette } from './components/ui/CommandPalette'
import { frameworksData } from './data/registry'

// Parse the current URL path into a route object
function parseRoute() {
  let path = window.location.pathname.replace(/\/+$/, '') || '/'

  // Legacy hash URL support: /#nist-csf -> /nist-csf
  const hash = window.location.hash.slice(1)
  if (path === '/' && hash) {
    path = '/' + hash
    window.history.replaceState(null, '', path)
  }

  if (path === '/') return { page: 'home' }
  if (path === '/about') return { page: 'about' }
  if (path === '/terms') return { page: 'terms' }
  if (path === '/privacy') return { page: 'privacy' }

  const id = path.slice(1)
  if (frameworksData[id]) return { page: 'framework', frameworkId: id }
  return { page: 'home' }
}

export default function App() {
  const [route, setRoute] = useState(parseRoute)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() =>
    localStorage.getItem('sidebar-collapsed') === 'true'
  )
  const [recentlyViewed, setRecentlyViewed] = useState([])
  const [cmdKOpen, setCmdKOpen] = useState(false)

  useEffect(() => {
    const onPopState = () => setRoute(parseRoute())
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const navigate = useCallback((path) => {
    if (window.location.pathname !== path) {
      window.history.pushState(null, '', path)
    }
    setRoute(parseRoute())
    window.scrollTo(0, 0)
    setCmdKOpen(false)
  }, [])

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
    navigate('/' + id)
    setRecentlyViewed(prev => [id, ...prev.filter(x => x !== id)].slice(0, 5))
  }, [navigate])

  const handleHome = useCallback(() => navigate('/'), [navigate])
  const handleAbout = useCallback(() => navigate('/about'), [navigate])

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
        selectedId={route.page === 'framework' ? route.frameworkId : null}
        onSelect={handleSelectFramework}
        onHome={handleHome}
        onAbout={handleAbout}
        onNavigate={navigate}
        collapsed={sidebarCollapsed}
        onToggleCollapse={handleSidebarToggle}
        recentlyViewed={recentlyViewed}
        onOpenSearch={() => setCmdKOpen(true)}
      />
      <main className="flex-1 overflow-y-auto min-w-0">
        {route.page === 'about' ? (
          <AboutPage onHome={handleHome} />
        ) : route.page === 'terms' ? (
          <TermsPage onHome={handleHome} />
        ) : route.page === 'privacy' ? (
          <PrivacyPage onHome={handleHome} />
        ) : route.page === 'framework' ? (
          <FrameworkPage
            key={route.frameworkId}
            frameworkId={route.frameworkId}
          />
        ) : (
          <HomePage onSelectFramework={handleSelectFramework} onNavigate={navigate} />
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
