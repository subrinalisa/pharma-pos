<script setup>
import MainLayout from "@/components/MainLayout.vue";
import { useDataStore } from "@/stores/data";
import { PictureOutlined, UserOutlined } from "@ant-design/icons-vue";
import { storeToRefs } from "pinia";
import { nextTick, ref, reactive, watch } from "vue";
import { imgBase } from "@/config";

const dataStore = useDataStore();
const { isLoading, isSupplier } = storeToRefs(dataStore);
const { getProduct, getSupplier, getMRR } = dataStore;
const searchQuery = ref(null);
const searchProduct = ref(null);
const supplierList = ref(null);
const mrrList = ref(null);
const mrrName = ref(null);
const gatisPercentage = ref(null);
const gatisAmount = ref(null);
const supplierInfo = ref();
const searchInput = ref(null);
const productQuantity = ref(null);
const productList = ref([]);
let priceList = reactive({
  subtotal: 0,
  tradePrice: 0,
  vat: 0,
  total: 0,
  due: 0,
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
const getSupplierInfo = async (supplier) => {
  supplierInfo.value = {
    name: supplier?.first_name,
    company: supplier?.company_name,
    image: imgBase + supplier?.image_path,
  };
};

const calculateTotalPrice = (product, quantity) => {
  const costPrice = product?.pack_size?.selling_price + product?.pack_size?.vat;
  return (costPrice * quantity)?.toFixed(2);
};

const updateTotalPrice = (product, quantity) => {
  const costPrice = product?.cost + product?.vat;
  return (costPrice * quantity)?.toFixed(2);
};

const updateQuantity = (product, index, event) => {
  const inputValue = Number(event?.target?.value);
  productList.value[index].quantity = inputValue;
  productList.value[index].total = updateTotalPrice(product, inputValue);
};

const storeProducts = (product) => {
  let quantity = 1;
  const existingProductIndex = productList.value.findIndex(
    (item) => item?.product_id === product?.product_id
  );
  if (existingProductIndex !== -1) {
    quantity++;
    productList.value[existingProductIndex].quantity++;
    productList.value[existingProductIndex].total = calculateTotalPrice(
      product,
      quantity
    );
    nextTick(() => {
      productQuantity.value[existingProductIndex]?.focus();
    });
  } else {
    productList.value.push({
      product_id: product?.product_id,
      product_name: product?.name,
      pack_size_id: product?.pack_size?.id,
      tp: product?.pack_size?.selling_price,
      vat: product?.pack_size?.vat,
      cost: Number(
        product?.pack_size?.selling_price + product?.pack_size?.vat
      )?.toFixed(2),
      quantity: quantity,
      total: calculateTotalPrice(product, quantity),
      size: product?.pack_size?.quantity,
      generic_name: product?.description,
      serial: 1,
      stock: product?.pack_size?.quantity,
      cost_price_preview: product?.pack_size?.selling_price,
      item_id: product?.product_id,
      batch_no: product?.product_id,
      expiry_date: product?.created_at,
    });
    nextTick(() => {
      productQuantity.value?.at(-1)?.focus();
    });
  }
};

watch(
  productList,
  (newProduct) => {
    const sumtotal = newProduct.reduce(
      (sum, item) => sum + Number(item?.total),
      0
    );
    console.log(sumtotal);
    const totalVat = newProduct.reduce((sum, item) => sum + item?.vat, 0);
    priceList = {
      subtotal: sumtotal,
      tradePrice: (sumtotal - totalVat)?.toFixed(2),
      vat: totalVat,
      total: sumtotal,
      due: sumtotal,
    };
  },
  { deep: true }
);
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
          <a-dropdown :trigger="['click']">
            <input
              @input="handleProductSearch(searchQuery)"
              v-model="searchQuery"
              @focus="searchInput.select()"
              ref="searchInput"
              type="text"
              placeholder="Enter item name or scan barcode"
              class="bg-white w-full px-3 py-3 outline-none shadow-inner border border-slate-300 text-black"
            />
            <template #overlay>
              <a-menu class="max-h-80 overflow-y-auto">
                <!-- Loading  -->
                <a-menu-item v-if="isLoading">Loading...</a-menu-item>
                <!-- No Products Currently Available -->
                <a-menu-item
                  v-if="
                    !isLoading && (!searchProduct || !searchProduct?.length)
                  "
                >
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
                        {{ data?.name }} - {{ data?.description }}
                      </h6>
                      <p class="text-gray-500">
                        <span class="mr-2"
                          ><strong>Product Id:</strong>
                          {{ data?.product_id }};</span
                        >
                        <span class="mr-2"
                          ><strong>Manufacturer:</strong>
                          {{ data?.manufacturer }};</span
                        >
                        <span class="mr-2"
                          ><strong>Supplier:</strong>
                          {{ data?.supplier?.company_name }} -
                          {{ data?.supplier?.address }} ({{
                            data?.supplier?.mobile
                          }});</span
                        >
                        <span class="mr-2"
                          ><strong>Selling Price:</strong>
                          {{ data?.pack_size?.selling_price }}</span
                        >
                        <span class="mr-2"
                          ><strong>Category:</strong>
                          {{ data?.category || "N/A" }};</span
                        >
                        <span class="mr-2">
                          <strong>Available Qty:</strong>
                          {{ data?.product_inventories?.quantity }}</span
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
          >
            <i class="bi bi-cart mr-2"></i> <span>Purchased</span>
          </button>
        </div>
        <!-- Table -->
        <table class="table border-collapse border border-slate-400 w-full">
          <thead>
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
          <tbody>
            <tr v-for="(product, index) in productList" :key="index">
              <td class="text-center">
                <button
                  type="button"
                  class="w-full"
                  @click="console.log(index)"
                >
                  <i class="bi bi-x-lg text-red-500"></i>
                </button>
              </td>
              <td class="text-center">{{ index + 1 }}</td>
              <td>{{ product?.product_name }}</td>
              <td class="text-right">{{ product?.pack_size_id }}</td>
              <td class="text-right">{{ product?.tp }}</td>
              <td class="text-right">{{ product?.vat }}</td>
              <td class="text-right">{{ product?.cost }}</td>
              <td class="text-right">
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
          <ul class="flex items-center space-x-4 list-none p-0 w-full">
            <li class="mb-4 w-1/2">
              <button
                type="button"
                class="shadow-inner border border-slate-400 w-full py-2"
              >
                ...
              </button>
            </li>
            <li class="mb-4 w-1/2">
              <button
                type="button"
                class="shadow-inner border border-slate-400 w-full py-2"
              >
                <i class="bi bi-x-lg mr-3 text-red-600"></i>Cancel Recv.
              </button>
            </li>
          </ul>
          <!-- Supplier -->
          <div class="flex mb-4">
            <button
              type="button"
              class="border border-slate-300 px-5 py-2 shadow-inner"
            >
              <i class="bi bi-plus-lg"></i>
            </button>
            <div class="grow">
              <a-dropdown :trigger="['click']">
                <input
                  @input="handleSupplierSearch($event?.target?.value)"
                  type="text"
                  placeholder="Enter supplier name"
                  class="bg-white w-full px-3 py-3 outline-none shadow-inner border border-slate-300 text-black"
                />
                <template #overlay>
                  <a-menu class="max-h-80 overflow-y-auto">
                    <!-- No supplier Currently Available -->
                    <a-menu-item
                      v-if="
                        !isSupplier && (!supplierList || !supplierList?.length)
                      "
                    >
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
            <ul class="flex items-center space-x-4 list-none p-0 w-full">
              <li class="mb-4 w-1/2">
                <button type="button" class="w-full text-left">
                  <i class="bi bi-check2-circle mr-3"></i>Update Supplier
                </button>
              </li>
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
              />
            </li>
            <li class="mb-4 w-1/2">
              <input
                type="number"
                class="shadow-inner bg-transparent text-right px-2 border border-slate-400 w-full py-2"
                placeholder="Amount"
                v-model="gatisAmount"
              />
            </li>
          </ul>
          <!-- MRR -->
          <a-dropdown :trigger="['click']">
            <input
              @input="handleMRRSearch($event?.target?.value)"
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
                  @click="mrrName = mrr?.name"
                >
                  <div class="flex items-center">
                    <div class="mr-3">
                      <a-avatar :size="32">
                        <template #icon
                          ><UserOutlined class="align-middle"
                        /></template>
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
        <div class="border border-slate-300 p-2 px-3">
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
      </div>
    </div>
  </MainLayout>
</template>
