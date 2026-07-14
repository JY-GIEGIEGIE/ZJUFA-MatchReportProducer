<script setup>
import { inject } from 'vue'

const props = defineProps({
  sub: { type: Object, required: true },
})

const actions = inject('actions')

function update(field, value) {
  actions.updateSubstitution(props.sub.id, field, value)
}

function remove() {
  actions.removeSubstitution(props.sub.id)
}
</script>

<template>
  <div class="px-4 py-2.5 space-y-2">
    <!-- Team + Time + Delete -->
    <div class="flex items-center gap-2">
      <label class="flex items-center gap-1 text-xs">
        <input
          type="radio"
          :name="'sub-team-' + sub.id"
          value="home"
          :checked="sub.team === 'home'"
          @change="update('team', 'home')"
        />
        主队
      </label>
      <label class="flex items-center gap-1 text-xs">
        <input
          type="radio"
          :name="'sub-team-' + sub.id"
          value="away"
          :checked="sub.team === 'away'"
          @change="update('team', 'away')"
        />
        客队
      </label>
      <span class="text-gray-300">|</span>
      <input
        list="time-presets"
        :value="sub.time"
        @input="update('time', $event.target.value)"
        placeholder="分钟"
        class="w-16 text-xs border border-gray-300 rounded px-1.5 py-1 focus:outline-none focus:border-theme-blue"
      />
      <button
        class="ml-auto text-gray-400 hover:text-sub-red transition-colors text-sm leading-none"
        @click="remove"
        title="删除"
      >✕</button>
    </div>

    <!-- Player In -->
    <div class="flex items-center gap-1.5">
      <span class="text-xs text-sub-green font-medium w-10 shrink-0">换上</span>
      <input
        :value="sub.playerInName"
        @input="update('playerInName', $event.target.value)"
        placeholder="球员姓名"
        class="flex-1 text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-theme-blue"
      />
      <span class="text-xs text-gray-400">#</span>
      <input
        :value="sub.playerInNumber"
        @input="update('playerInNumber', $event.target.value)"
        placeholder="号码"
        class="w-14 text-xs border border-gray-300 rounded px-1.5 py-1 focus:outline-none focus:border-theme-blue"
      />
    </div>

    <!-- Player Out -->
    <div class="flex items-center gap-1.5">
      <span class="text-xs text-sub-red font-medium w-10 shrink-0">换下</span>
      <input
        :value="sub.playerOutName"
        @input="update('playerOutName', $event.target.value)"
        placeholder="球员姓名"
        class="flex-1 text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-theme-blue"
      />
      <span class="text-xs text-gray-400">#</span>
      <input
        :value="sub.playerOutNumber"
        @input="update('playerOutNumber', $event.target.value)"
        placeholder="号码"
        class="w-14 text-xs border border-gray-300 rounded px-1.5 py-1 focus:outline-none focus:border-theme-blue"
      />
    </div>
  </div>
</template>
