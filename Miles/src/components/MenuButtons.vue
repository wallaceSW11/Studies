<template>
  <v-flex xs12 d-flex flex-column flex-sm-row flex-wrap> 
    <v-flex d-flex>
      <v-btn width="100%" small outlined dark to="/">Dashboard</v-btn>
    </v-flex>
    <v-flex d-flex my-2 my-sm-0 mx-0 mx-sm-2>
      <v-btn width="100%" small outlined dark to="/points">{{ text.POINTS[lang] }}</v-btn>
    </v-flex>
    <v-flex d-flex>
      <v-btn width="100%" small outlined dark to="/miles">{{ text.MILES[lang] }}</v-btn>
    </v-flex>
  </v-flex>
  
</template>

<script>
import { TEXT } from '@/constants/text';
import language from '@/utils/language';

export default {
  name: 'MenuButtons',

  data() {
    return {
      text: TEXT,
      lang: language()
    }
  },
}
</script>

<style lang="scss" scoped>

</style>