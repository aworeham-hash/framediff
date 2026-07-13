import { FRAMEWORK_GROUPS } from '../utils/constants'
import { getFramework } from '../data/registry'

export function NotFoundPage({ onHome, onSelectFramework }) {
  const suggestions = FRAMEWORK_GROUPS.flatMap(g => g.frameworks)
    .map(getFramework)
    .filter(fw => fw && !fw.comingSoon)
    .slice(0, 4)

  return (
    <div className="h-full flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="text-6xl font-bold text-gray-200 font-mono mb-4">404</div>
        <h1 className="text-xl font-bold text-gray-900 mb-2">Page not found</h1>
        <p className="text-sm text-gray-500 mb-8">
          That page doesn't exist. Maybe you were looking for one of these frameworks?
        </p>
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {suggestions.map(fw => (
            <button
              key={fw.id}
              onClick={() => onSelectFramework(fw.id)}
              className="text-xs font-medium text-gray-600 hover:text-blue-700 border border-gray-200 hover:border-blue-200 hover:bg-blue-50/50 rounded-full px-3 py-1.5 transition-colors"
            >
              {fw.shortName || fw.name}
            </button>
          ))}
        </div>
        <button
          onClick={onHome}
          className="text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-5 py-2.5 transition-colors"
        >
          Back to home
        </button>
      </div>
    </div>
  )
}
