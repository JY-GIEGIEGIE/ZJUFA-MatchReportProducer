<script setup>
import { computed } from 'vue'
import TimelineNode from './TimelineNode.vue'
import GoalCard from './GoalCard.vue'
import SubstitutionCard from './SubstitutionCard.vue'
import CardDisplay from './CardDisplay.vue'
import PenaltyCard from './PenaltyCard.vue'

const props = defineProps({
  events: { type: Array, default: () => [] },
})

// Separate regular events from penalty shootout events
const regularEvents = computed(() =>
  props.events.filter(e => e.type !== 'penalty')
)

const penaltyEvents = computed(() =>
  props.events.filter(e => e.type === 'penalty')
)
</script>

<template>
  <div class="my-8">
    <!-- ====== Timeline grid ====== -->
    <div class="relative" style="display: grid; grid-template-columns: 1fr auto 1fr; row-gap: 8px;">
      <!-- Background vertical line spanning center column -->
      <div
        class="absolute top-0 bottom-0 timeline-vertical-line"
        style="left: 50%; transform: translateX(-50%);"
      ></div>

      <!-- ===== Start node ===== -->
      <div></div>
      <div class="relative z-10">
        <TimelineNode type="start" />
      </div>
      <div></div>

      <!-- ===== Regular event rows ===== -->
      <template v-for="event in regularEvents" :key="event.id">
        <!-- HOME event: card in left column, node in center, empty right -->
        <template v-if="event.team === 'home'">
          <div class="flex items-center justify-end gap-2 py-1">
            <!-- Event card -->
            <GoalCard
              v-if="event.type === 'goal'"
              :player-name="event.playerName"
              :player-number="event.playerNumber"
              :team="event.team"
              :goal-type="event.goalType"
            />
            <SubstitutionCard
              v-else-if="event.type === 'substitution'"
              :player-in-name="event.playerInName"
              :player-in-number="event.playerInNumber"
              :player-out-name="event.playerOutName"
              :player-out-number="event.playerOutNumber"
              :team="event.team"
            />
            <CardDisplay
              v-else-if="event.type === 'card'"
              :player-name="event.playerName"
              :player-number="event.playerNumber"
              :card-type="event.cardType"
              :reason="event.reason"
              :team="event.team"
            />
            <!-- Connection line -->
            <div class="connection-line"></div>
          </div>
          <div class="relative z-10 flex justify-center">
            <TimelineNode type="event" :time="event.time" />
          </div>
          <div></div>
        </template>

        <!-- AWAY event: empty left, node center, card right -->
        <template v-else>
          <div></div>
          <div class="relative z-10 flex justify-center">
            <TimelineNode type="event" :time="event.time" />
          </div>
          <div class="flex items-center justify-start gap-2 py-1">
            <!-- Connection line -->
            <div class="connection-line"></div>
            <!-- Event card -->
            <GoalCard
              v-if="event.type === 'goal'"
              :player-name="event.playerName"
              :player-number="event.playerNumber"
              :team="event.team"
              :goal-type="event.goalType"
            />
            <SubstitutionCard
              v-else-if="event.type === 'substitution'"
              :player-in-name="event.playerInName"
              :player-in-number="event.playerInNumber"
              :player-out-name="event.playerOutName"
              :player-out-number="event.playerOutNumber"
              :team="event.team"
            />
            <CardDisplay
              v-else-if="event.type === 'card'"
              :player-name="event.playerName"
              :player-number="event.playerNumber"
              :card-type="event.cardType"
              :reason="event.reason"
              :team="event.team"
            />
          </div>
        </template>
      </template>

      <!-- ===== End node ===== -->
      <div></div>
      <div class="relative z-10">
        <TimelineNode type="end" />
      </div>
      <div></div>
    </div>

    <!-- ===== Penalty Shootout Section ===== -->
    <div v-if="penaltyEvents.length > 0" class="mt-6">
      <!-- Separator -->
      <div class="text-center mb-4">
        <span class="text-sm text-theme-blue font-bold">— 点球大战 —</span>
      </div>

      <div style="display: grid; grid-template-columns: 1fr auto 1fr; row-gap: 6px;">
        <template v-for="event in penaltyEvents" :key="event.id">
          <!-- HOME penalty -->
          <template v-if="event.team === 'home'">
            <div class="flex items-center justify-end gap-2 py-1">
              <PenaltyCard
                :player-name="event.playerName"
                :player-number="event.playerNumber"
                :result="event.penaltyResult"
                :team="event.team"
              />
              <div class="connection-line"></div>
            </div>
            <div class="relative z-10 flex justify-center">
              <TimelineNode type="event" time="点" />
            </div>
            <div></div>
          </template>
          <!-- AWAY penalty -->
          <template v-else>
            <div></div>
            <div class="relative z-10 flex justify-center">
              <TimelineNode type="event" time="点" />
            </div>
            <div class="flex items-center justify-start gap-2 py-1">
              <div class="connection-line"></div>
              <PenaltyCard
                :player-name="event.playerName"
                :player-number="event.playerNumber"
                :result="event.penaltyResult"
                :team="event.team"
              />
            </div>
          </template>
        </template>
      </div>
    </div>
  </div>
</template>
