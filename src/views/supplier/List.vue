<template>
  <MainLayout>
    <div class="flex justify-between mb-4">
      <input
        type="text"
        placeholder="Search..."
        class="px-4 py-2 border rounded"
        @input="handleSearch()"
        v-model="searchQuery"
      />
      <router-link :to="{ name: 'supplier-add' }">
        <button class="bg-[#000180] px-5 py-3 text-white" type="button">
          <i class="bi bi-plus"></i> <span>New Supplier</span>
        </button>
      </router-link>
    </div>
    <h1 class="font-medium mb-4">All Supplier</h1>
    <table
      class="table text-sm border-collapse border border-slate-400 w-full bg-white my-4"
    >
      <thead class="table-header">
        <tr>
          <th class="text-center">Actions</th>
          <th class="text-left">SL No</th>
          <th class="text-left">Name</th>
          <th class="text-left">Company Name</th>
          <th class="text-left">Address</th>
          <th class="text-left">Contact</th>
        </tr>
      </thead>
      <tbody class="table-body">
        <tr v-for="(item, index) in items" :key="index">
          <td class="text-center w-24 whitespace-nowrap">
            <button
              class="px-2 py-1 bg-[#000180] text-white rounded hover:bg-indigo-600 mr-2"
            >
              <EditOutlined class="align-middle" />
            </button>
            <button
              class="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              <DeleteOutlined class="align-middle" />
            </button>
          </td>
          <td>{{ index + 1 }}</td>
          <td>{{ item.first_name || "-" }}</td>
          <td>{{ item.company_name || "-" }}</td>
          <td>{{ item.address_1 || "-" }}</td>
          <td>{{ item.contact || "-" }}</td>
        </tr>
        <tr v-if="loading">
          <td colspan="2">Loading...</td>
        </tr>
      </tbody>
    </table>

    <div class="pagination">
      <button
        @click="prevPage"
        :disabled="currentPage === 1"
        type="button"
        class="text-white bg-blue-700 hover:bg-blue-800 disabled:bg-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Previous
      </button>
      <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        type="button"
        class="text-white bg-blue-700 hover:bg-blue-800 disabled:bg-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Next
      </button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
    </div>
  </MainLayout>
</template>

<script setup>
import MainLayout from "@/components/MainLayout.vue";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons-vue";
import supplier from "@/stores/supplier_api.js";
import { onMounted, ref, watch } from "vue";
import { useDataStore } from "@/stores/data";
import { storeToRefs } from "pinia";

const dataStore = useDataStore();
const { getProducts } = dataStore;
const { isLoading } = storeToRefs(dataStore);
const filteredItems = ref(null);
const allItems = ref(null);
let page = ref(1);
let paginate = ref(10);

const items = ref([]);
const currentPage = ref(1);
const searchQuery = ref();
const totalPages = ref(1);
const itemsPerPage = ref(10);
const loading = ref(false);

const fetchData = async (page, perPage) => {
  loading.value = true;
  try {
    const response = await supplier.fetchSupplierList(page, perPage);
    items.value = response.data.data;
    totalPages.value = response.data.last_page;
    itemsPerPage.value = response.data.per_page;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const handleSearch = () => {
  // currentPage.value = 1;
};

watch([currentPage, itemsPerPage], () => {
  fetchData(currentPage.value, itemsPerPage.value);
});

onMounted(() => {
  fetchData(currentPage.value, itemsPerPage.value);
});
const handlePagination = (pageNo) => {
  currentPage.value = pageNo;

  fetchData(currentPage.value, itemsPerPage.value);
};
</script>
