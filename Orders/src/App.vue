<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
     <side-bar-data />
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Turqueza Ateliê Criativo </v-toolbar-title>
    </v-app-bar>

    <v-main>
     <router-view />
    </v-main>
  </v-app>
</template>

<script>
import SideBarData from '@/components/SideBarData.vue';

  export default {
    components: {
      SideBarData,
    },
    data: () => ({ drawer: null }),


  }
</script>