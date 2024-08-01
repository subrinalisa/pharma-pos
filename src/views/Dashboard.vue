<script setup>
import MainLayout from "@/components/MainLayout.vue";
import { onMounted, ref } from "vue";

import dashboard from "@/stores/dashboard_api.js";

const topData = ref({
  totalSales: 0,
  totalPurchases: 0,
  totalCustomers: 0,
  totalProducts: 0,
});
const chartOptions = ref({
  chart: {
    type: "bar",
    height: 380,
  },
  xaxis: {
    type: "category",

    group: {
      style: {
        fontSize: "10px",
        fontWeight: 700,
      },
      groups: [
        { title: "2019", cols: 4 },
        { title: "2020", cols: 4 },
      ],
    },
  },
  title: {
    text: "Grouped Labels on the X-axis",
  },
  tooltip: {},
});

const data = ref([
  {
    x: "",
    y: "",
  },
]);
const series = ref([
  {
    name: "sales",
    data: data,
  },
]);
onMounted(() => getDashboardData());

const getDashboardData = async () => {
  const response = await dashboard.fetchDashboardData();
  topData.value.totalSales = response.data.total_sale_amount;
  topData.value.totalPurchases = response.data.total_purchase_amount;
  topData.value.totalCustomers = response.data.total_customer;
  topData.value.totalProducts = response.data.total_product;
  data.value = response.data.monthly_sale;
  console.log("data", data.value);
};
</script>

<template>
  <MainLayout>
    <div class="grid grid-cols-4 gap-3">
      <!-- Column  -->
      <div class="bg-white border p-2">
        <div class="flex justify-between">
          <div class="grow">
            <h6 class="text-2xl text-indigo-600 font-medium mb-2 px-3 pt-3">
              {{ topData.totalSales }}
            </h6>
            <p class="px-3 pb-3">Total Sales Amount</p>
          </div>
          <div
            class="bg-indigo-500 text-white p-3 rounded min-w-24 text-center"
          >
            <i class="bi bi-cart text-3xl align-middle mt-3 inline-block"></i>
          </div>
        </div>
      </div>
      <!-- Column  -->
      <div class="bg-white border p-2">
        <div class="flex justify-between">
          <div class="grow">
            <h6 class="text-2xl text-indigo-600 font-medium mb-2 px-3 pt-3">
              {{ topData.totalPurchases }}
            </h6>
            <p class="px-3 pb-3">Total Purchases Amount</p>
          </div>
          <div
            class="bg-indigo-500 text-white p-3 rounded min-w-24 text-center"
          >
            <i class="bi bi-cart text-3xl align-middle mt-3 inline-block"></i>
          </div>
        </div>
      </div>
      <!-- Column  -->
      <div class="bg-white border p-2">
        <div class="flex justify-between">
          <div class="grow">
            <h6 class="text-2xl text-indigo-600 font-medium mb-2 px-3 pt-3">
              {{ topData.totalProducts }}
            </h6>
            <p class="px-3 pb-3">Total Items</p>
          </div>
          <div
            class="bg-indigo-500 text-white p-3 rounded min-w-24 text-center"
          >
            <i class="bi bi-cart text-3xl align-middle mt-3 inline-block"></i>
          </div>
        </div>
      </div>
      <!-- Column  -->
      <div class="bg-white border p-2">
        <div class="flex justify-between">
          <div class="grow">
            <h6 class="text-2xl text-indigo-600 font-medium mb-2 px-3 pt-3">
              {{ topData.totalCustomers }}
            </h6>
            <p class="px-3 pb-3">Total Customers</p>
          </div>
          <div
            class="bg-indigo-500 text-white p-3 rounded min-w-24 text-center"
          >
            <i class="bi bi-cart text-3xl align-middle mt-3 inline-block"></i>
          </div>
        </div>
      </div>
      <!--/ Column  -->
    </div>
    <!-- Graph -->
    <div class="bg-white mt-3 p-3 rounded">
      <apexchart
        type="bar"
        height="380"
        :options="chartOptions"
        :series="series"
      ></apexchart>
    </div>
  </MainLayout>
</template>
