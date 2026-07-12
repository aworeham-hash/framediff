import { useState } from 'react'
import { Sidebar } from './components/layout/Sidebar'
import { FrameworkPage } from './components/framework/FrameworkPage'
import { HomePage } from './components/HomePage'

export default function App() {
  const [selectedFrameworkId, setSelectedFrameworkId] = useState(null)

  const handleSelectFramework = (id) => {
    setSelectedFrameworkId(id)
    window.scrollTo(0, 0)
  }

  const handleHome = () => {
    setSelectedFrameworkId(null)
    window.scrollTo(0, 0)
  }

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      {/* Sidebar */}
      <Sidebar
        selectedId={selectedFrameworkId}
        onSelect={handleSelectFramework}
        onHome={handleHome}
      />

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        {selectedFrameworkId ? (
          <FrameworkPage
            key={selectedFrameworkId}
            frameworkId={selectedFrameworkId}
          />
        ) : (
          <HomePage onSelectFramework={handleSelectFramework} />
        )}
      </main>
    </div>
  )
}
