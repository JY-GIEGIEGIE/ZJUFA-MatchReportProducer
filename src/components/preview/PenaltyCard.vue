<script setup>
import IconPenaltyMissed from '../icons/IconPenaltyMissed.vue'
import IconSoccerBall from '../icons/IconSoccerBall.vue'

defineProps({
  playerName: { type: String, default: '' },
  playerNumber: { type: String, default: '' },
  result: { type: String, default: 'scored' },
  team: { type: String, default: 'home' },
})
</script>

<template>
  <div
    :class="[
      'event-card',
      team === 'home' ? 'flex-row-reverse text-right' : '',
    ]"
  >
    <IconSoccerBall v-if="result === 'scored'" :size="18" color="#f1c40f" />
    <IconPenaltyMissed v-else :size="18" :missed="true" />
    <span v-if="playerNumber" class="font-mono text-white/80">#{{ playerNumber }}</span>
    <span>{{ playerName || '球员' }}</span>
  </div>
</template>
