<script setup>
import { inject, ref } from 'vue'
import TimeInput from './TimeInput.vue'
import { YELLOW_FOULS, RED_FOULS } from '../../utils/constants.js'

const props = defineProps({
  card: { type: Object, required: true },
})

const actions = inject('actions')

// Which foul popup is open: null | 'yellow' | 'red'
const foulPopup = ref(null)

function update(field, value) {
  actions.updateCard(props.card.id, field, value)
}

function remove() {
  actions.removeCard(props.card.id)
}

function toggleCardType(type) {
  // If same type clicked again, toggle popup
  if (props.card.type === type) {
    foulPopup.value = foulPopup.value === type ? null : type
  } else {
    update('type', type)
    foulPopup.value = type
  }
}

function selectFoul(foul) {
  update('reason', `${foul.code} ${foul.full}`)
  foulPopup.value = null
}
</script>

<template>
  <div class="px-4 py-2.5 space-y-2">
    <!-- Team + Time + Type + Delete -->
    <div class="flex items-center gap-2">
      <label class="flex items-center gap-1 text-xs">
        <input
          type="radio"
          :name="'card-team-' + card.id"
          value="home"
          :checked="card.team === 'home'"
          @change="update('team', 'home')"
        />
        主队
      </label>
      <label class="flex items-center gap-1 text-xs">
        <input
          type="radio"
          :name="'card-team-' + card.id"
          value="away"
          :checked="card.team === 'away'"
          @change="update('team', 'away')"
        />
        客队
      </label>
      <span class="text-gray-300">|</span>

      <TimeInput
        :model-value="card.time"
        @update:model-value="update('time', $event)"
      />
      <span class="text-gray-300">|</span>

      <!-- Card type buttons with popup trigger -->
      <button
        :class="[
          'text-xs px-2 py-0.5 rounded font-medium transition',
          card.type === 'yellow'
            ? 'bg-warning-yellow text-white'
            : 'bg-gray-100 text-gray-500 hover:bg-yellow-100'
        ]"
        @click="toggleCardType('yellow')"
      >黄牌</button>
      <button
        :class="[
          'text-xs px-2 py-0.5 rounded font-medium transition',
          card.type === 'red'
            ? 'bg-sub-red text-white'
            : 'bg-gray-100 text-gray-500 hover:bg-red-100'
        ]"
        @click="toggleCardType('red')"
      >红牌</button>

      <button
        class="ml-auto text-gray-400 hover:text-sub-red transition-colors text-sm leading-none"
        @click="remove"
        title="删除"
      >✕</button>
    </div>

    <!-- Player -->
    <div class="flex items-center gap-2">
      <input
        :value="card.playerName"
        @input="update('playerName', $event.target.value)"
        placeholder="球员姓名"
        class="flex-1 text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-theme-blue"
      />
      <span class="text-xs text-gray-400">#</span>
      <input
        :value="card.playerNumber"
        @input="update('playerNumber', $event.target.value)"
        placeholder="号码"
        class="w-14 text-xs border border-gray-300 rounded px-1.5 py-1 focus:outline-none focus:border-theme-blue"
      />
    </div>

    <!-- Reason input (still editable after foul selection) -->
    <input
      :value="card.reason"
      @input="update('reason', $event.target.value)"
      placeholder="犯规原因（点选黄/红牌按钮快速填入，也可手动编辑）"
      class="w-full text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-theme-blue"
    />

    <!-- ===== Yellow Card Foul Popup ===== -->
    <div
      v-if="foulPopup === 'yellow'"
      class="relative"
    >
      <div class="bg-yellow-50 border border-warning-yellow rounded-md p-2 shadow-sm">
        <div class="flex items-center justify-between mb-1.5">
          <span class="text-xs font-medium text-yellow-700">选择黄牌犯规原因</span>
          <button
            class="text-yellow-500 hover:text-yellow-700 text-xs leading-none"
            @click="foulPopup = null"
          >✕</button>
        </div>
        <div class="grid grid-cols-2 gap-1">
          <button
            v-for="f in YELLOW_FOULS"
            :key="f.code"
            class="text-xs text-left px-2 py-1 rounded bg-white border border-yellow-200 hover:bg-warning-yellow hover:text-white transition-colors"
            @click="selectFoul(f)"
          >
            <span class="font-mono font-bold">{{ f.code }}</span>
            <span class="ml-1 text-gray-600">{{ f.short }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- ===== Red Card Foul Popup ===== -->
    <div
      v-if="foulPopup === 'red'"
      class="relative"
    >
      <div class="bg-red-50 border border-sub-red rounded-md p-2 shadow-sm">
        <div class="flex items-center justify-between mb-1.5">
          <span class="text-xs font-medium text-red-700">选择红牌犯规原因</span>
          <button
            class="text-red-500 hover:text-red-700 text-xs leading-none"
            @click="foulPopup = null"
          >✕</button>
        </div>
        <div class="grid grid-cols-2 gap-1">
          <button
            v-for="f in RED_FOULS"
            :key="f.code"
            class="text-xs text-left px-2 py-1 rounded bg-white border border-red-200 hover:bg-sub-red hover:text-white transition-colors"
            @click="selectFoul(f)"
          >
            <span class="font-mono font-bold">{{ f.code }}</span>
            <span class="ml-1 text-gray-600">{{ f.short }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
