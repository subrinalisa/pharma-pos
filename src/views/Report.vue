<script setup>
import MainLayout from "@/components/MainLayout.vue";
import { ref } from "vue";

const isReportShow = ref(false);
const reportList = ref([
  {
    name: "Customers",
  },
  {
    name: "Products",
  },
  {
    name: "Suppliers",
  },
  {
    name: "Expenses",
  },
  {
    name: "Purchases",
  },
  {
    name: "Sales",
  },
]);
</script>

<template>
  <MainLayout>
    <h6 class="font-medium mb-4">Reports</h6>
    <div class="mb-2" v-for="(item, index) in reportList" :key="index">
      <label :for="index"
        ><input
          type="checkbox"
          :id="index"
          @change="isReportShow = true"
        /><span class="pl-2">{{ item?.name }}</span></label
      >
    </div>
    <!-- table -->
    <table
      class="table border-collapse border border-slate-400 w-full bg-white my-4"
      v-if="isReportShow"
    >
      <thead class="table-header">
        <tr>
          <th>Sale</th>
          <th>Id</th>
          <th>Date</th>
          <th>Register</th>
          <th>Items</th>
          <th>Purchased</th>
          <th>Sold</th>
          <th>Subtotal</th>
          <th>Total</th>
          <th>Tax</th>
        </tr>
      </thead>
      <tbody class="table-body">
        <tr class="text-center">
          <td>100</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
        </tr>
        <tr class="text-center">
          <td>100</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
        </tr>
      </tbody>
    </table>
  </MainLayout>
</template>
