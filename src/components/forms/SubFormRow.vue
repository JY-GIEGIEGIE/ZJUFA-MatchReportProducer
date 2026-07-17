<script setup>
import { inject } from 'vue'
import TimeInput from './TimeInput.vue'

const props = defineProps({
  sub: { type: Object, required: true },
})

const actions = inject('actions')

function updateTime(val) {
  actions.updateSubstitution(props.sub.id, 0, 'time', val)
}

function updateEntry(entryIndex, field, value) {
  actions.updateSubstitution(props.sub.id, entryIndex, field, value)
}

function addEntry() {
  actions.addSubstitutionEntry(props.sub.id)
}

function removeEntry(entryIndex) {
  actions.removeSubstitutionEntry(props.sub.id, entryIndex)
}
</script>

<template>
  <div class="px-4 py-2.5 space-y-2">
    <!-- Header: time + delete event -->
    <div class="flex items-center gap-2">
      <span class="text-[10px] text-gray-400 shrink-0">分钟</span>
      <TimeInput
        :model-value="sub.time"
        @update:model-value="updateTime"
      />
      <button
        class="ml-auto text-gray-400 hover:text-sub-red transition-colors text-sm leading-none"
        @click="actions.removeSubstitution(props.sub.id)"
        title="删除整个换人事件"
      >✕</button>
    </div>

    <!-- Entry rows -->
    <div
      v-for="(entry, idx) in sub.entries"
      :key="idx"
      class="border-t border-gray-100 pt-2 space-y-1.5"
    >
      <!-- Team + delete entry -->
      <div class="flex items-center gap-1.5">
        <label class="flex items-center gap-1 text-[11px]">
          <input
            type="radio"
            :name="'sub-team-' + sub.id + '-' + idx"
            value="home"
            :checked="entry.team === 'home'"
            @change="updateEntry(idx, 'team', 'home')"
          />
          主队
        </label>
        <label class="flex items-center gap-1 text-[11px]">
          <input
            type="radio"
            :name="'sub-team-' + sub.id + '-' + idx"
            value="away"
            :checked="entry.team === 'away'"
            @change="updateEntry(idx, 'team', 'away')"
          />
          客队
        </label>
        <button
          v-if="sub.entries.length > 1"
          class="ml-auto text-[11px] text-gray-400 hover:text-sub-red transition-colors"
          @click="removeEntry(idx)"
          title="移除此组换人"
        >移除</button>
      </div>

      <!-- Player In -->
      <div class="flex items-center gap-1.5">
        <span class="text-[11px] text-sub-green font-medium w-10 shrink-0">换上</span>
        <input
          :value="entry.playerInName"
          @input="updateEntry(idx, 'playerInName', $event.target.value)"
          placeholder="球员姓名"
          class="flex-1 text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-theme-blue"
        />
        <span class="text-[11px] text-gray-400">#</span>
        <input
          :value="entry.playerInNumber"
          @input="updateEntry(idx, 'playerInNumber', $event.target.value)"
          placeholder="号码"
          class="w-14 text-xs border border-gray-300 rounded px-1.5 py-1 focus:outline-none focus:border-theme-blue"
        />
      </div>

      <!-- Player Out -->
      <div class="flex items-center gap-1.5">
        <span class="text-[11px] text-sub-red font-medium w-10 shrink-0">换下</span>
        <input
          :value="entry.playerOutName"
          @input="updateEntry(idx, 'playerOutName', $event.target.value)"
          placeholder="球员姓名"
          class="flex-1 text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-theme-blue"
        />
        <span class="text-[11px] text-gray-400">#</span>
        <input
          :value="entry.playerOutNumber"
          @input="updateEntry(idx, 'playerOutNumber', $event.target.value)"
          placeholder="号码"
          class="w-14 text-xs border border-gray-300 rounded px-1.5 py-1 focus:outline-none focus:border-theme-blue"
        />
      </div>
    </div>

    <!-- Add entry button -->
    <button
      class="w-full text-[11px] text-theme-blue hover:bg-blue-50 py-1 rounded border border-dashed border-blue-200 transition-colors"
      @click="addEntry"
    >+ 添加另一组换人（同分钟）</button>
  </div>
</template>
