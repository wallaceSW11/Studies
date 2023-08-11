<template>
  <v-flex d-flex flex-grow-0>
    <v-flex d-flex flex-grow-0 mr-2 :class="{'disabled': lang =='en'}">
      <img class="image-lang" src="../assets/br2.png" alt="BRL" @click="toggleLanguage('br')">
    </v-flex>
    <v-flex d-flex flex-grow-0 :class="{'disabled': lang =='br'}">
      <img class="image-lang" src="../assets/us.png" alt="USA" @click="toggleLanguage('en')">
    </v-flex>

    <v-overlay :value="loading" z-index="0"></v-overlay>
  </v-flex>
  
</template>

<script>
import storageAPI from '@/service/api/storageAPI';
import STORAGE_DATA from '@/constants/storage-constants';
import language from '@/utils/language';

export default {
  name: 'LanguageButtons',

  data() {
    return {
      lang: language(),
      loading: false
    }
  },

  methods: {
    toggleLanguage(language) {
      if (this.lang == language) return;

      this.lang = this.lang == 'br' ? 'en' : 'br';
      storageAPI.save(STORAGE_DATA.CONFIGURATIONS.LANG.key, this.lang);
      window.location.reload();
    },
  },

}
</script>

<style lang="scss" scoped>
.image-lang {
  max-width: 30px;
  height: auto;
  border-radius: 50%;
  cursor: pointer;
}

.disabled {
  opacity: .5;
}

</style>