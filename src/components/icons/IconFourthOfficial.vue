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
    <!-- Tactical board / clipboard -->
    <rect x="4" y="3" width="16" height="18" rx="2" stroke="currentColor" stroke-width="1.5" />
    <!-- Clip -->
    <rect x="9" y="1" width="6" height="3" rx="1" stroke="currentColor" stroke-width="1.5" />
    <!-- Horizontal line on board -->
    <line x1="7" y1="9" x2="17" y2="9" stroke="currentColor" stroke-width="1" />
    <!-- Vertical line on board -->
    <line x1="12" y1="9" x2="12" y2="17" stroke="currentColor" stroke-width="1" />
    <!-- Player markers: X and O -->
    <text x="8" y="14" text-anchor="middle" font-size="4" :fill="color" font-family="Arial, sans-serif">✕</text>
    <text x="15" y="14" text-anchor="middle" font-size="4" :fill="color" font-family="Arial, sans-serif">○</text>
    <circle cx="15" cy="13.5" r="2" stroke="currentColor" stroke-width="0.8" />
    <text x="8" y="17" text-anchor="middle" font-size="4" :fill="color" font-family="Arial, sans-serif">✕</text>
  </svg>
</template>
