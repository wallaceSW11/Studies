<template>
  <v-flex d-flex flex-column class="summary-card">
    <v-flex>
      <v-flex d-flex justify-center pa-2 v-if="!!image">
        <img :src="image" :alt="title" srcset="">
      </v-flex>
      <v-flex d-flex justify-center v-else>
        <h2>{{ title }}</h2>
      </v-flex>
    </v-flex>

    <v-flex d-flex justify-center>
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
    image: { type: String, required: true, default: '' }
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
  width: 200px;
  max-width: 200px;
  max-height: 150px;
  margin: 16px;
  background-color: $card-background;
}

img {
  max-height: 42px;
}

@media only screen and (max-width: 400px) {
  .summary-card {
    max-width: 100%;
  }
}

</style>