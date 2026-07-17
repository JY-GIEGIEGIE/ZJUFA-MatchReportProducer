<script setup>
import { provide, onMounted, ref, computed } from 'vue'
import AppLayout from './components/layout/AppLayout.vue'
import DraftSidebar from './components/common/DraftSidebar.vue'
import { useMatchData } from './composables/useMatchData.js'
import { useDraftManager } from './composables/useDraftManager.js'
import { useExport } from './composables/useExport.js'

const {
  data: matchData,
  timelineEvents,
  displayTitle,
  resetData,
  loadData,
  touch,
  addGoal, removeGoal, updateGoal,
  addSubstitution, addSubstitutionEntry, removeSubstitution, removeSubstitutionEntry, updateSubstitution,
  addCard, addCardEntry, removeCard, removeCardEntry, updateCard,
  addPenalty, removePenalty, updatePenalty,
} = useMatchData()

const draftManager = useDraftManager(matchData)

// Export setup — uses document.getElementById for preview access
const previewElRef = computed(() => document.getElementById('report-preview'))
const { isExporting, exportProgress, exportImage, exportHtml, batchExport } = useExport({
  previewElRef,
  matchData,
  draftManager,
})

// Sidebar state
const sidebarOpen = ref(false)

function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value
}

function handleNewDraft() {
  draftManager.newDraft()
}

function handleExportImage() {
  draftManager.saveDraft()
  exportImage()
}

function handleExportHtml() {
  draftManager.saveDraft()
  exportHtml()
}

function handleBatchExport() {
  draftManager.saveDraft()
  draftManager.refreshList()
  const ids = draftManager.drafts.value.map(d => d.id)
  if (ids.length === 0) {
    alert('没有可导出的草稿。请先暂存至少一场比赛。')
    return
  }
  if (!confirm(`将导出 ${ids.length} 场战报，是否继续？`)) return
  batchExport(ids)
}

// Provide to all children
provide('matchData', matchData)
provide('timelineEvents', timelineEvents)
provide('draftManager', draftManager)
provide('actions', {
  addGoal, removeGoal, updateGoal,
  addSubstitution, addSubstitutionEntry, removeSubstitution, removeSubstitutionEntry, updateSubstitution,
  addCard, addCardEntry, removeCard, removeCardEntry, updateCard,
  addPenalty, removePenalty, updatePenalty,
  resetData, loadData, touch,
})
provide('exportActions', {
  exportImage, exportHtml, batchExport, isExporting, exportProgress,
})

onMounted(() => {
  draftManager.refreshList()
  // Auto-load latest draft
  if (draftManager.drafts.value.length > 0) {
    const latest = draftManager.drafts.value[0]
    draftManager.loadDraft(latest.id)
  }
})
</script>

<template>
  <div class="h-screen flex flex-col bg-gray-100">
    <!-- Top bar -->
    <header class="h-12 bg-theme-blue text-white flex items-center px-4 shadow-md shrink-0 z-30">
      <button
        class="mr-3 p-1 rounded hover:bg-white/20 transition-colors"
        title="草稿列表"
        @click="toggleSidebar"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <h1 class="text-lg font-bold tracking-wide">ZJUFA 战报生成器</h1>
      <span class="ml-auto text-xs text-white/70">{{ matchData.lastModified ? '已加载草稿' : '' }}</span>
    </header>

    <!-- Main content -->
    <AppLayout />

    <!-- Bottom action bar -->
    <footer class="h-14 bg-white border-t border-gray-200 flex items-center justify-center gap-3 px-4 shrink-0">
      <button
        class="px-5 py-2 bg-theme-blue text-white rounded-md text-sm font-medium hover:bg-blue-600 transition-colors"
        @click="handleNewDraft"
      >
        暂存，编辑下一场
      </button>
      <button
        class="px-5 py-2 bg-sub-green text-white rounded-md text-sm font-medium hover:bg-green-600 transition-colors disabled:opacity-50"
        :disabled="isExporting"
        @click="handleExportImage()"
      >
        {{ isExporting ? '导出中...' : '生成战报' }}
      </button>
      <button
        class="px-5 py-2 border border-theme-blue text-theme-blue rounded-md text-sm font-medium hover:bg-blue-50 transition-colors"
        @click="handleExportHtml()"
      >
        导出 HTML
      </button>
      <button
        class="px-5 py-2 border border-theme-blue text-theme-blue rounded-md text-sm font-medium hover:bg-blue-50 transition-colors disabled:opacity-50"
        :disabled="isExporting"
        @click="handleBatchExport"
      >
        批量导出
      </button>
    </footer>

    <!-- Draft sidebar -->
    <DraftSidebar :is-open="sidebarOpen" @close="sidebarOpen = false" />
  </div>
</template>
