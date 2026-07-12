/**
 * Resolve a transition between any two versions of a framework.
 * Returns a direct transition if one exists, otherwise chains through
 * intermediate versions via BFS and merges the changes.
 */
export function resolveTransition(framework, fromVersion, toVersion) {
  if (!framework?.transitions || !fromVersion || !toVersion) return null
  if (fromVersion === toVersion) return null

  const transitions = framework.transitions

  // 1. Direct match
  const directKey = Object.keys(transitions).find(k => {
    const t = transitions[k]
    return t.fromVersion === fromVersion && t.toVersion === toVersion
  })
  if (directKey) {
    return { key: directKey, chained: false, chainedThrough: null, transition: transitions[directKey] }
  }

  // 2. BFS through version graph
  const graph = {}
  Object.entries(transitions).forEach(([key, t]) => {
    if (!graph[t.fromVersion]) graph[t.fromVersion] = []
    graph[t.fromVersion].push({ to: t.toVersion, key })
  })

  const queue = [[fromVersion, []]]
  const visited = new Set([fromVersion])

  while (queue.length > 0) {
    const [current, path] = queue.shift()
    for (const { to, key } of (graph[current] || [])) {
      if (visited.has(to)) continue
      const newPath = [...path, key]
      if (to === toVersion) {
        return chainTransitions(transitions, newPath, fromVersion, toVersion)
      }
      visited.add(to)
      queue.push([to, newPath])
    }
  }

  return null // no forward path exists
}

function chainTransitions(transitions, keys, fromVersion, toVersion) {
  let added = 0, removed = 0, modified = 0, restructured = 0
  const allChanges = []
  const highlights = []

  keys.forEach(key => {
    const t = transitions[key]
    ;(t.changes || []).forEach(c => {
      allChanges.push({ ...c, _viaTransition: `${t.fromVersion} → ${t.toVersion}` })
    })
    added       += t.summary?.added       || 0
    removed     += t.summary?.removed     || 0
    modified    += t.summary?.modified    || 0
    restructured+= t.summary?.restructured|| 0
    ;(t.summary?.highlights || []).forEach(h =>
      highlights.push(`[${t.fromVersion} → ${t.toVersion}] ${h}`)
    )
  })

  return {
    key: keys.join('+'),
    chained: true,
    chainedThrough: keys.map(k => {
      const t = transitions[k]
      return `${t.fromVersion} → ${t.toVersion}`
    }),
    transition: {
      fromVersion,
      toVersion,
      summary: { added, removed, modified, restructured, highlights },
      changes: allChanges,
    },
  }
}

/**
 * Return { from, to } for the latest (most recent) transition of a framework.
 */
export function getDefaultVersions(framework) {
  if (!framework?.transitions) return { from: null, to: null }
  const keys = Object.keys(framework.transitions)
  if (keys.length === 0) return { from: null, to: null }
  const latest = framework.transitions[keys[keys.length - 1]]
  return { from: latest.fromVersion, to: latest.toVersion }
}

/**
 * Return true if a forward path exists from -> to in the transition graph.
 */
export function canResolve(framework, fromVersion, toVersion) {
  return resolveTransition(framework, fromVersion, toVersion) !== null
}
