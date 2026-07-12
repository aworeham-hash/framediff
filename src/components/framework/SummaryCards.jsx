const STAT_CONFIGS = {
  added:        { label: 'Added',        color: 'text-emerald-600', bg: 'bg-emerald-50',  border: 'border-emerald-200', activeBg: 'bg-emerald-600', icon: '+' },
  removed:      { label: 'Removed',      color: 'text-red-500',     bg: 'bg-red-50',      border: 'border-red-200',     activeBg: 'bg-red-500',     icon: '−' },
  modified:     { label: 'Modified',     color: 'text-blue-600',    bg: 'bg-blue-50',     border: 'border-blue-200',    activeBg: 'bg-blue-600',    icon: '~' },
  restructured: { label: 'Restructured', color: 'text-amber-600',   bg: 'bg-amber-50',    border: 'border-amber-200',   activeBg: 'bg-amber-500',   icon: '⟳' },
}

function StatCard({ type, count, isActive, onClick }) {
  const c = STAT_CONFIGS[type]
  if (!c) return null

  return (
    <button
      onClick={() => onClick(isActive ? 'all' : type)}
      className={`flex-1 min-w-0 rounded-lg border p-4 text-left transition-all ${
        isActive
          ? `${c.bg} ${c.border} shadow-sm`
          : 'bg-white border-gray-200 hover:border-gray-300'
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <span className={`text-xs font-semibold uppercase tracking-widest ${isActive ? c.color : 'text-gray-400'}`}>
          {c.label}
        </span>
        <span className={`font-mono text-sm font-bold ${isActive ? c.color : 'text-gray-300'}`}>
          {c.icon}
        </span>
      </div>
      <p className={`text-3xl font-bold tabular-nums ${isActive ? c.color : 'text-gray-900'}`}>
        {count}
      </p>
      <p className={`text-xs mt-1 ${isActive ? c.color : 'text-gray-400'}`}>
        {count === 1 ? 'control' : 'controls'}
      </p>
    </button>
  )
}

export function SummaryCards({ summary, activeFilter, onFilterChange }) {
  const types = ['added', 'removed', 'modified', 'restructured']
  const total = types.reduce((sum, t) => sum + (summary[t] || 0), 0)

  return (
    <div>
      <div className="flex gap-3">
        {types.map(type => (
          <StatCard
            key={type}
            type={type}
            count={summary[type] || 0}
            isActive={activeFilter === type}
            onClick={onFilterChange}
          />
        ))}
      </div>

      {/* Control count change */}
      {summary.totalFrom && summary.totalTo && (
        <div className="flex items-center gap-3 mt-3 px-1">
          <span className="text-xs text-gray-400">
            {summary.totalFrom} controls → {summary.totalTo} controls
          </span>
          {summary.totalFrom !== summary.totalTo && (
            <span className={`text-xs font-semibold px-1.5 py-0.5 rounded ${
              summary.totalTo > summary.totalFrom
                ? 'bg-emerald-50 text-emerald-600'
                : 'bg-red-50 text-red-500'
            }`}>
              {summary.totalTo > summary.totalFrom ? '+' : ''}{summary.totalTo - summary.totalFrom} net
            </span>
          )}
          <span className="text-xs text-gray-300 ml-auto">{total} documented changes</span>
        </div>
      )}
    </div>
  )
}
