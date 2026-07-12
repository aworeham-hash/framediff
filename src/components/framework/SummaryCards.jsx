import { CHANGE_TYPES } from '../../utils/constants'

function StatCard({ type, count, isActive, onClick }) {
  const config = CHANGE_TYPES[type]
  if (!config) return null

  return (
    <button
      onClick={() => onClick(isActive ? 'all' : type)}
      className={`flex-1 min-w-0 p-4 rounded-xl border transition-all text-left ${
        isActive
          ? `${config.bgClass} ${config.borderClass} shadow-sm`
          : 'bg-white border-gray-200 hover:border-gray-300'
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className={`text-xs font-semibold uppercase tracking-wider ${isActive ? config.textClass : 'text-gray-400'}`}>
          {config.label}
        </span>
        <span className={`text-lg font-mono ${config.icon === '+' ? '' : ''} ${isActive ? config.textClass : 'text-gray-400'}`}>
          {config.icon}
        </span>
      </div>
      <p className={`text-3xl font-bold ${isActive ? config.textClass : 'text-gray-900'}`}>
        {count}
      </p>
      <p className={`text-xs mt-1 ${isActive ? config.textClass : 'text-gray-400'}`}>
        {count === 1 ? 'change' : 'changes'}
      </p>
    </button>
  )
}

export function SummaryCards({ summary, activeFilter, onFilterChange }) {
  const types = ['added', 'removed', 'modified', 'restructured']

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

      {/* Totals bar */}
      <div className="flex items-center gap-4 mt-3 px-1">
        {summary.totalFrom && summary.totalTo && (
          <span className="text-xs text-gray-400">
            {summary.totalFrom} controls in previous version
            {' → '}
            {summary.totalTo} in current version
          </span>
        )}
        {summary.totalFrom && summary.totalTo && summary.totalFrom !== summary.totalTo && (
          <span className={`text-xs font-medium ${
            summary.totalTo > summary.totalFrom ? 'text-emerald-600' : 'text-red-500'
          }`}>
            {summary.totalTo > summary.totalFrom ? '+' : ''}{summary.totalTo - summary.totalFrom} net
          </span>
        )}
      </div>
    </div>
  )
}
