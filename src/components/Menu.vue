<template>
  <ul class="sidebar mr-3">
    <li v-for="(item, index) in menuItems" :key="index">
      <router-link :to="{ name: item?.path }">
        <i :class="item?.icon"></i><span>{{ item?.name }}</span>
      </router-link>
      <ul class="bg-white" v-if="item?.child">
        <li
          class="px-10"
          v-for="(child, index) in item?.child"
          :key="'c' + index"
        >
          <router-link :to="{ name: child?.path }">
            <i :class="item?.icon"></i><span></span
            ><span>{{ child?.name }}</span>
          </router-link>
        </li>
      </ul>
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
    child: [
      {
        name: "Customer Report",
        path: "report",
      },
      {
        name: "Products Report",
        path: "report",
      },
      {
        name: "Suppliers Report",
        path: "report",
      },
      {
        name: "Expenses Report",
        path: "report",
      },
      {
        name: "Purchases Report",
        path: "report",
      },
      {
        name: "Sales Report",
        path: "report",
      },
    ],
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
