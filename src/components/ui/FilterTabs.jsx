import { FILTER_OPTIONS, CHANGE_TYPES } from '../../utils/constants'

export function FilterTabs({ activeFilter, onChange, counts }) {
  return (
    <div className="flex items-center gap-1 flex-wrap">
      {FILTER_OPTIONS.map(opt => {
        const count = opt.key === 'all'
          ? Object.values(counts).reduce((a, b) => a + b, 0)
          : (counts[opt.key] || 0)
        const isActive = activeFilter === opt.key
        const typeConfig = CHANGE_TYPES[opt.key]

        return (
          <button
            key={opt.key}
            onClick={() => onChange(opt.key)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
              isActive
                ? opt.key === 'all'
                  ? 'bg-slate-800 text-white'
                  : `${typeConfig?.bgClass} ${typeConfig?.textClass} border ${typeConfig?.borderClass}`
                : 'bg-white text-gray-500 border border-gray-200 hover:border-gray-300 hover:text-gray-700'
            }`}
          >
            {typeConfig && <span className="font-mono text-xs">{typeConfig.icon}</span>}
            {opt.label}
            <span className={`text-xs rounded-full px-1.5 py-0.5 font-semibold ${
              isActive
                ? opt.key === 'all' ? 'bg-slate-600 text-white' : 'bg-white bg-opacity-60'
                : 'bg-gray-100 text-gray-500'
            }`}>
              {count}
            </span>
          </button>
        )
      })}
    </div>
  )
}
