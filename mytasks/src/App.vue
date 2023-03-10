<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center text--">
        <h1>
          <span>TO</span>
          <span class="font-weight-light">DO</span>
          <span style="font-size: .8rem"><s>DONE</s></span>
        </h1>

      </div>

      <v-spacer></v-spacer>
      <v-flex>
        <v-btn
          class="mr-3"
          text
          :outlined="this.$route.name == 'home' "
          @click="() => this.$router.push({ name: 'home' })"
        >Homer</v-btn>
        <v-btn
          class="ml-3"
          text
          :outlined="this.$route.name == 'market' "
          @click="() => this.$router.push({ name: 'market' })"
        >Market</v-btn>
      </v-flex>
      <v-spacer></v-spacer>

      <v-btn
        text
        outlined
        @click="showDialog = true"
      >
        <span class="mr-2">Log in</span>
        <v-icon>mdi-login</v-icon>
      </v-btn>

    </v-app-bar>

    <v-dialog
        v-model="showDialog"
        activator="parent"
        width="auto"
      >
        <v-card>
          <v-card-title>
            Test
          </v-card-title>
          <v-card-text>
            <v-flex class="d-flex flex-column">
              <span>Full screen: {{ fullScreen() }}</span>
              <span>Screen avaliable: {{ screenAvaliable() }}</span>
            </v-flex>

          </v-card-text>
          <v-card-actions class="d-flex justify-center">
            <v-btn color="primary" @click="showDialog = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    showDialog: false
  }),

  methods: {
    fullScreen(){
      return `${window.screen.width} x ${window.screen.height}`;
    },

    screenAvaliable(){
      return `${window.innerWidth} x ${window.innerHeight}`
    },
  },
};
</script>

<style scoped>
.back-white {
  background-color: white !important;
}

</style>
