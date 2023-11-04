<script setup>
import { ref, computed } from 'vue'

import DateItem from '@/components/DateItem'

import { useDateTime } from '@/compositions/dateTime.js'
import { useTasks } from '@/compositions/tasks.js'

const { now, daysOfWeek, months, years } = useDateTime()
const { tasks, addTask, deleteTask, updateTask } = useTasks()
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

function startDragTask(e, task) {
  e.dataTransfer.dropEffect = 'move'
  e.dataTransfer.effectAllowed = 'move'
  e.dataTransfer.setData('taskId', task.id)
}

function onDropTask(e, dateTime = '') {
  const taskId = e.dataTransfer.getData('taskId')
  const task = tasks.value.find(t => t.id === taskId)
  updateTask({...task, dateTime })
}

function getDateTime(date) {
  return String(new Date(date, currentMonth.value, currentYear.value))
}
</script>

<template>
  <main class="is-flex">
    <section class="box mb-0">
      <div class="select mr-2 is-small">
        <select v-model="currentMonth">
          <option v-for="(month, idx) in months" :value="idx" :key="idx">
            {{ month }}
          </option>
        </select>
      </div>
      <div class="select is-small">
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
        <div
            v-for="(date, idx) in dates"
            class="calendar__date"
            :key="idx"
            @drop="onDropTask($event, getDateTime(date))"
            @dragover.prevent
            @dragenter.prevent
        >
          {{ date }}
          <DateItem v-if="date" :tasks="tasks" :date-time="getDateTime(date)" @start-drag-task="startDragTask" is-small />
        </div>
      </div>
    </section>
    <section class="tasks box ml-2" @drop="onDropTask($event)" @dragover.prevent @dragenter.prevent>
      <div class="is-flex">
        <input class="input is-info is-small mr-1" type="text" placeholder="Текст" v-model="newTaskText" />
        <button class="button is-info mb-3 is-small" @click="clickAddTask" :disabled="!newTaskText">Добавить</button>
      </div>

      <DateItem :tasks="tasks" @delete-task="deleteTask" @start-drag-task="startDragTask" />
    </section>
  </main>
</template>

<style lang="scss">
@import 'bulma/css/bulma.css';

.calendar {
  width: 1000px;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

.calendar_rows {
  grid-auto-rows: 150px;
}

.calendar__date {
  overflow: hidden;
  overflow-y: auto;
  border: 1px solid lightgrey;
  padding: 2px;
}

.tasks {
  width: 400px;
  word-break: break-all;
}
</style>
