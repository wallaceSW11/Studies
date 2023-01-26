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

      <v-btn
        text
        outlined
      >
        <span class="mr-2">Log in</span>
        <v-icon>mdi-login</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view/>
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
