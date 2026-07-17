/**
 * Generate a simple unique ID
 */
export function generateId() {
  return crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).slice(2)
}

/**
 * Parse a time string like "5", "45+2", "90+5" into a numeric sort key.
 * Base minute × 100 + added time, so:
 *   "5"    → 500
 *   "45+2" → 4502
 *   "90+5" → 9005
 *   "点"   → Infinity (penalty shootout)
 *
 * @param {string} timeStr
 * @returns {number}
 */
export function parseTimeToSortKey(timeStr) {
  if (!timeStr || timeStr === '点') return Infinity
  const match = timeStr.match(/^(\d+)(?:\+(\d+))?$/)
  if (!match) return Infinity
  const base = parseInt(match[1], 10)
  const added = match[2] ? parseInt(match[2], 10) : 0
  return base * 100 + added
}

/**
 * Format a time string for display.
 * Returns the string as-is (e.g., "5", "45+2", "点").
 * @param {string} timeStr
 * @returns {string}
 */
export function formatTimeDisplay(timeStr) {
  if (!timeStr) return ''
  if (timeStr === '点') return '点'
  return timeStr
}

/**
 * Merge and sort all events into a unified timeline.
 * Penalty shootout events go after all regular-time events.
 *
 * @param {Array} goals
 * @param {Array} substitutions
 * @param {Array} cards
 * @param {Array} penalties
 * @returns {Array} sorted timeline entries
 */
export function buildTimeline(goals, substitutions, cards, penalties) {
  const entries = []

  // Map goals
  for (const g of (goals || [])) {
    entries.push({
      id: g.id,
      type: 'goal',
      time: g.time,
      sortKey: parseTimeToSortKey(g.time),
      team: g.team,
      playerName: g.playerName,
      playerNumber: g.playerNumber,
      goalType: g.type,
    })
  }

  // Map substitutions (multi-entry)
  for (const s of (substitutions || [])) {
    const homeEntries = (s.entries || []).filter(e => e.team === 'home')
    const awayEntries = (s.entries || []).filter(e => e.team === 'away')
    const sk = parseTimeToSortKey(s.time)

    if (homeEntries.length > 0 && awayEntries.length > 0) {
      // Both teams in one event → single row, cards on both sides
      entries.push({
        id: s.id, type: 'substitution', time: s.time, sortKey: sk,
        team: 'both', homeEntries, awayEntries,
      })
    } else if (homeEntries.length > 0) {
      entries.push({
        id: s.id + '-home', type: 'substitution', time: s.time, sortKey: sk,
        team: 'home', entries: homeEntries,
      })
    } else if (awayEntries.length > 0) {
      entries.push({
        id: s.id + '-away', type: 'substitution', time: s.time, sortKey: sk,
        team: 'away', entries: awayEntries,
      })
    }
  }

  // Map cards (multi-entry, type per entry)
  for (const c of (cards || [])) {
    const homeEntries = (c.entries || []).filter(e => e.team === 'home')
    const awayEntries = (c.entries || []).filter(e => e.team === 'away')
    const sk = parseTimeToSortKey(c.time)

    if (homeEntries.length > 0 && awayEntries.length > 0) {
      entries.push({
        id: c.id, type: 'card', time: c.time, sortKey: sk,
        team: 'both', homeEntries, awayEntries,
      })
    } else if (homeEntries.length > 0) {
      entries.push({
        id: c.id + '-home', type: 'card', time: c.time, sortKey: sk,
        team: 'home', entries: homeEntries,
      })
    } else if (awayEntries.length > 0) {
      entries.push({
        id: c.id + '-away', type: 'card', time: c.time, sortKey: sk,
        team: 'away', entries: awayEntries,
      })
    }
  }

  // Sort by numeric key first, then by insertion order among same-time events
  entries.sort((a, b) => {
    if (a.sortKey !== b.sortKey) return a.sortKey - b.sortKey
    return 0 // preserve insertion order for same-time events
  })

  // Penalty shootout events: append after all regular events with increasing sort keys
  for (let i = 0; i < (penalties || []).length; i++) {
    const p = penalties[i]
    entries.push({
      id: p.id,
      type: 'penalty',
      time: '点',
      sortKey: Infinity + i,
      team: p.team,
      playerName: p.playerName,
      playerNumber: p.playerNumber,
      penaltyResult: p.result,
    })
  }

  return entries
}
