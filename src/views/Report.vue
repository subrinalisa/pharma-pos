<script setup>
import MainLayout from "@/components/MainLayout.vue";
import { ref } from "vue";
</script>

<template>
  <MainLayout>
    <h6 class="font-medium mb-4">Reports</h6>
    <div class="flex justify-between">
      <input
        type="text"
        placeholder="Search"
        class="px-4 py-2 border rounded"
      />
      <button
        type="button"
        class="px-4 py-2 bg-[#000180] text-white rounded-lg"
      >
        Excel Export
      </button>
      <button
        type="button"
        class="px-4 py-2 bg-[#000180] text-white rounded-lg"
      >
        Print
      </button>
      <button
        type="button"
        class="px-4 py-2 bg-[#000180] text-white rounded-lg"
      >
        PDF Download
      </button>
    </div>
    <!-- table -->
    <table
      class="table border-collapse border border-slate-400 w-full bg-white my-4"
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
