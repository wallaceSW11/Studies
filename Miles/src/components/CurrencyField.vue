<template lang="">
  <div>
    <v-text-field
      ref="myinput"
      id="feield-price"
      v-model.lazy="internPrice"
      :label="label"
      v-money="{
        decimal: ',',
        thousands: '.',
        precision: 2
      }"
      class="label-left"
      reverse
      type="tel"
      append-icon="mdi-currency-usd"
    >

    </v-text-field>
  </div>
</template>
<script>
export default {
  model: {
    prop: 'price',
    event: 'onChange'
  },

  props: {
    price: { type: Number, required: true },
    label: { type: String, required: true }
  },

  data() {
    return {
      internPrice: undefined
    }
  },

  watch: {
    internPrice(value) {
      value = Number(value && value.replace('.', '').replace(',', '.')) || 0
      this.$emit('onChange', value);
    }
  }
}
</script>
<style lang="">

</style>