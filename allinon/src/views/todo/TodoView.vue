<script setup>
import { reactive, ref, watch } from "vue";
import Task from "@/models/Task.js";

let task = reactive(new Task());
let taskInDetail = reactive({});
let tasks = reactive([]);
let isEditing = ref(false);

const clearTask = (task) => {
  Object.assign(task, new Task())
}

const toggleDone = (item) => {
  item.updateDone();
}

let titleRequired = ref('');

const saveTask = () => {
  if (!task.valid()) {
    titleRequired.value = 'Required';
    return;
  }

  if (isEditing.value) {
    let index = tasks.findIndex(t => t.id == task.id);
    tasks.splice(index, 1, new Task(task));
    clearTask(task);
    isEditing.value = false;
    return;
  }

  tasks.push(new Task(task));
  clearTask(task);
}

const editTask = (item) => {
  Object.assign(task, item);
  isEditing.value = true;
}


watch(() => task.title, () => {
  titleRequired.value = undefined;
})

let openDialog = ref(false);

const showDetail = (item) => {
  Object.assign(taskInDetail, item);
  openDialog.value = true;
}
</script>

<template>
  <v-container>
    <v-layout class="justify-center">
      <v-col cols="12" sm="8" md="6" class="d-flex flex-column bg-surface" style="border: 1px solid black">
        <div class="d-flex justify-center">
          <h1>TO-<i>DO</i> <s>List</s></h1>
        </div>

        <div class="d-flex flex-column justify-center px-2">
          <div class="d-flex justify-center">
            <v-text-field
              label="What I need TO DO..."
              color="primary"
              v-model="task.title"
              prepend-inner-icon="mdi-calendar-check-outline"
              maxlength="50"
              counter
              :error-messages="titleRequired"
            ></v-text-field>
          </div>

          <div class="d-flex justify-center">
            <v-textarea
              label="Tell me more about that (optional)"
              rows="2"
              no-resize
              color="primary"
              v-model="task.description"
              prepend-inner-icon="mdi-details"
              maxlength="300"
              counter
            ></v-textarea>
          </div>

          <div class="d-flex justify-space-between pb-4">
            <div class="d-flex">
              <v-checkbox
                label="Priority?"
                v-model="task.priority"
                color="primary"
                hide-details
              >
              </v-checkbox>
            </div>

            <div class="d-flex pt-4">
              <v-btn color="primary" @click="saveTask">
                <v-icon>{{ isEditing ? 'mdi-check' : 'mdi-plus' }}</v-icon>
                {{ isEditing ? 'Save' : 'Add' }}
              </v-btn>
            </div>
          </div>

          <hr />

          <div class="d-flex flex-column pt-2">
            <div class="d-flex justify-center py-2">
              <h2>{{ !!tasks.length ? `You're so busy!!!` : 'Nothing to do!' }}</h2>
            </div>

            <div class="d-flex flex-column pb-2">
              <v-card 
                class="mb-2 bg-secondary-background d-flex"
                :class="item.priority ? 'task-priority' : item.done ? 'task-done' : 'task-undone' "
                v-for="(item, index) in tasks" 
                :key="index"
              >
                <v-card-text class="d-flex">
                  <div class="d-flex w-100">
                    <span>{{ item.title }}</span>
                  </div>
                  <div class="d-flex">
                    <div class="d-flex">
                      <v-tooltip text="Edit" location="top">
                        <template #activator="{ props }">
                          <v-icon v-bind="props" @click="editTask(item)">mdi-pencil</v-icon>
                        </template>
                      </v-tooltip>
                    </div>

                    <div class="d-flex px-2">
                      <v-tooltip text="Delete" location="top">
                        <template #activator="{ props }">
                          <v-icon v-bind="props" @click="deleteTask(item)" class="px-2">mdi-delete</v-icon>
                        </template>
                      </v-tooltip>
                    </div>

                    <div class="d-flex">
                      <v-tooltip :text="item.done ? 'Undone' : 'Done'" location="top">
                        <template #activator="{ props }">
                          <v-icon 
                            v-bind="props" 
                            @click="toggleDone(item)"
                            :color="item.done ? 'primary' : 'red'"
                          >
                            {{ item.done ? 'mdi-check' : 'mdi-timer-alert-outline' }}
                          </v-icon>
                        </template>
                      </v-tooltip>

                    </div>

                    <div class="d-flex pl-2">
                      <v-tooltip text="Detail" location="top">
                        <template #activator="{ props }">
                          <v-icon v-bind="props" @click="showDetail(item)">mdi-eye</v-icon>
                        </template>
                      </v-tooltip>
                    </div>
                  </div>
                </v-card-text>
              </v-card>

            </div>

          </div>

        </div>
      </v-col>
    </v-layout>

  </v-container>

  <v-dialog v-model="openDialog" width="50%">
    <v-card class="pa-3">
      <v-card-title>
        <v-icon :color="taskInDetail.priority ? 'red' : 'green'">mdi-flag</v-icon>
        <span>{{ taskInDetail.title }}</span>
      </v-card-title>

      <v-card-text style="min-height: 120px;" class="d-flex flex-column justify-space-between">
        <div class="d-flex">
          <span>{{ taskInDetail.description || '-no description' }}</span>
        </div>

        <div class="d-flex justify-space-between align-baseline">
            <span class="text-small">Created At: {{ taskInDetail.createdAt }}</span>
            <span :style="taskInDetail.doneAt ? 'color: green; font-weight: bold' : ''">
              {{ taskInDetail.doneAt ? `Done at: ${taskInDetail.doneAt}` : 'Pending...' }}
            </span>
        </div>
      </v-card-text>
      <v-card-actions class="d-flex justify-end">
        <v-btn @click="openDialog = false" variant="outlined" color="secondary">
          Close
        </v-btn>
      </v-card-actions>
    </v-card>

  </v-dialog>
</template>

<style scoped>
.text-small {
  font-size: .8rem;
  color: lightblue;
}

:deep(.v-row) {
  margin: 0;
}

:deep(.v-col) {
  padding: 0;
}

:deep(.v-messages) {
  text-align: right;
}

.task-done {
  border-left: 5px solid green;
}
.task-undone {
  border-left: 5px solid #B76BEF;
}
.task-priority {
  border-left: 5px solid red;
}

</style>