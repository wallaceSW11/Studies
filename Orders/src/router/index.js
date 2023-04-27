import Vue from 'vue'
import VueRouter from 'vue-router'
import OrderView from '../views/OrderView.vue'
import OrdersView from '../views/OrdersView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/Order',
    name: 'Order',
    title: 'Novo pedido',
    component: OrderView
  },
  {
    path: '/Orders',
    name: 'Orders',
    title: 'Meus pedidos',
    component: OrdersView
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
