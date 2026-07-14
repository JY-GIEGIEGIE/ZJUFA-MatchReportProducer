import { ref } from 'vue'
import { useStorage } from './useStorage.js'
import { generateId } from '../utils/helpers.js'
import { createEmptyMatchData } from '../types/schema.js'

const INDEX_KEY = 'draft-index'

/**
 * Multi-draft CRUD manager.
 * Coordinates with localStorage via useStorage.
 *
 * @param {object} matchData - reactive match data object from useMatchData
 */
export function useDraftManager(matchData) {
  const { save: lsSave, load: lsLoad, remove: lsRemove, listKeys } = useStorage()

  const drafts = ref([])
  const currentDraftId = ref(null)
  const isDirty = ref(false)

  /**
   * Refresh the draft list from localStorage index.
   */
  function refreshList() {
    const index = lsLoad(INDEX_KEY)
    if (Array.isArray(index)) {
      drafts.value = index.sort((a, b) => b.lastModified - a.lastModified)
    } else {
      // Rebuild index from individual keys
      const keys = listKeys()
      const rebuilt = []
      for (const key of keys) {
        if (key === INDEX_KEY) continue
        const json = lsLoad(key)
        if (json) {
          rebuilt.push({
            id: key,
            displayTitle: buildTitle(json),
            lastModified: json.lastModified || 0,
          })
        }
      }
      drafts.value = rebuilt.sort((a, b) => b.lastModified - a.lastModified)
      lsSave(INDEX_KEY, drafts.value)
    }
  }

  /**
   * Save current matchData as a draft.
   */
  function saveDraft() {
    if (!matchData.id) {
      matchData.id = generateId()
    }
    matchData.lastModified = Date.now()
    lsSave(matchData.id, { ...matchData })
    currentDraftId.value = matchData.id
    isDirty.value = false
    refreshList()
  }

  /**
   * Load a draft by ID into current matchData.
   */
  function loadDraft(id) {
    const json = lsLoad(id)
    if (!json) return false

    // Save current first if dirty
    if (isDirty.value && currentDraftId.value) {
      saveDraft()
    }

    Object.assign(matchData, json)
    currentDraftId.value = id
    isDirty.value = false
    return true
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
   * Start a fresh draft (save current if dirty first).
   */
  function newDraft() {
    if (isDirty.value) saveDraft()

    // Reset to empty
    const empty = createEmptyMatchData()
    Object.assign(matchData, empty)
    matchData.id = generateId()
    matchData.lastModified = Date.now()
    currentDraftId.value = matchData.id
    isDirty.value = false
  }

  return {
    drafts,
    currentDraftId,
    isDirty,
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
