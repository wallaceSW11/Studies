<script setup>
import { reactive, ref, watch } from "vue"
import Task from "@/models/Task.js"
import Header from "@/components/todo/Header.vue"
import ToDoForm from "@/components/todo/ToDoForm.vue"
import ToDoCardList from "@/components/todo/ToDoCardList.vue"
import storageAPI from "@/services/api/storageAPI"

const STORAGE_KEY_TASKS = 'tasks';

let tasks = reactive([])
let task = reactive(new Task())
let isEditing = ref(false)

const editTask = (item) => {
  Object.assign(task, item)
  isEditing.value = true
}

let storage = storageAPI.get(STORAGE_KEY_TASKS)

if (!!storage) {
  Object.assign(tasks, new Task(storage))
}

watch(tasks, () => {
  storageAPI.save(STORAGE_KEY_TASKS, tasks);
})

</script>

<template>
  <v-container>
    <v-layout class="justify-center">
      <v-col cols="12" sm="8" md="6" class="d-flex flex-column bg-surface border-opacity-100 dinamic-height">
        <Header />

        <ToDoForm
          v-model="task"
          :todoList="tasks"
          :isEditing="isEditing"
          @editing="value => isEditing = value"
          @toggleDone="item => toggleDone(item)"
        />

        <div class="card-lis">
          <ToDoCardList
            :todoList="tasks"
            :isEditing="isEditing"
            @editTask="item => editTask(item)"
          />
        </div>
      </v-col>
    </v-layout>
  </v-container>
</template>

<style scoped>
:deep(.v-row) {
  margin: 0;
}

:deep(.v-col) {
  padding: 0;
}

:deep(.v-messages) {
  text-align: right;
}

.dinamic-height {
  border: 1px solid black;
  height: calc(100dvh - 100px);
}

</style>