const STORAGE_PREFIX = 'zju-report-'

/**
 * Generic localStorage wrapper with JSON serialization.
 */
export function useStorage() {
  /**
   * Save a value under a key (prefixed automatically).
   * @param {string} key
   * @param {*} value
   */
  function save(key, value) {
    try {
      const fullKey = STORAGE_PREFIX + key
      localStorage.setItem(fullKey, JSON.stringify(value))
    } catch (e) {
      console.warn('localStorage save failed:', e)
    }
  }

  /**
   * Load a value by key (prefixed automatically).
   * @param {string} key
   * @returns {*|null}
   */
  function load(key) {
    try {
      const fullKey = STORAGE_PREFIX + key
      const raw = localStorage.getItem(fullKey)
      return raw ? JSON.parse(raw) : null
    } catch (e) {
      console.warn('localStorage load failed:', e)
      return null
    }
  }

  /**
   * Remove a key from localStorage.
   * @param {string} key
   */
  function remove(key) {
    try {
      const fullKey = STORAGE_PREFIX + key
      localStorage.removeItem(fullKey)
    } catch (e) {
      console.warn('localStorage remove failed:', e)
    }
  }

  /**
   * List all keys matching the prefix, stripping the prefix.
   * @returns {string[]}
   */
  function listKeys() {
    const keys = []
    for (let i = 0; i < localStorage.length; i++) {
      const raw = localStorage.key(i)
      if (raw && raw.startsWith(STORAGE_PREFIX)) {
        keys.push(raw.slice(STORAGE_PREFIX.length))
      }
    }
    return keys
  }

  return { save, load, remove, listKeys }
}
