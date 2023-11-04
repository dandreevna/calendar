import { ref } from 'vue'
import { getRandomId, mergeDeep } from '@/libs'

export function useTasks() {
  const tasks = ref([
    {
      id: '1',
      dateTime: '',
      text: 'Починить чайник',
      regularly: null,
    },
    {
      id: '2',
      dateTime: '',
      text: 'Поставить прививку',
      regularly: null,
    },
    {
      id: '3',
      dateTime: '',
      text: 'Фитнес',
      regularly: [1, 4],
    },
  ])

  function addTask({ dateTime = '', text, regularly = null }) {
    tasks.value.push({ dateTime, text, regularly, id: getRandomId() })
    return tasks.value
  }

  function deleteTask(id) {
    tasks.value = tasks.value.filter(t => t.id !== id)
    return tasks.value
  }

  function updateTask(payload) {
    const task = tasks.value.find(t => t.id === payload.id)
    if (!task) return
    mergeDeep(task, payload)
    return tasks.value
  }

  return {
    tasks,
    addTask,
    deleteTask,
    updateTask,
  }
}
