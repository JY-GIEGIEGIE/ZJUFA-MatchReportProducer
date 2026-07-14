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
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z
             M12 4c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z
             M7.5 6.5l1.4 1.4C8.3 8.5 8 9.2 8 10H6c0-1.1.5-2.2 1.5-3.5z
             M16.5 6.5C17.5 7.8 18 8.9 18 10h-2c0-.8-.3-1.5-.9-2.1l1.4-1.4z
             M5 12h2c0 1.1.3 2.1.9 3l-1.4 1.4C5.8 15.2 5 13.7 5 12z
             M19 12h-2c0 1.7-.8 3.2-1.5 4.4l1.4 1.4C18.2 16.5 19 14.3 19 12z
             M8.5 16.5l-1.4 1.4c.8.7 1.8 1.3 2.9 1.6v-2c-.6-.2-1.2-.6-1.5-1z
             M15.5 16.5c-.3.5-.9.9-1.5 1v2c1.1-.3 2.1-.9 3-1.6l-1.5-1.4z
             M12 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
  </svg>
</template>
