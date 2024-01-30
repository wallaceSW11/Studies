<script setup>

const props = defineProps({
  task: { type: Object, required: true }
})

const openDialog = defineModel(false)
</script>

<template>
  <v-dialog v-model="openDialog" width="50%">
    <v-card class="pa-3">
      <v-card-title>
        <v-icon :color="props.task.priority ? 'red' : 'green'">mdi-flag</v-icon>
        <span>{{ props.task.title }}</span>
      </v-card-title>

      <v-card-text style="min-height: 120px" class="d-flex flex-column justify-space-between">
        <div class="d-flex">
          <span>{{ props.task.description || '-no description' }}</span>
        </div>

        <div class="d-flex justify-space-between align-baseline">
            <span class="text-small">Created At: {{ props.task.createdAt }}</span>
            <span :style="props.task.doneAt ? 'color: green font-weight: bold' : ''">
              {{ props.task.doneAt ? `Done at: ${props.task.doneAt}` : 'Pending...' }}
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
</style>