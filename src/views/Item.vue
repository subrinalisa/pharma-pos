<script>
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
      items: [
        {
          upc: "123456789012",
          name: "Product A",
          category: "Category A > Subcategory A1",
          sellingPrice: "$10.00",
          quantity: 100,
          supplier: "Supplier A",
          productId: "A001",
          locationCostPrice: "$8.00",
        },
        {
          upc: "123456789013",
          name: "Product B",
          category: "Category B > Subcategory B1",
          sellingPrice: "$20.00",
          quantity: 50,
          supplier: "Supplier B",
          productId: "B001",
          locationCostPrice: "$15.00",
        },
        {
          upc: "123456789014",
          name: "Product C",
          category: "Category C > Subcategory C1",
          sellingPrice: "$30.00",
          quantity: 200,
          supplier: "Supplier C",
          productId: "C001",
          locationCostPrice: "$25.00",
        },
      ],
    };
  },
  methods: {
    addItem() {
      // Add your logic to add a new item here
      console.log("Add new item");
    },
    editItem(index) {
      // Add your logic to edit an item here
      console.log("Edit item", index);
    },
    deleteItem(index) {
      // Add your logic to delete an item here
      console.log("Delete item", index);
    },
  },
};
</script>

<template>
  <MainLayout>
    <div class="flex justify-end mb-4">
      <router-link :to="{ name: 'item-add'}">
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
          <tr v-for="(item, index) in items" :key="index">
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
            <td class="py-2 px-4 border-b border-gray-200">{{ item.upc }}</td>
            <td class="py-2 px-4 border-b border-gray-200">{{ item.name }}</td>
            <td class="py-2 px-4 border-b border-gray-200">{{ item.category }}</td>
            <td class="py-2 px-4 border-b border-gray-200">{{ item.sellingPrice }}</td>
            <td class="py-2 px-4 border-b border-gray-200">{{ item.quantity }}</td>
            <td class="py-2 px-4 border-b border-gray-200">{{ item.supplier }}</td>
            <td class="py-2 px-4 border-b border-gray-200">{{ item.productId }}</td>
            <td class="py-2 px-4 border-b border-gray-200">{{ item.locationCostPrice }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </MainLayout>
</template>

<style scoped>
/* Add any additional styling here */
</style>
