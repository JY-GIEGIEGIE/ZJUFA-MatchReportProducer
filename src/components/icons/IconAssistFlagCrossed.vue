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
    <!-- Crossed offside flags -->
    <!-- Pole 1 -->
    <line x1="6" y1="3" x2="18" y2="21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
    <!-- Flag 1 (top-left to bottom-right pole) -->
    <path d="M7 7l10 10" fill="none" />
    <rect x="3" y="3" width="6" height="4" rx="1" transform="rotate(45, 5, 5)" fill="currentColor" />

    <!-- Pole 2 -->
    <line x1="18" y1="3" x2="6" y2="21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
    <!-- Flag 2 -->
    <rect x="16" y="3" width="6" height="4" rx="1" transform="rotate(-45, 18, 5)" fill="currentColor" />

    <!-- Better: draw two simple flag poles crossed -->
    <!-- Actually let me simplify -->
    <g transform="rotate(-15, 12, 12)">
      <!-- Pole 1 -->
      <line x1="8" y1="4" x2="8" y2="20" stroke="currentColor" stroke-width="1.5" />
      <!-- Flag 1 -->
      <polygon points="8,5 16,6 8,10" fill="currentColor" />

      <!-- Pole 2 crossed -->
      <line x1="16" y1="4" x2="16" y2="20" stroke="currentColor" stroke-width="1.5" />
      <!-- Flag 2 -->
      <polygon points="16,5 8,6 16,10" fill="currentColor" />
    </g>
  </svg>
</template>
