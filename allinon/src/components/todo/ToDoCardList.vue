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

</script>

<template>
  <div class="d-flex flex-column pt-2">
    <div class="d-flex justify-center py-2">
      <h2>{{ !!todoList.length ? `You're so busy!!!` : 'Nothing to do!' }}</h2>
    </div>

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
                :callback="() => {}"
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

</style>