<script setup>
import { inject } from 'vue'

const matchData = inject('matchData')
</script>

<template>
  <section class="border border-gray-200 rounded-lg p-4">
    <h2 class="text-sm font-bold text-gray-700 mb-3">裁判信息</h2>
    <div class="grid grid-cols-2 gap-2">
      <div>
        <label class="text-xs text-gray-500">主裁判</label>
        <input
          :value="matchData.referee"
          @input="matchData.referee = $event.target.value"
          class="w-full text-xs border border-gray-300 rounded px-2 py-1.5 mt-0.5 focus:outline-none focus:border-theme-blue"
          placeholder="姓名"
        />
      </div>
      <div>
        <label class="text-xs text-gray-500">第一助理裁判</label>
        <input
          :value="matchData.assistantReferee1"
          @input="matchData.assistantReferee1 = $event.target.value"
          class="w-full text-xs border border-gray-300 rounded px-2 py-1.5 mt-0.5 focus:outline-none focus:border-theme-blue"
          placeholder="姓名"
        />
      </div>
      <div>
        <label class="text-xs text-gray-500">第二助理裁判</label>
        <input
          :value="matchData.assistantReferee2"
          @input="matchData.assistantReferee2 = $event.target.value"
          class="w-full text-xs border border-gray-300 rounded px-2 py-1.5 mt-0.5 focus:outline-none focus:border-theme-blue"
          placeholder="姓名"
        />
      </div>
      <div>
        <label class="text-xs text-gray-500">第四官员</label>
        <input
          :value="matchData.fourthOfficial"
          @input="matchData.fourthOfficial = $event.target.value"
          class="w-full text-xs border border-gray-300 rounded px-2 py-1.5 mt-0.5 focus:outline-none focus:border-theme-blue"
          placeholder="姓名"
        />
      </div>
    </div>
  </section>
</template>
