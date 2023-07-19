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

  created () {
    console.log('d', this.price);;
  },

  watch: {
    // price(value) {
    //   //value = value && value.replace('.', '').replace(',', '.') || 0;
    //   console.log('valuee', value);
    //   //this.setPrice(value);
    // },

    internPrice(value) {
      console.log('intern', value);

      value = Number(value && value.replace('.', '').replace(',', '.')) || 0
      console.log('value:', value);
      this.$emit('onChange', value);
    }
  },

  methods: {
    // setPrice(value) {
    //   this.$refs.myinput.$el.getElementsByTagName('input')[0].value = value;
    //   this.internPrice = value;
    //   this.$emit('onChange', this.internPrice);
    // },

    // forceBlur(){
    //   this.$refs.productInput.blur();
    // }
  },
  
}
</script>
<style lang="">
  
</style>