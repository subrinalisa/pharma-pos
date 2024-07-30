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
    name: "Dashboard",
    icon: "bi bi-speedometer2",
    path: "dashboard",
  },
  {
    name: "Customer",
    icon: "bi bi-people",
    path: "customer",
  },
  {
    name: "Item",
    icon: "bi bi-inbox",
    path: "item",
  },
  {
    name: "Suppliers",
    icon: "bi bi-download",
    path: "supplier",
  },
  {
    name: "Reports",
    icon: "bi bi-graph-down",
    path: "report",
  },
  {
    name: "Expenses",
    icon: "bi bi-cash-coin",
    path: "expenses",
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

  {
    name: "Verify Sales",
    icon: "bi bi-hand-index-thumb",
    path: "verify-sales",
  },
]);
</script>
