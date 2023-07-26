<template lang="">
  <div>
    <v-text-field
      ref="myinput"
      id="feield-price"
      v-model.lazy="internPrice"
      :label="label"
      v-money="{
        decimal: '',
        thousands: '.',
        precision: 0
      }"
      class="label-left"
      reverse
      type="tel"
      :append-icon="icon"
      @change="updateValue"
    >

    </v-text-field>
  </div>
</template>
<script>
export default {
  name: 'NumberField',
  model: {
    prop: 'price',
    event: 'onChange'
  },

  props: {
    price: { type: Number, required: true },
    label: { type: String, required: true },
    icon: { type: String, required: true }
  },

  data() {
    return {
      internPrice: undefined
    }
  },

  watch: {
    price(value) {
      this.$refs.myinput.$el.getElementsByTagName('input')[0].value = value*100;
      this.internPrice = value;
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
<style lang="">

</style>