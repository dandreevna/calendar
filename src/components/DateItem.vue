<script setup>
import { computed } from 'vue'

const props = defineProps({
  dateTime: {
    type: String,
    default: '',
  },
  tasks: {
    type: Array,
    default: () => [],
  },
  isSmall: {
    type: Boolean,
    default: false,
  },
})
const emits = defineEmits(['deleteTask', 'startDragTask'])

const TasksAllocated = computed(() => props.tasks.filter(t => t.dateTime === props.dateTime))
</script>

<template>
  <div v-if="TasksAllocated.length" class="date">
    <article
        class="message is-small"
        :class="{ 'message_small': isSmall }"
        v-for="task in TasksAllocated"
        :key="task.id"
        draggable="true"
        @dragstart="emits('startDragTask', $event, task)"
    >
      <div class="message-body" :class="{ 'message-body_small': isSmall }">
        {{ task.text }}
        <div v-if="!isSmall" class="task__delete has-text-grey-light" @click="emits('deleteTask', task.id)">Удалить</div>
      </div>
    </article>
  </div>
</template>

<style scoped>
.message-body_small {
  padding: 2px 3px;
}
.message_small:not(:last-child) {
  margin-bottom: 3px;
}

.task__delete {
  text-align: right;
  cursor: pointer;
}
</style>