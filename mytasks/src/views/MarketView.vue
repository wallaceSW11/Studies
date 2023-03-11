<template>
  <v-container class="d-flex flex-wrap">
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

    <v-flex xs4>
      <v-text-field
        prepend-icon="mdi-counter"
        label="Quantity"
        type="tel"
        v-model.number="quantity"
        @focus="$event.target.select()"
        :error-messages="requiredQuantity"
      ></v-text-field>
    </v-flex>
    <v-flex xs8>
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
      > {{ isEditing ? 'Save' : 'ADD' }}</v-btn>
    </v-flex>

    <v-flex xs12 v-if="!products.length" mt-3>
      <h1 class="text-center" >Let's go baby</h1>
    </v-flex>


    <v-flex v-else xs12 mt-3>
      <v-card
        v-for="(item, index) in products"
        :key="index"
        class="d-flex flex-row px-3 my-1 py-1"
        @click="options(item, index)"
        >
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

    <v-dialog
      v-model="showOptions"
      max-width="150px"
    >
      <v-flex class="d-flex justify-center flex-row background-dialog">
        <v-btn text @click="editProduct" color="primary"> <v-icon>mdi-pencil</v-icon></v-btn>
        <v-btn text @click="deleteItem" color="primary"><v-icon>mdi-delete</v-icon></v-btn>

      </v-flex>

    </v-dialog>





    <v-footer fixed>
      <v-flex xs12 class="text-right mr-3">
        <h3>Total: <strong> {{ totalAmount | formatedMoney }}</strong></h3>
    </v-flex>
    </v-footer>
  </v-container>
</template>

<script>

import { PRODUCTS_LIST } from "@/storage/products-list.js";

export default {



  data() {
    return {
      productList: PRODUCTS_LIST,
      products: [],
      selectedProduct: undefined,
      quantity: 1,
      price: undefined,
      totalAmount: 0.00,
      requiredProduct: undefined,
      requiredQuantity: undefined,
      requiredPrice: undefined,
      showOptions: false,
      item: undefined,
      index: undefined,
      isEditing: false
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
      if (!value) return;

      return value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: "BRL"
      })
    }
  },

  created () {
    let productsStorage = JSON.parse(localStorage.getItem('products'))

    if (productsStorage) {
      this.products = productsStorage;
    }
  },


  watch: {
    price(price) {
      if (price) {
        if (typeof(price) == 'string') {
          this.price = price.replace(',', '.');
        }
        this.requiredPrice = undefined;
      }
    },

    selectedProduct(value) {
      if (value) {
        this.requiredProduct = undefined;
      }
    },

    products() {
      localStorage.setItem('products', JSON.stringify(this.products));

      if (this.products && !this.products.length) {
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

      this.item = undefined;
      this.index = undefined;
    },

    modelValid() {
      if (!this.selectedProduct) {
        this.requiredProduct = 'Required'
      }

      if (!this.quantity) {
        this.requiredQuantity = 'Required'
      }

      if (!this.price) {
        this.requiredPrice = 'Required'
      }

      return !(this.requiredProduct || this.requiredQuantity || this.requiredPrice);
    },

    addItem() {

      if (!this.modelValid()) return;

      this.products.push({
        description: this.selectedProduct,
        quantity: this.quantity,
        price: this.price,
        totalItem: this.totalItem
      });

      this.cleanField();
    },

    options(item, index) {
      this.item = item;
      this.index = index;
      this.showOptions = true;
    },

    editProduct() {
      this.selectedProduct = this.item.description;
      this.quantity = this.item.quantity;
      this.price = this.item.price;

      this.products.splice(this.index, 1);

      this.isEditing = true;
      this.showOptions = false;
    },

    deleteItem() {
      this.products.splice(this.index, 1);
      this.index = undefined;
      this.showOptions = false;
    }
  },
}
</script>

<style lang="scss" scoped>
.no-space {
  margin: 0;
  padding: 0;
}

.background-dialog {
  background-color: #fff;
}
</style>