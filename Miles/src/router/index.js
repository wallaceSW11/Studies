import Vue from 'vue'
import VueRouter from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import PointsView from '../views/PointsView.vue'
import MilesView from '../views/MilesView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: DashboardView
  },
  {
    path: '/points',
    name: 'points',
    component: PointsView
  },
  {
    path: '/miles',
    name: 'miles',
    component: MilesView
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
