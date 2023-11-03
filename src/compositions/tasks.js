import { ref } from 'vue'

export function useTasks() {
  const tasks = ref([
    {
      date: null,
      time: null,
      text: 'Починить чайник',
      regularly: null,
    },
    {
      date: null,
      time: null,
      text: 'Поставить прививку',
      regularly: null,
    },
    {
      date: null,
      time: null,
      text: 'Фитнес',
      regularly: [1, 4],
    },
  ])

  function addTask({ date = null, time = null, text, regularly = null }) {
    tasks.value.push({ date, time, text, regularly })
    return tasks.value
  }

  function deleteTask(text) {
    tasks.value = tasks.value.filter(t => t.text !== text)
  }

  return {
    tasks,
    addTask,
    deleteTask,
  }
}
