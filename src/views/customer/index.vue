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
const { getCustomers } = dataStore;
const { isLoading } = storeToRefs(dataStore);

const customerData = ref(null);
const allItems = ref(null);
let page = ref(1);
let paginate = ref(10);

const deleteItem = (index) => {};

onMounted(() => getAllCustomers());

const getAllCustomers = async () => {
  allItems.value = await getCustomers(page.value, paginate.value);
  customerData.value = allItems.value?.data;
};
const customerSearch = (input) => {
  if (input)
    customerData.value = allItems.value?.data?.filter((customer) =>
      customer.name.toLowerCase().includes(input.toLowerCase())
    );
  else customerData.value = allItems.value?.data;
};
const handlePagination = (pageNo) => {
  page.value = pageNo;
  getAllCustomers();
};
</script>

<template>
  <MainLayout>
    <div class="flex justify-between mb-4">
      <input
        type="text"
        placeholder="Search Customer..."
        class="px-4 py-2 border rounded"
        @input="customerSearch($event?.target?.value)"
      />
      <router-link :to="{ name: 'customer-create' }">
        <button
          class="flex items-center px-4 py-2 bg-[#000180] text-white rounded hover:bg-indigo-600"
        >
          <PlusOutlined class="mr-2" />
          New Customer
        </button>
      </router-link>
    </div>
    <h6 class="font-medium">Customers ({{ allItems?.data?.length || 0 }})</h6>
    <table
      class="table border-collapse border border-slate-400 w-full bg-white my-4"
    >
      <thead class="table-header">
        <tr>
          <th>Actions</th>
          <th class="text-left">Name</th>
          <th class="text-left">Person ID</th>
          <th class="text-left">Email</th>
          <th class="text-left">Contact</th>
          <th class="text-right">Balance</th>
          <th class="text-left">MRR</th>
        </tr>
      </thead>
      <tbody class="table-body">
        <tr v-if="isLoading">
          <td colspan="9" class="text-red-600">Loading . . .</td>
        </tr>
        <tr v-if="!isLoading && !customerData?.length">
          <td colspan="9" class="text-red-600">No Customer Found . . .</td>
        </tr>
        <tr v-for="(item, index) in customerData" :key="index">
          <td class="text-center">
            <button
              @click="
                $router.push({
                  name: 'customer-edit',
                  params: { id: item?.id },
                })
              "
              class="px-2 py-1 bg-[#000180] text-white rounded hover:bg-indigo-600 mr-2"
            >
              <EditOutlined class="align-middle" />
            </button>
            <button
              @click="deleteItem(index)"
              class="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              <DeleteOutlined class="align-middle" />
            </button>
          </td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
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
