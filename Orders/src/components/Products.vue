<template>
  <div>
    <v-card
      class="my-3"
      v-for="product in products"
      :key="product.id"
    >
      <v-flex d-flex flex-column>
        <v-flex d-flex flex-row>
          <v-flex>
            <v-flex>
              Foto
            </v-flex>
          </v-flex>
  
          <v-flex>
            <v-flex>
              {{ product.name }}
            </v-flex>
            <v-flex>
              {{ product.description }}
            </v-flex>
          </v-flex>
        </v-flex>
        <v-flex d-flex flex-row>
          <v-btn 
            color="primary"
            @click="$emit('selected', true)"
          >
            Select
          </v-btn>
          <v-btn
            @click="$emit('detailed', product.id)"
          >
            Details
          </v-btn>
        </v-flex>
      </v-flex>
    </v-card>
  </div>
</template>

<script>

import { PRODUCTS } from '@/service/api/localdata/products'

export default {
  name: 'ProductsSelect',
  data() {
    return {
      products: PRODUCTS
    }
  }
}
</script>

<style>

</style>