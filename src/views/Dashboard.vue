<script setup>
import MainLayout from "@/components/MainLayout.vue";
import { ref } from "vue";

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
const series = ref([
  {
    name: "sales",
    data: [
      {
        x: "2019/01/01",
        y: 400,
      },
      {
        x: "2019/04/01",
        y: 430,
      },
      {
        x: "2019/07/01",
        y: 448,
      },
      {
        x: "2019/10/01",
        y: 470,
      },
      {
        x: "2020/01/01",
        y: 540,
      },
      {
        x: "2020/04/01",
        y: 580,
      },
      {
        x: "2020/07/01",
        y: 690,
      },
      {
        x: "2020/10/01",
        y: 690,
      },
    ],
  },
]);
</script>

<template>
  <MainLayout>
    <div class="grid grid-cols-4 gap-3">
      <!-- Column  -->
      <div class="bg-white border p-2">
        <div class="flex justify-between">
          <div class="grow">
            <h6 class="text-2xl text-indigo-600 font-medium mb-2 px-3 pt-3">
              242398
            </h6>
            <p class="px-3 pb-3">Total Sales</p>
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
              242398
            </h6>
            <p class="px-3 pb-3">Total Sales</p>
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
              242398
            </h6>
            <p class="px-3 pb-3">Total Sales</p>
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
              242398
            </h6>
            <p class="px-3 pb-3">Total Sales</p>
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
