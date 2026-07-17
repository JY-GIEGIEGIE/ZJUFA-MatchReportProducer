import { ref } from 'vue'
import { useStorage } from './useStorage.js'
import { generateId } from '../utils/helpers.js'
import { createEmptyMatchData } from '../types/schema.js'

/**
 * Multi-draft CRUD manager.
 * Each draft is stored as a separate localStorage key: zju-report-{id}
 * The draft list is always rebuilt from the keys present in localStorage.
 *
 * @param {object} matchData - reactive match data object from useMatchData
 */
export function useDraftManager(matchData) {
  const { save: lsSave, load: lsLoad, remove: lsRemove, listKeys } = useStorage()

  const drafts = ref([])
  const currentDraftId = ref(null)

  /**
   * Rebuild the draft list from localStorage.
   * Scans ALL keys and reads each draft to build the sidebar index.
   */
  function refreshList() {
    const keys = listKeys()
    const result = []
    for (const key of keys) {
      const json = lsLoad(key)
      if (json) {
        result.push({
          id: key,
          displayTitle: buildTitle(json),
          lastModified: json.lastModified || 0,
        })
      }
    }
    drafts.value = result.sort((a, b) => b.lastModified - a.lastModified)
  }

  /**
   * Save current matchData to localStorage.
   * Returns true if anything was saved.
   */
  function saveDraft() {
    // Don't save completely empty drafts
    if (!matchData.homeTeam && !matchData.awayTeam && !matchData.matchName
      && matchData.goals.length === 0 && matchData.substitutions.length === 0
      && matchData.cards.length === 0 && matchData.penalties.length === 0) {
      return false
    }

    if (!matchData.id) {
      matchData.id = generateId()
    }
    matchData.lastModified = Date.now()
    lsSave(matchData.id, { ...matchData })
    currentDraftId.value = matchData.id
    refreshList()
    return true
  }

  /**
   * Load a draft by ID into current matchData.
   */
  function loadDraft(id) {
    const json = lsLoad(id)
    if (!json) return false

    // Migrate old-format data to new multi-entry format
    migrateDraft(json)

    Object.assign(matchData, json)
    currentDraftId.value = id
    return true
  }

  function migrateDraft(json) {
    // Cards: old { playerName, ... } → new { entries: [{ playerName, ..., cardType }] }
    if (json.cards) {
      json.cards = json.cards.map(c => {
        if (c.entries) {
          // Ensure per-entry cardType
          c.entries = c.entries.map(e => ({ ...e, cardType: e.cardType || c.type || 'yellow' }))
          return c
        }
        return {
          id: c.id || generateId(),
          time: c.time || '',
          entries: [{ playerName: c.playerName || '', playerNumber: c.playerNumber || '', team: c.team || 'home', reason: c.reason || '', cardType: c.type || 'yellow' }],
        }
      })
    }
    // Substitutions: old { playerInName, ... } → new { entries: [{ playerInName, ... }] }
    if (json.substitutions) {
      json.substitutions = json.substitutions.map(s => {
        if (s.entries) return s
        return {
          id: s.id || generateId(),
          time: s.time || '',
          entries: [{ playerInName: s.playerInName || '', playerInNumber: s.playerInNumber || '', playerOutName: s.playerOutName || '', playerOutNumber: s.playerOutNumber || '', team: s.team || 'home' }],
        }
      })
    }
  }

  /**
   * Delete a draft by ID.
   */
  function deleteDraft(id) {
    lsRemove(id)
    if (currentDraftId.value === id) {
      currentDraftId.value = null
    }
    refreshList()
  }

  /**
   * Save current draft (if any content), then reset to empty.
   */
  function newDraft() {
    saveDraft()

    // Reset to empty
    const empty = createEmptyMatchData()
    Object.assign(matchData, empty)
    matchData.id = generateId()
    matchData.lastModified = Date.now()
    currentDraftId.value = matchData.id
  }

  return {
    drafts,
    currentDraftId,
    refreshList,
    saveDraft,
    loadDraft,
    deleteDraft,
    newDraft,
  }
}

function buildTitle(json) {
  const parts = []
  if (json.matchName) parts.push(json.matchName)
  if (json.homeTeam || json.awayTeam) {
    parts.push(`${json.homeTeam || '?'} vs ${json.awayTeam || '?'}`)
  }
  if (json.date) parts.push(json.date)
  return parts.join(' · ') || '未命名战报'
}
