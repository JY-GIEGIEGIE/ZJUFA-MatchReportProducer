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
    <!-- Whistle body -->
    <rect x="4" y="8" width="8" height="4" rx="1" />
    <!-- Whistle mouthpiece -->
    <rect x="2" y="9" width="3" height="2" rx="0.5" />
    <!-- Whistle ball -->
    <circle cx="13" cy="10" r="3" />
    <!-- Whistle opening -->
    <rect x="11" y="9" width="2" height="2" rx="0.5" />
  </svg>
</template>
