<script setup>
import { computed } from 'vue'
import { useTheme } from 'vuetify'

const theme = useTheme()

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}

const isDark = computed(() => !!theme.global.current.value.dark);

</script>

<template>
  <div>
    <v-btn 
      small
      :variant="isDark ? 'text' : 'outlined'"
      @click="toggleTheme"
    >
      <v-icon :icon="isDark ? 'mdi-white-balance-sunny' : 'mdi-moon-waning-crescent'" />
      <span class="ml-1 text-none">{{ isDark ? 'Light' : 'Dark' }}</span>
    </v-btn>
  </div>
</template>