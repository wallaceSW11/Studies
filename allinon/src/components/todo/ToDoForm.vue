<script setup>
import { ref, watch, defineModel } from "vue"
import Task from "@/models/Task.js"

const model = defineModel(new Task())
const props = defineProps({
  todoList: { type: Array, default: [] },
  isEditing: { type: Boolean, default: false } 
})
const emit = defineEmits(['editing'])

const clearTask = (task) => {
  Object.assign(task, new Task())
}

let titleRequired = ref('')

const saveTask = () => {
  if (!model.value.valid()) {
    titleRequired.value = 'Required'
    return
  }

  if (props.isEditing) {
    let index = props.todoList.findIndex(t => t.id == model.value.id)
    props.todoList.splice(index, 1, new Task(model.value))
    clearTask(model.value)
    emit('editing', false)
    return
  }

  props.todoList.push(new Task(model.value))
  clearTask(model.value)
}

const cancelTask = () => {
  clearTask(model.value);
  emit('editing', false);
}

watch(() => model.value.title, () => {
  titleRequired.value = undefined
})

</script>

<template>
  <div class="d-flex flex-column justify-center px-2">
    <div class="d-flex justify-center">
      <v-text-field
        label="What I need TO DO..."
        color="primary"
        v-model="model.title"
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
        v-model="model.description"
        prepend-inner-icon="mdi-details"
        maxlength="300"
        counter
      ></v-textarea>
    </div>

    <div class="d-flex justify-space-between pb-4">
      <div class="d-flex">
        <v-checkbox
          label="Priority?"
          v-model="model.priority"
          color="primary"
          hide-details
        >
        </v-checkbox>
      </div>

      <div class="d-flex pt-4">
        <v-btn color="primary" @click="saveTask">
          <v-icon>{{ props.isEditing ? 'mdi-check' : 'mdi-plus' }}</v-icon>
          {{ props.isEditing ? 'Save' : 'Add' }}
        </v-btn>

        <v-btn v-if="props.isEditing" color="secondary" @click="cancelTask" class="ml-2">
          <v-icon color="secondary">mdi-cancel</v-icon>
          cancel
        </v-btn>
      </div>
    </div>
  </div>
</template>