<template>
  <MainLayout>
    <div class="flex justify-between mb-4">
      <input
        type="text"
        placeholder="Search Purchase..."
        class="px-4 py-2 border rounded"
        @input="searchList($event?.target?.value)"
      />
      <router-link :to="{ name: 'purchases-create' }">
        <button
          class="flex items-center px-4 py-2 bg-[#000180] text-white rounded hover:bg-indigo-600"
        >
          <PlusOutlined class="mr-2" />
          New Purchase
        </button>
      </router-link>
    </div>
    <!-- Table -->
    <table
      class="table text-sm border-collapse border border-slate-400 w-full bg-white my-4"
    >
      <thead class="table-header">
        <tr>
          <th>Actions</th>
          <th class="text-left">ID</th>
          <th class="text-left">purchase code</th>
          <th class="text-left">purchase date</th>
          <th class="text-right">total Price</th>
          <th class="text-left">payment method</th>
          <th class="text-left">supplier</th>
          <th class="text-left">mrr</th>
          <th class="text-left">branch</th>

          <th class="text-center">note</th>
        </tr>
      </thead>

      <tbody class="table-body">
        <tr>
          <td v-if="isListing">Loading . . .</td>
        </tr>
        <tr>
          <td v-if="!isListing && allData?.total <= 0">No Data Found</td>
        </tr>
        <tr v-for="(item, index) in allData?.data" :key="index">
          <td class="text-center w-24 whitespace-nowrap">
            <button
              @click="
                $router.push({
                  name: 'purchase-edit',
                  params: { id: item?.id },
                })
              "
              class="px-2 py-1 bg-[#000180] text-white rounded hover:bg-indigo-600 mr-2 disabled:bg-gray-800"
              :disabled="!item?.is_editable"
            >
              <EditOutlined class="align-middle" />
            </button>
          </td>
          <td>{{ item.id }}</td>
          <td>{{ item.purchase_code }}</td>
          <td>{{ item.purchase_date }}</td>
          <td class="text-right">{{ item.total }}</td>
          <td>{{ findById(paymentList, item.payment_method_id)?.name }}</td>
          <td>{{ findById(list.supplier, item.supplier_id)?.company_name }}</td>
          <td>{{ findById(list.mrr, item.mrr_id)?.name }}</td>
          <td>
            {{ findById(list.branch, item.branch_id)?.organization_name }} -
            {{ findById(list.branch, item.branch_id)?.branch }}
          </td>
          <td>{{ item.note }}</td>
        </tr>
      </tbody>
    </table>
    <a-pagination
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
import { storeToRefs } from "pinia";
import { onMounted, reactive, ref } from "vue";

const dataStore = useDataStore();
const { paymentList, isListing } = storeToRefs(dataStore);
const { getPurchaseList, getPayment, getSupplier, getMRR, getBranch } =
  dataStore;

const allData = ref();
const backupData = ref();

let list = reactive({
  supplier: null,
  mrr: null,
  branch: null,
});

const page = ref(1);
const limit = ref(10);

const findById = (data, id) => {
  return data.find((item) => item?.id == id);
};

onMounted(async () => {
  await getPayment();
  list.supplier = await getSupplier();
  list.mrr = await getMRR();
  list.branch = await getBranch();
  fetchList(page.value, "");
});
const fetchList = async (page) => {
  backupData.value = await getPurchaseList(page, "");
  allData.value = backupData.value;
};
const handlePagination = (pageNo) => {
  page.value = pageNo;
  fetchList(page.value);
};
const searchList = async (query) => {
  if (!query) allData.value = backupData.value;
  allData.value = await getPurchaseList("", query);
};
</script>
