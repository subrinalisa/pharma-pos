<script>
import { apiBase } from "@/config";
import axios from "axios";
import Cookies from "js-cookie";
import MainLayout from "@/components/MainLayout.vue";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons-vue";

export default {
  components: {
    MainLayout,
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
  },
  data() {
    return {
      items: [],
      currentPage: 1,
      totalPages: 1,
      searchQuery: "",
    };
  },
  computed: {
    filteredItems() {
      if (this.searchQuery.trim() === "") {
        return this.items;
      }
      return this.items.filter(item => 
        item.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        item.upc_ean_isbn.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        (item.category && item.category.name.toLowerCase().includes(this.searchQuery.toLowerCase())) ||
        item.supplier && `${item.supplier.first_name} ${item.supplier.last_name}`.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    async fetchItems(page = 1) {
      try {
        const token = Cookies.get("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(
          `${apiBase}/all-products-paginated?page=${page}`,
          config
        );
        this.items = response.data.data;
        this.totalPages = response.data.meta.last_page;
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    },
    addItem() {
      console.log("Add new item");
    },
    editItem(index) {
      console.log("Edit item", index);
    },
    deleteItem(index) {
      console.log("Delete item", index);
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.fetchItems(this.currentPage);
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.fetchItems(this.currentPage);
      }
    },
  },
  mounted() {
    this.fetchItems();
  },
};
</script>

<template>
  <MainLayout>
    <div class="flex justify-between mb-4">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search..."
        class="px-4 py-2 border rounded"
      />
      <router-link :to="{ name: 'item-add' }">
        <button @click="addItem" class="flex items-center px-4 py-2 bg-[#000180] text-white rounded hover:bg-blue-600">
          <PlusOutlined class="mr-2" />
          New Item
        </button>
      </router-link>
    </div>
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white">
        <thead>
          <tr>
            <th class="py-2 px-4 bg-gray-200 text-gray-600 border-b border-gray-200 text-left text-sm uppercase font-normal">Actions</th>
            <th class="py-2 px-4 bg-gray-200 text-gray-600 border-b border-gray-200 text-left text-sm uppercase font-normal">UPC/EAN/ISBN</th>
            <th class="py-2 px-4 bg-gray-200 text-gray-600 border-b border-gray-200 text-left text-sm uppercase font-normal">Name</th>
            <th class="py-2 px-4 bg-gray-200 text-gray-600 border-b border-gray-200 text-left text-sm uppercase font-normal">Category Full Path</th>
            <th class="py-2 px-4 bg-gray-200 text-gray-600 border-b border-gray-200 text-left text-sm uppercase font-normal">Selling Price</th>
            <th class="py-2 px-4 bg-gray-200 text-gray-600 border-b border-gray-200 text-left text-sm uppercase font-normal">Quantity</th>
            <th class="py-2 px-4 bg-gray-200 text-gray-600 border-b border-gray-200 text-left text-sm uppercase font-normal">Supplier</th>
            <th class="py-2 px-4 bg-gray-200 text-gray-600 border-b border-gray-200 text-left text-sm uppercase font-normal">Product ID</th>
            <th class="py-2 px-4 bg-gray-200 text-gray-600 border-b border-gray-200 text-left text-sm uppercase font-normal">Location Cost Price</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in filteredItems" :key="index">
            <td class="py-2 px-4 border-b border-gray-200">
              <div class="flex space-x-2">
                <button @click="editItem(index)" class="px-2 py-1 bg-[#000180] text-white rounded hover:bg-yellow-600">
                  <EditOutlined />
                </button>
                <button @click="deleteItem(index)" class="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                  <DeleteOutlined />
                </button>
              </div>
            </td>
            <td class="py-2 px-4 border-b border-gray-200">{{ item.upc_ean_isbn }}</td>
            <td class="py-2 px-4 border-b border-gray-200">{{ item.name }}</td>
            <td class="py-2 px-4 border-b border-gray-200">{{ item.category ? item.category.name : 'N/A' }}</td>
            <td class="py-2 px-4 border-b border-gray-200">{{ item.sellingPrice }}</td>
            <td class="py-2 px-4 border-b border-gray-200">{{ item.quantity }}</td>
            <td class="py-2 px-4 border-b border-gray-200">{{ item.supplier ? item.supplier.first_name + ' ' + item.supplier.last_name : 'N/A' }}</td>
            <td class="py-2 px-4 border-b border-gray-200">{{ item.product_id }}</td>
            <td class="py-2 px-4 border-b border-gray-200">{{ item.locationCostPrice }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="flex justify-between mt-4">
      <button @click="prevPage" :disabled="currentPage === 1" class="px-4 py-2 bg-gray-200 text-gray-600 rounded hover:bg-gray-300">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages" class="px-4 py-2 bg-gray-200 text-gray-600 rounded hover:bg-gray-300">Next</button>
    </div>
  </MainLayout>
</template>

<style scoped>
/* Add any additional styling here */
</style>
