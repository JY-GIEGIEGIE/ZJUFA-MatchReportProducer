<script setup>
import { inject, ref } from 'vue'
import PreviewHeader from './PreviewHeader.vue'
import PreviewTimeline from './PreviewTimeline.vue'
import PreviewFooter from './PreviewFooter.vue'

const matchData = inject('matchData')
const timelineEvents = inject('timelineEvents')

// Expose ref for dom-to-image-more capture
const previewEl = ref(null)
defineExpose({ previewEl })
</script>

<template>
  <div
    id="report-preview"
    ref="previewEl"
    class="bg-white preview-text"
    style="width: 1080px; min-height: 100%; padding: 40px 60px;"
  >
    <PreviewHeader />
    <PreviewTimeline :events="timelineEvents" />
    <PreviewFooter />
  </div>
</template>
