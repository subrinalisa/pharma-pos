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
const { getProducts } = dataStore;
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
  allItems.value = await getProducts(page.value, paginate.value);
  filteredItems.value = allItems.value?.data;
};
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
      <input
        type="text"
        placeholder="Search..."
        class="px-4 py-2 border rounded"
        @input="productSearch($event?.target?.value)"
      />
      <router-link :to="{ name: 'item-add' }">
        <button
          class="flex items-center px-4 py-2 bg-[#000180] text-white rounded hover:bg-indigo-600"
        >
          <PlusOutlined class="mr-2" />
          New Item
        </button>
      </router-link>
    </div>
    <h1 class="font-medium mb-4">All Products ({{ allItems?.total || 0 }})</h1>
    <table
      class="table text-sm border-collapse border border-slate-400 w-full bg-white mb-4"
    >
      <thead class="table-header">
        <tr>
          <th>Actions</th>
          <th class="text-left">Name</th>
          <th class="text-left">UPC/EAN/ISBN</th>
          <th class="text-left">Category</th>
          <th class="text-right">Price</th>
          <th class="text-right">Quantity</th>
          <th class="text-left">Supplier</th>
          <th class="text-left">Product ID</th>
          <th>Location Cost Price</th>
        </tr>
      </thead>
      <tbody class="table-body">
        <tr v-if="!isLoading && !filteredItems?.length">
          <td colspan="9" class="text-red-600">No Product Found . . .</td>
        </tr>
        <tr v-for="(item, index) in filteredItems" :key="index">
          <td class="text-center w-24 whitespace-nowrap">
            <button
              @click="
                $router.push({ name: 'item-edit', params: { id: item?.id } })
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

          <td>{{ item.name }}</td>
          <td>
            {{ item.upc_ean_isbn || "-" }}
          </td>
          <td>
            {{ item.category ? item.category.name : "N/A" }}
          </td>
          <td class="text-right">
            {{ item?.product_prices?.selling_price || "0.00" }}
          </td>
          <td class="text-right">
            {{ item?.pack_size?.quantity || "0.00" }}
          </td>
          <td>
            {{
              item.supplier
                ? item.supplier.first_name + " " + item.supplier.last_name
                : "N/A"
            }}
          </td>
          <td>
            {{ item.product_id || "-" }}
          </td>
          <td class="text-center">
            {{ item.locationCostPrice || "Not Set" }}
          </td>
        </tr>
        <tr v-if="isLoading">
          <td colspan="9" class="text-red-600">Loading . . .</td>
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
