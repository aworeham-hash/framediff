export function VersionPicker({ transitions, selectedKey, onChange }) {
  const keys = Object.keys(transitions)

  if (keys.length === 0) return null

  const formatLabel = (key) => {
    const t = transitions[key]
    return `v${t.fromVersion} → v${t.toVersion}`
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-gray-500 font-medium">Comparing</span>
      <div className="relative">
        <select
          value={selectedKey}
          onChange={e => onChange(e.target.value)}
          className="appearance-none bg-white border border-gray-200 text-gray-900 text-sm font-semibold rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-slate-400 cursor-pointer"
        >
          {keys.map(key => (
            <option key={key} value={key}>
              {formatLabel(key)}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      {selectedKey && transitions[selectedKey] && (
        <span className="text-xs text-gray-400">
          {transitions[selectedKey].fromReleaseDate?.slice(0, 4)} → {transitions[selectedKey].toReleaseDate?.slice(0, 4)}
        </span>
      )}
    </div>
  )
}
