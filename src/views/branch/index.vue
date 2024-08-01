<script setup>
import MainLayout from "@/components/MainLayout.vue";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons-vue";

import branch from "@/stores/branch_api.js";
import { onMounted, ref } from "vue";

const isLoading = ref(false);
const branchData = ref([]);
const allBranchs = ref([]);
let page = ref(1);
let paginate = ref(10);

const deleteBranch = async (index) => {
  const branchId = branchData.value[index].id;
  try {
    const response = await branch.deleteBranch(branchId);
    branchData.value.splice(index, 1);
    allBranchs.value = branchData.value;
  } catch (error) {
    console.error("Failed to delete branch:", error);
  }
};

onMounted(() => getAllBranch());

const getAllBranch = async () => {
  const response = await branch.fetchBranchList(page.value, paginate.value);
  allBranchs.value = response.data.data;
  branchData.value = response.data.data;
  console.log(allBranchs.value.length);
};
const branchSearch = async (input) => {
  console.log(input);
  if (input) {
    const response = await branch.searchBranchList(input);
    allBranchs.value = response.data.data;
    branchData.value = response.data.data;
  } else {
    getAllBranch();
  }
};
const handlePagination = (pageNo) => {
  page.value = pageNo;
  getAllBranch();
};
</script>

<template>
  <MainLayout>
    <div class="flex justify-between mb-4">
      <input
        type="text"
        placeholder="Search Branch..."
        class="px-4 py-2 border rounded"
        @input="branchSearch($event?.target?.value)"
      />
      <router-link :to="{ name: 'branch-create' }">
        <button
          class="flex items-center px-4 py-2 bg-[#000180] text-white rounded hover:bg-indigo-600"
        >
          <PlusOutlined class="mr-2" />
          New Branch
        </button>
      </router-link>
    </div>
    <h6 class="font-medium">Branch ({{ allBranchs.length || 0 }})</h6>
    <table
      class="table border-collapse border border-slate-400 w-full bg-white my-4"
    >
      <thead class="table-header">
        <tr>
          <!-- <th>Actions</th> -->
          <th class="text-left">Organization Name</th>
          <th class="text-left">Branch</th>
          <th class="text-left">Address</th>
          <th class="text-left">Status</th>
        </tr>
      </thead>
      <tbody class="table-body">
        <tr v-if="isLoading">
          <td colspan="9" class="text-red-600">Loading . . .</td>
        </tr>
        <tr v-if="!isLoading && !branchData?.length">
          <td colspan="9" class="text-red-600">No Branch Found . . .</td>
        </tr>
        <tr
          v-for="(item, index) in branchData"
          :key="index"
          class="hover:bg-gray-100 transition-colors duration-200"
        >
          <!-- <td class="text-center">
            <button
              @click="
                $router.push({
                  name: 'branch-edit',
                  params: { id: item?.id },
                })
              "
              class="px-2 py-1 bg-[#000180] text-white rounded hover:bg-indigo-600 mr-2"
            >
              <EditOutlined class="align-middle" />
            </button>
            <button
              @click="deleteBranch(index)"
              class="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              <DeleteOutlined class="align-middle" />
            </button>
          </td> -->
          <td>{{ item.organization_name }}</td>
          <td>{{ item.branch }}</td>
          <td>{{ item.address }}</td>
          <td class="text-center">
            <button
              v-if="item.status === 1"
              class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Active
            </button>
            <button
              v-else
              class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Inactive
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <a-pagination
      v-model:current="page"
      v-model:page-size="paginate"
      :total="allBranchs?.total"
      :show-total="(total) => `Total ${total} items`"
      @change="handlePagination(page)"
    />
  </MainLayout>
</template>
