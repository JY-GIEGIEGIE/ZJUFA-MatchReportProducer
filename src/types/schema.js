/**
 * @typedef {Object} GoalEvent
 * @property {string} id
 * @property {string} playerName
 * @property {string} playerNumber
 * @property {string} time
 * @property {'regular'|'penalty'|'own-goal'} type
 * @property {'home'|'away'} team
 */

/**
 * @typedef {Object} SubstitutionEvent
 * @property {string} id
 * @property {string} playerInName
 * @property {string} playerInNumber
 * @property {string} playerOutName
 * @property {string} playerOutNumber
 * @property {string} time
 * @property {'home'|'away'} team
 */

/**
 * @typedef {Object} CardEvent
 * @property {string} id
 * @property {string} playerName
 * @property {string} playerNumber
 * @property {string} time
 * @property {'yellow'|'red'} type
 * @property {string} reason
 * @property {'home'|'away'} team
 */

/**
 * @typedef {Object} PenaltyEvent
 * @property {string} id
 * @property {string} playerName
 * @property {string} playerNumber
 * @property {'scored'|'missed'} result
 * @property {'home'|'away'} team
 */

/**
 * Factory: create an empty match data object.
 * @returns {object}
 */
export function createEmptyMatchData() {
  return {
    id: '',
    date: '',
    venue: '',
    matchName: '',
    homeTeam: '',
    awayTeam: '',
    homeScore: 0,
    awayScore: 0,
    hasPenaltyShootout: false,
    homePenaltyScore: 0,
    awayPenaltyScore: 0,
    goals: [],
    substitutions: [],
    cards: [],
    penalties: [],
    referee: '',
    assistantReferee1: '',
    assistantReferee2: '',
    fourthOfficial: '',
    lastModified: Date.now(),
  }
}
