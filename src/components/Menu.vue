<template>
  <sidebar-menu :menu="filteredMenuItems" theme="default" :collapsed="true" />
  <!-- <div class="sidebar mr-5">
    <div class="flex justify-between">
      <div class="grow mr-5" v-if="isSidebarOpen">
        <h1 class="text-lg uppercase tracking-wider font-semibold">
          Pharma POS
        </h1>
      </div>
      <div class="text-right">
        <button
          type="button"
          class="bg-[#000180] text-white rounded px-2 py-1 mb-3"
          @click="isSidebarOpen = !isSidebarOpen"
        >
          <MenuFoldOutlined />
        </button>
      </div>
    </div>
    <ul v-show="isSidebarOpen">
      <li v-for="(item, index) in filteredMenuItems" :key="index">
        <div @click="toggleCollapse(index)">
          <router-link
            :to="{ name: item?.path }"
            :class="{ active: isActive(item) }"
          >
            <div class="flex items-center">
              <div>
                <i :class="item?.icon"></i><span>{{ item?.name }}</span>
              </div>
              <div class="text-right grow" v-if="item?.child">
                <i class="bi bi-chevron-down"></i>
              </div>
            </div>
          </router-link>
        </div>

        <ul v-if="item.isExpanded">
          <li
            v-for="(child, childIndex) in item?.child"
            :key="'c' + childIndex"
          >
            <router-link
              :to="{ name: child?.path }"
              :class="{ active: isActive(child) }"
            >
              <span>{{ child?.name }}</span>
            </router-link>
          </li>
        </ul>
      </li>
    </ul>
  </div> -->
</template>

<script setup>
import { reactive, ref, watch, computed } from "vue";
import { useRoute } from "vue-router";
import { MenuFoldOutlined } from "@ant-design/icons-vue";
import { useDataStore } from "@/stores/data";
import { storeToRefs } from "pinia";
const dataStore = useDataStore();
const { userInfo } = storeToRefs(dataStore);
const menu = [
  {
    header: "Pharma POS",
    hiddenOnCollapse: true,
  },
  {
    title: "Dashboard",
    icon: "bi bi-speedometer2",
    href: "home",
    permission: "dashboard",
  },
  {
    title: "Customer",
    icon: "bi bi-people",
    href: "customer",
    isExpanded: false,
    permission: "customer",
  },
  {
    title: "Item",
    icon: "bi bi-inbox",
    href: "item",
    isExpanded: false,
    permission: "item",
  },
  {
    title: "Suppliers",
    icon: "bi bi-download",
    href: "supplier",
    isExpanded: false,
    permission: "suppliers",
  },
  // {
  //   href: "",
  //   title: "",
  //   icon: "fa fa-chart-area",
  //   child: [
  //     {
  //       href: "/charts/sublink",
  //       title: "Sub Link",
  //     },
  //   ],
  // },
  {
    title: "Reports",
    icon: "bi bi-graph-down",
    href: "",
    isExpanded: false,
    permission: "reports",
    child: [
      {
        title: "Sales Report",
        href: "report",
        permission: "reports",
      },
      {
        title: "Purchase Report",
        href: "purchase-report",
        permission: "reports",
      },
    ],
  },
  {
    title: "Expenses",
    icon: "bi bi-cash-coin",
    href: "expenses",
    isExpanded: false,
    permission: "expenses",
  },
  {
    title: "Purchases",
    icon: "bi bi-wallet",
    href: "purchases",
    isExpanded: false,
    permission: "purchases",
  },
  {
    title: "Sales",
    icon: "bi bi-cart",
    href: "sales",
    isExpanded: false,
    permission: "sales",
  },
  {
    title: "Verify Sales",
    icon: "bi bi-hand-index-thumb",
    href: "verify-sales",
    isExpanded: false,
    permission: "verify-sales",
  },
  {
    title: "Branch",
    icon: "bi bi-git",
    href: "branch",
    isExpanded: false,
    permission: "branch",
  },
  {
    title: "User",
    icon: "bi bi-people",
    href: "users",
    isExpanded: false,
    permission: "users",
  },
];
// Sidebar state
const isSidebarOpen = ref(true);

// Menu items with expanded state
let menuItems = reactive([
  {
    name: "Dashboard",
    icon: "bi bi-speedometer2",
    path: "home",
    isExpanded: false,
    permission: "dashboard",
  },
  {
    name: "Customer",
    icon: "bi bi-people",
    path: "customer",
    isExpanded: false,
    permission: "customer",
  },
  {
    name: "Item",
    icon: "bi bi-inbox",
    path: "item",
    isExpanded: false,
    permission: "item",
  },
  {
    name: "Suppliers",
    icon: "bi bi-download",
    path: "supplier",
    isExpanded: false,
    permission: "suppliers",
  },
  {
    name: "Reports",
    icon: "bi bi-graph-down",
    path: "",
    isExpanded: false,
    permission: "reports",
    child: [
      {
        name: "Sales Report",
        path: "report",
        permission: "reports",
      },
      {
        name: "Purchase Report",
        path: "purchase-report",
        permission: "reports",
      },
    ],
  },
  {
    name: "Expenses",
    icon: "bi bi-cash-coin",
    path: "expenses",
    isExpanded: false,
    permission: "expenses",
  },
  {
    name: "Purchases",
    icon: "bi bi-wallet",
    path: "purchases",
    isExpanded: false,
    permission: "purchases",
  },
  {
    name: "Sales",
    icon: "bi bi-cart",
    path: "sales",
    isExpanded: false,
    permission: "sales",
  },
  {
    name: "Verify Sales",
    icon: "bi bi-hand-index-thumb",
    path: "verify-sales",
    isExpanded: false,
    permission: "verify-sales",
  },
  {
    name: "Branch",
    icon: "bi bi-git",
    path: "branch",
    isExpanded: false,
    permission: "branch",
  },
  {
    name: "User",
    icon: "bi bi-people",
    path: "users",
    isExpanded: false,
    permission: "users",
  },
]);
const userPermissions = ref();
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

const filteredMenuItems = computed(() => {
  userPermissions.value = userInfo.value?.permissions?.map((info) => info.name);

  return menu.filter((item) => {
    if (!item.permission || userPermissions.value?.includes(item.permission)) {
      if (item.child) {
        item.child = item.child.filter((child) =>
          userPermissions.value.includes(child.permission || "")
        );
      }
      return true;
    }
    return menuItems.value;
  });
});
</script>

<style>
.active {
  background-color: #fff;
  color: #000180;
  border-color: #000180;
  border-width: 2px;
}
.v-sidebar-menu .vsm--link_hover,
.v-sidebar-menu .vsm--link_active {
  background: #000180 !important;
}
</style>
