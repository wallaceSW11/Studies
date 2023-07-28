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
      @change="updateValue"
    >

    </v-text-field>
  </div>
</template>
<script>
export default {
  name: 'CurrencyField',
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
    price(value) {
      this.$refs.myinput.$el.getElementsByTagName('input')[0].value = value.toFixed(2);
      this.internPrice = value.toFixed(2);
    }
  },

  methods: {
    updateValue(value) {
      value = Number(value && String(value).replace('.', '').replace(',', '.')) || 0
      this.$emit('onChange', value);
    }
  },
}
</script>
<style lang="" scoped>

</style>