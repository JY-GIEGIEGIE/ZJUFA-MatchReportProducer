<script setup>
defineProps({
  size: { type: [Number, String], default: 20 },
})
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <!-- Card rotated ~12 degrees -->
    <g transform="rotate(12, 12, 12)">
      <rect x="5" y="4" width="14" height="16" rx="3" fill="#f1c40f" />
      <rect x="5" y="4" width="14" height="16" rx="3" fill="none" stroke="#e6c200" stroke-width="0.5" />
      <!-- Exclamation mark -->
      <text x="12" y="16" text-anchor="middle" font-size="12" font-weight="bold" fill="#ffffff" font-family="Arial, sans-serif">!</text>
    </g>
  </svg>
</template>
