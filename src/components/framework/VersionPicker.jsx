export function VersionPicker({ transitions, selectedKey, onChange }) {
  const keys = Object.keys(transitions)
  if (keys.length === 0) return null

  const formatLabel = (key) => {
    const t = transitions[key]
    return `${t.fromVersion} → ${t.toVersion}`
  }

  const selected = transitions[selectedKey]

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <span className="text-xs text-gray-500 font-medium">Version diff</span>

      <div className="relative">
        <select
          value={selectedKey}
          onChange={e => onChange(e.target.value)}
          className="appearance-none bg-white border border-gray-200 text-gray-900 text-sm font-semibold rounded-lg pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
        >
          {keys.map(key => (
            <option key={key} value={key}>
              {formatLabel(key)}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5">
          <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {selected && (
        <span className="text-xs text-gray-400 font-mono">
          {selected.fromReleaseDate?.slice(0, 4)} → {selected.toReleaseDate?.slice(0, 4)}
        </span>
      )}
    </div>
  )
}
