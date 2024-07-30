<template>
  <MainLayout>
    <div class="grid grid-cols-4 gap-4 p-10">
      <div class="col-span-3">
        <form class="flex mb-4" @submit.prevent="console.log('hello')">
          <a-dropdown :trigger="['click']">
            <input
              @input="handleSearch()"
              v-model="searchQuery"
              type="text"
              placeholder="Search Suppliers"
              class="bg-white px-3 py-3 outline-none shadow-inner border border-slate-300 text-black w-50"
            />
            <template #overlay>
              <a-menu class="max-h-80 overflow-y-auto">
                <a-menu-item>
                  <div class="flex">
                    <div class="mr-3">
                      <a-avatar :size="32">
                        <!-- <PictureOutlined class="align-middle mb-2" /> -->
                      </a-avatar>
                    </div>
                    <div>
                      <h6 class="font-bold">
                        Lorem ipsum dolor sit amet consectetur.
                      </h6>
                      <p class="text-gray-500">
                        Item: lorem 200ml; Size: 30gm; Category:
                        <span class="text-green-600">oral</span>; Qty:
                        <span class="text-green-600">2</span>
                      </p>
                    </div>
                  </div>
                </a-menu-item>
                <!--/ a-menu-item -->
              </a-menu>
            </template>
          </a-dropdown>

          <button
            class="bg-[#000180] px-5 py-1 text-white min-w-fit"
            type="button"
          >
            <i class="bi bi-search mr-2"></i> <span>Search</span>
          </button>
        </form>
      </div>
      <div class="col-span-1 text-right">
        <router-link :to="{ name: 'supplier-add' }">
          <button class="bg-[#000180] px-5 py-3 text-white" type="button">
            <i class="bi bi-plus"></i> <span>New Supplier</span>
          </button>
        </router-link>
      </div>

      <div class="col-span-12">
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table
            class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
          >
            <thead
              class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            >
              <tr>
                <th class="text-left">SL No</th>
                <th class="text-left">Name</th>
                <th class="text-left">Company Name</th>
                <th class="text-left">Address</th>
                <th class="text-left">Contact</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in items" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ item.first_name || "-" }}</td>
                <td>{{ item.company_name || "-" }}</td>
                <td>{{ item.address_1 || "-" }}</td>
                <td>{{ item.contact || "-" }}</td>
              </tr>
              <tr v-if="loading">
                <td colspan="2" class="loader">Loading...</td>
              </tr>
            </tbody>
          </table>
        </div>
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
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import MainLayout from "@/components/MainLayout.vue";
import supplier from "@/stores/supplier_api.js";
import { onMounted, ref, watch } from "vue";
import { PictureOutlined } from "@ant-design/icons-vue";
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

const handlePerPageChange = () => {
  currentPage.value = 1;
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

// export default {
//   name: "PaginatedTable",
//   setup() {
//     const items = ref([]);
//     const currentPage = ref(1);
//     const totalPages = ref(1);
//     const itemsPerPage = ref(10);
//     const loading = ref(false);

//     const fetchData = async (page, perPage) => {
//       loading.value = true;
//       try {
//         const response = await supplier.fetchSupplierList(page, perPage);
//         items.value = response.data.data;
//         totalPages.value = response.data.last_page;
//         itemsPerPage.value = response.data.per_page;
//       } catch (error) {
//         console.error(error);
//       } finally {
//         loading.value = false;
//       }
//     };

//     const nextPage = () => {
//       if (currentPage.value < totalPages.value) {
//         currentPage.value++;
//       }
//     };

//     const prevPage = () => {
//       if (currentPage.value > 1) {
//         currentPage.value--;
//       }
//     };

//     const handlePerPageChange = () => {
//       currentPage.value = 1;
//     };

//     watch([currentPage, itemsPerPage], () => {
//       fetchData(currentPage.value, itemsPerPage.value);
//     });

//     onMounted(() => {
//       fetchData(currentPage.value, itemsPerPage.value);
//     });

//     return {
//       items,
//       currentPage,
//       totalPages,
//       itemsPerPage,
//       nextPage,
//       prevPage,
//       handlePerPageChange,
//       loading,
//     };
//   },
// };
</script>
<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  background-color: #f4f4f4;
}

.pagination {
  margin-top: 20px;
}

button {
  padding: 10px 20px;
  margin: 0 5px;
  border: #ddd;
}
</style>
