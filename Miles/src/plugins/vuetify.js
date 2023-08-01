import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: true,
    themes: {
      light: {
        primary: colors.red.darken1, // #E53935
        secondary: colors.red.lighten4, // #FFCDD2
        accent: colors.indigo.base, // #3F51B5
      },
      dark: {
        primary: colors.orange.darken1, //#ffa50094, // #E53935
        secondary: colors.orange.lighten5, // #FFCDD2
        accent: colors.indigo.base, // #3F51B5
      },
    },
  },
});
