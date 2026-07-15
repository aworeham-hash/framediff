import { useState, useEffect, useCallback } from 'react'
import { Sidebar } from './components/layout/Sidebar'
import { FrameworkPage } from './components/framework/FrameworkPage'
import { HomePage } from './components/HomePage'
import { AboutPage } from './components/AboutPage'
import { TermsPage } from './components/legal/TermsPage'
import { PrivacyPage } from './components/legal/PrivacyPage'
import { NotFoundPage } from './components/NotFoundPage'
import { UpdatesPage } from './components/UpdatesPage'
import { EvidencePage } from './components/EvidencePage'
import { CommandPalette } from './components/ui/CommandPalette'
import { LogoMark } from './components/brand/Logo'
import { frameworksData } from './data/registry'

// Parse the current URL path into a route object
function parseRoute() {
  let path = window.location.pathname.replace(/\/+$/, '') || '/'

  // Legacy hash URL support: /#nist-csf -> /nist-csf
  const hash = window.location.hash.slice(1)
  if (path === '/' && hash && !hash.includes('=')) {
    path = '/' + hash
    window.history.replaceState(null, '', path)
  }

  if (path === '/') return { page: 'home' }
  if (path === '/about') return { page: 'about' }
  if (path === '/terms') return { page: 'terms' }
  if (path === '/privacy') return { page: 'privacy' }
  if (path === '/updates') return { page: 'updates' }
  if (path === '/evidence') return { page: 'evidence' }

  const id = path.slice(1)
  if (frameworksData[id]) return { page: 'framework', frameworkId: id }
  return { page: 'notfound' }
}

export default function App() {
  const [route, setRoute] = useState(parseRoute)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() =>
    localStorage.getItem('sidebar-collapsed') === 'true'
  )
  const [recentlyViewed, setRecentlyViewed] = useState([])
  const [cmdKOpen, setCmdKOpen] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  useEffect(() => {
    const onPopState = () => setRoute(parseRoute())
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const navigate = useCallback((path) => {
    if (window.location.pathname !== path || window.location.search) {
      window.history.pushState(null, '', path)
    }
    setRoute(parseRoute())
    window.scrollTo(0, 0)
    setCmdKOpen(false)
    setMobileNavOpen(false)
  }, [])

  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setCmdKOpen(true)
      }
      if (e.key === 'Escape') {
        setCmdKOpen(false)
        setMobileNavOpen(false)
      }
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

  const page = route.page === 'about' ? (
    <AboutPage onHome={handleHome} />
  ) : route.page === 'terms' ? (
    <TermsPage onHome={handleHome} />
  ) : route.page === 'privacy' ? (
    <PrivacyPage onHome={handleHome} />
  ) : route.page === 'updates' ? (
    <UpdatesPage onSelectFramework={handleSelectFramework} onHome={handleHome} />
  ) : route.page === 'evidence' ? (
    <EvidencePage onSelectFramework={handleSelectFramework} onHome={handleHome} />
  ) : route.page === 'notfound' ? (
    <NotFoundPage onHome={handleHome} onSelectFramework={handleSelectFramework} />
  ) : route.page === 'framework' ? (
    <FrameworkPage key={route.frameworkId} frameworkId={route.frameworkId} />
  ) : (
    <HomePage onSelectFramework={handleSelectFramework} onNavigate={navigate} />
  )

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-white">
      {/* Mobile header */}
      <header className="lg:hidden flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-white flex-shrink-0">
        <button onClick={handleHome} className="flex items-center gap-2">
          <LogoMark size={28} />
          <span className="font-bold text-gray-900 text-sm tracking-tight">FrameDiff</span>
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCmdKOpen(true)}
            aria-label="Search"
            className="w-9 h-9 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-500"
          >
            <svg className="w-4.5 h-4.5 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <button
            onClick={() => setMobileNavOpen(true)}
            aria-label="Open menu"
            className="w-9 h-9 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-600"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Desktop sidebar */}
        <div className="hidden lg:flex flex-shrink-0">
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
        </div>

        <main className="flex-1 overflow-y-auto min-w-0">
          {page}
        </main>
      </div>

      {/* Mobile drawer */}
      {mobileNavOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileNavOpen(false)}
          />
          <div className="relative h-full w-72 max-w-[85vw] shadow-2xl animate-slide-in">
            <Sidebar
              selectedId={route.page === 'framework' ? route.frameworkId : null}
              onSelect={handleSelectFramework}
              onHome={handleHome}
              onAbout={handleAbout}
              onNavigate={navigate}
              collapsed={false}
              onToggleCollapse={() => setMobileNavOpen(false)}
              recentlyViewed={recentlyViewed}
              onOpenSearch={() => { setMobileNavOpen(false); setCmdKOpen(true) }}
              isMobileDrawer
              onClose={() => setMobileNavOpen(false)}
            />
          </div>
        </div>
      )}

      {cmdKOpen && (
        <CommandPalette
          onSelect={handleSelectFramework}
          onClose={() => setCmdKOpen(false)}
        />
      )}
    </div>
  )
}
