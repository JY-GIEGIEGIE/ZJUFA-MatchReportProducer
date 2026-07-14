<script setup>
defineProps({
  title: { type: String, required: true },
  items: { type: Array, required: true },
  addLabel: { type: String, default: '+ 添加' },
  collapsed: { type: Boolean, default: false },
})

const emit = defineEmits(['add'])
</script>

<template>
  <section class="border border-gray-200 rounded-lg overflow-hidden">
    <button
      class="w-full flex items-center justify-between px-4 py-2.5 bg-gray-50 hover:bg-gray-100 transition-colors"
      @click="emit('add')"
    >
      <span class="text-sm font-bold text-gray-700">{{ title }}</span>
      <span class="text-xs text-theme-blue font-medium">{{ addLabel }}</span>
    </button>

    <div v-if="items.length > 0" class="divide-y divide-gray-100">
      <slot />
    </div>

    <div v-else class="px-4 py-3 text-xs text-gray-400 text-center">
      暂无记录，点击上方按钮添加
    </div>
  </section>
</template>
