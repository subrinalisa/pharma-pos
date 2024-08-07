<script setup>
import MainLayout from "@/components/MainLayout.vue";
import moment from "moment";
import { useDataStore } from "@/stores/data";
import { PictureOutlined, UserOutlined } from "@ant-design/icons-vue";
import { storeToRefs } from "pinia";
import { nextTick, ref, reactive, watch, onMounted } from "vue";
import { imgBase } from "@/config";
import { showNotification } from "@/utilities/notification";
import router from "@/router";

const dataStore = useDataStore();
const { paymentList, userInfo } = storeToRefs(dataStore);
const {
  getProduct,
  getSupplier,
  getBranch,
  getMRR,
  getPayment,
  purchaseInsert,
} = dataStore;
const searchProduct = ref(null);
const supplierList = ref(null);
const branchList = ref(null);
const branch_id = ref("");
const branchInput = ref("");
const mrrList = ref(null);
const mrrName = ref(null);
const mrrID = ref(null);
const gatisPercentage = ref(null);
const gatisAmount = ref(null);
const supplierInfo = ref();
const searchInput = ref(null);
const mrrInput = ref(null);
const supplierInput = ref(null);
const productQuantity = ref(null);
const paymentIndex = ref(1);
const paymentAmount = ref(null);
const paidAmount = ref(null);

const notes = ref(null);

const productList = ref([]);

let priceList = reactive({
  subtotal: 0,
  tradePrice: 0,
  vat: 0,
  total: 0,
  due: null,
});

const handleProductSearch = async (query) => {
  searchProduct.value = await getProduct(query);
};
const handleSupplierSearch = async (query) => {
  supplierList.value = await getSupplier(query);
};

const handleMRRSearch = async (query) => {
  mrrList.value = await getMRR(query);
};
const calculateTotalPrice = (price, quantity) => {
  const costPrice = Number(price) * Number(quantity);
  return costPrice?.toFixed(2);
};
const getSupplierInfo = async (supplier) => {
  supplierInfo.value = {
    id: supplier?.id,
    name: supplier?.first_name,
    company: supplier?.company_name,
    image: imgBase + supplier?.image_path,
  };
};
const updateExpireDate = (index, date) => {
  productList.value[index].expiry_date = date;
};
const updateQuantity = (product, index, event) => {
  const inputValue = Number(event?.target?.value);
  productList.value[index].quantity = inputValue;
  productList.value[index].total = calculateTotalPrice(
    product?.cost,
    inputValue
  );
};
const updateGatisAmount = () => {
  if (gatisPercentage.value) {
    gatisAmount.value = (
      (priceList?.total * gatisPercentage.value) /
      100
    ).toFixed(2);
  } else {
    gatisAmount.value = "";
  }
};

const updateGatisPercentage = () => {
  if (gatisAmount.value) {
    gatisPercentage.value = (
      (gatisAmount.value / priceList?.total) *
      100
    ).toFixed(2);
  } else {
    gatisPercentage.value = "";
  }
};
const calculateStock = (stockes) => {
  const total = stockes.reduce((sum, batch) => {
    return sum + parseFloat(batch.received_quantity);
  }, 0);
  return total;
};
const storeProducts = (product) => {
  let quantity = 1;
  const existingProductIndex = productList.value.findIndex(
    (item) => item?.product_id == product?.id
  );
  if (existingProductIndex != -1) {
    quantity++;
    productList.value[existingProductIndex].quantity++;
    productList.value[existingProductIndex].total = calculateTotalPrice(
      product?.product_prices?.selling_price,
      quantity
    );
    nextTick(() => productQuantity.value[existingProductIndex]?.focus());
  } else {
    productList.value.push({
      product_id: product?.id,
      product_name: product?.name,
      pack_size_id: product?.pack_size?.id,
      tp: product?.product_prices?.trade_price,
      vat: product?.product_prices?.vat,
      cost: product?.product_prices?.selling_price,
      quantity: quantity,
      total: calculateTotalPrice(
        product?.product_prices?.selling_price,
        quantity
      ),
      size: product?.category?.name,
      generic_name: "",
      serial: "",
      stock: calculateStock(product?.stock_batches),
      cost_price_preview: product?.product_prices?.cost_price_without_tax,
      item_id: product?.id,
      batch_no: product?.batch_no,
      expiry_date: "",
    });
    nextTick(() => productQuantity.value?.at(-1)?.focus());
  }
};
const handlePurchase = async (router) => {
  if (!productList.value?.length) {
    searchInput.value?.focus();
    showNotification("error", "Please insert a product");
    return 0;
  }
  if (!mrrID.value) {
    mrrInput.value?.focus();
    showNotification("error", "Please select an MRR");
    return 0;
  }
  if (!supplierInfo.value?.id) {
    supplierInput.value?.focus();
    showNotification("error", "Please select a Supplier");
    return 0;
  }
  if (!paymentAmount.value) {
    paidAmount.value?.focus();
    showNotification("error", "Please insert the payment");
    return 0;
  }
  if (!branch_id.value) {
    branchInput.value?.focus();
    showNotification("error", "Please select a branch");
    return 0;
  }

  const currDate = moment().format("YYYY-MM-DD");
  const purchaseData = {
    supplier_id: supplierInfo.value?.id,
    getis_percent: gatisPercentage.value,
    amount: gatisAmount.value,
    mrr_id: mrrID.value,
    sub_total: priceList.subtotal,
    total_trade_price: priceList.tradePrice,
    total_vat: priceList.vat,
    total: priceList.total,
    amount_due: priceList.due,
    purchase_date: currDate,
    paid_amount: paymentAmount.value,
    purchase_products: productList.value,
    payment_method_id: paymentIndex.value,
    note: notes.value,
    branch_id: branch_id.value,
  };

  const res = await purchaseInsert(purchaseData);
  nextTick(() => {
    if (res) {
      productList.value = [];
      supplierInfo.value = null;
      gatisPercentage.value = null;
      gatisAmount.value = null;
      mrrID.value = null;
      mrrName.value = null;
      priceList = {
        subtotal: 0,
        tradePrice: 0,
        vat: 0,
        total: 0,
        due: 0,
      };
      paymentAmount.value = null;
      paymentIndex.value = null;
      notes.value = null;
      branch_id.value = userInfo.value?.branch_id;
      router.push({ name: "purchases" });
    }
  });
};
watch(
  paymentAmount,
  (newAmount) => {
    if (Number(newAmount) > Number(priceList.total)) {
      showNotification("error", "Enter valid amount");
      paymentAmount.value = 0;

      return 0;
    }
    priceList.due = (priceList.total - newAmount)?.toFixed(2);
    // if (priceList.due < 0) {
    //   priceList.due = 0;
    // }
  },
  { deep: true }
);

watch(
  productList,
  (newProduct) => {
    const sumtotal = newProduct.reduce(
      (sum, item) => sum + Number(item?.total),
      0
    );
    const totalTp = newProduct.reduce((sum, item) => sum + Number(item?.tp), 0);
    const totalVat = newProduct.reduce(
      (sum, item) => sum + Number(item?.vat),
      0
    );
    priceList = {
      subtotal: Number(sumtotal)?.toFixed(2),
      tradePrice: Number(totalTp)?.toFixed(2),
      vat: Number(totalVat)?.toFixed(2),
      total: Number(sumtotal)?.toFixed(2),
      due: (Number(sumtotal) - paymentAmount.value)?.toFixed(2),
    };
  },
  { deep: true }
);

onMounted(async () => {
  await getPayment();
  branchList.value = await getBranch();
  branch_id.value = userInfo.value?.branch_id;
});
</script>

<template>
  <MainLayout>
    <div class="grid grid-cols-3 gap-4">
      <div class="col-span-2">
        <!-- Search -->
        <div class="flex mb-4">
          <button
            type="button"
            class="border border-slate-300 px-5 py-2 shadow-inner"
          >
            <i class="bi bi-search"></i>
          </button>
          <a-dropdown>
            <input
              @input="handleProductSearch($event?.target?.value)"
              @focus="searchInput.select()"
              ref="searchInput"
              type="text"
              placeholder="Enter item name or scan barcode"
              class="bg-white w-full px-3 py-3 outline-none shadow-inner border border-slate-300 text-black"
            />
            <template #overlay>
              <a-menu class="max-h-80 overflow-y-auto">
                <!-- No Products Currently Available -->
                <a-menu-item v-if="!searchProduct || !searchProduct?.length">
                  <h6 class="font-bold text-red-600">
                    No Products Currently Available...
                  </h6>
                </a-menu-item>
                <!-- a-menu-item -->
                <a-menu-item
                  v-for="data in searchProduct"
                  :key="data?.id"
                  @click="storeProducts(data)"
                >
                  <div class="flex">
                    <div class="mr-3">
                      <a-avatar
                        :size="32"
                        :src="imgBase + data?.product_images?.at(-1)?.path"
                        v-if="data?.product_images?.at(-1)?.path"
                      >
                      </a-avatar>
                      <a-avatar :size="32" v-else>
                        <PictureOutlined class="align-middle mb-2" />
                      </a-avatar>
                    </div>
                    <div>
                      <h6 class="font-bold">
                        {{ data?.name }}
                      </h6>
                      <p class="text-gray-500">
                        <span class="mr-2"
                          ><strong>Category:</strong>
                          {{ data?.category?.name || "N/A" }};</span
                        >
                        <span class="mr-2"
                          ><strong>Price:</strong>
                          {{ data?.product_prices?.selling_price }}</span
                        >
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
            @click="handlePurchase($router)"
          >
            <i class="bi bi-cart mr-2"></i> <span>Purchased</span>
          </button>
        </div>
        <!-- Table -->
        <table class="table text-sm w-full purchase-table">
          <thead class="table-header">
            <tr>
              <th>-</th>
              <th class="text-center">SL</th>
              <th class="text-left">Item Name</th>
              <th class="text-right">Pack Size</th>
              <th class="text-right">TP</th>
              <th class="text-right">VAT</th>
              <th class="text-right">Cost</th>
              <th class="text-right">Qty.</th>
              <th class="text-right">Total</th>
            </tr>
          </thead>
          <tbody class="table-body">
            <tr v-if="!productList?.length">
              <td colspan="9" class="text-center text-red-700">
                No Product Found
              </td>
            </tr>
            <tr v-for="(product, index) in productList" :key="index">
              <td class="text-center">
                <button
                  type="button"
                  class="w-full"
                  @click="productList.splice(index, 1)"
                >
                  <i class="bi bi-x-lg text-red-500"></i>
                </button>
              </td>
              <td class="text-center">{{ index + 1 }}</td>
              <td>
                <p>{{ product?.product_name }}</p>
                <div class="mt-5">
                  <p>
                    <span class="font-semibold">Size:</span> {{ product?.size }}
                  </p>
                  <p>
                    <span class="font-semibold">Generic Name:</span>
                    {{ product?.generic_name || "-" }}
                  </p>
                  <p>
                    <span class="font-semibold">Serial:</span>
                    {{ product?.serial || "Empty" }}
                  </p>
                  <p>
                    <span class="font-semibold">Stock:</span>
                    {{ product?.stock || "-" }}
                  </p>
                  <p>
                    <span class="font-semibold">Cost Price Preview:</span>
                    {{ Number(product?.cost_price_preview) || "-" }}
                  </p>
                  <p>
                    <span class="font-semibold">Item Id:</span>
                    {{ product?.product_id || "-" }}
                  </p>
                  <p class="mt-2">
                    <label class="mb-2 block">Select Expire Date</label>
                    <input
                      type="date"
                      class="px-3 py-1 border border-black rounded"
                      @input="updateExpireDate(index, $event?.target?.value)"
                    />
                  </p>
                </div>
              </td>
              <td class="text-right w-10">{{ product?.pack_size_id }}</td>
              <td class="text-right w-10">{{ Number(product?.tp) }}</td>
              <td class="text-right w-10">{{ Number(product?.vat) }}</td>
              <td class="text-right w-10">{{ product?.cost }}</td>
              <td class="text-right w-24">
                <input
                  type="number"
                  :value="product?.quantity"
                  class="text-right bg-transparent outline-none text-red-600 focus:bg-white w-full focus:shadow-lg"
                  ref="productQuantity"
                  @focus="productQuantity[index].select()"
                  @input="updateQuantity(product, index, $event)"
                  @keyup.enter="searchInput.focus()"
                />
              </td>
              <td class="text-right">{{ product?.total }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="right-side">
        <div class="border border-slate-300 p-2 px-3 mb-4">
          <!-- Branch -->
          <div class="mb-4">
            <select
              class="bg-white w-full px-4 py-3 outline-none shadow-inner border border-slate-300 text-black focus:border-black"
              v-model="branch_id"
              ref="branchInput"
              required
            >
              <option :value="null">Enter branch name</option>
              <template v-for="item in branchList">
                <option :value="item?.id">
                  {{ item?.organization_name }} - {{ item?.branch }}
                </option>
              </template>
            </select>
          </div>
          <!-- Supplier -->
          <div class="flex mb-4">
            <button
              type="button"
              class="border border-slate-300 px-5 py-2 shadow-inner"
            >
              <i class="bi bi-plus-lg"></i>
            </button>
            <div class="grow">
              <a-dropdown>
                <input
                  @input="handleSupplierSearch($event?.target?.value)"
                  ref="supplierInput"
                  type="text"
                  placeholder="Enter supplier name"
                  class="bg-white w-full px-3 py-3 outline-none shadow-inner border border-slate-300 text-black"
                />
                <template #overlay>
                  <a-menu class="max-h-80 overflow-y-auto">
                    <a-menu-item v-if="!supplierList || !supplierList?.length">
                      <h6 class="font-bold text-red-600">
                        No Supplier Found...
                      </h6>
                    </a-menu-item>
                    <!-- a-menu-item -->
                    <a-menu-item
                      v-for="(supplier, index) in supplierList"
                      :key="index"
                      @click="getSupplierInfo(supplier)"
                    >
                      <div class="flex items-center">
                        <div class="mr-3">
                          <a-avatar
                            :size="32"
                            :src="imgBase + supplier?.image_path"
                            v-if="supplier?.image_path"
                          >
                          </a-avatar>
                          <a-avatar :size="32" v-else>
                            <PictureOutlined class="align-middle mb-2" />
                          </a-avatar>
                        </div>
                        <div>
                          <h6 class="font-bold">
                            {{ supplier?.first_name }} -
                            {{ supplier?.company_name }}
                          </h6>
                        </div>
                      </div>
                    </a-menu-item>
                    <!--/ a-menu-item -->
                  </a-menu>
                </template>
              </a-dropdown>
            </div>
          </div>
          <div class="supplierInfo" v-if="supplierInfo">
            <div class="flex justify-between">
              <div class="mb-4">
                <div class="flex">
                  <div class="mr-3">
                    <a-avatar
                      :size="36"
                      :src="supplierInfo?.image"
                      class="border border-slate-400"
                    >
                    </a-avatar>
                  </div>
                  <div>
                    <h6 class="font-bold">{{ supplierInfo?.name }}</h6>
                    <p class="text-[#43B000]">({{ supplierInfo?.company }})</p>
                  </div>
                </div>
              </div>
              <div>
                <!-- <button type="button" class="text-blue-600">
                  <i class="bi bi-pencil-square"></i>
                </button> -->
              </div>
            </div>
            <!-- Update & detach -->
            <ul
              class="flex justify-end items-center space-x-4 list-none p-0 w-full"
            >
              <li class="mb-4 w-1/2">
                <button
                  type="button"
                  class="w-full text-right"
                  @click="supplierInfo = null"
                >
                  <i class="bi bi-x mr-3 text-red-600"></i>Detach
                </button>
              </li>
            </ul>
          </div>
        </div>
        <!-- Getis -->
        <div class="border border-slate-300 p-2 px-3 mb-4">
          <h6 class="font-bold mb-3">
            <i class="bi bi-percent mr-3 text-red-600"></i>Getis
          </h6>
          <ul class="flex items-center space-x-4 list-none p-0 w-full">
            <li class="mb-4 w-1/2">
              <input
                type="number"
                class="shadow-inner bg-transparent text-right px-2 border border-slate-400 w-full py-2"
                placeholder="Getis Percent"
                v-model="gatisPercentage"
                @input="updateGatisAmount"
              />
            </li>
            <li class="mb-4 w-1/2">
              <input
                type="number"
                class="shadow-inner bg-transparent text-right px-2 border border-slate-400 w-full py-2"
                placeholder="Amount"
                v-model="gatisAmount"
                @input="updateGatisPercentage"
              />
            </li>
          </ul>
          <!-- MRR -->
          <a-dropdown>
            <input
              @input="handleMRRSearch($event?.target?.value)"
              ref="mrrInput"
              v-model="mrrName"
              type="text"
              placeholder="Enter MRR name"
              class="bg-white w-full px-3 py-3 outline-none shadow-inner border border-slate-300 text-black"
            />
            <template #overlay>
              <a-menu class="max-h-80 overflow-y-auto">
                <a-menu-item v-if="!mrrList || !mrrList?.length">
                  <h6 class="font-bold text-red-600">No Data Found...</h6>
                </a-menu-item>
                <a-menu-item
                  v-for="(mrr, index) in mrrList"
                  :key="index"
                  @click="
                    () => {
                      mrrName = mrr?.name;
                      mrrID = mrr?.id;
                    }
                  "
                >
                  <div class="flex items-center">
                    <div class="mr-3">
                      <a-avatar :size="32">
                        <template #icon>
                          <UserOutlined class="align-middle" />
                        </template>
                      </a-avatar>
                    </div>
                    <div>
                      <h6 class="font-bold">{{ mrr?.name }}</h6>
                    </div>
                  </div>
                </a-menu-item>
                <!--/ a-menu-item -->
              </a-menu>
            </template>
          </a-dropdown>
        </div>
        <!-- Total -->
        <div class="border border-slate-300 p-2 px-3 mb-4">
          <div class="flex justify-between items-center">
            <div class="mb-3"><label>Sub Total:</label></div>
            <div class="mb-3">
              <input
                type="number"
                class="shadow-inner bg-transparent text-right px-2 border border-slate-400 w-full py-2"
                v-model="priceList.subtotal"
              />
            </div>
          </div>
          <div class="flex justify-between items-center">
            <div class="mb-3"><label>Total Trade Price:</label></div>
            <div class="mb-3">
              <input
                type="number"
                class="shadow-inner bg-transparent text-right px-2 border border-slate-400 w-full py-2"
                v-model="priceList.tradePrice"
                readonly
              />
            </div>
          </div>
          <div class="flex justify-between items-center">
            <div class="mb-3"><label>Total VAT:</label></div>
            <div class="mb-3">
              <input
                type="number"
                class="shadow-inner bg-transparent text-right px-2 border border-slate-400 w-full py-2 font-bold"
                v-model="priceList.vat"
                readonly
              />
            </div>
          </div>
          <div class="flex justify-between items-center">
            <div class="mb-3"><label>Total:</label></div>
            <div class="mb-3">
              <input
                type="number"
                class="shadow-inner bg-transparent text-right px-2 border border-slate-400 w-full py-2 text-red-600"
                v-model="priceList.total"
                readonly
              />
            </div>
          </div>
          <div class="flex justify-between items-center">
            <div class="mb-3"><label>Amount Due:</label></div>
            <div class="mb-3">
              <input
                type="number"
                class="shadow-inner bg-transparent text-right px-2 border border-slate-400 w-full py-2 text-red-600"
                v-model="priceList.due"
                readonly
              />
            </div>
          </div>
        </div>
        <!-- Payment Gateway -->
        <div class="border border-slate-300 p-2 px-3">
          <h6>Add Payment</h6>
          <template v-for="payment in paymentList" :key="payment?.id">
            <button
              type="button"
              class="border px-3 py-1 rounded-md mt-3 mr-2"
              :class="
                paymentIndex == payment?.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-black'
              "
              @click="paymentIndex = payment?.id"
            >
              {{ payment?.name }}
            </button>
          </template>
          <input
            type="text"
            class="block w-full border mt-3 px-3 py-2 rounded-md"
            placeholder="Enter Amount . . ."
            v-model="paymentAmount"
            ref="paidAmount"
          />
          <textarea
            rows="3"
            class="block w-full border mt-3 px-3 py-2 rounded-md"
            placeholder="Notes . . ."
            v-model="notes"
          ></textarea>
          <button
            class="bg-[#000180] px-5 py-2 text-white min-w-fit mt-4 rounded-md"
            type="button"
            @click="handlePurchase($router)"
          >
            <i class="bi bi-cart mr-2"></i> <span>Purchased</span>
          </button>
        </div>
      </div>
    </div>
  </MainLayout>
</template>
