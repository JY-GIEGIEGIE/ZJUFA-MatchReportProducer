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
    <g transform="rotate(12, 12, 12)">
      <rect x="5" y="4" width="14" height="16" rx="3" fill="#e74c3c" />
      <rect x="5" y="4" width="14" height="16" rx="3" fill="none" stroke="#cc3333" stroke-width="0.5" />
      <text x="12" y="16" text-anchor="middle" font-size="12" font-weight="bold" fill="#ffffff" font-family="Arial, sans-serif">!</text>
    </g>
  </svg>
</template>
