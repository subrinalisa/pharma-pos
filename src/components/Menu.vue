<template>
  <div class="sidebar mr-5">
    <div class="text-right">
      <button
        type="button"
        class="bg-black text-white rounded px-2 py-1 mb-3"
        @click="isSidebarOpen = !isSidebarOpen"
      >
        <MenuFoldOutlined />
      </button>
    </div>
    <ul v-show="isSidebarOpen">
      <li
        v-for="(item, index) in menuItems"
        :key="index"
        :class="{ active: isActive(item) }"
      >
        <div @click="toggleCollapse(index)">
          <router-link :to="{ name: item?.path }">
            <i :class="item?.icon"></i><span>{{ item?.name }}</span>
          </router-link>
        </div>
        <ul v-if="item?.child && item.isExpanded">
          <li
            v-for="(child, childIndex) in item?.child"
            :key="'c' + childIndex"
            :class="{ active: isActive(child) }"
          >
            <router-link :to="{ name: child?.path }">
              <span>{{ child?.name }}</span>
            </router-link>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { reactive, ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { MenuFoldOutlined } from "@ant-design/icons-vue";

// Sidebar state
const isSidebarOpen = ref(true);

// Menu items with expanded state
const menuItems = reactive([
  {
    name: "Dashboard",
    icon: "bi bi-speedometer2",
    path: "dashboard",
    isExpanded: false,
  },
  {
    name: "Customer",
    icon: "bi bi-people",
    path: "customer",
    isExpanded: false,
  },
  {
    name: "Item",
    icon: "bi bi-inbox",
    path: "item",
    isExpanded: false,
  },
  {
    name: "Suppliers",
    icon: "bi bi-download",
    path: "supplier",
    isExpanded: false,
  },
  {
    name: "Reports",
    icon: "bi bi-graph-down",
    path: "report",
    isExpanded: false,
    child: [
      {
        name: "Sales Report",
        path: "report",
      },
      {
        name: "Purchase Report",
        path: "purchase-report",
      },
    ],
  },
  {
    name: "Expenses",
    icon: "bi bi-cash-coin",
    path: "expenses",
    isExpanded: false,
  },
  {
    name: "Purchases",
    icon: "bi bi-wallet",
    path: "purchases",
    isExpanded: false,
  },
  {
    name: "Sales",
    icon: "bi bi-cart",
    path: "sales",
    isExpanded: false,
  },
  {
    name: "Verify Sales",
    icon: "bi bi-hand-index-thumb",
    path: "verify-sales",
    isExpanded: false,
  },
  {
    name: "Branch",
    icon: "bi bi-git",
    path: "branch",
    isExpanded: false,
  },
  {
    name: "User Management",
    icon: "bi bi-people",
    path: "users",
    isExpanded: false,
  },
]);

const router = useRouter();
const route = useRoute();
const activeItem = ref(null);

const toggleCollapse = (index) => {
  menuItems[index].isExpanded = !menuItems[index].isExpanded;
};

watch(
  () => route.name,
  () => {
    activeItem.value = route?.path?.split("/")?.at(1);
  },
  { immediate: true }
);

const isActive = (item) => {
  if (item.path === activeItem.value) {
    return true;
  }
  if (item.child) {
    return item.child.some((child) => child.path === activeItem.value);
  }
  return false;
};
</script>

<style scoped>
.active {
  background-color: #fff; /* Highlight color */
}
</style>
