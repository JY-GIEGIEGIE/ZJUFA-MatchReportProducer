<script setup>
import { inject } from 'vue'
import TimeInput from './TimeInput.vue'

const props = defineProps({
  goal: { type: Object, required: true },
})

const emit = defineEmits(['remove'])
const actions = inject('actions')

function update(field, value) {
  actions.updateGoal(props.goal.id, field, value)
}

function remove() {
  actions.removeGoal(props.goal.id)
}
</script>

<template>
  <div class="px-4 py-2.5 space-y-2">
    <!-- Top row: team toggle + time + delete -->
    <div class="flex items-center gap-2">
      <!-- Team -->
      <label class="flex items-center gap-1 text-xs">
        <input
          type="radio"
          :name="'goal-team-' + goal.id"
          value="home"
          :checked="goal.team === 'home'"
          @change="update('team', 'home')"
        />
        主队
      </label>
      <label class="flex items-center gap-1 text-xs">
        <input
          type="radio"
          :name="'goal-team-' + goal.id"
          value="away"
          :checked="goal.team === 'away'"
          @change="update('team', 'away')"
        />
        客队
      </label>

      <span class="text-gray-300">|</span>

      <!-- Time -->
      <TimeInput
        :model-value="goal.time"
        @update:model-value="update('time', $event)"
      />

      <span class="text-gray-300">|</span>

      <!-- Goal type -->
      <select
        :value="goal.type"
        @change="update('type', $event.target.value)"
        class="text-xs border border-gray-300 rounded px-1.5 py-1 focus:outline-none focus:border-theme-blue"
      >
        <option value="regular">常规</option>
        <option value="penalty">点球</option>
        <option value="own-goal">乌龙</option>
      </select>

      <button
        class="ml-auto text-gray-400 hover:text-sub-red transition-colors text-sm leading-none"
        @click="remove"
        title="删除"
      >✕</button>
    </div>

    <!-- Bottom row: player info -->
    <div class="flex items-center gap-2">
      <input
        :value="goal.playerName"
        @input="update('playerName', $event.target.value)"
        placeholder="球员姓名"
        class="flex-1 text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-theme-blue"
      />
      <span class="text-xs text-gray-400">#</span>
      <input
        :value="goal.playerNumber"
        @input="update('playerNumber', $event.target.value)"
        placeholder="号码"
        class="w-14 text-xs border border-gray-300 rounded px-1.5 py-1 focus:outline-none focus:border-theme-blue"
      />
    </div>
  </div>
</template>
