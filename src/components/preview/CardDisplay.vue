<script setup>
import IconYellowCard from '../icons/IconYellowCard.vue'
import IconRedCard from '../icons/IconRedCard.vue'

defineProps({
  playerName: { type: String, default: '' },
  playerNumber: { type: String, default: '' },
  cardType: { type: String, default: 'yellow' },
  reason: { type: String, default: '' },
  team: { type: String, default: 'home' },
})
</script>

<template>
  <div class="event-card flex-col !items-stretch !gap-0 !px-3 !py-2">
    <!-- Top: icon + number + name -->
    <div
      :class="[
        'flex items-center gap-1.5 text-xs',
        team === 'home' ? 'flex-row-reverse' : '',
      ]"
    >
      <IconYellowCard v-if="cardType === 'yellow'" :size="16" />
      <IconRedCard v-else :size="16" />
      <span v-if="playerNumber" class="font-mono text-white/80">#{{ playerNumber }}</span>
      <span>{{ playerName || '球员' }}</span>
    </div>

    <!-- Bottom: reason (small) -->
    <div
      :class="[
        'text-[11px] text-white/70 mt-0.5',
        team === 'home' ? 'text-right' : '',
      ]"
    >
      {{ reason || '犯规原因' }}
    </div>
  </div>
</template>
