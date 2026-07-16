<script setup>
import { inject } from 'vue'
import TimeInput from './TimeInput.vue'

const props = defineProps({
  card: { type: Object, required: true },
})

const actions = inject('actions')

function update(field, value) {
  actions.updateCard(props.card.id, field, value)
}

function remove() {
  actions.removeCard(props.card.id)
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

      <!-- Card type buttons -->
      <button
        :class="[
          'text-xs px-2 py-0.5 rounded font-medium transition',
          card.type === 'yellow'
            ? 'bg-warning-yellow text-white'
            : 'bg-gray-100 text-gray-500 hover:bg-yellow-100'
        ]"
        @click="update('type', 'yellow')"
      >黄牌</button>
      <button
        :class="[
          'text-xs px-2 py-0.5 rounded font-medium transition',
          card.type === 'red'
            ? 'bg-sub-red text-white'
            : 'bg-gray-100 text-gray-500 hover:bg-red-100'
        ]"
        @click="update('type', 'red')"
      >红牌</button>

      <button
        class="ml-auto text-gray-400 hover:text-sub-red transition-colors text-sm leading-none"
        @click="remove"
        title="删除"
      >✕</button>
    </div>

    <!-- Player + Reason -->
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
    <input
      :value="card.reason"
      @input="update('reason', $event.target.value)"
      placeholder="犯规原因（如：C6 非体育行为）"
      class="w-full text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-theme-blue"
    />
  </div>
</template>
