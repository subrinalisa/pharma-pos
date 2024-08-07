<script setup>
import MainLayout from "@/components/MainLayout.vue";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons-vue";
const isLoading = ref(false);
import customer from "@/stores/customer_api.js";
import { onMounted, ref } from "vue";

const customerData = ref([]);
const allItems = ref([]);
let page = ref(1);
let paginate = ref(10);

onMounted(() => getAllCustomers());

const getAllCustomers = async () => {
  const response = await customer.fetchCustomerList(page.value, paginate.value);
  allItems.value = response.data.data;
  customerData.value = response.data.data;
  console.log(allItems.value.length);
};
const customerSearch = async (input) => {
  console.log(input);
  if (input) {
    const response = await customer.searchCustomerList(input);
    allItems.value = response.data.data;
    customerData.value = response.data.data;
  } else {
    getAllCustomers();
  }
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
    <h6 class="font-medium">Customers ({{ allItems.length || 0 }})</h6>
    <table
      class="table text-sm border-collapse border border-slate-400 w-full bg-white my-4"
    >
      <thead class="table-header">
        <tr>
          <!-- <th>Actions</th> -->
          <th class="text-left">Name</th>
          <th class="text-left">Account No</th>
          <th class="text-left">Company Name</th>
          <th class="text-left">Contact</th>
          <th class="text-center">Balance</th>
          <th class="text-center">MRR</th>
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
          <!-- <td class="text-center w-24 whitespace-nowrap">
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
          </td> -->
          <td>{{ item.first_name }}</td>
          <td>{{ item.account_no }}</td>
          <td>{{ item.company_name }}</td>
          <td>{{ item.contact }}</td>
          <td class="text-right">{{ item.store_account_balance }}</td>
          <td class="text-right">{{ item.mrr }}</td>
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
