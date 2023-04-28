<template>
  <v-container>
    <h2>{{ selectedPage.title }}</h2>

    <date-order
      v-if="selectedPage.page == 'date'" 
      @selected="nextPage" 
      @detailed="showDetail"
    />

    <products-select 
      v-if="selectedPage.page == 'product'" 
      @selected="nextPage" 
      @detailed="showDetail"
    />

    <size-products 
      v-if="selectedPage.page == 'size'" 
      @selected="nextPage" 
      @detailed="showDetail"
    />

    <theme-products 
      v-if="selectedPage.page == 'theme'" 
      @selected="nextPage" 
      @detailed="showDetail"
    />

    <resume-order
      v-if="selectedPage.page == 'resume'" 
      @selected="nextPage" 
      @detailed="showDetail"
    />

  </v-container>
</template>

<script>

import ProductsSelect from '@/components/Products.vue';
import SizeProducts from '@/components/Sizes.vue';
import ThemeProducts from '@/components/Themes.vue';
import ResumeOrder from '@/components/Resume.vue';
import DateOrder from '@/components/Date.vue';
import { STAGES } from '@/contants/OrderStage';

export default {
  components: {
    ProductsSelect,
    SizeProducts,
    ThemeProducts,
    ResumeOrder,
    DateOrder
  },

  name: 'OrderView',

  data() {
    return {
      selectedPage: STAGES.DATE,
    }
  },

  methods: {
    nextPage() {
      // validade page and go next
      // console.log('aqui');
      // this.selectedPage = STAGES.SIZE.page;

      switch (this.selectedPage) {
        case STAGES.DATE:
          this.selectedPage = STAGES.PRODUCT;
          break;
        case STAGES.PRODUCT:
          this.selectedPage = STAGES.SIZE;
          break;
        case STAGES.SIZE:
          this.selectedPage = STAGES.THEME;
          break;
        case STAGES.THEME:
          this.selectedPage = STAGES.RESUME;
          break;
      }
    },

    showDetail(id) {
      console.log(id);
    }
  },
}
</script>
