<template>
  <v-container>
    <v-tabs v-model="page">
      <v-tab>Dashboard</v-tab>
      <v-tab>Entries</v-tab>
    </v-tabs>

    <v-tabs-items class="mt-6" v-model="page">
      <v-tab-item>
        dashboard
      </v-tab-item>
      <v-tab-item>
        <registration></registration>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
import Registration from '@/components/miles/Registration.vue'

export default {
  name: 'MilesView',
  components: {
    Registration,
  },
  data() {
    return {
      page: 1
    }
  },
}
</script>

<style>

</style>