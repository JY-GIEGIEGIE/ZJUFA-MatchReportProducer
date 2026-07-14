<script setup>
import { inject } from 'vue'
import BasicMatchInfo from '../forms/BasicMatchInfo.vue'
import EventSection from '../forms/EventSection.vue'
import GoalFormRow from '../forms/GoalFormRow.vue'
import SubFormRow from '../forms/SubFormRow.vue'
import CardFormRow from '../forms/CardFormRow.vue'
import PenaltyFormRow from '../forms/PenaltyFormRow.vue'
import RefereeForm from '../forms/RefereeForm.vue'
import { TIME_PRESETS } from '../../utils/constants.js'

const matchData = inject('matchData')
const actions = inject('actions')
</script>

<template>
  <aside class="w-[420px] shrink-0 bg-white border-r border-gray-200 overflow-y-auto">
    <!-- Time presets datalist (shared) -->
    <datalist id="time-presets">
      <option v-for="t in TIME_PRESETS" :key="t" :value="t" />
    </datalist>

    <div class="p-3 space-y-3">
      <!-- 1. Basic Info -->
      <BasicMatchInfo />

      <!-- 2. Goals -->
      <EventSection
        title="⚽ 进球"
        :items="matchData.goals"
        add-label="+ 添加进球"
        @add="actions.addGoal()"
      >
        <GoalFormRow
          v-for="goal in matchData.goals"
          :key="goal.id"
          :goal="goal"
        />
      </EventSection>

      <!-- 3. Substitutions -->
      <EventSection
        title="🔄 换人"
        :items="matchData.substitutions"
        add-label="+ 添加换人"
        @add="actions.addSubstitution()"
      >
        <SubFormRow
          v-for="sub in matchData.substitutions"
          :key="sub.id"
          :sub="sub"
        />
      </EventSection>

      <!-- 4. Cards -->
      <EventSection
        title="🟨 红黄牌"
        :items="matchData.cards"
        add-label="+ 添加罚牌"
        @add="actions.addCard()"
      >
        <CardFormRow
          v-for="card in matchData.cards"
          :key="card.id"
          :card="card"
        />
      </EventSection>

      <!-- 5. Penalty Shootout -->
      <EventSection
        title="🎯 点球大战"
        :items="matchData.penalties"
        add-label="+ 添加点球"
        @add="actions.addPenalty()"
      >
        <PenaltyFormRow
          v-for="pen in matchData.penalties"
          :key="pen.id"
          :penalty="pen"
        />
      </EventSection>

      <!-- 6. Referees -->
      <RefereeForm />
    </div>
  </aside>
</template>
