<template>
  <v-container>
    <v-flex xs12>
      <v-combobox
        prepend-icon="mdi-shopping"
        label="Product"
        :items="productList"
        v-model="selectedProduct"
        :error-messages="requiredProduct"
        clearable
      ></v-combobox>
    </v-flex>

    <v-flex xs12>
      <v-text-field
        prepend-icon="mdi-counter"
        label="Quantity"
        type="tel"
        v-model.number="quantity"
        @focus="$event.target.select()"
        :error-messages="requiredQuantity"
      ></v-text-field>
    </v-flex>
    <v-flex xs12>
      <v-text-field
        prepend-icon="mdi-currency-usd"
        label="Price"
        type="tel"
        v-model="price"
        :error-messages="requiredPrice"
      ></v-text-field>
    </v-flex>

    <v-flex xs12 class="text-right mr-3">
        <h3>Total item</h3>
        <p> {{ totalItem | formatedMoney }}</p>
    </v-flex>

    <v-flex xs12>
      <v-btn
        prepend-icon="mdi-plus"
        color="primary"
        @click="addItem"
        width="100%"
      >Add</v-btn>
    </v-flex>


    <v-flex xs12 mt-3>
      <v-card v-for="(item, index) in products" :key="index" class="d-flex flex-row px-3 my-1 py-1">
          <v-flex xs7>
            <h5>Product</h5>
            <p class="no-space"> {{ item.description }} </p>
          </v-flex>

          <v-flex xs2 class="text-right">
            <h5>Qtt</h5>
            <p class="no-space"> {{ item.quantity }} </p>
          </v-flex>

          <v-flex xs3 class="text-right">
            <h5>Total</h5>
            <p class="no-space"> {{ item.totalItem | formatedMoney }} </p>
          </v-flex>
      </v-card>

    </v-flex>



    <v-footer fixed>
      <v-flex xs12 class="text-right mr-3">
        <h3>Total: <strong> {{ totalAmount | formatedMoney }}</strong></h3>
    </v-flex>
    </v-footer>
  </v-container>
</template>

<script>
export default {

  data() {
    return {
      productList: ['Arroz', 'Feijão', 'Suco'],
      products: [{
        'description': 'Suco',
        'quantity': 10,
        'unitPrice': 0.79,
        'totalItem': 1.79
      },
      {
        'description': 'Arroz',
        'quantity': 2,
        'unitPrice': 22.90,
        'totalItem': 45.80
      }],
      selectedProduct: undefined,
      quantity: 1,
      price: undefined,
      totalAmount: 0.00,
      requiredProduct: undefined,
      requiredQuantity: undefined,
      requiredPrice: undefined
    }
  },

  computed: {
    totalItem() {
      if (!this.price || !this.quantity) {
        return '0,00'
      }

      return (this.price * this.quantity);
    }
  },

  filters: {
    formatedMoney: function(value) {
      return value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: "BRL"
      })
    }
  },


  watch: {
    price(price) {
      if (price) {
        this.price = price.replace(',', '.');
        this.requiredPrice = undefined;
      }
    },

    selectedProduct(value) {
      if (value) {
        this.requiredProduct = undefined;
      }
    },

    products() {
      if (!this.products.length) {
        this.totalAmount = 0.00;
        return
      }

      this.totalAmount = this.products.map(({totalItem}) => totalItem).reduce((total, item) => total + item);
    },

    quantity(value) {
      if (value) {
        this.requiredQuantity = undefined;
      }
    }
  },

  methods: {
    cleanField() {
      this.selectedProduct = undefined;
      this.quantity = 1;
      this.price = undefined;
    },

    modelValid() {
      if (!this.selectedProduct) {
        this.requiredProduct = 'Required'
      }

      if (!this.quantity) {
        this.requiredQuantity = 'Required'
      }

      if (!this.selectedProduct) {
        this.requiredPrice = 'Required'
      }

      return !(this.requiredProduct || this.requiredQuantity || this.requiredPrice);
    },

    addItem() {

      if (!this.modelValid()) return;

      this.products.push({
        description: this.selectedProduct,
        quantity: this.quantity,
        unitPrice: this.price,
        totalItem: this.totalItem
      });

      this.cleanField();

    }
  },
}
</script>

<style lang="scss" scoped>
.no-space {
  margin: 0;
  padding: 0;
}

</style>