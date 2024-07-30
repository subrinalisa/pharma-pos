<script setup>
import MainLayout from "@/components/MainLayout.vue";
import moment from "moment";
import { useDataStore } from "@/stores/data";
import { PictureOutlined } from "@ant-design/icons-vue";
import { storeToRefs } from "pinia";
import { nextTick, ref, reactive, watch, onMounted } from "vue";
import { imgBase } from "@/config";

const dataStore = useDataStore();
const { isLoading, isSupplier, paymentList } = storeToRefs(dataStore);
const { getSaleProduct, getCustomer, getPayment, saleInsert } = dataStore;
const searchQuery = ref(null);
const searchProduct = ref(null);
const allSupplierList = ref(null);
const supplierList = ref(null);
const comment_on_receipt = ref(false);

const supplierInfo = ref();
const searchInput = ref(null);
const productQuantity = ref(null);
const paymentIndex = ref(3);
const paymentAmount = ref(null);
const notes = ref(null);
const productList = ref([]);

let priceList = reactive({
  total: 0,
  due: 0,
});

const handleProductSearch = async (query) => {
  searchProduct.value = await getSaleProduct(query);
};
const handleSupplierSearch = async () => {
  allSupplierList.value = await getCustomer();
  supplierList.value = allSupplierList.value;
};
const findCustomer = (name) => {
  if (!name) {
    supplierList.value = allSupplierList.value;
    return;
  }
  supplierList.value = allSupplierList.value.filter((customer) =>
    customer.name.toLowerCase().includes(name.toLowerCase())
  );
};
const getSupplierInfo = async (supplier) => {
  supplierInfo.value = {
    id: supplier?.id,
    name: supplier?.name,
    company: supplier?.company_name,
    image: imgBase + supplier?.image_path,
  };
};

const calculateTotalPrice = (product, quantity) => {
  const costPrice =
    product?.pack_size?.selling_price + product?.pack_size?.vat || 0;
  return (costPrice * quantity)?.toFixed(2);
};

const updateTotalPrice = (product, quantity) => {
  return (product?.total * quantity)?.toFixed(2);
};

const updateQuantity = (product, index, event) => {
  const inputValue = Number(event?.target?.value);
  productList.value[index].quantity = inputValue;
  productList.value[index].total = updateTotalPrice(product, inputValue);
};

watch(
  paymentAmount,
  (newAmount) => {
    priceList.due = (priceList.total - newAmount)?.toFixed(2);
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

    priceList = {
      total: sumtotal,
      due: (sumtotal - paymentAmount.value)?.toFixed(2),
    };
  },
  { deep: true }
);

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
      quantity: quantity,
      price: product?.pack_size?.selling_price || 0,
      discount_percent: 0,
      total: calculateTotalPrice(product, quantity),
    });
    nextTick(() => {
      productQuantity.value?.at(-1)?.focus();
    });
  }
};

onMounted(async () => await getPayment());

const handleSale = async () => {
  const currDate = moment().format("YYYY-MM-DD");
  const purchaseData = {
    sale_date: currDate,
    note: notes.value,
    sale_products: productList.value,
    customer_id: supplierInfo.value?.id,
    sub_total: priceList.total,
    total: priceList.total,
    amount_due: priceList.due,
    paid_amount: paymentAmount.value,
    comment_on_receipt: comment_on_receipt.value,
    item_tiers: "none",
  };

  const res = await saleInsert(purchaseData);
  nextTick(() => {
    if (res) {
      productList.value = [];
      supplierInfo.value = null;

      priceList = {
        total: 0,
        due: 0,
      };
      paymentAmount.value = null;
      paymentIndex.value = null;
      notes.value = null;
      comment_on_receipt.value = false;
    }
  });
};
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
                          {{ data?.supplier?.company_name }}</span
                        >
                        <span class="mr-2"
                          ><strong>Selling Price:</strong>
                          {{ data?.pack_size?.selling_price }}</span
                        >
                        <span class="mr-2"
                          ><strong>Category:</strong>
                          {{ data?.category?.name || "N/A" }};</span
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
            @click="handleSale"
          >
            <i class="bi bi-cart mr-2"></i> <span>Sale</span>
          </button>
        </div>
        <!-- Table -->
        <table class="table border-collapse border border-slate-400 w-full">
          <thead>
            <tr>
              <th>-</th>
              <th class="text-center">SL</th>
              <th class="text-left">Item Name</th>
              <th class="text-right">Price</th>
              <th class="text-right">Qty.</th>
              <th class="text-right">Disc %</th>
              <th class="text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="!productList?.length">
              <td colspan="7" class="text-center text-red-700">
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
              <td>{{ product?.product_name }}</td>
              <td class="text-right">{{ product?.price }}</td>
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
              <td class="text-right">{{ product?.discount_percent }}</td>
              <td class="text-right">{{ product?.total }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="right-side">
        <!-- customer -->
        <div class="border border-slate-300 p-2 px-3 mb-4">
          <button
            type="button"
            class="shadow-inner border border-slate-400 w-full py-2 mb-4"
          >
            ...
          </button>
          <div class="flex mb-4">
            <button
              type="button"
              class="border border-slate-300 px-5 py-2 shadow-inner"
            >
              <i class="bi bi-plus-lg"></i>
            </button>

            <div class="grow">
              <a-dropdown :trigger="['click']" @click="handleSupplierSearch">
                <input
                  type="text"
                  placeholder="Enter customer name"
                  class="bg-white w-full px-3 py-3 outline-none shadow-inner border border-slate-300 text-black"
                  @input="findCustomer($event?.target?.value)"
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
                        No customer Found...
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
                            {{ supplier?.name }} -
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

        <!-- Total -->
        <div class="border border-slate-300 p-2 px-3 mb-4">
          <div class="flex justify-between items-center">
            <div class="mb-3"><label>Sub Total:</label></div>
            <div class="mb-3">
              <input
                type="number"
                class="shadow-inner bg-transparent text-right px-2 border border-slate-400 w-full py-2"
                v-model="priceList.total"
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
          <template v-for="(payment, index) in paymentList" :key="index">
            <button
              type="button"
              class="border px-3 py-1 rounded-md mt-3"
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
          />
          <textarea
            rows="3"
            class="block w-full border mt-3 px-3 py-2 rounded-md mb-3"
            placeholder="Notes . . ."
            v-model="notes"
          ></textarea>
          <label for="comment_on_receipt" class="text-sm"
            ><input
              type="checkbox"
              class="mr-3"
              id="comment_on_receipt"
              v-model="comment_on_receipt"
            />Comment on receipt</label
          >
        </div>
      </div>
    </div>
  </MainLayout>
</template>
