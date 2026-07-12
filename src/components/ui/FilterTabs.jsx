import { FILTER_OPTIONS } from '../../utils/constants'

const TYPE_STYLES = {
  added:        'bg-emerald-50 text-emerald-700 border-emerald-200',
  removed:      'bg-red-50 text-red-700 border-red-200',
  modified:     'bg-blue-50 text-blue-700 border-blue-200',
  restructured: 'bg-amber-50 text-amber-700 border-amber-200',
  renamed:      'bg-purple-50 text-purple-700 border-purple-200',
}

export function FilterTabs({ activeFilter, onChange, counts }) {
  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      {FILTER_OPTIONS.map(opt => {
        const count = opt.key === 'all'
          ? Object.values(counts).reduce((a, b) => a + b, 0)
          : (counts[opt.key] || 0)

        if (opt.key !== 'all' && count === 0) return null

        const isActive = activeFilter === opt.key
        const typeStyle = TYPE_STYLES[opt.key]

        return (
          <button
            key={opt.key}
            onClick={() => onChange(opt.key)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
              isActive
                ? opt.key === 'all'
                  ? 'bg-gray-900 text-white border-gray-900'
                  : `${typeStyle} shadow-sm`
                : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300 hover:text-gray-700'
            }`}
          >
            {opt.label}
            <span className={`rounded-full px-1.5 py-0.5 font-semibold text-xs ${
              isActive
                ? opt.key === 'all' ? 'bg-gray-700 text-white' : 'bg-white/60'
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
