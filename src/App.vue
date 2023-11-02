<script setup>
import { ref, computed } from 'vue'

import { useDataTime } from './compositions/dataTime.js'
const { now, daysOfWeek, months, years } = useDataTime()

const currentMonth = ref(now.getMonth())
const currentYear = ref(now.getFullYear())

const firstDay = computed(() => new Date(currentYear.value, currentMonth.value, 1))
const dayOfWeekFirstDay = computed(() => (firstDay.value.getDay() === 0 ? 6 : firstDay.value.getDay() - 1))
const daysInCurrentMonth = computed(() => new Date(currentYear.value, currentMonth.value + 1, 0).getDate())

const dates = computed(() => {
  let emptyArr = Array(dayOfWeekFirstDay.value)
  let arr = [...Array(daysInCurrentMonth.value).keys()].map(d => d + 1)

  return [...emptyArr, ...arr]
})
</script>

<template>
  <div class="calendar">
    <div class="calendar-header">
      <select v-model="currentMonth">
        <option v-for="(month, idx) in months" :value="idx" :key="idx">
          {{ month }}
        </option>
      </select>
      <select v-model="currentYear">
        <option v-for="year in years" :value="year" :key="year">
          {{ year }}
        </option>
      </select>
    </div>
    <div class="calendar-body">
      <div class="calendar-body__date calendar-body__date_background_grey" v-for="date in daysOfWeek" :key="date">
        {{ date }}
      </div>

      <div v-for="(date, idx) in dates" class="calendar-body__date" :key="idx">{{ date }}</div>
    </div>
  </div>
</template>

<style lang="scss">
.calendar {
  position: absolute;
  border: 1px solid #ccc;
  padding: 10px;
}

.calendar-header {
  font-size: 30px;
}

.calendar-body {
  width: 600px;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-rows: 70px;
}

.calendar-body__date {
  border: 1px solid black;
  padding: 2px;
}

.calendar-body__date_background_grey {
  background-color: #ccc;
}
</style>
