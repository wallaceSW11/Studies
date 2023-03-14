<template>
  <v-app>
    <v-navigation-drawer
      v-model="sideMenu"
      app
    >
      <v-flex class="d-flex justify-center align-items ma-3">
        <v-avatar
        class="mb-4"
        color="grey darken-1"
        size="64"
        ></v-avatar>
      </v-flex>

      <v-flex class="d-flex justify-center align-items mb-3">
        <v-btn
          text
          outlined
          @click="showDialog = true"
        >
          <span class="mr-2">Log in</span>
          <v-icon>mdi-login</v-icon>
        </v-btn>
      </v-flex>

      <v-divider></v-divider>

      <v-list>
        <v-list-item
          v-for="(item, index) in menuList"
          :key="index"
          link
          @click="$router.push({ path: item.router })"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item-content>

        </v-list-item>
      </v-list>




    </v-navigation-drawer>


    <v-app-bar
      app
      color="primary"
      dark
      class="opa"
    >

    <v-flex v-if="$vuetify.breakpoint.xsOnly">
      <v-btn
        icon
        text
        @click="() => sideMenu = !sideMenu"
      > <v-icon>mdi-menu</v-icon>

      </v-btn>
    </v-flex>
      <div class="d-flex align-center text--">
        <h1 v-if="this.$route.name == 'home' ">
          <span>TO</span>
          <span class="font-weight-light">DO</span>
        </h1>

        <h1 v-else>
          <span>MAR</span>
          <span class="font-weight-light">ket</span>
        </h1>

      </div>

      <v-spacer></v-spacer>
      <v-flex v-if="$vuetify.breakpoint.smAndUp">
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
        v-if="$vuetify.breakpoint.smAndUp"
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
    showDialog: false,
    sideMenu: false,
    menuList: [
      {
        icon: 'mdi-check',
        text: 'Todo-list',
        router: '/'
      },
      {
        icon: 'mdi-shopping',
        text: 'Market',
        router: '/market'
      },
    ]
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

.opa {
  margin-left: 0;
  padding-left: 0;
}
</style>
