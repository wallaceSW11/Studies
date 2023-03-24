import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import vuetify from './plugins/vuetify'
import money from 'v-money'

Vue.config.productionTip = false

Vue.use(money);

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
