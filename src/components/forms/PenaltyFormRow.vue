<script setup>
import { inject } from 'vue'

const props = defineProps({
  penalty: { type: Object, required: true },
})

const actions = inject('actions')

function update(field, value) {
  actions.updatePenalty(props.penalty.id, field, value)
}

function remove() {
  actions.removePenalty(props.penalty.id)
}
</script>

<template>
  <div class="px-4 py-2.5 space-y-2">
    <!-- Team + Result + Delete -->
    <div class="flex items-center gap-2">
      <label class="flex items-center gap-1 text-xs">
        <input
          type="radio"
          :name="'pen-team-' + penalty.id"
          value="home"
          :checked="penalty.team === 'home'"
          @change="update('team', 'home')"
        />
        主队
      </label>
      <label class="flex items-center gap-1 text-xs">
        <input
          type="radio"
          :name="'pen-team-' + penalty.id"
          value="away"
          :checked="penalty.team === 'away'"
          @change="update('team', 'away')"
        />
        客队
      </label>
      <span class="text-gray-300">|</span>

      <!-- Result -->
      <button
        :class="[
          'text-xs px-2 py-0.5 rounded font-medium transition',
          penalty.result === 'scored'
            ? 'bg-sub-green text-white'
            : 'bg-gray-100 text-gray-500 hover:bg-green-100'
        ]"
        @click="update('result', 'scored')"
      >罚进</button>
      <button
        :class="[
          'text-xs px-2 py-0.5 rounded font-medium transition',
          penalty.result === 'missed'
            ? 'bg-sub-red text-white'
            : 'bg-gray-100 text-gray-500 hover:bg-red-100'
        ]"
        @click="update('result', 'missed')"
      >罚丢</button>

      <button
        class="ml-auto text-gray-400 hover:text-sub-red transition-colors text-sm leading-none"
        @click="remove"
        title="删除"
      >✕</button>
    </div>

    <!-- Player -->
    <div class="flex items-center gap-2">
      <input
        :value="penalty.playerName"
        @input="update('playerName', $event.target.value)"
        placeholder="球员姓名"
        class="flex-1 text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-theme-blue"
      />
      <span class="text-xs text-gray-400">#</span>
      <input
        :value="penalty.playerNumber"
        @input="update('playerNumber', $event.target.value)"
        placeholder="号码"
        class="w-14 text-xs border border-gray-300 rounded px-1.5 py-1 focus:outline-none focus:border-theme-blue"
      />
    </div>
  </div>
</template>
