<script setup>
import IconArrowUp from '../icons/IconArrowUp.vue'
import IconArrowDown from '../icons/IconArrowDown.vue'

defineProps({
  entries: { type: Array, default: () => [] },
  team: { type: String, default: 'home' },
})
</script>

<template>
  <div class="event-card flex-col !items-stretch !gap-0 !px-3 !py-2">
    <template v-for="(entry, idx) in entries" :key="idx">
      <div v-if="idx > 0" class="border-t border-white/20 my-1"></div>
      <!-- IN row -->
      <div
        :class="[
          'flex items-center gap-1.5 text-xs',
          team === 'home' ? 'flex-row-reverse' : '',
        ]"
      >
        <IconArrowUp :size="14" color="#2ecc71" />
        <span v-if="entry.playerInNumber" class="font-mono text-white/80">#{{ entry.playerInNumber }}</span>
        <span>{{ entry.playerInName || '换上' }}</span>
      </div>

      <!-- OUT row -->
      <div
        :class="[
          'flex items-center gap-1.5 text-xs mt-0.5',
          team === 'home' ? 'flex-row-reverse' : '',
        ]"
      >
        <IconArrowDown :size="14" color="#e74c3c" />
        <span v-if="entry.playerOutNumber" class="font-mono text-white/80">#{{ entry.playerOutNumber }}</span>
        <span>{{ entry.playerOutName || '换下' }}</span>
      </div>
    </template>
  </div>
</template>
