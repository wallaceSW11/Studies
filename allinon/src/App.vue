<script setup>
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import ThemeSwitch from './components/ThemeSwitch.vue';

let drawer = ref(false);

</script>

<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
    <theme-switch />
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title><b>All</b> <i>in</i> ONE</v-toolbar-title>

      <v-spacer></v-spacer>
      

    </v-app-bar>

    <v-main id="main-view">
      <RouterView />
    </v-main>
  </v-app>


</template>

<style scoped>

</style>
