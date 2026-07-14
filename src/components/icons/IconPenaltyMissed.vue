<script setup>
defineProps({
  size: { type: [Number, String], default: 20 },
  missed: { type: Boolean, default: false },
})
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <!-- Yellow ball base -->
    <circle cx="11" cy="12" r="8" fill="#f1c40f" stroke="#d4ac0d" stroke-width="0.8" />
    <!-- Pentagonal pattern hint -->
    <path d="M11 6l2 6-2 2-2-2z" fill="none" stroke="#d4ac0d" stroke-width="0.5" />
    <path d="M9 8l2 6 2-6" fill="none" stroke="#d4ac0d" stroke-width="0.5" />

    <!-- Red X overlay (if missed) -->
    <g v-if="missed">
      <line x1="4" y1="4" x2="20" y2="20" stroke="#e74c3c" stroke-width="3" stroke-linecap="round" />
      <line x1="20" y1="4" x2="4" y2="20" stroke="#e74c3c" stroke-width="3" stroke-linecap="round" />
    </g>
  </svg>
</template>
