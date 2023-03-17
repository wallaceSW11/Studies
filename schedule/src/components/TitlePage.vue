<template>
  <v-flex>
    <h3>{{ title }}</h3>
    <hr />
  </v-flex>
</template>

<script>
export default {
  props: {
    title: { type: String, required: true },
  },

}
</script>

<style>

</style>