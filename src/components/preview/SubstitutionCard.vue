<script setup>
import IconArrowUp from '../icons/IconArrowUp.vue'
import IconArrowDown from '../icons/IconArrowDown.vue'

defineProps({
  playerInName: { type: String, default: '' },
  playerInNumber: { type: String, default: '' },
  playerOutName: { type: String, default: '' },
  playerOutNumber: { type: String, default: '' },
  team: { type: String, default: 'home' },
})
</script>

<template>
  <div class="event-card flex-col !items-stretch !gap-0 !px-3 !py-2">
    <!-- IN row -->
    <div
      :class="[
        'flex items-center gap-1.5 text-xs',
        team === 'home' ? 'flex-row-reverse' : '',
      ]"
    >
      <IconArrowUp :size="14" color="#2ecc71" />
      <span v-if="playerInNumber" class="font-mono text-white/80">#{{ playerInNumber }}</span>
      <span>{{ playerInName || '换上' }}</span>
    </div>

    <!-- OUT row -->
    <div
      :class="[
        'flex items-center gap-1.5 text-xs mt-0.5',
        team === 'home' ? 'flex-row-reverse' : '',
      ]"
    >
      <IconArrowDown :size="14" color="#e74c3c" />
      <span v-if="playerOutNumber" class="font-mono text-white/80">#{{ playerOutNumber }}</span>
      <span>{{ playerOutName || '换下' }}</span>
    </div>
  </div>
</template>
