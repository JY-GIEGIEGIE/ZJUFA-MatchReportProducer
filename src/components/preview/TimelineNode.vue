<script setup>
import IconWhistle from '../icons/IconWhistle.vue'
import IconStopwatch from '../icons/IconStopwatch.vue'

defineProps({
  type: {
    type: String,
    default: 'event',  // 'start' | 'end' | 'event'
    validator: v => ['start', 'end', 'event'].includes(v),
  },
  time: { type: String, default: '' },
})
</script>

<template>
  <!-- Start: whistle -->
  <div v-if="type === 'start'" class="flex items-center justify-center my-2">
    <div class="w-10 h-10 rounded-full bg-theme-blue flex items-center justify-center">
      <IconWhistle :size="20" color="#ffffff" />
    </div>
  </div>

  <!-- End: stopwatch -->
  <div v-else-if="type === 'end'" class="flex items-center justify-center my-2">
    <div class="w-10 h-10 rounded-full bg-theme-blue flex items-center justify-center">
      <IconStopwatch :size="20" color="#ffffff" />
    </div>
  </div>

  <!-- Event: time circle -->
  <div v-else class="time-node text-xs">
    {{ time }}
  </div>
</template>
