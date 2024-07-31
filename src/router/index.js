import { createRouter, createWebHistory } from "vue-router";
import Cookies from "js-cookie";
import Login from "@/views/Login.vue";
import Home from "@/views/Home.vue";
import Dashboard from "@/views/Dashboard.vue";

//Start User Management

import Purchase from "@/views/Purchase.vue";
import Sales from "@/views/Sales.vue";
import Users from "@/views/User Management/Users.vue";
import Useradd from "@/views/User Management/Useradd.vue";
import Useredit from "@/views/User Management/Useredit.vue";
import Role from "@/views/User Management/Role.vue";
import Roleadd from "@/views/User Management/Roleadd.vue";
import Roleedit from "@/views/User Management/Roleedit.vue";

import Permissions from "@/views/User Management/Permissions.vue";
import Permissionsadd from "@/views/User Management/Permissionsadd.vue";
import Permissionsedit from "@/views/User Management/Permissionsedit.vue";
//End User Management


import Item from "@/views/Item.vue";
import ItemCreate from "@/views/ItemCreate.vue";
import ItemEdit from "@/views/ItemEdit.vue";
import Customer from "@/views/customer/index.vue"
import CustomerCreate from "@/views/customer/create.vue";
import CustomerEdit from "@/views/customer/edit.vue";
import SupplierList from "@/views/supplier/List.vue";
import SupplierAdd from "@/views/supplier/Add.vue";
import Report from "@/views/Report.vue";
import PurchaseReport from "@/views/PurchaseReport.vue";
import Expenses from "@/views/expenses/index.vue";
import ExpensesCreate from "@/views/expenses/create.vue";
import ExpensesEdit from "@/views/expenses/edit.vue";
import VerifySales from "@/views/VerifySales.vue";
import Branch from "@/views/Branch.vue";

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
    path: "/purchases",
    name: "purchases",
    component: Purchase,
  },
  {
    path: "/home",
    name: "home",
    component: Purchase,
  },
  {
    path: "/customer",
    name: "customer",
    component: Customer,
  },
  {
    path: "/customer/create",
    name: "customer-create",
    component: CustomerCreate,
  },
  {
    path: "/customer/edit/:id",
    name: "customer-edit",
    component: CustomerEdit,
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
    path: "/item/edit/:id",
    name: "item-edit",
    component: ItemEdit,
  },
  {
    path: "/supplier",
    name: "supplier",
    component: SupplierList,
  },
  {
    path: "/supplier/add",
    name: "supplier-add",
    component: SupplierAdd,
  },
  {
    path: "/report",
    name: "report",
    component: Report,

  },
  {
    path: "/purchase-report",
    name: "purchase-report",
    component: PurchaseReport,
  },
  {
    path: "/expenses",
    name: "expenses",
    component: Expenses,
  },
  {
    path: "/expenses/create",
    name: "expenses-create",
    component: ExpensesCreate,
  },
  {
    path: "/expenses/edit/:id",
    name: "expenses-edit",
    component: ExpensesEdit,
  },
  {
    path: "/sales",
    name: "sales",
    component: Sales,
  },
  {
    path: "/renew",
    name: "renew",
    component: Home,
  },
  {
    path: "/users",
    name: "users",
    component: Users,
  },

  {
    path: "/useradd",
    name: "useradd",
    component: Useradd,
  },

  {
    path: "/users/:id",
    name: "useredit",
    component: Useredit,
  },

  {
    path: "/role",
    name: "role",
    component: Role,
  },
  {
    path: "/verify-sales",
    name: "verify-sales",
    component: VerifySales,
  },

  {
    path: "/roleadd",
    name: "roleadd",
    component: Roleadd,
  },

  {
    path: "/role/:id",
    name: "roleedit",
    component: Roleedit,
  },

  {
    path: "/permissions",
    name: "permissions",
    component: Permissions,
  },

  {
    path: "/permissionsadd",
    name: "permissionsadd",
    component: Permissionsadd,
  },

  {
    path: "/permissions/:id",
    name: "permissionsedit",
    component: Permissionsedit,
  },
  {
    path: "/branch",
    name: "branch",
    component: Branch,
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
