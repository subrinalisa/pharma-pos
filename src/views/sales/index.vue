<template>
  <MainLayout>
    <div class="flex justify-between mb-4">
      <input
        type="text"
        placeholder="Search Sales..."
        class="px-4 py-2 border rounded"
        @input="searchList($event?.target?.value)"
      />
      <router-link :to="{ name: 'sales-create' }">
        <button
          class="flex items-center px-4 py-2 bg-[#000180] text-white rounded hover:bg-indigo-600"
        >
          <PlusOutlined class="mr-2" />
          New Sales
        </button>
      </router-link>
    </div>
    <!-- Table -->
    <table
      class="table text-sm border-collapse border border-slate-400 w-full bg-white my-4"
    >
      <thead class="table-header">
        <tr>
          <!-- <th>Actions</th> -->
          <th class="text-left">ID</th>
          <th class="text-left">sale code</th>
          <th class="text-left">sale date</th>
          <th class="text-right">total</th>
          <th class="text-right">total paid</th>
          <th class="text-right">total due</th>
          <th class="text-left">payment method</th>
          <th class="text-left">customer</th>
          <th class="text-left">Seller</th>
          <th class="text-left">branch</th>
          <th class="text-center">note</th>
        </tr>
      </thead>

      <tbody class="table-body">
        <tr>
          <td colspan="12" v-if="isLoading">Loading . . .</td>
        </tr>

        <tr v-for="(item, index) in allData?.data" :key="index">
          <!-- <td class="text-center w-24 whitespace-nowrap">
            <button
              @click="
                $router.push({
                  name: 'sales-edit',
                  params: { id: item?.id },
                })
              "
              class="px-2 py-1 bg-[#000180] text-white rounded hover:bg-indigo-600 mr-2 disabled:bg-gray-800"
            >
              <EditOutlined class="align-middle" />
            </button>
          </td> -->
          <td>{{ item?.id }}</td>
          <td>{{ item?.sale_code }}</td>
          <td>{{ moment(item?.sale_date).format("L") }}</td>
          <td class="text-right">{{ Number(item?.total)?.toFixed(2) }}</td>
          <td class="text-right">
            {{ Number(item?.paid_amount)?.toFixed(2) }}
          </td>
          <td class="text-right">{{ Number(item?.amount_due)?.toFixed(2) }}</td>
          <td>{{ item.payment_method?.name }}</td>
          <td>{{ item?.customer?.first_name }}</td>
          <td>{{ item?.sold_user?.name }}</td>
          <td>
            {{ item.branch?.organization_name }} -
            {{ item.branch?.branch }}
          </td>
          <td>{{ item.note }}</td>
        </tr>
      </tbody>
    </table>
    <a-pagination
      v-if="allData?.last_page > 1"
      v-model:current="page"
      v-model:page-size="limit"
      :total="allData?.total"
      :show-total="(total) => `Total ${total} items`"
      @change="handlePagination(page)"
    />
  </MainLayout>
</template>

<script setup>
import MainLayout from "@/components/MainLayout.vue";
import { useDataStore } from "@/stores/data";
import { PlusOutlined, EditOutlined } from "@ant-design/icons-vue";
import moment from "moment";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";

const dataStore = useDataStore();
const { isLoading } = storeToRefs(dataStore);
const { getSalesList } = dataStore;

const allData = ref();
const backupData = ref();

const page = ref(1);
const limit = ref(10);

onMounted(() => fetchList(page.value, ""));

const fetchList = async (page) => {
  backupData.value = await getSalesList(page, "");
  allData.value = backupData.value;
};
const handlePagination = (pageNo) => {
  page.value = pageNo;
  fetchList(page.value);
};
const searchList = async (query) => {
  if (!query) allData.value = backupData.value;
  allData.value = await getSalesList("", query);
};
</script>
