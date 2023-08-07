<template>
  <v-flex class="summary-card">
    <v-flex d-flex px-2 py-3>
      <v-icon>{{ icon }}</v-icon>
      <h2>{{ title }}</h2>
    </v-flex>
    <v-flex d-flex flex-row-reverse mr-3>
      <h3>{{ value | formatedThousand }}</h3>
    </v-flex>
  </v-flex>  
</template>

<script>
export default {
  name: 'SummaryCard',
  props: {
    title: { type: String, required: true },
    value: { type: Number, required: true },
    icon: { type: String, required: true }
  },

  filters: {
    formatedThousand(value) {
      return value.toLocaleString({
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }) || 0;
    }
  }

}
</script>

<style lang="scss" scoped>
.summary-card {
  border-left: 2px solid $primary-color;
  min-width: 150px;
  max-width: 200px;
  max-height: 150px;
  margin: 16px;
  background-color: $card-background;
}

</style>