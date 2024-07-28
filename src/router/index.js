import { createRouter, createWebHistory } from "vue-router";
import Cookies from "js-cookie";

import Login from "@/views/Login.vue";
import Home from "@/views/Home.vue";
import Item from "@/views/Item.vue";
import Dashboard from "@/views/Dashboard.vue";
import ItemCreate from "@/views/ItemCreate.vue";

const routes = [
  {
    path: "/",
    name: "login",
    component: Login,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
  },
  {
    path: "/home",
    name: "home",
    component: Home,
  },
  {
    path: "/customer",
    name: "customer",
    component: Home,
  },
  {
    path: "/item",
    name: "item",
    component: Item,
  },
  {
    path: "/item/add",
    name: "item-add",
    component: ItemCreate,
  },
  {
    path: "/supplier",
    name: "supplier",
    component: Home,
  },
  {
    path: "/report",
    name: "report",
    component: Home,
  },
  {
    path: "/expenses",
    name: "expenses",
    component: Home,
  },
  {
    path: "/verify-sales",
    name: "verifySales",
    component: Home,
  },
  {
    path: "/renew",
    name: "renew",
    component: Home,
  },

  {
    path: "/:catchAll(.*)",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = Cookies.get("token");
  if ((to.path === "/" || to.path === "/register") && !token) {
    next();
  } else if ((to.path === "/" || to.path === "/register") && token) {
    next("/home");
  } else if (token) {
    next();
  } else {
    next("/");
  }
});
export default router;
