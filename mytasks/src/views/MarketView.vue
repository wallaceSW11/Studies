<template>
  <v-container :class="'d-flex flex-wrap justify-center' ">
    <v-flex xs12 sm3>
      <v-combobox
        prepend-inner-icon="mdi-shopping"
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
        id="field-quantity"
        prepend-inner-icon="mdi-counter"
        label="Quantity"
        type="tel"
        v-model.number="quantity"
        @focus="$event.target.select()"
        :error-messages="requiredQuantity"
      ></v-text-field>
    </v-flex>    
    <v-flex xs8 sm3 pl-3 px-sm-3>      
      <v-text-field
        ref="myinput"
        id="feield-price"
        v-model="price"
        label="Unit price"
        @keypress.enter="addItem"
        :error-messages="requiredPrice"
        v-money="{
          decimal: ',',
          thousands: '.',
          precision: 2
        }"
        class="label-left"
        reverse
        type="tel"
      >

      </v-text-field>
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
        class="d-flex flex-row pl-3 my-1 py-1"

        >
          <v-flex xs5>
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

          <v-flex xs1 class="d-flex flex-row justify-center align-center">
            <v-menu top offset-y >
              <template v-slot:activator="{on}">
                <v-icon color="primary" v-on="on">mdi-dots-vertical</v-icon>
              </template>
              <v-card>
                <v-btn text @click="editProduct(item, index)" color="primary"> <v-icon>mdi-pencil</v-icon></v-btn>
                <v-btn text @click="deleteItem(index)" color="primary"><v-icon>mdi-delete</v-icon></v-btn>
              </v-card>
            </v-menu>
          </v-flex>
      </v-card>
    </v-flex>

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
  name: 'MarketView',
  data() {
    return {
      productList: PRODUCTS_LIST,
      products: [],
      selectedProduct: undefined,
      quantity: 1,
      price: undefined,
      totalAmount: 0,
      totalItem: 0,
      requiredProduct: undefined,
      requiredQuantity: undefined,
      requiredPrice: undefined,
      isEditing: false,
      selectedProductIndex: undefined,
    }
  },

  computed: {
    mobileSize(){
      return this.$vuetify.breakpoint.xsOnly;
    }
  },

  filters: {
    formatedMoney(value) {
      return value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: "BRL",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }) || 0;
    }
  },

  created () {
    let productsStorage = JSON.parse(localStorage.getItem('products'))

    if (productsStorage) {
      this.products = productsStorage;
    }
  },


  watch: {
    price(value) {
      this.requiredPrice = undefined;
      value = value && value.replace('.', '').replace(',', '.') || 0;
      this.totalItem = value && value * this.quantity || 0
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
    setPrice(value) {
      this.$refs.myinput.$el.getElementsByTagName('input')[0].value = value;
      this.price = value;
    },

    cleanField() {
      this.selectedProduct = undefined;
      this.quantity = 1;
      this.setPrice(0);
    },

    modelValid() {
      if (!this.selectedProduct) {
        this.requiredProduct = 'Required'
      }

      if (!this.quantity) {
        this.requiredQuantity = 'Required'
      }

      if (!this.price || this.price == "0,00") {
        this.requiredPrice = 'Required'
      }

      return !(this.requiredProduct || this.requiredQuantity || this.requiredPrice);
    },

    addItem() {

      if (!this.modelValid()) return;

      if (this.isEditing) {
        this.products.splice(this.selectedProductIndex, 1, {
          description: this.selectedProduct,
          quantity: this.quantity,
          price: this.price,
          totalItem: this.totalItem
        });

        this.cleanField();
        this.$refs.productInput.focus();
        this.isEditing = false;
        return;
      }

      this.products.push({
        description: this.selectedProduct,
        quantity: this.quantity,
        price: this.price,
        totalItem: this.totalItem
      });

      this.cleanField();
      this.$refs.productInput.focus();
    },

    editProduct(item, index) {
      this.selectedProduct = item.description;
      this.quantity = item.quantity;
      this.setPrice(item.price);
      this.selectedProductIndex = index;
      this.isEditing = true;
    },

    deleteItem(index) {
      this.products.splice(index, 1);
    },

    clearList() {
      this.products = [];
    }
  }
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

::v-deep #field-quantity {
  text-align: right;
}

::v-deep #field-price {
  text-align: right;
}

::v-deep .label-left .v-label {
  left: 0 !important;
  transform-origin: top left !important;
}
</style>