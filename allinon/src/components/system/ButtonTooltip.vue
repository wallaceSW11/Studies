<script setup>
const properties = defineProps({
  tooltip: { type: String, required: true },
  icon: { type: String, required: true },
  colorIcon: { type: String, default: 'primary' },
  callback: { type: Function, default: () => {} },
  disabled: { type: Boolean, default: false }
})
</script>

<template>
  <v-tooltip location="top">
    <template #activator="{ props }">
      <v-btn 
        density="default" 
        variant="text" 
        :icon="properties.icon" 
        v-bind="props"
        @click="properties.callback"
        :disabled="disabled"
      ></v-btn>
    </template>
    <span>{{ properties.tooltip }}</span>
  </v-tooltip>
</template>