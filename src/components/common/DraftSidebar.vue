<script setup>
import { inject, computed } from 'vue'

const draftManager = inject('draftManager')
const matchData = inject('matchData')

defineProps({
  isOpen: { type: Boolean, default: false },
})

const emit = defineEmits(['close'])

function handleSelect(id) {
  draftManager.loadDraft(id)
  emit('close')
}

function handleDelete(id) {
  if (confirm('确定删除这份战报吗？此操作不可撤销。')) {
    draftManager.deleteDraft(id)
  }
}

function formatTime(ts) {
  if (!ts) return ''
  const d = new Date(ts)
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const hours = String(d.getHours()).padStart(2, '0')
  const mins = String(d.getMinutes()).padStart(2, '0')
  return `${month}-${day} ${hours}:${mins}`
}
</script>

<template>
  <Teleport to="body">
    <!-- Backdrop -->
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-black/30 z-40 transition-opacity"
      @click="emit('close')"
    ></div>

    <!-- Sidebar -->
    <aside
      :class="[
        'fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-200 overflow-y-auto',
        isOpen ? 'translate-x-0' : '-translate-x-full'
      ]"
    >
      <div class="p-4">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-base font-bold text-gray-800">战报列表</h2>
          <button
            class="text-gray-400 hover:text-gray-600 text-lg leading-none"
            @click="emit('close')"
          >✕</button>
        </div>

        <!-- New draft button -->
        <button
          class="w-full mb-4 px-4 py-2 bg-theme-blue text-white rounded-md text-sm font-medium hover:bg-blue-600 transition-colors"
          @click="draftManager.newDraft(); emit('close')"
        >
          + 新建战报
        </button>

        <!-- Draft list -->
        <div v-if="draftManager.drafts.value.length === 0" class="text-center text-sm text-gray-400 py-8">
          暂无保存的战报
        </div>

        <div v-else class="space-y-1.5">
          <div
            v-for="draft in draftManager.drafts.value"
            :key="draft.id"
            :class="[
              'flex items-center gap-2 px-3 py-2.5 rounded-md cursor-pointer transition-colors group',
              draft.id === matchData.id ? 'bg-blue-50 border border-theme-blue' : 'hover:bg-gray-50 border border-transparent'
            ]"
            @click="handleSelect(draft.id)"
          >
            <div class="flex-1 min-w-0">
              <p class="text-sm text-gray-700 truncate">{{ draft.displayTitle }}</p>
              <p class="text-xs text-gray-400">{{ formatTime(draft.lastModified) }}</p>
            </div>
            <button
              class="text-gray-300 hover:text-sub-red transition-colors opacity-0 group-hover:opacity-100 text-sm leading-none shrink-0"
              @click.stop="handleDelete(draft.id)"
              title="删除"
            >✕</button>
          </div>
        </div>
      </div>
    </aside>
  </Teleport>
</template>
