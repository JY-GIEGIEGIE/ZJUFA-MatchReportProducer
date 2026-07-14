<script setup>
defineProps({
  size: { type: [Number, String], default: 16 },
  color: { type: String, default: '#2ecc71' },
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
    <path d="M12 4l-8 8h6v8h4v-8h6z" />
  </svg>
</template>
