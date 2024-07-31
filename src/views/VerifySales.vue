<script setup>
import MainLayout from "@/components/MainLayout.vue";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons-vue";

import { useDataStore } from "@/stores/data";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";

const dataStore = useDataStore();
const { getSalesVerify } = dataStore;
const { isLoading } = storeToRefs(dataStore);

const filteredItems = ref(null);
const allItems = ref(null);
let page = ref(1);
let paginate = ref(10);

const deleteItem = (index) => {};

onMounted(() => {
  getAllProducts();
});
const getAllProducts = async () => {
  allItems.value = await getSalesVerify(page.value, paginate.value);
  filteredItems.value = allItems.value?.data;
};

console.log(filteredItems);
const productSearch = (input) => {
  if (input)
    filteredItems.value = allItems.value?.data?.filter((product) =>
      product.name.toLowerCase().includes(input.toLowerCase())
    );
  else filteredItems.value = allItems.value?.data;
};
const handlePagination = (pageNo) => {
  page.value = pageNo;

  getAllProducts();
};
</script>

<template>
  <MainLayout>
    <div class="flex justify-between mb-4">
        <div
          class="flex items-center px-4 py-2"
        >
        
        </div>
      <input
        type="text"
        placeholder="Search..."
        class="px-4 py-2 border rounded"
        @input="productSearch($event?.target?.value)"
      />
    </div>
        <table
            class="table border-collapse border border-slate-400 w-full bg-white mb-4"
          >
            <thead class="table-header">
              <tr>
                <th class="text-left">Suspended Sale ID</th>
                <th class="text-left">Date</th>
                <th class="text-left">Type</th>
                <th class="text-right">Sold By</th>
                <th class="text-right">Customer</th>
                <th class="text-left">Items</th>
                <th class="text-left">Total</th>
                <th class="text-right">Amount Paid</th>
                <th class="text-right">Last Payment Date</th>
                <th class="text-right">Amount Due</th>
                <th class="text-right">Comments</th>
                <th class="text-right">Unsuspend</th>
                <th class="text-right">Sales Receipt</th>
                <th class="text-right">Email Receipt</th>
              </tr>
            </thead>
            <tbody class="table-body">
        <tr v-if="isLoading">
          <td colspan="9" class="text-red-600">Loading . . .</td>
        </tr>
        <tr v-if="!isLoading && !filteredItems?.length">
          <td colspan="9" class="text-red-600">No Product Found . . .</td>
        </tr>
        <tr v-for="(item, index) in filteredItems" :key="index">
          <td>{{ item.id }}</td>
          <td>
            {{ item.sale_date }}
          </td>
          <td>
            
          </td>
          <td class="text-right">
            {{ item.sold_user ? item.sold_user.name : "N/A" }}
          </td>
          <td class="text-right">
            {{ item.customer_id }}
          </td>
          <td>
            {{ item.sale_products ? item.sale_products.name : "N/A" }}
          </td>
          <td class="text-right">
            {{ item.total }}
          </td>
          <td class="text-right">
            {{ item.paid_amount }}
          </td>
          <td>
            {{ item.sale_date }}
          </td>
          <td class="text-right">
            {{ item.amount_due }}
          </td>
          <td class="text-right">
            {{ item.comment_on_receipt }}
          </td>
          <td>

            <button class="flex items-center px-4 py-2 bg-red-600 text-white rounded hover:bg-indigo-600">Suspend</button>
           
          </td>
          <td>
            <button class="flex items-center px-4 py-2 bg-[#000180] text-white rounded hover:bg-indigo-600">Receipt</button>
          </td>
          <td class="text-right">
            
          </td>
        </tr>
      </tbody>
    </table>
    <a-pagination
      v-model:current="page"
      v-model:page-size="paginate"
      :total="allItems?.total"
      :show-total="(total) => `Total ${total} items`"
      @change="handlePagination(page)"
    />
  </MainLayout>
</template>


<style>
.loader {
  border: 8px solid #f3f3f3;
  border-top: 8px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
