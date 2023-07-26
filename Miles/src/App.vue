<template>
  <v-app>
    <v-app-bar app dark>
      <v-flex xs12 d-flex align-center>
        <v-flex>
          <v-app-bar-title>
          <span><b style="color: #fb8c00">My</b> Miles</span> <v-icon color="primary">mdi-airplane</v-icon>
          </v-app-bar-title>
        </v-flex>

        <v-flex v-if="!mobileSize" class="d-flex flex-grow-0">
          <v-btn small outlined dark to="/">Dashboard</v-btn>
          <v-btn class="mx-4" small outlined dark to="/points">Points</v-btn>
          <v-btn small outlined dark to="/miles">Miles</v-btn>
        </v-flex>

        <v-flex v-if="!mobileSize" d-flex flex-row-reverse>
          <v-avatar color="primary">
            <v-icon dark>
              mdi-account-circle
            </v-icon>
          </v-avatar>
        </v-flex>

        <v-flex v-if="mobileSize" class="d-flex flex-grow-0" style="border: 1px solid black">
          <v-btn icon><v-icon large>mdi-menu</v-icon></v-btn>
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

  computed: {
    mobileSize() {
      return this.$vuetify.breakpoint.xsOnly;
    }
  },
};
</script>

<style>
.content {
  --background-color: #333;
  color: #fff;
  min-height: calc(100vh - 56px);
}
</style>
