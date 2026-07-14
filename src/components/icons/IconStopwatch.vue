<script setup>
defineProps({
  size: { type: [Number, String], default: 32 },
  color: { type: String, default: 'currentColor' },
})
</script>

<template>
  <svg
    :width="size"
    :height="size"
    :fill="color"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <!-- Stopwatch body -->
    <circle cx="12" cy="13" r="9" fill="none" stroke="currentColor" stroke-width="2" />
    <!-- Top button -->
    <rect x="10" y="2" width="4" height="3" rx="1" />
    <line x1="12" y1="13" x2="12" y2="8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
    <line x1="12" y1="13" x2="16" y2="13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
    <circle cx="12" cy="13" r="1" />
  </svg>
</template>
