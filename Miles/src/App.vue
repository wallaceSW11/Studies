<template>
  <v-app>
    <v-app-bar
      app
      dark
    >

    <v-flex d-flex justify-space-between>
      <v-flex>
        <v-app-bar-title>
          <b>My</b> Miles
        </v-app-bar-title>
      </v-flex>
  
      <v-flex xs5 d-flex justify-space-between>
        <v-btn outlined dark to="/">Dashboard</v-btn>
        <v-btn outlined dark to="/points">Points</v-btn>
        <v-btn outlined dark to="/miles">Miles</v-btn>
      </v-flex>
    </v-flex>
      
    </v-app-bar>

    <v-main>
      <router-view class="content"/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>

<style>
.content {
  background-color: #333;
  color: #fff;
  min-height: calc(100vh - 56px);
}
</style>
