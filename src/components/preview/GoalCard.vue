<script setup>
import IconSoccerBall from '../icons/IconSoccerBall.vue'

defineProps({
  playerName: { type: String, default: '' },
  playerNumber: { type: String, default: '' },
  team: { type: String, default: 'home' },
  goalType: { type: String, default: 'regular' },
})

// Determine ball color: regular → white, own-goal → red, penalty-kick → yellow
function ballColor(type) {
  if (type === 'own-goal') return '#e74c3c'
  if (type === 'penalty') return '#f1c40f'
  return '#ffffff'
}
</script>

<template>
  <div
    :class="[
      'event-card',
      team === 'home' ? 'flex-row-reverse text-right' : '',
    ]"
  >
    <!-- Home (right-aligned): [name] [#number] [icon] -->
    <!-- Away (left-aligned): [icon] [#number] [name] -->
    <span>{{ playerName || '球员' }}</span>
    <span v-if="playerNumber" class="font-mono">#{{ playerNumber }}</span>
    <IconSoccerBall :size="18" :color="ballColor(goalType)" />
  </div>
</template>
