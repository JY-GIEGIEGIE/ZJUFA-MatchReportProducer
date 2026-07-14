<script setup>
import { inject, computed } from 'vue'
import IconRefereeRole from '../icons/IconRefereeRole.vue'
import IconAssistFlagCrossed from '../icons/IconAssistFlagCrossed.vue'
import IconAssistFlagSingle from '../icons/IconAssistFlagSingle.vue'
import IconFourthOfficial from '../icons/IconFourthOfficial.vue'
import IconSoccerBall from '../icons/IconSoccerBall.vue'
import IconPenaltyMissed from '../icons/IconPenaltyMissed.vue'

const matchData = inject('matchData')

const refereeItems = computed(() => [
  { icon: IconRefereeRole, label: '主裁判', name: matchData.referee },
  { icon: IconAssistFlagCrossed, label: '第一助理裁判', name: matchData.assistantReferee1 },
  { icon: IconAssistFlagSingle, label: '第二助理裁判', name: matchData.assistantReferee2 },
  { icon: IconFourthOfficial, label: '第四官员', name: matchData.fourthOfficial },
])

const legendItems = [
  { color: '#3498db', label: '进球', missed: false },
  { color: '#e74c3c', label: '乌龙', missed: false },
  { color: '#f1c40f', label: '点球', missed: false },
  { color: '#f1c40f', label: '点球未进', missed: true },
]
</script>

<template>
  <div class="mt-10 pt-6 border-t border-gray-200">
    <!-- Referee grid: 2×2 -->
    <div class="grid grid-cols-2 gap-x-12 gap-y-3 max-w-lg mx-auto">
      <div
        v-for="item in refereeItems"
        :key="item.label"
        class="flex items-center gap-3"
      >
        <component :is="item.icon" :size="22" color="#3498db" />
        <div>
          <span class="text-xs text-gray-400">{{ item.label }}</span>
          <span class="text-sm text-gray-700 ml-2">{{ item.name || '—' }}</span>
        </div>
      </div>
    </div>

    <!-- Legend -->
    <div class="flex items-center justify-center gap-6 mt-6">
      <div
        v-for="item in legendItems"
        :key="item.label"
        class="flex items-center gap-1.5"
      >
        <IconSoccerBall v-if="!item.missed" :size="16" :color="item.color" />
        <IconPenaltyMissed v-else :size="16" :missed="true" />
        <span class="text-xs" :style="{ color: item.color }">{{ item.label }}</span>
      </div>
    </div>
  </div>
</template>
