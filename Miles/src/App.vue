<template>
  <v-app>
    <v-app-bar fixed dark>
      <v-flex xs12 d-flex align-center>
        <v-flex>
          <v-app-bar-title>
            <v-flex>
              <span><b style="color: #fb8c00">My</b> Miles</span><v-icon color="primary" class="pl-1">mdi-airplane</v-icon>
            </v-flex>
          </v-app-bar-title>
        </v-flex>

        <v-flex v-if="!mobileSize" class="d-flex flex-grow-0">
          <v-btn small outlined dark to="/">Dashboard</v-btn>
          <v-btn class="mx-4" small outlined dark to="/points">Points</v-btn>
          <v-btn small outlined dark to="/miles">Miles</v-btn>
        </v-flex>

        <v-flex v-if="!mobileSize" d-flex flex-row-reverse>
          <v-avatar color="primary" size="34">
            <v-icon dark >
              mdi-account-circle
            </v-icon>
          </v-avatar>
        </v-flex>

        <v-flex v-if="mobileSize" class="d-flex flex-grow-0">
          <v-btn icon @click="() => menuMobile = !menuMobile"><v-icon large>mdi-menu</v-icon></v-btn>
        </v-flex>
      </v-flex>
    </v-app-bar>

    <v-navigation-drawer
      v-model="menuMobile"
      app
    >
      <v-container d-flex flex-column>
        <v-flex xs12 d-flex justify-center pa-5>
          <v-avatar color="primary">
            <v-icon dark >
              mdi-account-circle
            </v-icon>
          </v-avatar>
        </v-flex>

        <v-flex xs12 d-flex flex-column>
          <v-btn small outlined dark to="/">Dashboard</v-btn>
          <v-btn class="my-4" small outlined dark to="/points">Points</v-btn>
          <v-btn small outlined dark to="/miles">Miles</v-btn>

        </v-flex>

      </v-container>
    </v-navigation-drawer>

    

    <v-main>
      <router-view class="content" style="margin-top: 60px"/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    menuMobile: true,
  }),

  computed: {
    mobileSize() {
      return this.$vuetify.breakpoint.xsOnly;
    }
  },
};
</script>

<style lang="scss">
.content {
  --background-color: #333;
  color: #fff;
  min-height: calc(100vh - 60px);
}

html { overflow-y: auto }

.label-left {
  left: 0px !important;
  transform-origin: top left !important;
}

.primary-color {
  color: $primary_color;
}

::v-deep .v-icon {
  color: $primary-color;
}

</style>
