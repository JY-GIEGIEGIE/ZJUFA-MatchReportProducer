<script setup>
defineProps({
  size: { type: [Number, String], default: 24 },
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
    <!-- Simplified referee icon: whistle + person silhouette -->
    <circle cx="12" cy="7" r="3" fill="none" stroke="currentColor" stroke-width="1.5" />
    <path d="M6 21v-2c0-3 2.5-5 6-5s6 2 6 5v2" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
    <!-- Small whistle at neck -->
    <rect x="9" y="9" width="6" height="2" rx="1" />
  </svg>
</template>
