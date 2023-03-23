<template>
  <v-text-field
    id="field-price"
    prepend-inner-icon="mdi-currency-usd"
    label="Price"
    type="tel"
    v-model="price"
    :error-messages="requiredPrice"   
    @keyup="onKeyUp($event)"
    placeholder="0,00"
    persistent-placeholder
    max-length="13"
  ></v-text-field>
</template>

<script>
export default {
  name: 'MoneyField',
  data() {
    return {
      requiredPrice: undefined,
      price: undefined,
      priceModel: 0
    }
  },

  methods: {
    onKeyUp() {
      let texto = this.price.split('');
      texto = texto.filter(item => item != ',' && item != '.')
      
      if (texto.length >= 3) {
         texto.splice(texto.length-2, 1, ',' + texto[texto.length-2]);
      }

      if (texto.length >= 6) {
         texto.splice(texto.length-5, 1, '.' + texto[texto.length-5]);
      }

      if (texto.length >= 9) {
         texto.splice(texto.length-8, 1, '.' + texto[texto.length-8]);
      }

      this.price = texto.join('');
    }
  }
}
</script>

<style>

</style>