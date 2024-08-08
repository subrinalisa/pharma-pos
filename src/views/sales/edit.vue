<script setup>
import MainLayout from "@/components/MainLayout.vue";
import moment from "moment";
import { useDataStore } from "@/stores/data";
import { PictureOutlined } from "@ant-design/icons-vue";
import { storeToRefs } from "pinia";
import { nextTick, ref, reactive, watch, onMounted } from "vue";
import { imgBase } from "@/config";
import { showNotification } from "@/utilities/notification";

const dataStore = useDataStore();
const { paymentList, userInfo } = storeToRefs(dataStore);
const { getSaleProduct, getCustomer, getPayment, getBranch, saleInsert } =
  dataStore;

const searchProduct = ref(null);
const allSupplierList = ref(null);
const supplierList = ref(null);
const comment_on_receipt = ref(false);
const branchList = ref(null);
const branch_id = ref("");
const branchInput = ref("");
const supplierInfo = ref();
const searchInput = ref(null);
const productQuantity = ref(null);
const paidAmount = ref(null);
const paymentIndex = ref(1);
const supplierInput = ref(null);
const paymentAmount = ref(0);
const notes = ref(null);
const productList = ref([]);

let priceList = reactive({
  subtotal: null,
  tradePrice: null,
  vat: null,
  total: null,
  due: null,
});

const handleProductSearch = async (query) => {
  if (!query) return 0;
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
    name: supplier?.first_name,
    company: supplier?.company_name,
    image: imgBase + supplier?.image_path,
  };
};

const calculateTotalPrice = (price, quantity) => {
  const costPrice = Number(price) * Number(quantity);
  return costPrice?.toFixed(2);
};

const updateQuantity = (product, index, event) => {
  const inputValue = Number(event?.target?.value);
  if (inputValue > product.value[index]?.stock_batches) {
    showNotification("error", "Quantity exceeds the available stock.");
    productList.value[index].quantity = inputValue - 1;
    return 0;
  }
  productList.value[index].quantity = inputValue;
  productList.value[index].total = calculateTotalPrice(
    product?.price,
    inputValue
  );
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
    if (priceList.due < 0) {
      priceList.due = 0;
    }
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

const storeProducts = (product) => {
  let quantity = 1;
  const existingProductIndex = productList.value.findIndex(
    (item) => item?.product_id == product?.id
  );
  if (existingProductIndex !== -1) {
    quantity++;
    productList.value[existingProductIndex].quantity++;
    productList.value[existingProductIndex].total = calculateTotalPrice(
      product?.product_prices?.selling_price,
      quantity
    );
    nextTick(() => {
      productQuantity.value[existingProductIndex]?.focus();
    });
  } else {
    const checkStock = calculateStock(product?.stock_batches);
    if (checkStock <= 0) {
      showNotification("error", "Sorry! Sold out");
      searchInput.value?.focus();
      return 0;
    }
    productList.value.push({
      product_id: product?.id,
      product_name: product?.name,
      quantity: quantity,
      price: product?.product_prices?.selling_price || 0,
      discount_percent: 0,
      total: calculateTotalPrice(
        product?.product_prices?.selling_price,
        quantity
      ),
      stock_batches: calculateStock(product?.stock_batches),
    });

    nextTick(() => {
      productQuantity.value?.at(-1)?.focus();
    });
  }
};
const calculateStock = (stockes) => {
  const total = stockes.reduce((sum, batch) => {
    return sum + parseFloat(batch.balanced_quantity);
  }, 0);
  return total;
};
const handleSale = async (router) => {
  if (!productList.value?.length) {
    searchInput.value?.focus();
    showNotification("error", "Please insert a product");
    return 0;
  }

  if (
    !supplierInfo.value?.id &
    (Number(paymentAmount.value) != Number(priceList?.total))
  ) {
    console.log(paymentAmount.value, priceList?.total);
    paidAmount.value?.focus();
    showNotification("error", "Choose a customer or pay in full.");
    return 0;
  }
  if (!supplierInfo.value?.id & !paymentAmount.value) {
    paidAmount.value?.focus();
    showNotification("error", "Please insert the Amount");
    return 0;
  }
  if (!branch_id.value) {
    branchInput.value?.focus();
    showNotification("error", "Please select a branch");
    return 0;
  }
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
    branch_id: branch_id.value,
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
      branch_id.value = userInfo.value?.branch_id;
      router.push({ name: "sales" });
    }
  });
};

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
                          ><strong>Available Stock:</strong>
                          {{ calculateStock(data?.stock_batches) }};</span
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
            @click="handleSale($router)"
          >
            <i class="bi bi-cart mr-2"></i> <span>Sale</span>
          </button>
        </div>
        <!-- Table -->
        <table
          class="table text-sm border-collapse border border-slate-400 w-full"
        >
          <thead>
            <tr>
              <th>-</th>
              <th class="text-center">SL</th>
              <th class="text-left">Item Name</th>
              <th class="text-right">Price</th>
              <th class="text-right">Stock</th>
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
              <td class="text-right">{{ Number(product?.price) }}</td>
              <td class="text-right">{{ product?.stock_batches }}</td>
              <td class="text-right">
                <input
                  type="number"
                  class="text-right bg-transparent outline-none text-red-600 focus:bg-white w-full focus:shadow-lg"
                  ref="productQuantity"
                  @focus="productQuantity[index].select()"
                  @input="updateQuantity(product, index, $event)"
                  @keyup.enter="searchInput.focus()"
                  v-model="product.quantity"
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
          <!-- Branch -->
          <div class="mb-4">
            <select
              class="bg-white w-full px-4 py-3 outline-none shadow-inner border border-slate-300 text-black focus:border-black"
              v-model="branch_id"
              ref="branchInput"
              @change="productList = []"
            >
              <option :value="null">Enter branch name</option>
              <template v-for="item in branchList">
                <option :value="item?.id">
                  {{ item?.organization_name }} - {{ item?.branch }}
                </option>
              </template>
            </select>
          </div>
          <div class="flex mb-4">
            <button
              type="button"
              class="border border-slate-300 px-5 py-2 shadow-inner"
            >
              <i class="bi bi-plus-lg"></i>
            </button>

            <div class="grow">
              <a-dropdown @click="handleSupplierSearch">
                <input
                  type="text"
                  placeholder="Enter customer name"
                  class="bg-white w-full px-3 py-3 outline-none shadow-inner border border-slate-300 text-black"
                  @input="findCustomer($event?.target?.value)"
                  ref="supplierInput"
                />
                <template #overlay>
                  <a-menu class="max-h-80 overflow-y-auto">
                    <!-- No supplier Currently Available -->
                    <a-menu-item v-if="!supplierList || !supplierList?.length">
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
        <!-- Total -->
        <div class="border border-slate-300 p-2 px-3 mb-4">
          <div class="flex justify-between items-center">
            <div class="mb-3"><label>Total:</label></div>
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
            @focus="paidAmount?.select()"
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
        <button
          class="bg-[#000180] px-5 py-2 text-white min-w-fit mt-4 rounded-md"
          type="button"
          @click="handleSale($router)"
        >
          <i class="bi bi-cart mr-2"></i> <span>Sale</span>
        </button>
      </div>
    </div>
  </MainLayout>
</template>
