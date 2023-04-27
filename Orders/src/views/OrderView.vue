<template>
  <v-container>
    <products-select 
      v-if="selectedPage == 'product'" 
      @selected="nextPage" 
      @detailed="showDetail"
    />

    <size-products 
      v-if="selectedPage == 'size'" 
      @selected="nextPage" 
      @detailed="showDetail"
    />

    <theme-products 
      v-if="selectedPage == 'theme'" 
      @selected="nextPage" 
      @detailed="showDetail"
    />

    <resume-order
      v-if="selectedPage == 'resume'" 
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
import { STAGES } from '@/contants/OrderStage';

export default {
  components: {
    ProductsSelect,
    SizeProducts,
    ThemeProducts,
    ResumeOrder
  },

  name: 'OrderView',

  data() {
    return {
      selectedPage: STAGES.PRODUCT.page,
    }
  },

  methods: {
    nextPage() {
      // validade page and go next
      // console.log('aqui');
      // this.selectedPage = STAGES.SIZE.page;

      switch (this.selectedPage) {
        case STAGES.PRODUCT.page:
          this.selectedPage = STAGES.SIZE.page;
          break;
        case STAGES.SIZE.page:
          this.selectedPage = STAGES.THEME.page;
          break;
        case STAGES.THEME.page:
          this.selectedPage = STAGES.RESUME.page;
          break;
      }
    },

    showDetail(id) {
      console.log(id);
    }
  },
}
</script>
