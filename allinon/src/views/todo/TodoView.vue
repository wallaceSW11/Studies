<script setup>
import { ref } from "vue";

let title = ref('');
let description =ref('');
let focused = ref(false);
let priority = ref(false)

</script>

<template>
  <v-container>
    <v-layout class="justify-center">
      <div class="d-flex flex-column w-50 bg-surface" style="border: 1px solid black">
        <div class="d-flex justify-center">
          <h1>TO-DO List</h1>
        </div>

        <div class="d-flex flex-column justify-center px-2">
          <div class="d-flex justify-center">
            <v-text-field 
              label="What I need TO DO..." 
              color="primary"
              v-model="title"
              @update:focused="value => focused = value"
            >
            <template v-slot:prepend>
              <v-icon
                :color="focused ? 'primary' : undefined"
                icon="mdi-calendar-check-outline"
              />
            </template>
          </v-text-field>
          </div>
  
          <div class="d-flex justify-center">
            <v-textarea
              label="Tell me more about that (optional)"
              rows="2"
              no-resize
              variant="underlined"
              v-model="description"
            >
            <template v-slot:prepend>
              <v-icon
                :color="focused ? 'primary' : undefined"
                icon="mdi-details"
              />
            </template>
  
            </v-textarea>
          </div>

          <div class="d-flex justify-space-between pb-4">
            <div class="d-flex">
              <v-checkbox 
                label="Priority?" 
                v-model="priority" 
                color="primary" 
                hide-details=""
              >
              </v-checkbox>
            </div>
  
            <div class="d-flex pt-4">
              <v-btn color="primary" @click="() => {}">
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


            <div class="d-flex flex-column pb-2">
              <v-card class="pb-2">
                <div class="d-flex">
                  Wash the car
                </div>
              </v-card>

            </div>

          </div>

        </div>
      </div>
    </v-layout>
    
  </v-container>
</template>

<script scoped>
</script>