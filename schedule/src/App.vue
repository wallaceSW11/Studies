<template>
  <v-app>
    <v-app-bar app color="primary" dark clipped-left>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title><strong>SCHE</strong>dule</v-toolbar-title>

      <v-spacer></v-spacer>
      
      <v-btn
        append-icon="mdi-plus"
        text
        outlined
      >
      Login
      <v-icon class="pl-3">mdi-login</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer 
      app
      absolute 
      clipped
      :mobile-breakpoint="0"
      :mini-variant="drawer"
    >
      <v-list nav>
        <v-list-item v-for="item in items" :key="item.title" link :to="item.route">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main> <router-view></router-view></v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    drawer: true,
    items: [
          // { title: 'Schedule', icon: 'mdi-clock-time-five-outline', route: '/' },
          { title: 'Schedule2', icon: 'mdi-clock-time-five-outline', route: '/' },
          { title: 'Patients', icon: 'mdi-account', route: '/patients'  },
          { title: 'Setup', icon: 'mdi-cog', route: '/setup'  },
        ]
  }),
};
</script>

<style lang="scss">
i.v-icon.v-icon {
  color: #1864b1;
}

.nav-margin-left {
  margin-left: 64px;
}
</style>