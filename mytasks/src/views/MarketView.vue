<template>
  <v-container :class="'d-flex flex-wrap justify-center' ">
    <v-flex xs12 sm3>
      <v-combobox
        prepend-icon="mdi-shopping"
        label="Product"
        :items="productList"
        v-model="selectedProduct"
        :error-messages="requiredProduct"
        clearable
        ref="productInput"
      ></v-combobox>
    </v-flex>

    <v-flex xs4 sm2 pr-3 px-sm-3>
      <v-text-field
        prepend-icon="mdi-counter"
        label="Quantity"
        type="tel"
        v-model.number="quantity"
        @focus="$event.target.select()"
        :error-messages="requiredQuantity"
        reverse
      ></v-text-field>
    </v-flex>
    <v-flex xs8 sm3 pl-3 px-sm-3>
      <v-text-field
        prepend-icon="mdi-currency-usd"
        label="Price"
        type="tel"
        v-model="price"
        :error-messages="requiredPrice"
        @keydown.enter="addItem"
      ></v-text-field>
    </v-flex>

    <v-flex xs12 sm6 pr-sm-3 class="text-right pr-3">
        <h3>Total item</h3>
        <p> {{ totalItem | formatedMoney }}</p>
    </v-flex>

    <v-flex xs12 sm6 pt-sm-3 pl-sm-3> 
      <v-btn
        color="primary"
        @click="addItem"
        :width="mobileSize ? '100%' : '140px'"
      >
        <v-icon>{{ isEditing ? 'mdi-check' : 'mdi-plus' }}</v-icon>
        {{ isEditing ? 'Save' : 'ADD' }}
      </v-btn>
    </v-flex>

    <v-flex xs12 v-if="!products.length" mt-3>
      <h1 class="text-center" >Let's go baby</h1>
    </v-flex>

    <v-flex v-else xs12 sm8 mt-3 mb-12>
      <v-card
        v-for="(item, index) in products"
        :key="index"
        class="d-flex flex-row px-3 my-1 py-1"
        @click="options(item, index)"
        >
          <v-flex xs6>
            <h5>Product</h5>
            <p class="no-space"> {{ item.description }} </p>
          </v-flex>

          <v-flex xs2 class="text-right">
            <h5>Qtt</h5>
            <p class="no-space"> {{ item.quantity }} </p>
          </v-flex>

          <v-flex xs4 class="text-right">
            <h5>Total item</h5>
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





    <v-footer fixed class="d-flex flex-row">
      <v-flex class="d-flex flex-row">
        <v-flex xs6>
          <v-btn
            text
            @click="clearList"
            style="padding-left: 0"
            small
          >
          <v-icon>mdi-delete-forever-outline</v-icon>
          clear list
          </v-btn>
        </v-flex>
        <v-flex xs6 class="d-flex flex-row justify-end align-center text-right">
          <p class="mb-0 pb-0">Total: <strong> {{ totalAmount | formatedMoney }}</strong></p>
        </v-flex>
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
    },

    mobileSize(){
      return this.$vuetify.breakpoint.xsOnly;
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
      const productInput = this.$refs.productInput;
      productInput.focus();
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
    },

    clearList() {
      this.products = [];
      alert('Cleaned!');

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

.short-content {
  max-width: 70%;
}
</style>