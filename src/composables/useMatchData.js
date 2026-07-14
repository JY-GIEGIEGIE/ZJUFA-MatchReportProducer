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
      Object.assign(data, json)
    }
    data.id = data.id || generateId()
    data.lastModified = Date.now()
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

  // ---- Substitution CRUD ----

  function addSubstitution() {
    data.substitutions.push({
      id: generateId(),
      playerInName: '',
      playerInNumber: '',
      playerOutName: '',
      playerOutNumber: '',
      time: '',
      team: 'home',
    })
    touch()
  }

  function removeSubstitution(id) {
    const idx = data.substitutions.findIndex(s => s.id === id)
    if (idx !== -1) data.substitutions.splice(idx, 1)
    touch()
  }

  function updateSubstitution(id, field, value) {
    const sub = data.substitutions.find(s => s.id === id)
    if (sub) {
      sub[field] = value
      touch()
    }
  }

  // ---- Card CRUD ----

  function addCard() {
    data.cards.push({
      id: generateId(),
      playerName: '',
      playerNumber: '',
      time: '',
      type: 'yellow',
      reason: '',
      team: 'home',
    })
    touch()
  }

  function removeCard(id) {
    const idx = data.cards.findIndex(c => c.id === id)
    if (idx !== -1) data.cards.splice(idx, 1)
    touch()
  }

  function updateCard(id, field, value) {
    const card = data.cards.find(c => c.id === id)
    if (card) {
      card[field] = value
      touch()
    }
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
    removeSubstitution,
    updateSubstitution,
    // Card
    addCard,
    removeCard,
    updateCard,
    // Penalty
    addPenalty,
    removePenalty,
    updatePenalty,
  }
}
