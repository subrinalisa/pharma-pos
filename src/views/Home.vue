<script setup>
import MainLayout from "@/components/MainLayout.vue";
import { useDataStore } from "@/stores/data";
import { PictureOutlined } from "@ant-design/icons-vue";
import { storeToRefs } from "pinia";
import { nextTick, ref } from "vue";

const dataStore = useDataStore();
const { isLoading } = storeToRefs(dataStore);
const { getSearch } = dataStore;
const searchQuery = ref(null);
const searchProduct = ref(null);
const productQuantity = ref(null);
const productList = ref([]);

const handleSearch = async (query) => {
  searchProduct.value = await getSearch(query);
};

const calculateTotalPrice = (product, quantity) => {
  const costPrice = Number(
    product?.pack_size?.selling_price + product?.pack_size?.vat
  )?.toFixed(2);
  return (costPrice * quantity)?.toFixed(2);
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
</script>

<template>
  <MainLayout>
    <div class="grid grid-cols-3 gap-4">
      <div class="col-span-2">
        <!-- Search -->
        <form class="flex mb-4" @submit.prevent="console.log('hello')">
          <button
            type="submit"
            class="border border-slate-300 px-5 py-2 shadow-inner"
          >
            <i class="bi bi-search"></i>
          </button>
          <a-dropdown :trigger="['click']">
            <input
              @input="handleSearch(searchQuery)"
              v-model="searchQuery"
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
                      <a-avatar :size="32">
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
        </form>
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
          <!-- Pharma -->
          <div class="flex justify-between">
            <div class="mb-4">
              <div class="flex">
                <div class="mr-3">
                  <img src="@/assets/images/user.png" alt="" />
                </div>
                <div>
                  <h6 class="font-bold">Beximco Pharmaceuticals Ltd.</h6>
                  <p class="text-[#43B000]">(0.00)</p>
                </div>
              </div>
            </div>
            <div>
              <button type="button" class="text-blue-600">
                <i class="bi bi-pencil-square"></i>
              </button>
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
              <button type="button" class="w-full text-right">
                <i class="bi bi-x mr-3 text-red-600"></i>Detach
              </button>
            </li>
          </ul>
        </div>
        <!-- Getis -->
        <div class="border border-slate-300 p-2 px-3 mb-4">
          <h6 class="font-bold mb-3">
            <i class="bi bi-percent mr-3 text-red-600"></i>Getis
          </h6>
          <ul class="flex items-center space-x-4 list-none p-0 w-full">
            <li class="mb-4 w-1/2">
              <button
                type="button"
                class="shadow-inner border border-slate-400 w-full py-2 text-left px-2"
              >
                Getis Percent
              </button>
            </li>
            <li class="mb-4 w-1/2">
              <input
                type="number"
                class="shadow-inner bg-transparent text-right px-2 border border-slate-400 w-full py-2"
                value="200"
              />
            </li>
          </ul>
        </div>
        <!-- Total -->
        <div class="border border-slate-300 p-2 px-3">
          <div class="flex justify-between items-center">
            <div class="mb-3"><label>Discount Entire Receivings:</label></div>
            <div class="mb-3">
              <input
                type="number"
                class="shadow-inner bg-transparent text-right px-2 border border-slate-400 w-full py-2"
                value="00"
              />
            </div>
          </div>
          <div class="flex justify-between items-center">
            <div class="mb-3"><label>Sub Total:</label></div>
            <div class="mb-3">
              <input
                type="number"
                class="shadow-inner bg-transparent text-right px-2 border border-slate-400 w-full py-2"
                value="00"
              />
            </div>
          </div>
          <div class="flex justify-between items-center">
            <div class="mb-3"><label>Total Trade Price:</label></div>
            <div class="mb-3">
              <input
                type="number"
                class="shadow-inner bg-transparent text-right px-2 border border-slate-400 w-full py-2 font-bold"
                value="00"
              />
            </div>
          </div>
          <div class="flex justify-between items-center">
            <div class="mb-3"><label>Total VAT:</label></div>
            <div class="mb-3">
              <input
                type="number"
                class="shadow-inner bg-transparent text-right px-2 border border-slate-400 w-full py-2 text-red-600"
                value="00"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>
