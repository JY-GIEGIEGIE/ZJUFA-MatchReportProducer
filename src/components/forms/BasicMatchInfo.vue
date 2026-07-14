<script setup>
import { inject, ref } from 'vue'
import { VENUES, MATCH_NAMES } from '../../utils/constants.js'

const matchData = inject('matchData')

const customVenue = ref(false)
const customMatchName = ref(false)
</script>

<template>
  <section class="border border-gray-200 rounded-lg p-4 space-y-3">
    <h2 class="text-sm font-bold text-gray-700">基础信息</h2>

    <!-- Date & Venue -->
    <div class="grid grid-cols-2 gap-2">
      <div>
        <label class="text-xs text-gray-500">日期</label>
        <input
          type="date"
          :value="matchData.date"
          @input="matchData.date = $event.target.value"
          class="w-full text-xs border border-gray-300 rounded px-2 py-1.5 mt-0.5 focus:outline-none focus:border-theme-blue"
        />
      </div>
      <div>
        <label class="text-xs text-gray-500">场地</label>
        <template v-if="!customVenue">
          <select
            :value="matchData.venue"
            @change="matchData.venue = $event.target.value"
            class="w-full text-xs border border-gray-300 rounded px-2 py-1.5 mt-0.5 focus:outline-none focus:border-theme-blue"
          >
            <option value="">选择场地</option>
            <option v-for="v in VENUES" :key="v" :value="v">{{ v }}</option>
            <option value="__custom__">其他...</option>
          </select>
        </template>
        <input
          v-else
          :value="matchData.venue"
          @input="matchData.venue = $event.target.value"
          placeholder="输入场地名称"
          class="w-full text-xs border border-gray-300 rounded px-2 py-1.5 mt-0.5 focus:outline-none focus:border-theme-blue"
        />
      </div>
    </div>

    <!-- Match Name -->
    <div>
      <label class="text-xs text-gray-500">赛事名称</label>
      <template v-if="!customMatchName">
        <select
          :value="matchData.matchName"
          @change="matchData.matchName = $event.target.value"
          class="w-full text-xs border border-gray-300 rounded px-2 py-1.5 mt-0.5 focus:outline-none focus:border-theme-blue"
        >
          <option value="">选择赛事</option>
          <option v-for="m in MATCH_NAMES" :key="m" :value="m">{{ m }}</option>
          <option value="__custom__">其他...</option>
        </select>
      </template>
      <input
        v-else
        :value="matchData.matchName"
        @input="matchData.matchName = $event.target.value"
        placeholder="输入赛事名称"
        class="w-full text-xs border border-gray-300 rounded px-2 py-1.5 mt-0.5 focus:outline-none focus:border-theme-blue"
      />
    </div>

    <!-- Teams -->
    <div>
      <label class="text-xs text-gray-500">对阵双方</label>
      <div class="flex items-center gap-2 mt-0.5">
        <input
          :value="matchData.homeTeam"
          @input="matchData.homeTeam = $event.target.value"
          placeholder="主队"
          class="flex-1 text-xs border border-gray-300 rounded px-2 py-1.5 focus:outline-none focus:border-theme-blue"
        />
        <span class="text-xs text-gray-400 font-bold">VS</span>
        <input
          :value="matchData.awayTeam"
          @input="matchData.awayTeam = $event.target.value"
          placeholder="客队"
          class="flex-1 text-xs border border-gray-300 rounded px-2 py-1.5 focus:outline-none focus:border-theme-blue"
        />
      </div>
    </div>

    <!-- Score -->
    <div>
      <label class="text-xs text-gray-500">常规比分</label>
      <div class="flex items-center gap-2 mt-0.5">
        <input
          type="number"
          min="0"
          :value="matchData.homeScore"
          @input="matchData.homeScore = Math.max(0, parseInt($event.target.value) || 0)"
          class="w-16 text-xs border border-gray-300 rounded px-2 py-1.5 text-center focus:outline-none focus:border-theme-blue score-number"
        />
        <span class="text-xs text-gray-400">-</span>
        <input
          type="number"
          min="0"
          :value="matchData.awayScore"
          @input="matchData.awayScore = Math.max(0, parseInt($event.target.value) || 0)"
          class="w-16 text-xs border border-gray-300 rounded px-2 py-1.5 text-center focus:outline-none focus:border-theme-blue score-number"
        />
      </div>
    </div>

    <!-- Penalty Shootout Toggle -->
    <div>
      <label class="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          :checked="matchData.hasPenaltyShootout"
          @change="matchData.hasPenaltyShootout = $event.target.checked"
          class="rounded"
        />
        <span class="text-xs text-gray-600">点球大战</span>
      </label>

      <!-- Penalty scores (shown when toggle is on) -->
      <div v-if="matchData.hasPenaltyShootout" class="flex items-center gap-2 mt-2 pl-5">
        <span class="text-xs text-gray-500">点球比分</span>
        <input
          type="number"
          min="0"
          :value="matchData.homePenaltyScore"
          @input="matchData.homePenaltyScore = Math.max(0, parseInt($event.target.value) || 0)"
          class="w-14 text-xs border border-gray-300 rounded px-2 py-1 text-center focus:outline-none focus:border-theme-blue score-number"
        />
        <span class="text-xs text-gray-400">-</span>
        <input
          type="number"
          min="0"
          :value="matchData.awayPenaltyScore"
          @input="matchData.awayPenaltyScore = Math.max(0, parseInt($event.target.value) || 0)"
          class="w-14 text-xs border border-gray-300 rounded px-2 py-1 text-center focus:outline-none focus:border-theme-blue score-number"
        />
      </div>
    </div>
  </section>
</template>
