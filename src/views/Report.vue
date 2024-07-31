<script setup>
import MainLayout from "@/components/MainLayout.vue";
import { ref } from "vue";
import { useDataStore } from "@/stores/data";
import { PlusOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons-vue";

const dataStore = useDataStore();
const { getSaleReport } = dataStore;

const saleReport = ref(null);
const fromDate = ref(null);
const toDate = ref(null);

const handleFilter = async () => {
  saleReport.value = await getSaleReport(fromDate.value, toDate.value);
};
</script>

<template>
  <MainLayout>
    <h6 class="font-medium mb-4">Reports</h6>
    <!-- Filter -->
    <div class="flex items-end">
      <div class="mr-3">
        <label class="block mb-1">From Date</label>
        <input
          type="date"
          placeholder="Search"
          class="px-4 py-2 border rounded"
          v-model="fromDate"
        />
      </div>
      <div class="mr-3">
        <label class="block mb-1">To Date</label>
        <input
          type="date"
          placeholder="Search"
          class="px-4 py-2 border rounded"
          v-model="toDate"
        />
      </div>
      <div class="mr-3">
        <button
          type="button"
          class="px-4 py-2 bg-[#000180] text-white rounded-lg"
          @click="handleFilter"
        >
          Submit
        </button>
      </div>
      <div class="mr-3">
        <button
          type="button"
          class="px-4 py-2 bg-[#000180] text-white rounded-lg"
        >
          Print
        </button>
      </div>
      <div class="mr-3">
        <button
          type="button"
          class="px-4 py-2 bg-[#000180] text-white rounded-lg"
        >
          Excel Export
        </button>
      </div>
    </div>

    <!-- table -->
    <table
      class="table border-collapse border border-slate-400 w-full bg-white my-4"
    >
      <thead class="table-header">
        <tr>
          <th>Actions</th>
          <th>Sale Id</th>
          <th>Date</th>
          <th>Payment Method</th>
          <th>Items Purchased</th>
          <th>Sold By</th>
          <th>Sold To</th>
          <th>Subtotal</th>
          <th>Total</th>
          <th>Payment Type</th>
          <th>Comments</th>
          <th>Discount Reason</th>
          <th>Tier Name</th>
        </tr>
      </thead>
      <tbody class="table-body">
        <tr
          class="text-center"
          v-for="(data, index) in saleReport"
          :key="index"
        >
          <td>
            <button
              class="px-2 py-1 bg-[#000180] text-white rounded hover:bg-indigo-600 mr-2"
            >
              <EditOutlined class="align-middle" />
            </button>
            <button
              class="px-2 py-1 bg-[#000180] text-white rounded hover:bg-indigo-600 mr-2"
            >
              <PlusOutlined class="align-middle" />
            </button>
            <button
              class="px-2 py-1 bg-[#000180] text-white rounded hover:bg-indigo-600 mr-2"
            >
              <EyeOutlined class="align-middle" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </MainLayout>
</template>
