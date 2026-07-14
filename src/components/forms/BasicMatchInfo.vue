<script setup>
import { inject, ref, computed } from 'vue'
import { VENUES, MATCH_NAMES_MALE, MATCH_NAMES_FEMALE } from '../../utils/constants.js'

const matchData = inject('matchData')

// ---- Venue ----
const customVenue = ref(false)
const venueSelect = ref('')

function handleVenueChange(e) {
  const val = e.target.value
  if (val === '__custom__') {
    customVenue.value = true
  } else {
    matchData.venue = val
  }
}

// ---- Match Name ----
// Dropdown-selected template (not directly bound to matchData)
const selectedTemplate = ref('')

// Gender: 'male' | 'female' — stored on matchData for persistence
const currentGender = computed({
  get: () => matchData.matchGender || 'male',
  set: (v) => { matchData.matchGender = v },
})

// Match name options based on gender
const matchNameOptions = computed(() =>
  currentGender.value === 'female' ? MATCH_NAMES_FEMALE : MATCH_NAMES_MALE
)

// When a template is selected from the dropdown, populate the text input
function handleTemplateSelect(e) {
  const val = e.target.value
  if (!val) return // 提示行，忽略
  selectedTemplate.value = val
  matchData.matchName = val
}

// Allow direct editing of matchName after template is filled
function onMatchNameInput(e) {
  matchData.matchName = e.target.value
  selectedTemplate.value = '' // 用户开始自由编辑后清除模板选中状态
}
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
            @change="handleVenueChange"
            class="w-full text-xs border border-gray-300 rounded px-2 py-1.5 mt-0.5 focus:outline-none focus:border-theme-blue"
          >
            <option value="" disabled>选择场地</option>
            <option v-for="v in VENUES" :key="v" :value="v">{{ v }}</option>
            <option value="__custom__">其他（手动输入）...</option>
          </select>
        </template>
        <input
          v-else
          :value="matchData.venue"
          @input="matchData.venue = $event.target.value"
          placeholder="输入场地名称"
          class="w-full text-xs border border-gray-300 rounded px-2 py-1.5 mt-0.5 focus:outline-none focus:border-theme-blue"
        />
        <button
          v-if="customVenue"
          class="text-xs text-theme-blue mt-1 hover:underline"
          @click="customVenue = false"
        >← 从列表选择</button>
      </div>
    </div>

    <!-- Match Name (redesigned) -->
    <div>
      <label class="text-xs text-gray-500">赛事名称</label>

      <!-- Gender toggle -->
      <div class="flex items-center gap-3 mt-0.5 mb-1.5">
        <label class="flex items-center gap-1 text-xs cursor-pointer">
          <input
            type="radio"
            value="male"
            v-model="currentGender"
            class="text-theme-blue"
          />
          男足
        </label>
        <label class="flex items-center gap-1 text-xs cursor-pointer">
          <input
            type="radio"
            value="female"
            v-model="currentGender"
            class="text-theme-blue"
          />
          女足
        </label>
      </div>

      <!-- Template dropdown (quick-fill helper) -->
      <select
        :value="selectedTemplate"
        @change="handleTemplateSelect"
        class="w-full text-xs border border-gray-300 rounded px-2 py-1.5 focus:outline-none focus:border-theme-blue"
      >
        <option value="" disabled>选择赛事模板（可选，快捷填充）</option>
        <option v-for="m in matchNameOptions" :key="m" :value="m">{{ m }}</option>
      </select>

      <!-- Actual match name input (always editable, binds to matchData) -->
      <input
        :value="matchData.matchName"
        @input="onMatchNameInput"
        placeholder="赛事名称，可在此编辑补充（如添加: 半决赛、小组赛E组等）"
        class="w-full text-xs border border-gray-300 rounded px-2 py-1.5 mt-1.5 focus:outline-none focus:border-theme-blue"
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
