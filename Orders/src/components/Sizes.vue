<template>
  <div>
    <v-card
      class="my-3"
      v-for="size in sizes"
      :key="size.size"
    >
      <v-flex d-flex flex-column>
        <v-flex d-flex flex-row>
          <v-flex>
            <v-flex>
              {{ size.size + ' - ' + size.description }}
            </v-flex>
            <v-flex>
             
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

import { TOPPER_SIZE } from '@/service/api/localdata/Sizes';

export default {
  name: 'SizeProducts',
  data() {
    return {
      sizes: TOPPER_SIZE
    }
  }
}
</script>

<style>

</style>