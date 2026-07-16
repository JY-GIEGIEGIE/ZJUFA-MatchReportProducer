<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: { type: String, default: '' },
})

const emit = defineEmits(['update:modelValue'])

// Parse "45+2" → base="45", added="2"
// Parse "5"    → base="5",  added=""
function parseTime(val) {
  if (!val) return { base: '', added: '' }
  const match = val.match(/^(\d+)(?:\+(\d+))?$/)
  if (match) {
    return { base: match[1], added: match[2] || '' }
  }
  return { base: val, added: '' }
}

const parsed = parseTime(props.modelValue)
const base = ref(parsed.base)
const added = ref(parsed.added)
const showAdded = ref(!!parsed.added)

// Sync from parent changes
watch(() => props.modelValue, (newVal) => {
  const p = parseTime(newVal)
  base.value = p.base
  added.value = p.added
  showAdded.value = !!p.added
})

function emitTime() {
  const b = base.value.trim()
  const a = added.value
  if (!b) {
    emit('update:modelValue', '')
    return
  }
  // Only allow digits
  const cleanBase = b.replace(/\D/g, '')
  if (!cleanBase) {
    emit('update:modelValue', '')
    return
  }
  if (a && showAdded.value) {
    emit('update:modelValue', `${cleanBase}+${a}`)
  } else {
    emit('update:modelValue', cleanBase)
  }
}

function onBaseChange(e) {
  base.value = e.target.value.replace(/\D/g, '') // digits only
  emitTime()
}

function toggleAdded() {
  showAdded.value = !showAdded.value
  if (!showAdded.value) {
    added.value = ''
  }
  emitTime()
}

function onAddedChange(e) {
  added.value = e.target.value
  emitTime()
}

// Added time options: 1-15
const addedOptions = Array.from({ length: 15 }, (_, i) => String(i + 1))
</script>

<template>
  <div class="inline-flex items-center gap-0.5">
    <!-- Base minute input -->
    <input
      :value="base"
      @input="onBaseChange"
      placeholder="分钟"
      class="w-12 text-xs text-center border border-gray-300 rounded px-1 py-1 focus:outline-none focus:border-theme-blue"
    />

    <!-- Added time toggle & dropdown -->
    <button
      v-if="!showAdded"
      class="text-[10px] text-gray-400 hover:text-theme-blue transition-colors border border-dashed border-gray-300 rounded px-1 py-1 leading-none whitespace-nowrap"
      @click="toggleAdded"
      title="添加补时"
    >+补时</button>

    <template v-else>
      <span class="text-xs text-gray-400">+</span>
      <select
        :value="added"
        @change="onAddedChange"
        class="w-10 text-xs text-center border border-gray-300 rounded px-0.5 py-1 focus:outline-none focus:border-theme-blue"
      >
        <option v-for="n in addedOptions" :key="n" :value="n">{{ n }}</option>
      </select>
      <button
        class="text-[10px] text-gray-400 hover:text-sub-red transition-colors leading-none"
        @click="toggleAdded"
        title="取消补时"
      >✕</button>
    </template>
  </div>
</template>
