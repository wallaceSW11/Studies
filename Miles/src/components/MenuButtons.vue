<template>
  <v-flex d-flex>
    <v-btn small outlined dark to="/">Dashboard</v-btn>
    <!-- <v-btn class="mx-4" small outlined dark to="/points">{{ text.POINTS[lang] }}</v-btn>
    <v-btn small outlined dark to="/miles">{{ text.MILES[lang] }}</v-btn> -->
    <v-btn class="mx-4" small outlined dark to="/points">Points</v-btn>
    <v-btn small outlined dark to="/miles">Miles</v-btn>
  </v-flex>
  
</template>

<script>
// import { TEXT } from '@/constants/text';
// import language from '@/utils/language';
// import { TEXT } from '../constants/text.js'
// import language from '../utils/language';


export default {
  name: 'MenuButtons',

  // data() {
  //   return {
  //     text: TEXT,
  //     lang: language()
  //   }
  // },

}
</script>

<style lang="scss" scoped>

</style>