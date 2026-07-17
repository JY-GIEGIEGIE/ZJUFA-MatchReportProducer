<script setup>
import IconYellowCard from '../icons/IconYellowCard.vue'
import IconRedCard from '../icons/IconRedCard.vue'

defineProps({
  entries: { type: Array, default: () => [] },
  team: { type: String, default: 'home' },
})
</script>

<template>
  <div class="event-card flex-col !items-stretch !gap-0 !px-3 !py-2">
    <template v-for="(entry, idx) in entries" :key="idx">
      <div v-if="idx > 0" class="border-t border-white/20 my-1"></div>
      <!-- Top: icon + number + name -->
      <div
        :class="[
          'flex items-center gap-1.5 text-xs',
          team === 'home' ? 'flex-row-reverse' : '',
        ]"
      >
        <IconYellowCard v-if="entry.cardType === 'yellow'" :size="16" />
        <IconRedCard v-else :size="16" />
        <span v-if="entry.playerNumber" class="font-mono text-white/80">#{{ entry.playerNumber }}</span>
        <span>{{ entry.playerName || '球员' }}</span>
      </div>

      <!-- Bottom: reason (small) -->
      <div
        :class="[
          'text-[11px] text-white/70 mt-0.5',
          team === 'home' ? 'text-right' : '',
        ]"
      >
        {{ entry.reason || '犯规原因' }}
      </div>
    </template>
  </div>
</template>
