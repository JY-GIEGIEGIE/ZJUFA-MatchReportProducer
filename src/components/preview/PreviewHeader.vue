<script setup>
import { inject, computed } from 'vue'

const matchData = inject('matchData')

const dateDisplay = computed(() => {
  if (!matchData.date) return ''
  // YYYY-MM-DD  format
  const d = matchData.date.replace(/-/g, '-')
  return d.length === 8 ? d.slice(2) : matchData.date
})

const venueDisplay = computed(() => {
  const parts = []
  if (dateDisplay.value) parts.push(dateDisplay.value)
  if (matchData.venue) parts.push(matchData.venue)
  return parts.join(', ')
})

const hasScore = computed(() => matchData.homeTeam || matchData.awayTeam)
</script>

<template>
  <div class="text-center mb-10">
    <!-- Date & Venue -->
    <p class="text-base text-theme-blue mb-1">
      {{ venueDisplay || '日期与场地' }}
    </p>

    <!-- Match Name -->
    <p class="text-lg text-theme-blue font-medium mb-6">
      {{ matchData.matchName || '赛事名称' }}
    </p>

    <!-- Scoreboard -->
    <div
      v-if="hasScore"
      class="flex items-center justify-center gap-8"
    >
      <!-- Home Team -->
      <span class="text-2xl text-gray-800 font-medium">{{ matchData.homeTeam || '主队' }}</span>

      <!-- Score -->
      <span class="text-5xl score-number text-gray-900 tracking-wider">
        {{ matchData.homeScore }} - {{ matchData.awayScore }}
      </span>

      <!-- Away Team -->
      <span class="text-2xl text-gray-800 font-medium">{{ matchData.awayTeam || '客队' }}</span>
    </div>

    <!-- No teams yet -->
    <div v-else class="text-4xl score-number text-gray-300 tracking-wider">
      ? - ?
    </div>

    <!-- Penalty shootout score -->
    <div
      v-if="matchData.hasPenaltyShootout"
      class="text-xl text-theme-blue score-number mt-2"
    >
      ({{ matchData.homePenaltyScore }} - {{ matchData.awayPenaltyScore }})
    </div>

    <!-- Empty state hint -->
    <p v-if="!matchData.homeTeam && !matchData.awayTeam" class="text-sm text-gray-400 mt-3">
      在左侧填写基础信息
    </p>
  </div>
</template>
