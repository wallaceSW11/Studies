import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import MarketView from "../views/MarketView.vue";
import GasView from "../views/GasView.vue";
import MilesView from "../views/MilesView.vue"

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "home",
        component: HomeView,
    },
    {
        path: "/market",
        name: "market",
        component: MarketView,
    },
    {
        path: "/gas",
        name: "gas",
        component: GasView,
    },
    {
        path: "/miles",
        name: "miles",
        component: MilesView,
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;
