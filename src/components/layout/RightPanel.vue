<script setup>
import MatchPreview from '../preview/MatchPreview.vue'
</script>

<template>
  <main class="flex-1 overflow-auto bg-gray-200 flex justify-center p-4">
    <!-- 1080px preview frame -->
    <div class="bg-white shadow-lg origin-top" style="width: 1080px;">
      <MatchPreview />
    </div>
  </main>
</template>
