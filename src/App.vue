<script setup>
import { ref, computed } from 'vue'

import { useDateTime } from './compositions/dateTime.js'
import { useTasks } from './compositions/tasks.js'

const { now, daysOfWeek, months, years } = useDateTime()
const { tasks, addTask, deleteTask } = useTasks()

const currentMonth = ref(now.getMonth())
const currentYear = ref(now.getFullYear())
const newTaskText = ref(null)

const firstDay = computed(() => new Date(currentYear.value, currentMonth.value, 1))
const dayOfWeekFirstDay = computed(() => (firstDay.value.getDay() === 0 ? 6 : firstDay.value.getDay() - 1))
const daysInCurrentMonth = computed(() => new Date(currentYear.value, currentMonth.value + 1, 0).getDate())

const dates = computed(() => {
  let emptyArr = Array(dayOfWeekFirstDay.value)
  let arr = [...Array(daysInCurrentMonth.value).keys()].map(d => d + 1)

  return [...emptyArr, ...arr]
})

function clickAddTask() {
  addTask({ text: newTaskText.value })
}
</script>

<template>
  <main class="is-flex">
    <section class="box">
      <div class="select mr-2">
        <select v-model="currentMonth">
          <option v-for="(month, idx) in months" :value="idx" :key="idx">
            {{ month }}
          </option>
        </select>
      </div>
      <div class="select">
        <select v-model="currentYear">
          <option v-for="year in years" :value="year" :key="year">
            {{ year }}
          </option>
        </select>
      </div>

      <div class="calendar mt-2 has-background-white-ter has-text-weight-bold">
        <div class="calendar__date" v-for="date in daysOfWeek" :key="date">
          {{ date }}
        </div>
      </div>
      <div class="calendar calendar_rows">
        <div v-for="(date, idx) in dates" class="calendar__date" :key="idx">{{ date }}</div>
      </div>
    </section>
    <section class="tasks box ml-2">
      <div class="is-flex">
        <input class="input is-info is-small mr-1" type="text" placeholder="Текст" v-model="newTaskText" />
        <button class="button is-info mb-3 is-small" @click="clickAddTask" :disabled="!newTaskText">Добавить</button>
      </div>

      <article class="message is-small" v-for="task in tasks" :key="task.text">
        <div class="message-body">
          {{ task.text }}
          <div class="task__delete has-text-grey-light" @click="deleteTask(task.text)">Удалить</div>
        </div>
      </article>
    </section>
  </main>
</template>

<style lang="scss">
@import 'bulma/css/bulma.css';

.calendar {
  width: 800px;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}
.calendar_rows {
  grid-auto-rows: 150px;
}

.calendar__date {
  border: 1px solid lightgrey;
  padding: 2px;
}

.tasks {
  width: 400px;
}
.task__delete {
  text-align: right;
  cursor: pointer;
}
</style>
