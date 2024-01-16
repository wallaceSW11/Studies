<script setup>
import { reactive, ref } from "vue";
import Task from "@/models/Task.js";

let task = reactive(new Task());
let tasks = reactive([]);

let isEditing = ref(false);

// temporary
tasks.push(new Task({title: 'study vue3', description: 'using vite and vuetify'}));


const saveTask = () => {
  // if (!task.valid()) return;

  // if (isEditing) {
  //   /// save
  //   // return
  // }

  tasks.push(new Task(task));
  task = new Task();



}

const editTask = (item) => {
  task = new Task(item);
  isEditing = true;
}



</script>

<template>
  <v-container>
    <v-layout class="justify-center">
      <v-col cols="12" sm="8" md="6" class="d-flex flex-column bg-surface" style="border: 1px solid black">
        <div class="d-flex justify-center">
          <h1>TO-DO List</h1>
        </div>

        <div class="d-flex flex-column justify-center px-2">
          <div class="d-flex justify-center">
            <v-text-field 
              label="What I need TO DO..." 
              color="primary"
              v-model="task.title"
              prepend-inner-icon="mdi-calendar-check-outline"
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
            ></v-textarea>
          </div>

          <div class="d-flex justify-space-between pb-4">
            <div class="d-flex">
              <v-checkbox 
                label="Priority?" 
                v-model="task.priority" 
                color="primary" 
                hide-details=""
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

          <hr/>

          <div class="d-flex flex-column pt-2">
            <div class="d-flex justify-center">
              <h2>List</h2>
            </div>

            <div class="d-flex justify-center" v-if="!tasks.length">
              <h3>Nothing to do!</h3>
            </div>


            <div v-else class="d-flex flex-column pb-2">
              <v-card class="mb-2 bg-secondary-background d-flex" v-for="(item, index) in tasks" :key="index">
                <v-card-text class="d-flex">
                  <div class="d-flex">
                    <span>{{ item.title }}</span>
                  </div>
                  <div class="d-flex flex-grow-0">
                    <div class="d-flex flex-grow-0 justify-space-between align-center">
                      <v-tooltip text="Edit" location="top">
                        <template v-slot:activator="{ props }" >
                          <v-icon v-bind="props" @click="editTask(item)">mdi-pencil</v-icon>
                        </template>
                      </v-tooltip>
                      <v-tooltip text="Delete" location="top">
                        <template v-slot:activator="{ props }" >
                          <v-icon v-bind="props" @click="deleteTask(item)" class="py-2">mdi-delete</v-icon>
                        </template>
                      </v-tooltip>
                      <v-tooltip :text="item.done ? 'undone' : 'done'" location="top">
                        <template v-slot:activator="{ props }" >
                          <v-icon v-bind="props" @click="toggleDone(item)">{{ item.done ? 'mdi-timer-alert-outline' : 'mdi-check' }}</v-icon>
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

  <v-dialog
    v-model="showDialog"
  >
    <v-card>
      <v-card-title>
        <span>{{ task.title }}</span>
      </v-card-title>

      <v-card-text>
        <v-textarea >

        </v-textarea>
      </v-card-text>
    </v-card>

  </v-dialog>
</template>

<script scoped>
</script>