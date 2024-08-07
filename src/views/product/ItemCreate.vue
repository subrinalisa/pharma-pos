<script setup>
import MainLayout from "@/components/MainLayout.vue";
import { apiBase } from "@/config";
import { showNotification } from "@/utilities/notification";
import axios from "axios";
import Cookies from "js-cookie";
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import Vue3TagsInput from "vue3-tags-input";
// Variables
const activeTab = ref("itemInfo");
const categoryList = ref([]);
const supplierList = ref([]);
const router = useRouter();
const globalProductId = ref(null);

const products = reactive({
  products: {
    category_id: "",
    supplier_id: "",
    name: "",
    additional_item_numbers: "",
    tags: "",
    manufacturer: "",
    upc_ean_isbn: "",
    description: "",
    tags: [],
  },
});
//const tags = ref(["hello", "world"]);

const handleChangeTag = (tag) => {
  products.products.tags = tag; // add the new tag to the tags array
  console.log(products.products.tags.join(", "));
};
const pack_size = reactive({
  product_id: globalProductId.value,
  name: "",
  quantity: "",
  tp: "",
  vat_percent: "",
  vat: "",
  selling_price: "",
  default_unit: "",
});

const productVariationAttributes = ref([]);

const productVariations = ref([]);
const product_prices = reactive({
  product_id: globalProductId.value,
  cost_price_without_tax: "",
  selling_price: "",
  trade_price: "",
  vat: "",
  wholesale: "",
  promo_price: "",
  promo_start_date: "",
  promo_end_date: "",
  disable_from_price_rules: true,
  allow_price_override_regardless_of_permissions: true,
  prices_include_tax: true,
  only_allow_items_to_be_sold_in_whole_numbers: true,
  change_cost_price_during_sale: true,
  override_default_commission: true,
  override_default_tax: true,
});

const product_locations = reactive({
  product_id: globalProductId.value,
  location_at_store: "",
  reorder_level: "",
  replenish_level: "",
  hide_from_grid: true,
  override_prices: true,
  override_default_tax: true,
});

const product_inventories = reactive({
  product_id: globalProductId.value,
  quantity: "",
  recorder_level: "",
});

const selectedAttribute = ref("");
const attributes = ref(["Attribute 1", "Attribute 2"]); // Example attributes

const images = reactive([]);

const itemInformation = async () => {
  try {
    const token = Cookies.get("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // console.log(products);

    const res = await axios.post(`${apiBase}/product-store`, products, config);
    if (res.status === 200) {
      const productId = res.data.product.id;
      console.log("Product ID:", productId);
      globalProductId.value = productId; // Assign the product ID to the global variable
      await itemVariations();

      activeTab.value = "variations";
    }
  } catch (err) {
    console.error(err);
  }
};

const itemVariations = async () => {
  try {
    const token = Cookies.get("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    console.log("Global Product ID:", globalProductId.value);
    console.log("Pack Size:", pack_size);
    console.log(
      "Product Variation Attributes:",
      productVariationAttributes.value
    );
    console.log("Product Variations:", productVariations.value);
    pack_size.default_unit = pack_size.default_unit ? 1 : 0;
    const payload = {
      pack_size: {
        product_id: globalProductId.value,
        ...pack_size,
        product_id: globalProductId.value,
      },
      product_variation_attributes: productVariationAttributes.value.map(
        (attr) => ({
          ...attr,
          product_id: globalProductId.value,
        })
      ),
      product_variation: productVariations.value.map((variation) => ({
        ...variation,
        product_id: globalProductId.value,
      })),

      product_id: globalProductId.value,
    };

    console.log("Payload:", payload);

    const res = await axios.post(`${apiBase}/product-store`, payload, config);
    if (res.status === 200) {
      activeTab.value = "pricing";
    } else {
      console.error(`Error: Received status ${res.status}`);
    }
  } catch (err) {
    console.error("Error occurred:", err);
  }
};

const itemPrice = async () => {
  try {
    const token = Cookies.get("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    console.log("Product Prices:", product_prices);
    console.log("Global Product ID:", globalProductId.value);

    const payload = {
      product_prices: {
        ...product_prices,
        product_id: globalProductId.value,
      },
      product_id: globalProductId.value,
    };

    console.log("Payload:", payload);

    const res = await axios.post(`${apiBase}/product-store`, payload, config);
    if (res.status === 200) {
      activeTab.value = "inventory";
    } else {
      console.error(`Error: Received status ${res.status}`);
    }
  } catch (err) {
    console.error("Error occurred:", err);
  }
};

const itemInventory = async () => {
  try {
    const token = Cookies.get("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    console.log("Global Product ID:", globalProductId.value);

    const payload = {
      product_inventories: {
        ...product_inventories,
        product_id: globalProductId.value,
      },
      product_id: globalProductId.value,
    };

    const res = await axios.post(`${apiBase}/product-store`, payload, config);
    if (res.status === 200) {
      activeTab.value = "images";
    }
  } catch (err) {
    console.error(err);
  }
};
const files = ref([]);

const onFileChange = (event) => {
  files.value = Array.from(event.target.files);
  // files.value = imgNames.map((item) => item);
};

const itemImage = async () => {
  try {
    const token = Cookies.get("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };

    console.log("Global Product ID:", globalProductId.value);
    console.log("images:", images);
    const payload = {
      product_images: files.value,
      product_id: globalProductId.value,
    };
    console.log("images:", payload);
    const res = await axios.post(`${apiBase}/product-store`, payload, config);
    if (res.status === 200) {
      activeTab.value = "locations";
    }
  } catch (err) {
    console.error(err);
  }
};

const itemLocation = async () => {
  try {
    const token = Cookies.get("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    console.log("Global Product ID:", globalProductId.value);

    const payload = {
      product_locations: {
        ...product_locations,
        product_id: globalProductId.value,
      },
      product_id: globalProductId.value,
    };

    const res = await axios.post(`${apiBase}/product-store`, payload, config);
    if (res.status === 200) {
      showNotification("success", res?.data?.message);
      router.push({ name: "item" });
    }
  } catch (err) {
    console.error(err);
  }
};

onMounted(async () => {
  const token = Cookies.get("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const categoryRes = await axios.get(`${apiBase}/categories`, config);
    categoryList.value = categoryRes.data.data;

    const supplierRes = await axios.get(`${apiBase}/suppliers`, config);
    supplierList.value = supplierRes.data.data;
  } catch (err) {
    console.error(err);
  }
});

const addAttribute = () => {
  console.log("hello");
  if (selectedAttribute.value) {
    productVariationAttributes.value.push({
      product_id: globalProductId.value,
      name: selectedAttribute.value,
      values: "",
      product_id: globalProductId.value,
    });
  }
};

const addItemVeriation = () => {
  console.log(productVariationAttributes.value.length);
  if (
    productVariationAttributes.value.length > 0 &&
    productVariationAttributes.value.attribute != ""
  ) {
    productVariations.value.push({
      product_id: globalProductId.value,
      name: "",
      attributes: "",
      item_number: "",
      is_ecommerce_item: "",
      variation_id: "",
    });
  }
};
const deleteAttribute = (index) => {
  productVariationAttributes.value.splice(index, 1);
};

const deletePackSize = (index) => {
  if (confirm("Are you sure you want to delete this pack size?")) {
    pack_size.splice(index, 1);
  }
};

const deleteVariation = (index) => {
  productVariations.value.splice(index, 1);
};
</script>

<template>
  <MainLayout>
    <div class="rounded-xl">
      <ul
        class="grid grid-cols-6 gap-3 justify-between items-center font-medium mb-4"
      >
        <li>
          <button
            type="button"
            class="tabButton"
            :class="`${activeTab == 'itemInfo' ? 'activeTab' : 'inactiveTab'}`"
            @click="activeTab = 'itemInfo'"
            :disabled="activeTab != 'itemInfo'"
          >
            Item info
          </button>
        </li>
        <li>
          <button
            type="button"
            class="tabButton"
            :class="`${
              activeTab == 'variations' ? 'activeTab' : 'inactiveTab'
            }`"
            @click="activeTab = 'variations'"
            :disabled="activeTab != 'variations'"
          >
            Variations
          </button>
        </li>
        <li>
          <button
            type="button"
            class="tabButton"
            :class="`${activeTab == 'pricing' ? 'activeTab' : 'inactiveTab'}`"
            @click="activeTab = 'pricing'"
            :disabled="activeTab != 'pricing'"
          >
            Pricing
          </button>
        </li>
        <li>
          <button
            type="button"
            class="tabButton"
            :class="`${activeTab == 'inventory' ? 'activeTab' : 'inactiveTab'}`"
            @click="activeTab = 'inventory'"
            :disabled="activeTab != 'inventory'"
          >
            Inventory
          </button>
        </li>
        <li>
          <button
            type="button"
            class="tabButton"
            :class="`${activeTab == 'images' ? 'activeTab' : 'inactiveTab'}`"
            @click="activeTab = 'images'"
            :disabled="activeTab != 'images'"
          >
            Images
          </button>
        </li>
        <li>
          <button
            type="button"
            class="tabButton"
            :class="`${activeTab == 'locations' ? 'activeTab' : 'inactiveTab'}`"
            @click="activeTab = 'locations'"
            :disabled="activeTab != 'locations'"
          >
            Locations
          </button>
        </li>
      </ul>
    </div>

    <!-- Item Information Tab -->
    <template v-if="activeTab == 'itemInfo'">
      <form @submit.prevent="itemInformation">
        <!-- Form Fields -->
        <div class="mb-4">
          <label for="itemName" class="block text-gray-700 font-semibold">
            Item Name
          </label>
          <input
            id="itemName"
            type="text"
            v-model="products.products.name"
            class="w-full border border-gray rounded-md shadow-sm px-2 py-1"
            required
          />
        </div>
        <div class="space-y-4">
          <!-- Category Select -->
          <div class="flex flex-col">
            <label for="category_id" class="text-sm font-semibold mb-1"
              >Select Category</label
            >
            <select
              id="category_id"
              v-model="products.products.category_id"
              class="border border-gray-300 rounded-lg p-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option
                v-for="(category, index) in categoryList"
                :key="index"
                :value="category.id"
              >
                {{ category.name }}
              </option>
            </select>
          </div>
          <!-- Supplier Select -->
          <div class="flex flex-col">
            <label for="supplier_id" class="text-sm font-semibold mb-1"
              >Select Supplier</label
            >
            <select
              id="supplier_id"
              v-model="products.products.supplier_id"
              class="border border-gray-300 rounded-lg p-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option
                v-for="(supplier, index) in supplierList"
                :key="index"
                :value="supplier.id"
              >
                {{ supplier.first_name }}
              </option>
            </select>
          </div>
        </div>
        <!-- Additional Form Fields -->
        <div class="mb-4">
          <label for="upc" class="block text-gray-700 font-semibold">
            UPC/EAN/ISBN
          </label>
          <input
            id="upc"
            type="text"
            v-model="products.products.upc_ean_isbn"
            class="w-full border border-gray rounded-md shadow-sm px-2 py-1"
          />
        </div>
        <div class="mb-4">
          <label
            for="additionalItemNumbers"
            class="block text-gray-700 font-semibold"
          >
            Additional Item Numbers
          </label>
          <input
            id="additionalItemNumbers"
            type="text"
            v-model="products.products.additional_item_numbers"
            class="w-full border border-gray rounded-md shadow-sm px-2 py-1"
          />
        </div>
        <div class="mb-4">
          <label for="tags" class="block text-gray-700 font-semibold">
            Tags
          </label>
          <!-- <input
            id="tags"
            type="text"
            v-model="products.products.tags"
            class="w-full border border-gray rounded-md shadow-sm px-2 py-1"
          /> -->

          <vue3-tags-input
            :tags="products.products.tags"
            placeholder="enter some tags"
            @on-tags-changed="handleChangeTag"
          />
        </div>
        <div class="mb-4">
          <label for="manufacturer" class="block text-gray-700 font-semibold">
            Manufacturer
          </label>
          <input
            id="manufacturer"
            type="text"
            v-model="products.products.manufacturer"
            class="w-full border border-gray rounded-md shadow-sm px-2 py-1"
          />
        </div>
        <div class="mb-4">
          <label for="description" class="block text-gray-700 font-semibold">
            Description
          </label>
          <textarea
            id="description"
            v-model="products.products.description"
            class="w-full border border-gray rounded-md shadow-sm px-4 py-2"
          ></textarea>
        </div>
        <div class="flex justify-end space-x-4">
          <button
            type="submit"
            class="bg-blue-500 text-white px-4 py-2 rounded-lg"
            :disabled="isLoading"
          >
            Submit
          </button>
          <button
            type="button"
            @click="reset"
            class="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </form>
    </template>

    <!-- Variations Tab -->
    <template v-if="activeTab === 'variations'">
      <div>
        <form @submit.prevent="itemVariations">
          <!-- Pack Size Section -->
          <div class="bg-white p-5 rounded-lg shadow">
            <h3 class="text-md font-semibold mb-2">
              <span class="text-blue-500"
                >Pack Size (Fields in red are required)</span
              >
            </h3>
            <table class="w-full border-collapse">
              <thead>
                <tr>
                  <th class="border px-4 py-2 text-left">Pack Size Name</th>
                  <th class="border px-4 py-2 text-left">Quantity</th>
                  <th class="border px-4 py-2 text-left">TP</th>
                  <th class="border px-4 py-2 text-left">Vat Percent</th>
                  <th class="border px-4 py-2 text-left">VAT</th>
                  <th class="border px-4 py-2 text-left">Selling Price</th>
                  <th class="border px-4 py-2 text-left">Default Unit</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="border px-4 py-2">
                    <input
                      type="text"
                      v-model="pack_size.name"
                      class="w-full border border-gray rounded-md shadow-sm px-2 py-1"
                    />
                  </td>
                  <td class="border px-4 py-2">
                    <input
                      type="number"
                      v-model="pack_size.quantity"
                      class="w-full border border-gray rounded-md shadow-sm px-2 py-1 text-right"
                    />
                  </td>
                  <td class="border px-4 py-2">
                    <input
                      type="number"
                      v-model="pack_size.tp"
                      class="w-full border border-gray rounded-md shadow-sm px-2 py-1 text-right"
                    />
                  </td>
                  <td class="border px-4 py-2">
                    <input
                      type="number"
                      v-model="pack_size.vat_percent"
                      class="w-full border border-gray rounded-md shadow-sm px-2 py-1 text-right"
                    />
                  </td>
                  <td class="border px-4 py-2">
                    <input
                      type="number"
                      v-model="pack_size.vat"
                      class="w-full border border-gray rounded-md shadow-sm px-2 py-1 text-right"
                    />
                  </td>
                  <td class="border px-4 py-2">
                    <input
                      type="number"
                      v-model="pack_size.selling_price"
                      class="w-full border border-gray rounded-md shadow-sm px-2 py-1 text-right"
                    />
                  </td>
                  <td class="border px-4 py-2">
                    <input
                      type="checkbox"
                      v-model="pack_size.default_unit"
                      class="w-full border border-gray rounded-md shadow-sm px-2 py-1 text-right"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="mb-6 bg-white p-5 rounded-lg shadow">
            <h3 class="text-md font-semibold mb-2">
              <span class="text-blue-500"
                >Variations (Fields in red are required)</span
              >
            </h3>

            <div class="mb-4">
              <label class="block mb-2">Item Attributes</label>
              <div class="flex items-center gap-2 mb-2">
                <select
                  v-model="selectedAttribute"
                  class="border border-gray rounded-md shadow-sm px-2 py-1 flex-1"
                >
                  <option value="" disabled>Select an Attribute</option>
                  <!-- Add options here if needed -->
                  <option
                    v-for="attribute in attributes"
                    :key="attribute"
                    :value="attribute"
                  >
                    {{ attribute }}
                  </option>
                </select>
                <button
                  @click.prevent="addAttribute"
                  class="bg-blue-800 text-white rounded-md px-3 py-1"
                >
                  Add
                </button>
              </div>

              <table class="w-full border-collapse">
                <thead>
                  <tr>
                    <th class="p-2">Name</th>
                    <th class="p-2">Values</th>
                    <th class="p-2">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(attribute, index) in productVariationAttributes"
                    :key="index"
                  >
                    <td class="border border-gray-300 p-2">
                      {{ attribute.name }}
                    </td>
                    <td class="border border-gray-300 p-2">
                      <input
                        type="number"
                        v-model="attribute.values"
                        class="w-full border border-gray rounded-md shadow-sm px-0 p-1 text-left"
                      />
                    </td>
                    <td class="border border-gray-300 p-2 text-center">
                      <button
                        @click.prevent="deleteAttribute(index)"
                        class="text-red-500"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          class="w-5 h-5"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>

              <br />
              <button
                @click="manageGlobalAttributes"
                class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-2 hover:border-transparent rounded"
              >
                Manage Global Attributes
              </button>

              <br />

              <label class="block mb-2">Item Variations:</label>
              <table class="w-full border-collapse">
                <thead>
                  <tr>
                    <th class="p-2">Name</th>
                    <th class="p-2">Attributes</th>
                    <th class="p-2">Item Number</th>
                    <th class="p-2">Is Ecommerce Item</th>
                    <th class="p-2">Variation ID</th>
                    <th class="p-2">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(variation, index) in productVariations"
                    :key="index"
                  >
                    <td class="border border-gray-300 p-2">
                      <input
                        type="test"
                        v-model="variation.name"
                        class="w-full border border-gray rounded-md shadow-sm px-0 p-1 text-left"
                      />
                    </td>
                    <td class="border border-gray-300 p-2">
                      <input
                        type="test"
                        v-model="variation.attributes"
                        class="w-full border border-gray rounded-md shadow-sm px-0 p-1 text-left"
                      />
                    </td>
                    <td class="border border-gray-300 p-2">
                      <input
                        type="number"
                        v-model="variation.item_number"
                        class="w-full border border-gray rounded-md shadow-sm px-0 p-1 text-left"
                      />
                    </td>
                    <td class="border border-gray-300 p-2 text-center">
                      <input
                        type="checkbox"
                        :checked="variation.is_ecommerce_item === '1'"
                        disabled
                      />
                    </td>
                    <td class="border border-gray-300 p-2">
                      <input
                        type="number"
                        v-model="variation.variation_id"
                        class="w-full border border-gray rounded-md shadow-sm px-0 p-1 text-left"
                      />
                    </td>
                    <td class="border border-gray-300 p-2 text-center">
                      <button
                        @click.prevent="deleteVariation(index)"
                        class="text-red-500"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          class="w-5 h-5"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>

              <button
                @click.prevent="addItemVeriation"
                class="rounded-md px-3 py-1 text-blue-700"
              >
                Add Item Variation
              </button>
            </div>
          </div>

          <!-- Form Buttons -->
          <div class="flex justify-end space-x-4 mt-4">
            <button
              type="submit"
              class="bg-blue-500 text-white px-4 py-2 rounded-lg"
              :disabled="isLoading"
            >
              Submit
            </button>
            <button
              type="button"
              @click="reset"
              class="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </template>

    <!-- <Pricing v-if="activeTab=='pricing'"></Pricing> -->
    <template v-if="activeTab == 'pricing'">
      <div class="bg-white p-5 rounded-lg shadow">
        <h3 class="text-md font-semibold mb-4">
          <span class="text-blue-500"
            >Pricing (Fields in red are required)</span
          >
        </h3>
        <form @submit.prevent="itemPrice()">
          <div class="grid grid-cols-1 gap-4 mb-4">
            <div>
              <label class="block text-red-500 mb-2"
                >Cost Price [Without Tax]</label
              >
              <input
                type="number"
                v-model="product_prices.cost_price_without_tax"
                class="border border-grey rounded-md shadow-sm px-2 py-1 w-full text-right text-right"
              />
            </div>
            <div>
              <label class="block text-red-500 mb-2">Selling Price</label>
              <input
                type="number"
                v-model="product_prices.selling_price"
                class="border border-grey rounded-md shadow-sm px-2 py-1 w-full text-right"
              />
            </div>
            <div>
              <label class="block mb-2">Trade Price</label>
              <input
                type="number"
                v-model="product_prices.trade_price"
                class="border border-grey rounded-md shadow-sm px-2 py-1 w-full text-right"
              />
            </div>
            <div>
              <label class="block mb-2">Vat</label>
              <input
                type="number"
                v-model="product_prices.vat"
                class="border border-grey rounded-md shadow-sm px-2 py-1 w-full text-right"
              />
            </div>
            <div>
              <label class="block mb-2">Wholesale</label>

              <select
                class="border border-grey rounded-md shadow-sm px-1 py-1 mr-px w-1/6"
                v-model="product_prices.wholesale_type"
                required
              >
                <option value="fixed_price">Fixed Price</option>
                <option value="percent_off">Percent Off</option>
                <option value="cost_plus_percent">Cost Plus Percent</option>
                <option value="cost_plus_fixed_amount">
                  Cost Plus Fixed Amount
                </option>
              </select>
              <input
                type="number"
                v-model="product_prices.wholesale"
                class="border border-grey rounded-md shadow-sm px-1 py-1 w-4/5 text-right"
              />
            </div>
            <div>
              <label class="block mb-2">Promo Price</label>
              <input
                type="number"
                v-model="product_prices.promo_price"
                class="border border-grey rounded-md shadow-sm px-2 py-1 w-full text-right"
              />
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label class="block mb-2">Promo Start Date</label>
              <input
                type="date"
                v-model="product_prices.promo_start_date"
                class="border border-grey rounded-md shadow-sm px-2 py-1 w-full"
              />
            </div>
            <div>
              <label class="block mb-2">Promo End Date</label>
              <input
                type="date"
                v-model="product_prices.promo_end_date"
                class="border border-grey rounded-md shadow-sm px-2 py-1 w-full"
              />
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4 mb-4">
            <div class="flex items-center gap-2">
              <input
                type="checkbox"
                v-model="product_prices.disable_from_price_rules"
              />
              <label>Disable From Price Rules</label>
            </div>
            <div class="flex items-center gap-2">
              <input
                type="checkbox"
                v-model="
                  product_prices.allow_price_override_regardless_of_permissions
                "
              />
              <label>Allow price override regardless of permissions</label>
            </div>
            <div class="flex items-center gap-2">
              <input
                type="checkbox"
                v-model="product_prices.change_cost_price_during_sale"
              />
              <label>Change cost price during sale</label>
            </div>
            <div class="flex items-center gap-2">
              <input
                type="checkbox"
                v-model="product_prices.override_default_commission"
              />
              <label>Override Default Commission</label>
            </div>
            <div class="flex items-center gap-2">
              <input
                type="checkbox"
                v-model="product_prices.prices_include_tax"
              />
              <label>Prices include Tax</label>
            </div>
            <div class="flex items-center gap-2">
              <input
                type="checkbox"
                v-model="product_prices.override_default_tax"
              />
              <label>Override Default Tax</label>
            </div>
            <div class="flex items-center gap-2">
              <input
                type="checkbox"
                v-model="
                  product_prices.only_allow_items_to_be_sold_in_whole_numbers
                "
              />
              <label>Only allow items to be sold in whole numbers</label>
            </div>
          </div>
          <div class="flex justify-end space-x-4">
            <button
              type="submit"
              class="bg-blue-500 text-white px-4 py-2 rounded-lg"
              :disabled="isLoading"
            >
              Submit
            </button>
            <button
              type="button"
              @click="reset"
              class="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </template>

    <!-- <Inventory v-if="activeTab=='inventory'"></Inventory> -->
    <template v-if="activeTab == 'inventory'">
      <h3 class="text-md font-semibold mb-4">
        <span class="text-blue-500">Inventory</span>
      </h3>
      <form @submit.prevent="itemInventory()">
        <div class="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label class="block mb-2">Dhaka</label>
            <div class="grid grid-cols-1 gap-2">
              <div class="flex">
                <label class="mb-2 w-1/6">Quantity</label>
                <input
                  type="number"
                  v-model="product_inventories.quantity"
                  class="border border-grey rounded-md shadow-sm px-1 py-1 w-5/12 text-right"
                />
              </div>
              <div class="flex">
                <label class="mb-2 w-1/6">Recorder Level</label>
                <input
                  type="number"
                  v-model="product_inventories.recorder_level"
                  class="border border-grey rounded-md shadow-sm px-1 py-1 w-5/12 text-right"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="flex justify-end space-x-4">
          <button
            type="submit"
            class="bg-blue-500 text-white px-4 py-2 rounded-lg"
            :disabled="isLoading"
          >
            Submit
          </button>
          <button
            type="button"
            @click="reset"
            class="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </form>
    </template>
    <!-- <Images v-if="activeTab=='images'"></Images> -->
    <template v-if="activeTab == 'images'">
      <h3 class="text-md font-semibold mb-2">
        <span class="text-blue-500">Image</span>
      </h3>
      <form @submit.prevent="itemImage()">
        <div class="mb-4">
          <input type="file" multiple @change="onFileChange" class="mb-4" />
          <div class="flex space-x-4">
            <div
              v-for="(image, index) in images"
              :key="index"
              class="w-16 h-16 border border-gray-400 flex items-center justify-center"
            >
              <img
                :src="image.src"
                alt="Image"
                class="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
        <div class="flex justify-end space-x-4">
          <button
            type="submit"
            class="bg-blue-500 text-white px-4 py-2 rounded-lg"
            :disabled="isLoading"
          >
            Submit
          </button>
          <button
            type="button"
            @click="reset"
            class="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </form>
    </template>

    <template v-if="activeTab == 'locations'">
      <div class="bg-white p-5 rounded-lg shadow">
        <h3 class="text-md font-semibold mb-4">
          <span class="text-blue-500">Locations</span>
        </h3>
        <form @submit.prevent="itemLocation()">
          <div class="grid grid-cols-1 gap-4 mb-4">
            <div>
              <label class="block text-500 mb-2">Location At Store</label>
              <input
                type="text"
                v-model="product_locations.location_at_store"
                class="border border-grey rounded-md shadow-sm px-2 py-1 w-full"
              />
            </div>
            <div>
              <label class="block text-500 mb-2">Reorder Level</label>
              <input
                type="text"
                v-model="product_locations.reorder_level"
                class="border border-grey rounded-md shadow-sm px-2 py-1 w-full"
              />
            </div>
            <div>
              <label class="block mb-2">Replenish Level</label>
              <input
                type="text"
                v-model="product_locations.replenish_level"
                class="border border-grey rounded-md shadow-sm px-2 py-1 w-full"
              />
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4 mb-4">
            <div class="flex items-center gap-2">
              <label>Hide From Grid:</label>
              <input
                type="checkbox"
                v-model="product_locations.hide_from_grid"
              />
            </div>
            <div class="flex items-center gap-2">
              <label>Override Prices:</label>
              <input
                type="checkbox"
                v-model="product_locations.override_prices"
              />
            </div>
            <div class="flex items-center gap-2">
              <label>Override Default Tax:</label>
              <input
                type="checkbox"
                v-model="product_locations.override_default_tax"
              />
            </div>
          </div>
          <div class="flex justify-end space-x-4">
            <button
              type="submit"
              class="bg-blue-500 text-white px-4 py-2 rounded-lg"
              :disabled="isLoading"
            >
              Submit
            </button>
            <button
              type="button"
              @click="reset"
              class="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </template>
  </MainLayout>
</template>
