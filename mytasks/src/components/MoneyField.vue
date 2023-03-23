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
  ></v-text-field>
</template>

<script>

import { VueMaskDirective } from 'v-mask'


export default {
  name: 'MoneyField',
  data() {
    return {
      requiredPrice: undefined,
      price: undefined,
      priceModel: 0
    }
  },

  directives: {mask: VueMaskDirective},

  watch: {
    price() {
      //this.price = newValue.length > 2 ? newValue + ',' : newValue;
      // this.price = newValue.toLocaleString('pt-BR', {
      //   style: 'currency',
      //   currency: "BRL"
      // })
    }

    // price(newValue) {
    //   // console.log(this.price, newValue, this.price.length);
      
    //   // if (this.price.length < 6) {
    //   //   this.priceModel = newValue.substring(2, newValue.length);
    //   // }
    // },

    // priceModel(newValue) {
    //   console.log(newValue);
    //   this.price = newValue;
    // }
  },

  methods: {
    onKeyUp() {
      let texto = this.price.split('');

      texto = texto.map(item => item.replace('.', '').replace(',', ''));

      //console.log(texto);
      //console.log(texto.length);

      if (texto.length == 3) {
        texto.splice(texto.length-2, 1, ',' + texto[1]);

        console.log(texto);

      } else if (texto.length > 3) {
        // texto = texto.map(item => item.replace(',', ''));
        texto.splice(texto.length-2, 1, ',' + texto[texto.length-2]);
        console.log(texto);
      }

      if (texto.length == 7) {
        texto.splice(texto.length-6, 1, '.' + texto[texto.length-6]);

        console.log(texto);

      } else if (texto.length > 7) {
        // texto = texto.map(item => item.replace('.', ''));
        texto.splice(texto.length-6, 1, '.' + texto[texto.length-6]);
        console.log(texto);
      }




      this.price = texto.join('');


      // if (this.price.length == 2 ) {
      //   this.price = this.price + ','
      // } else if (this.price.length > 2) {
      //   this.price = this.price.replace(',', '');
      //   this.price = this.price[]
      // }


      //this.price = this.price.length > 1 ? this.price + ',' : this.price;
      //this.price = this.price + ','



      // if (this.price[3] == '0') {
      //   console.log(this.price.split(' '));
      //   console.log(this.price.split(' ').splice(3, 1, key.key));
      //   this.price = this.price.split(' ').splice(3, 1, key.key)
      // }
    },

    // onMouseUp(event) {
    //   let end = event.target.value.length;
    //   event.target.setSelectionRange(end, end);
    //   event.target.focus();
    // }
  },

}
</script>

<style>

</style>