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
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <!-- Single offside flag -->
    <line x1="8" y1="4" x2="8" y2="20" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    <polygon points="8,5 18,7 8,11" :fill="color" />
    <!-- Small ball on top -->
    <circle cx="8" cy="4" r="1.5" :fill="color" />
  </svg>
</template>
