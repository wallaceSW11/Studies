<script setup>
import { reactive, ref, toRaw } from "vue";
import Task from "@/models/Task.js";

let task = reactive(new Task());

let taskInDetail = reactive(new Task());
let tasks = reactive([]);

let isEditing = ref(false);

// temporary
//tasks.push(new Task({ title: 'study vue3', description: 'using vite and vuetify' }));


const saveTask = () => {
  // if (!task.valid()) return;

  if (isEditing.value) {
    let index = tasks.findIndex(t => t.id == task.id);
    tasks.splice(index, 1, task);
    task = reactive(new Task());
    return;
  }

  tasks.push(new Task(task));
  task = reactive(new Task());
}

const editTask = (item) => {
  let outro = toRaw(item);
  console.log('outro:', outro.id);

  task = new Task(outro);

  
  
  isEditing.value = true;
}

let openDialog = ref(false);

const showDetail = (item) => {
  console.log('aqui');
  taskInDetail = new Task(item);
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
                <v-icon>mdi-plus</v-icon>
                Add
              </v-btn>
            </div>
          </div>

          <hr />

          <div class="d-flex flex-column pt-2">
            <div class="d-flex justify-center py-2">
              <h2>{{ !!tasks.length ? `You're so busy!!!` : 'Nothing to do!' }}</h2>
            </div>

            <div class="d-flex flex-column pb-2">
              <v-card class="mb-2 bg-secondary-background d-flex" v-for="(item, index) in tasks" :key="index">
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
                          <v-icon v-bind="props" @click="toggleDone(item)">{{ item.done ? 'mdi-timer-alert-outline' :
                            'mdi-check' }}</v-icon>
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
        <span>{{ taskInDetail.title }}</span>
      </v-card-title>

      <v-card-text>
        <v-row>
          <v-col cols="10">
            <span>Created at: {{ taskInDetail.createdAt }}</span>
          </v-col>
          <v-col cols="2">
            <span>{{ taskInDetail.priority }}</span>
          </v-col>
          <v-col cols="12">
            <span>{{ taskInDetail.description }}</span>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions class="d-flex justify-end">
        <v-btn @click="openDialog = false" variant="outlined" color="secondary">
          Close
        </v-btn>
      </v-card-actions>
    </v-card>

  </v-dialog>
</template>

<script scoped>
</script>