<script setup>
import { ref, reactive } from 'vue'
import Task from '@/models/Task.js'
import ToDoDetail from '@/components/todo/ToDoDetail.vue'
import ButtonTooltip from '@/components/system/ButtonTooltip.vue'

const props = defineProps({
  todoList: { type: Array, default: [] },
  isEditing: { type: Boolean, default: false }
})

const emit = defineEmits(['editTask'])

let openDialog = ref(false)
let task = reactive(new Task())

const showDetail = (item) => {
  Object.assign(task, item)
  openDialog.value = true
}

const deleteTodo = (id) => {
  let index = props.todoList.findIndex(t => t.id == id);
  if (index == -1) return;
  props.todoList.splice(index, 1);
}

</script>

<template>
  <div class="d-flex justify-center py-2">
    <h3>{{ !!todoList.length ? `You're so busy!!!` : 'Nothing to do!' }}</h3>
  </div>

  <div class="d-flex flex-column card-list">

    <div class="d-flex flex-column pb-2">
      <v-card 
        class="mb-2 bg-secondary-background d-flex"
        :class="item.priority ? 'task-priority' : item.done ? 'task-done' : 'task-undone'" 
        v-for="(item, index) in todoList"
        :key="index"
      >
        <v-card-text class="d-flex">
          <div class="d-flex w-100 align-center">
            <span>{{ item.title }}</span>
          </div>

          <div class="d-flex">
            <div class="d-flex">
              <ButtonTooltip
                tooltip="Edit"
                icon="mdi-pencil"
                :callback="() => $emit('editTask', item)"
                :disabled="props.isEditing"
              />
            </div>

            <div class="d-flex px-2">
              <ButtonTooltip
                tooltip="Delete"
                icon="mdi-delete"
                :callback="() => deleteTodo(item.id)"
                :disabled="props.isEditing"
              />
            </div>

            <div class="d-flex">
              <ButtonTooltip
                :tooltip="item.done ? 'Undone' : 'Done'"
                :icon="item.done ? 'mdi-check' : 'mdi-timer-alert-outline'"
                :callback="() => item.updateDone()"
                :colorIcon="item.done ? 'primary' : 'red'"
                :disabled="props.isEditing"
              />
            </div>

            <div class="d-flex pl-2">
              <ButtonTooltip
                id="btn-detail"
                tooltip="Detail"
                icon="mdi-eye"
                :callback="() => showDetail(item)"
                :disabled="props.isEditing"
              />
            </div>
          </div>
        </v-card-text>
      </v-card>
    </div>
  </div>

  <ToDoDetail v-model="openDialog" :task="task"/>
</template>

<style scoped>

.task-done {
  border-left: 5px solid green
}
.task-undone {
  border-left: 5px solid #B76BEF
}
.task-priority {
  border-left: 5px solid red
}

.card-list {
  max-height: calc(100dvh - 460px);
  overflow-y: auto;
  padding-right: 3px;
}

::-webkit-scrollbar {
  width: 5px;
}

::-webkit-scrollbar-track {
  background: #1b1b24; 
}
 
::-webkit-scrollbar-thumb {
  background: #888; 
}

::-webkit-scrollbar-thumb:hover {
  background: #555; 
}
</style>