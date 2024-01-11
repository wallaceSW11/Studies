import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

import App from './App.vue'
import router from './router'

import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import { VBtn } from 'vuetify/components/VBtn'

// const myCustomLightTheme = {
//   dark: false,
//   colors: {
//     background: '#FFAAFF',
//     surface: '#FFFFFF',
//     primary: '#FFAFFF',
//     'primary-darken-1': '#3700B3',
//     secondary: '#03DAC6',
//     'secondary-darken-1': '#018786',
//     error: '#B00020',
//     info: '#2196F3',
//     success: '#4CAF50',
//     warning: '#FB8C00',
//   },
// }

const vuetify = createVuetify({
  defaults: {
    global: {
      ripple: false,
    },
    VBtn: { 
      class: 'text-none',
      variant: 'outlined' 
    },
    VSheet: {
      elevation: 4,
    },
  },
  components,
  directives,
  icons: {
    defaultSet: 'mdi'
  },
  
  theme: {
    defaultTheme: 'dark',
    themes: {
      dark: {
        dark: true,
        colors: {
          background: '#070c1e',
          surface: '#262235',
          'secondary-background': '#00ff00',
          primary: '#b76bef',
          text: '#2ec247'
        }
      },
      light: {
        dark: false,
        colors: {
          surface: '#d2d4dc',
          
        }
      }
    }
  }
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#app')
