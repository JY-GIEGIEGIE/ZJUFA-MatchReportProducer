import { reactive, computed } from 'vue'
import { createEmptyMatchData } from '../types/schema.js'
import { generateId, buildTimeline } from '../utils/helpers.js'

/**
 * Central reactive match data store.
 * Manages all match fields and provides CRUD for events.
 */
export function useMatchData() {
  const data = reactive(createEmptyMatchData())

  // ---- Basic field helpers ----

  function resetData() {
    const fresh = createEmptyMatchData()
    Object.assign(data, fresh)
  }

  function loadData(json) {
    resetData()
    if (json) {
      // Migrate old-format cards & substitutions to new multi-entry format
      if (json.cards) {
        json.cards = json.cards.map(migrateCard)
      }
      if (json.substitutions) {
        json.substitutions = json.substitutions.map(migrateSubstitution)
      }
      Object.assign(data, json)
    }
    data.id = data.id || generateId()
    data.lastModified = Date.now()
  }

  function migrateCard(c) {
    // Already new format (entries exist)
    if (c.entries) {
      // Ensure each entry has cardType
      c.entries = c.entries.map(e => ({ ...e, cardType: e.cardType || c.type || 'yellow' }))
      return c
    }
    // Old flat format → wrap into entries
    return {
      id: c.id || generateId(),
      time: c.time || '',
      entries: [{ playerName: c.playerName || '', playerNumber: c.playerNumber || '', team: c.team || 'home', reason: c.reason || '', cardType: c.type || 'yellow' }],
    }
  }

  function migrateSubstitution(s) {
    if (s.entries) return s
    return {
      id: s.id || generateId(),
      time: s.time || '',
      entries: [{ playerInName: s.playerInName || '', playerInNumber: s.playerInNumber || '', playerOutName: s.playerOutName || '', playerOutNumber: s.playerOutNumber || '', team: s.team || 'home' }],
    }
  }

  function touch() {
    data.lastModified = Date.now()
  }

  // ---- Goal CRUD ----

  function addGoal() {
    data.goals.push({
      id: generateId(),
      playerName: '',
      playerNumber: '',
      time: '',
      type: 'regular',
      team: 'home',
    })
    touch()
  }

  function removeGoal(id) {
    const idx = data.goals.findIndex(g => g.id === id)
    if (idx !== -1) data.goals.splice(idx, 1)
    touch()
  }

  function updateGoal(id, field, value) {
    const goal = data.goals.find(g => g.id === id)
    if (goal) {
      goal[field] = value
      touch()
    }
  }

  // ---- Substitution CRUD (multi-entry) ----

  function addSubstitution() {
    data.substitutions.push({
      id: generateId(),
      time: '',
      entries: [{ playerInName: '', playerInNumber: '', playerOutName: '', playerOutNumber: '', team: 'home' }],
    })
    touch()
  }

  function addSubstitutionEntry(eventId) {
    const sub = data.substitutions.find(s => s.id === eventId)
    if (sub) {
      sub.entries.push({ playerInName: '', playerInNumber: '', playerOutName: '', playerOutNumber: '', team: 'home' })
      touch()
    }
  }

  function removeSubstitution(id) {
    const idx = data.substitutions.findIndex(s => s.id === id)
    if (idx !== -1) data.substitutions.splice(idx, 1)
    touch()
  }

  function removeSubstitutionEntry(eventId, entryIndex) {
    const sub = data.substitutions.find(s => s.id === eventId)
    if (!sub) return
    if (sub.entries.length <= 1) {
      // Last entry → remove the whole event
      removeSubstitution(eventId)
    } else {
      sub.entries.splice(entryIndex, 1)
      touch()
    }
  }

  function updateSubstitution(eventId, entryIndex, field, value) {
    const sub = data.substitutions.find(s => s.id === eventId)
    if (!sub || !sub.entries[entryIndex]) return

    if (field === 'time') {
      sub.time = value
    } else {
      sub.entries[entryIndex][field] = value
    }
    touch()
    sweepMergeSubstitutions()
  }

  function sweepMergeSubstitutions() {
    const merged = []
    for (const s of data.substitutions) {
      if (!s.time) {
        merged.push(s)
        continue
      }
      const existing = merged.find(m => m.time === s.time)
      if (existing) {
        existing.entries.push(...s.entries)
      } else {
        merged.push(s)
      }
    }
    // Replace entire array to guarantee Vue picks up the change
    data.substitutions.length = 0
    data.substitutions.push(...merged)
  }

  // ---- Card CRUD (multi-entry, type per entry) ----

  function addCard() {
    data.cards.push({
      id: generateId(),
      time: '',
      entries: [{ playerName: '', playerNumber: '', team: 'home', reason: '', cardType: 'yellow' }],
    })
    touch()
  }

  function addCardEntry(eventId) {
    const card = data.cards.find(c => c.id === eventId)
    if (card) {
      const defaultType = (card.entries.length > 0) ? card.entries[0].cardType : 'yellow'
      card.entries.push({ playerName: '', playerNumber: '', team: 'home', reason: '', cardType: defaultType })
      touch()
    }
  }

  function removeCard(id) {
    const idx = data.cards.findIndex(c => c.id === id)
    if (idx !== -1) data.cards.splice(idx, 1)
    touch()
  }

  function removeCardEntry(eventId, entryIndex) {
    const card = data.cards.find(c => c.id === eventId)
    if (!card) return
    if (card.entries.length <= 1) {
      removeCard(eventId)
    } else {
      card.entries.splice(entryIndex, 1)
      touch()
    }
  }

  function updateCard(eventId, entryIndex, field, value) {
    const card = data.cards.find(c => c.id === eventId)
    if (!card || !card.entries[entryIndex]) return

    if (field === 'time') {
      card.time = value
    } else {
      card.entries[entryIndex][field] = value
    }
    touch()
    sweepMergeCards()
  }

  function sweepMergeCards() {
    const merged = []
    for (const c of data.cards) {
      if (!c.time) {
        merged.push(c)
        continue
      }
      const existing = merged.find(m => m.time === c.time)
      if (existing) {
        existing.entries.push(...c.entries)
      } else {
        merged.push(c)
      }
    }
    data.cards.length = 0
    data.cards.push(...merged)
  }

  // ---- Penalty CRUD ----

  function addPenalty() {
    data.penalties.push({
      id: generateId(),
      playerName: '',
      playerNumber: '',
      result: 'scored',
      team: 'home',
    })
    touch()
  }

  function removePenalty(id) {
    const idx = data.penalties.findIndex(p => p.id === id)
    if (idx !== -1) data.penalties.splice(idx, 1)
    touch()
  }

  function updatePenalty(id, field, value) {
    const pen = data.penalties.find(p => p.id === id)
    if (pen) {
      pen[field] = value
      touch()
    }
  }

  // ---- Computed ----

  const timelineEvents = computed(() =>
    buildTimeline(data.goals, data.substitutions, data.cards, data.penalties)
  )

  // ---- Display title ----

  const displayTitle = computed(() => {
    const parts = []
    if (data.matchName) parts.push(data.matchName)
    if (data.homeTeam || data.awayTeam) {
      parts.push(`${data.homeTeam || '?'} vs ${data.awayTeam || '?'}`)
    }
    if (data.date) parts.push(data.date)
    return parts.join(' · ') || '未命名战报'
  })

  return {
    data,
    timelineEvents,
    displayTitle,
    // Basic ops
    resetData,
    loadData,
    touch,
    // Goal
    addGoal,
    removeGoal,
    updateGoal,
    // Substitution
    addSubstitution,
    addSubstitutionEntry,
    removeSubstitution,
    removeSubstitutionEntry,
    updateSubstitution,
    // Card
    addCard,
    addCardEntry,
    removeCard,
    removeCardEntry,
    updateCard,
    // Penalty
    addPenalty,
    removePenalty,
    updatePenalty,
  }
}
