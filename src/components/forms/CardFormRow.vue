<script setup>
import { inject, ref } from 'vue'
import TimeInput from './TimeInput.vue'
import { YELLOW_FOULS, RED_FOULS } from '../../utils/constants.js'

const props = defineProps({
  card: { type: Object, required: true },
})

const actions = inject('actions')

// Which foul popup is open: null | { entryIndex, color: 'yellow'|'red' }
const foulPopup = ref(null)

function updateTime(val) {
  actions.updateCard(props.card.id, 0, 'time', val)
}

function updateEntry(entryIndex, field, value) {
  actions.updateCard(props.card.id, entryIndex, field, value)
}

function addEntry() {
  actions.addCardEntry(props.card.id)
}

function removeEntry(entryIndex) {
  actions.removeCardEntry(props.card.id, entryIndex)
}

function toggleFoulPopup(entryIndex, color) {
  if (foulPopup.value && foulPopup.value.entryIndex === entryIndex && foulPopup.value.color === color) {
    foulPopup.value = null
  } else {
    foulPopup.value = { entryIndex, color }
  }
}

function selectFoul(entryIndex, foul) {
  updateEntry(entryIndex, 'reason', `${foul.code} ${foul.full}`)
  foulPopup.value = null
}
</script>

<template>
  <div class="px-4 py-2.5 space-y-2">
    <!-- Header: shared time + delete event -->
    <div class="flex items-center gap-2">
      <span class="text-[10px] text-gray-400 shrink-0">分钟</span>
      <TimeInput
        :model-value="card.time"
        @update:model-value="updateTime"
      />
      <button
        class="ml-auto text-gray-400 hover:text-sub-red transition-colors text-sm leading-none"
        @click="actions.removeCard(props.card.id)"
        title="删除整个罚牌事件"
      >✕</button>
    </div>

    <!-- Entry rows -->
    <div
      v-for="(entry, idx) in card.entries"
      :key="idx"
      class="border-t border-gray-100 pt-2 space-y-1.5"
    >
      <!-- Team + Card type + remove entry -->
      <div class="flex items-center gap-1.5">
        <label class="flex items-center gap-1 text-[11px]">
          <input
            type="radio"
            :name="'card-team-' + card.id + '-' + idx"
            value="home"
            :checked="entry.team === 'home'"
            @change="updateEntry(idx, 'team', 'home')"
          />
          主队
        </label>
        <label class="flex items-center gap-1 text-[11px]">
          <input
            type="radio"
            :name="'card-team-' + card.id + '-' + idx"
            value="away"
            :checked="entry.team === 'away'"
            @change="updateEntry(idx, 'team', 'away')"
          />
          客队
        </label>

        <span class="text-gray-300">|</span>

        <!-- Per-entry card type -->
        <button
          :class="[
            'text-[11px] px-1.5 py-0.5 rounded font-medium transition',
            entry.cardType === 'yellow'
              ? 'bg-warning-yellow text-white'
              : 'bg-gray-100 text-gray-500 hover:bg-yellow-100'
          ]"
          @click="updateEntry(idx, 'cardType', 'yellow')"
        >黄牌</button>
        <button
          :class="[
            'text-[11px] px-1.5 py-0.5 rounded font-medium transition',
            entry.cardType === 'red'
              ? 'bg-sub-red text-white'
              : 'bg-gray-100 text-gray-500 hover:bg-red-100'
          ]"
          @click="updateEntry(idx, 'cardType', 'red')"
        >红牌</button>

        <button
          v-if="card.entries.length > 1"
          class="ml-auto text-[11px] text-gray-400 hover:text-sub-red transition-colors"
          @click="removeEntry(idx)"
          title="移除此球员"
        >移除</button>
      </div>

      <!-- Player + Reason button -->
      <div class="flex items-center gap-2">
        <input
          :value="entry.playerName"
          @input="updateEntry(idx, 'playerName', $event.target.value)"
          placeholder="球员姓名"
          class="flex-1 text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-theme-blue"
        />
        <span class="text-xs text-gray-400">#</span>
        <input
          :value="entry.playerNumber"
          @input="updateEntry(idx, 'playerNumber', $event.target.value)"
          placeholder="号码"
          class="w-14 text-xs border border-gray-300 rounded px-1.5 py-1 focus:outline-none focus:border-theme-blue"
        />
        <button
          :class="[
            'text-[10px] px-1.5 py-1 rounded border font-medium transition whitespace-nowrap',
            entry.cardType === 'yellow'
              ? 'border-warning-yellow text-yellow-600 hover:bg-yellow-50'
              : 'border-sub-red text-red-600 hover:bg-red-50'
          ]"
          @click="toggleFoulPopup(idx, entry.cardType)"
        >原因</button>
      </div>

      <!-- Reason input -->
      <input
        :value="entry.reason"
        @input="updateEntry(idx, 'reason', $event.target.value)"
        placeholder="犯规原因（点选右侧原因按钮，也可手动编辑）"
        class="w-full text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-theme-blue"
      />

      <!-- ===== Foul Popup (per entry) ===== -->
      <div
        v-if="foulPopup && foulPopup.entryIndex === idx"
        class="relative"
      >
        <div
          :class="[
            'border rounded-md p-2 shadow-sm',
            foulPopup.color === 'yellow'
              ? 'bg-yellow-50 border-warning-yellow'
              : 'bg-red-50 border-sub-red'
          ]"
        >
          <div class="flex items-center justify-between mb-1.5">
            <span :class="[
              'text-xs font-medium',
              foulPopup.color === 'yellow' ? 'text-yellow-700' : 'text-red-700'
            ]">选择犯规原因</span>
            <button
              class="text-gray-400 hover:text-gray-600 text-xs leading-none"
              @click="foulPopup = null"
            >✕</button>
          </div>
          <div class="grid grid-cols-2 gap-1">
            <button
              v-for="f in (foulPopup.color === 'yellow' ? YELLOW_FOULS : RED_FOULS)"
              :key="f.code"
              :class="[
                'text-xs text-left px-2 py-1 rounded border transition-colors',
                foulPopup.color === 'yellow'
                  ? 'bg-white border-yellow-200 hover:bg-warning-yellow hover:text-white'
                  : 'bg-white border-red-200 hover:bg-sub-red hover:text-white'
              ]"
              @click="selectFoul(idx, f)"
            >
              <span class="font-mono font-bold">{{ f.code }}</span>
              <span class="ml-1 text-gray-600">{{ f.short }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Add entry button -->
    <button
      class="w-full text-[11px] text-theme-blue hover:bg-blue-50 py-1 rounded border border-dashed border-blue-200 transition-colors"
      @click="addEntry"
    >+ 添加另一名球员（同分钟）</button>
  </div>
</template>
