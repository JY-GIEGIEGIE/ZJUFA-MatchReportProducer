<script setup>
defineProps({
  size: { type: [Number, String], default: 16 },
  color: { type: String, default: '#e74c3c' },
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
    <path d="M12 20l8-8h-6V4h-4v8H4z" />
  </svg>
</template>
