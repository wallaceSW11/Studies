<template>
  <div>
    <v-card
      class="my-3"
      v-for="theme in themes"
      :key="theme.description"
    >
      <v-flex d-flex flex-column>
        <v-flex d-flex flex-row>
          <v-flex>
            <v-flex>
              {{ theme.description }}
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

import { TOPPER_THEME } from '@/service/api/localdata/Themes';

export default {
  name: 'ThemesProducts',
  data() {
    return {
      themes: TOPPER_THEME
    }
  }
}
</script>

<style>

</style>