<template>
  <ul class="sidebar mr-3">
    <li v-for="(item, index) in menuItems" :key="index">
      <router-link :to="{ name: item?.path }">
        <i :class="item?.icon"></i><span>{{ item?.name }}</span>
      </router-link>
    </li>
  </ul>
</template>

<script setup>
import { reactive } from "vue";

const menuItems = reactive([
  {
    name: "Item",
    icon: "bi bi-inbox",
    path: "item",
  },
  {
    name: "Purchases",
    icon: "bi bi-wallet",
    path: "purchases",
  },
  {
    name: "Sales",
    icon: "bi bi-cart",
    path: "sales",
  },
  {
    name: "User Management",
    icon: "bi bi-people",
    path: "users",
  },
  // {
  //   name: "Customer",
  //   icon: "bi bi-people",
  //   path: "customer",
  // },
  // {
  //   name: "Suppliers",
  //   icon: "bi bi-download",
  //   path: "supplier",
  // },
  // {
  //   name: "Reports",
  //   icon: "bi bi-graph-down",
  //   path: "report",
  // },

  // {
  //   name: "Renew",
  //   icon: "bi bi-hand-index-thumb",
  //   path: "renew",
  // },
]);
</script>
