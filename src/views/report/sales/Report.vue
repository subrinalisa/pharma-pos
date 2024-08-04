<script setup>
import MainLayout from "@/components/MainLayout.vue";
import { useDataStore } from "@/stores/data";
import reportSalesApi from "@/stores/report_sales_api.js";
import { EyeOutlined, PlusOutlined } from "@ant-design/icons-vue";
import moment from "moment";
import { ref } from "vue";
import * as XLSX from "xlsx";

const dataStore = useDataStore();
const { getSaleReport } = dataStore;

const saleReport = ref(null);
const summaryReport = ref(null);
const fromDate = ref("2024-07-01");
const toDate = ref("2024-07-31");
const showProducts = ref(null);

const genereate = ref(true);
const summery = ref(false);
const graphical = ref(false);
const excel = ref(false);
const chartOptions = ref({
  chart: {
    type: "line",
    height: 380,
  },
  xaxis: {
    type: "category",
    group: {
      style: {
        fontSize: "10px",
        fontWeight: 700,
      },
      groups: [
        { title: "2019", cols: 4 },
        { title: "2020", cols: 4 },
      ],
    },
  },
  title: {
    text: "Monthly Sales",
  },
  tooltip: {},
});

const data = ref([
  {
    x: "2024-01-01",
    y: 34.0,
  },
]);

const series = ref([
  {
    name: "sales",
    data: data.value,
  },
]);

const handleFilter = async () => {
  handleviewGenereate();
  saleReport.value = await getSaleReport(fromDate.value, toDate.value);
};
const handleSummery = async () => {
  handleviewSummery();
  const response = await reportSalesApi.fetchSummeryData(
    fromDate.value,
    toDate.value
  );
  console.log("sales", response.data.sales);
  summaryReport.value = response.data.sales;
};
const handleGraphical = async () => {
  handleviewGraphical();
  const response = await reportSalesApi.fetchGraphicalData(
    fromDate.value,
    toDate.value
  );
  console.log(response.data.sales);
  data.value = response.data.sales;
};

const handleviewGraphical = async () => {
  genereate.value = false;
  graphical.value = true;
  summery.value = false;
  excel.value = false;
};
const handleviewSummery = async () => {
  genereate.value = false;
  graphical.value = false;
  summery.value = true;
  excel.value = false;
};

const handleviewGenereate = async () => {
  genereate.value = true;
  graphical.value = false;
  summery.value = false;
  excel.value = true;
};

const exportToExcel = () => {
  const worksheet = XLSX.utils.json_to_sheet(
    saleReport.value.sales.map((sale) => ({
      "Sale Id": sale?.id,
      Date: sale?.sale_date,
      "Payment Method": sale?.payment_method_id,
      "Items Purchased": sale?.sale_products?.length,
      "Sold By": sale?.sold_user.name,
      Subtotal: sale?.sub_total,
      Total: sale?.total,
      "Payment Type": sale?.payment_method?.name,
      Comments: sale?.comment_on_receipt,
      "Discount Reason": sale?.note,
      "Tier Name": sale?.item_tiers,
    }))
  );

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sales Report");

  // Export the file
  XLSX.writeFile(workbook, "SalesReport.xlsx");
};
</script>

<template>
  <MainLayout>
    <h6 class="font-medium mb-4">Reports</h6>

    <!-- Filter -->
    <div class="flex items-end">
      <div class="mr-3">
        <label class="block mb-1">From Date</label>
        <input
          type="date"
          placeholder="Search"
          class="px-4 py-2 border rounded"
          v-model="fromDate"
        />
      </div>
      <div class="mr-3">
        <label class="block mb-1">To Date</label>
        <input
          type="date"
          placeholder="Search"
          class="px-4 py-2 border rounded"
          v-model="toDate"
        />
      </div>
      <div class="mr-3">
        <button
          type="button"
          class="px-4 py-2 bg-[#000180] text-white rounded-lg"
          @click="handleFilter"
        >
          Generate Report
        </button>
      </div>
      <!-- <div class="mr-3">
        <button
          type="button"
          class="px-4 py-2 bg-[#000180] text-white rounded-lg"
        >
          Print
        </button>
      </div> -->
      <div class="mr-3" v-if="excel">
        <button
          type="button"
          class="px-4 py-2 bg-green-700 text-white rounded-lg"
          @click="exportToExcel"
        >
          Excel Export
        </button>
      </div>
      <div class="mr-3">
        <button
          type="button"
          class="px-4 py-2 bg-[#49a5f0fb] text-white rounded-lg"
          @click="handleSummery"
        >
          Sales Summary
        </button>
      </div>
      <div class="mr-3">
        <button
          type="button"
          class="px-4 py-2 bg-amber-600 text-white rounded-lg"
          @click="handleGraphical"
        >
          Sales Graphical
        </button>
      </div>
    </div>
    <div></div>
    <div v-if="genereate">
      <!-- table -->
      <table
        class="table text-sm border-collapse border border-slate-400 w-full bg-white my-4"
      >
        <thead class="table-header">
          <tr>
            <th>Actions</th>
            <th>Sale Id</th>
            <th>Date</th>
            <th>Payment Method</th>
            <th>Items Purchased</th>
            <th>Sold By</th>
            <th>Sold To</th>
            <th class="text-right">Subtotal</th>
            <th class="text-right">Total</th>
            <th>Payment Type</th>
            <th>Comments</th>
            <th>Discount Reason</th>
            <th>Tier Name</th>
          </tr>
        </thead>
        <tbody
          class="table-body"
          v-for="(data, index) in saleReport?.sales"
          :key="index"
        >
          <tr class="text-center">
            <td>
              <!-- <button
              class="px-2 py-1 bg-green-600 text-white rounded hover:bg-indigo-600 mr-2"
            >
              <EditOutlined class="align-middle" />
            </button> -->
              <button
                class="px-2 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-600 mr-2"
                title="Show Products"
                @click="showProducts = data?.id"
              >
                <PlusOutlined class="align-middle" />
              </button>
              <button
                class="px-2 py-1 bg-[#000180] text-white rounded hover:bg-indigo-600 mr-2"
                title="Show Receipt"
                @click="
                  $router.push({
                    name: 'report-invoice',
                    params: { id: data?.id },
                  })
                "
              >
                <EyeOutlined class="align-middle" />
              </button>
            </td>
            <td>{{ data?.id }}</td>
            <td>{{ moment(data?.sale_date).format("YYYY-MM-DD") }}</td>
            <td>{{ data?.payment_method_id || "-" }}</td>
            <td>{{ data?.sale_products?.length }}</td>
            <td class="capitalize">{{ data?.sold_user?.name }}</td>
            <td>{{ "-" }}</td>
            <td class="text-right">{{ data?.sub_total }}</td>
            <td class="text-right">{{ data?.total }}</td>
            <td>{{ data?.payment_method?.name || "-" }}</td>
            <td>{{ data?.comment_on_receipt }}</td>
            <td>{{ data?.note }}</td>
            <td>{{ data?.item_tiers || "-" }}</td>
          </tr>
          <template v-if="data?.id == showProducts">
            <tr class="text-left whitespace-nowrap">
              <th>Product ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Size</th>
              <th>Supplier</th>
              <th>Manufacture</th>
              <th>Description</th>
              <th class="text-right">Selling Price</th>
              <th class="text-right">Quantity</th>
              <th class="text-right">Subtotal</th>
              <th class="text-right">Total</th>
              <th colspan="2">Discount</th>
            </tr>
            <tr v-if="!data?.sale_products?.length">
              <td colspan="13">No Product</td>
            </tr>
            <tr v-for="product in data?.sale_products" :key="data?.id">
              <td>{{ product?.product_id }}</td>
              <td>{{ product?.product_name }}</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td class="text-right">{{ product?.price }}</td>
              <td class="text-right">{{ product?.quantity }}</td>
              <td class="text-right">{{ product?.price }}</td>
              <td class="text-right">{{ product?.price }}</td>
              <td colspan="2">{{ product?.discount_percent || "-" }}</td>
            </tr></template
          >
        </tbody>
        <tbody v-if="!saleReport?.sales?.length">
          <tr>
            <td colspan="13">No Data...</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="summery">
      <!-- table -->
      <table
        class="table text-sm border-collapse border border-slate-400 w-full bg-white my-4"
      >
        <thead class="table-header">
          <tr>
            <th>Date</th>
            <th>Total Sales</th>
            <th>Per Time period</th>
            <th>sub_total</th>
          </tr>
        </thead>
        <tbody
          class="table-body"
          v-for="(data, index) in summaryReport"
          :key="index"
        >
          <tr class="text-center">
            <td>{{ moment(data?.sale_date).format("YYYY-MM-DD") }}</td>
            <td class="text-right">{{ data?.total_sales }}</td>
            <td>{{ data?.sales_per_time_period }}</td>
            <td class="text-right">{{ data?.sub_total }}</td>
          </tr>
        </tbody>
        <tbody v-if="!summaryReport?.length">
          <tr>
            <td colspan="13">No Data...</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="graphical">
      <div class="bg-white mt-3 p-3 rounded">
        <apexchart
          type="line"
          height="380"
          :options="chartOptions"
          :series="series"
        ></apexchart>
      </div>
    </div>
  </MainLayout>
</template>
