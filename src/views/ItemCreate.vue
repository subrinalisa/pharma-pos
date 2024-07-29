<script>
import MainLayout from "@/components/MainLayout.vue";
import { apiBase } from "@/config";
import axios from "axios";
import Cookies from "js-cookie";

export default {
  components: {
    MainLayout,
  },
  methods: {
    addAttribute() {
      if (this.selectedAttribute) {
        this.productVariationAttributes.push({
          name: this.selectedAttribute,
          values: "",
        });
        this.selectedAttribute = "";
      }
    },
    deleteAttribute(index) {
      this.productVariationAttributes.splice(index, 1);
    },
    manageGlobalAttributes() {
      // Handle global attributes management
      console.log("Managing global attributes");
    },
    deletePackSize(index) {
      if (confirm("Are you sure you want to delete this pack size?")) {
        this.packSizes.splice(index, 1);
      }
    },
    deleteVariation(index) {
      this.productVariations.splice(index, 1);
    },
    async save() {
      try {
        const payload = {
          products: this.products,
          product_prices: this.product_prices,
          product_locations: this.product_locations,
          product_inventories: this.product_inventories,
          pack_size: this.packSize,
          product_variation_attributes: this.productVariationAttributes,
          product_variation: this.productVariations,
          product_images: this.images,
        };

        const token = Cookies.get("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.post(`${apiBase}/product-store`, payload, config);

        console.log("Save successful:", response.data);
      } catch (error) {
        console.error("Error saving data:", error);
      }
    },
    onFileChange(event) {
      const files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.images.push({ src: e.target.result });
        };
        reader.readAsDataURL(files[i]);
      }
    },
  },
  data() {
    return {
      images: [],
      products: {
        category_id: "",
        supplier_id: "",
        name: "",
        additional_item_numbers: "",
        product_id: "",
        tags: "",
        manufacturer: "",
        upc_ean_isbn: "",
        description: "",
      },
      product_prices: {
        cost_price: "220.3",
        selling_price: "333.30",
        trade_price: "33.77",
        vat: "12.2",
        wholesale: "12.2",
        promo_price: "12.21",
        promo_start_date: "2024-09-08",
        promo_end_date: "2024-09-10",
        disable_from_price_rules: true,
        allow_price_override: true,
        prices_include_tax: true,
        only_allow_whole_numbers: true,
        change_cost_price_during_sale: true,
        override_default_commission: true,
        override_default_tax: true,
      },

      product_locations: {
        location_at_store: "qqewweqe",
        reorder_level: "1",
        replenish_level: "2",
        hide_from_grid: true,
        override_prices: true,
        override_default_tax: true,
      },
      product_inventories: {
        quantity: "220.3",
        recorder_level: "1",
      },

      packSize: {
        name: "1",
        quantity: "1",
        tp: "12.22",
        vat_percent: "12.2",
        vat: "123",
        selling_price: "120.33",
        default_unit: "1",
      },
      productVariationAttributes: [
        { name: "Pogo Syp. (Syr)", values: "123.22" },
        { name: "Pogo Syp. (Syr)", values: "123.22" },
      ],
      productVariations: [
        {
          name: "Pogo Syp. (Syr)",
          attributes: "jahds",
          item_number: "12345",
          is_ecommerce_item: "1",
          variation_id: "12",
        },
        {
          name: "Pogo Syp. (Syr)",
          attributes: "jahds",
          item_number: "12345",
          is_ecommerce_item: "1",
          variation_id: "12",
        },
      ],
      selectedAttribute: "",
      attributes: ["Attribute 1", "Attribute 2"], // Example attributes
      activeTab: "itemInfo",
      // tabComponents: {
      //   itemInfo: ItemInfo,
      //   variations: Variations,
      //   pricing: Pricing,
      //   inventory: Inventory,
      //   images: Images,
      //   locations: Locations,
      // },
    };
  },
};
</script>

<template>
  <MainLayout>
    <div class="space-y-5 p-5">
      <div
        class="overflow-hidden rounded-xl border border-gray-100 bg-gray-50 p-1"
      >
        <ul class="flex items-center gap-2 text-sm font-medium">
          <li class="flex-1">
            <a
              href="#"
              class="relative flex items-center justify-center gap-2 rounded-lg px-3 py-2"
              :class="{
                'bg-[#000180] text-white shadow': activeTab === 'itemInfo',
                'text-gray-500 hover:bg-white hover:text-gray-700 hover:shadow':
                  activeTab !== 'itemInfo',
              }"
              @click="this.activeTab = 'itemInfo'"
            >
              Item info
            </a>
          </li>
          <li class="flex-1">
            <a
              href="#"
              class="relative flex items-center justify-center gap-2 rounded-lg px-3 py-2"
              :class="{
                'bg-blue-800 text-white shadow': activeTab === 'variations',
                'text-gray-500 hover:bg-white hover:text-gray-700 hover:shadow':
                  activeTab !== 'variations',
              }"
              @click="this.activeTab = 'variations'"
            >
              Variations
            </a>
          </li>
          <li class="flex-1">
            <a
              href="#"
              class="relative flex items-center justify-center gap-2 rounded-lg px-3 py-2"
              :class="{
                'bg-blue-800 text-white shadow': activeTab === 'pricing',
                'text-gray-500 hover:bg-white hover:text-gray-700 hover:shadow':
                  activeTab !== 'pricing',
              }"
              @click="activeTab = 'pricing'"
            >
              Pricing
            </a>
          </li>
          <li class="flex-1">
            <a
              href="#"
              class="relative flex items-center justify-center gap-2 rounded-lg px-3 py-2"
              :class="{
                'bg-blue-800 text-white shadow': activeTab === 'inventory',
                'text-gray-500 hover:bg-white hover:text-gray-700 hover:shadow':
                  activeTab !== 'inventory',
              }"
              @click="activeTab = 'inventory'"
            >
              Inventory
            </a>
          </li>
          <li class="flex-1">
            <a
              href="#"
              class="relative flex items-center justify-center gap-2 rounded-lg px-3 py-2"
              :class="{
                'bg-blue-800 text-white shadow': activeTab === 'images',
                'text-gray-500 hover:bg-white hover:text-gray-700 hover:shadow':
                  activeTab !== 'images',
              }"
              @click="activeTab = 'images'"
            >
              Images
            </a>
          </li>
          <li class="flex-1">
            <a
              href="#"
              class="relative flex items-center justify-center gap-2 rounded-lg px-3 py-2"
              :class="{
                'bg-blue-800 text-white shadow': activeTab === 'locations',
                'text-gray-500 hover:bg-white hover:text-gray-700 hover:shadow':
                  activeTab !== 'locations',
              }"
              @click="activeTab = 'locations'"
            >
              Locations
            </a>
          </li>
        </ul>
      </div>
      <div>
        <!-- <ItemInfo v-if="activeTab=='itemInfo'"></ItemInfo> -->
        <template v-if="activeTab == 'itemInfo'">
          <div>
            <h2 class="text-lg font-semibold mb-4">
              <span class="text-blue-500">
                Item Information (Fields in red are required)
              </span>
            </h2>
            <form>
              <div class="mb-4">
                <label for="itemName" class="block text-gray-700 font-semibold">
                  Item Name
                </label>
                <input
                  id="itemName"
                  type="text"
                  v-model="products.name"
                  class="w-full border border-gray rounded-md shadow-sm px-2 py-1"
                  required
                />
              </div>
              <div class="mb-4">
                <label for="category" class="block text-red-500">
                  Category
                </label>
                <input
                  id="category"
                  type="text"
                  v-model="products.category_id"
                  class="w-full border border-gray rounded-md shadow-sm px-2 py-1"
                  required
                />
              </div>
              <div class="mb-4">
                <label for="supplier" class="block text-gray-700 font-semibold">
                  Supplier
                </label>
                <input
                  id="supplier"
                  type="text"
                  v-model="products.supplier_id"
                  class="w-full border border-gray rounded-md shadow-sm px-2 py-1"
                />
              </div>
              <div class="mb-4">
                <label for="upc" class="block text-gray-700 font-semibold">
                  UPC/EAN/ISBN
                </label>
                <input
                  id="upc"
                  type="text"
                  v-model="products.upc_ean_isbn"
                  class="w-full border border-gray rounded-md shadow-sm px-2 py-1"
                />
              </div>
              <div class="mb-4">
                <label
                  for="productId"
                  class="block text-gray-700 font-semibold"
                >
                  Product ID
                </label>
                <input
                  id="productId"
                  type="text"
                  v-model="products.product_id"
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
                  v-model="products.additional_item_numbers"
                  class="w-full border border-gray rounded-md shadow-sm px-2 py-1"
                />
              </div>
              <div class="mb-4">
                <label for="tags" class="block text-gray-700 font-semibold">
                  Tags
                </label>
                <input
                  id="tags"
                  type="text"
                  v-model="products.tags"
                  class="w-full border border-gray rounded-md shadow-sm px-2 py-1"
                />
              </div>
              <div class="mb-4">
                <label
                  for="manufacturer"
                  class="block text-gray-700 font-semibold"
                >
                  Manufacturer
                </label>
                <input
                  id="manufacturer"
                  type="text"
                  v-model="products.manufacturer"
                  class="w-full border border-gray rounded-md shadow-sm px-2 py-1"
                />
              </div>
              <div class="mb-4">
                <label
                  for="description"
                  class="block text-gray-700 font-semibold"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  v-model="products.description"
                  class="w-full border border-gray rounded-md shadow-sm px-4 py-2"
                ></textarea>
              </div>
              <div class="flex justify-end space-x-4">
                <button
                  type="button"
                  class="px-4 py-2 bg-[#000180] text-white rounded-lg"
                  @click="save"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </template>

        <!-- <Variations v-if="activeTab=='variations'"></Variations> -->
        <template v-if="activeTab == 'variations'">
          <div class="bg-white p-5 rounded-lg shadow">
            <h3 class="text-md font-semibold mb-2">
              <span class="text-blue-500"
                >Pack Size (Fields in red are required)</span
              >
            </h3>

            <table class="w-full border-collapse">
              <thead>
                <tr>
                  <th class="w-1/12">Name</th>
                  <th class="w-1/12">Qty.</th>
                  <th class="w-1/12">TP</th>
                  <th class="w-1/12">Vat %</th>
                  <th class="w-1/12">Vat</th>
                  <th class="w-1/12">Selling Price</th>
                  <th class="w-1/6">Default Unit</th>
                  <th class="w-1/6">Delete</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <input
                      type="text"
                      v-model="packSize.name"
                      class="border border-gray rounded-md shadow-sm px-1 py-1"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      v-model="packSize.quantity"
                      class="border border-gray rounded-md shadow-sm px-1 py-1"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      v-model="packSize.tp"
                      class="border border-gray rounded-md shadow-sm px-1 py-1"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      v-model="packSize.vat_percent"
                      class="border border-gray rounded-md shadow-sm px-1 py-1"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      v-model="packSize.vat"
                      class="border border-gray rounded-md shadow-sm px-1 py-1"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      v-model="packSize.selling_price"
                      class="border border-gray rounded-md shadow-sm px-1 py-1"
                    />
                  </td>
                  <td class="text-center">
                    <input
                      type="checkbox"
                      v-model="packSize.default_unit"
                      class="self-center"
                    />
                  </td>
                  <td class="text-center">
                    <button @click="deletePackSize" class="text-red-500">
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
          </div>

          <br />

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
                  @click="addAttribute"
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
                      {{ attribute.values }}
                    </td>
                    <td class="border border-gray-300 p-2 text-center">
                      <button
                        @click="deleteAttribute(index)"
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
                      {{ variation.name }}
                    </td>
                    <td class="border border-gray-300 p-2">
                      {{ variation.attributes }}
                    </td>
                    <td class="border border-gray-300 p-2">
                      {{ variation.item_number }}
                    </td>
                    <td class="border border-gray-300 p-2 text-center">
                      <input
                        type="checkbox"
                        :checked="variation.is_ecommerce_item === '1'"
                        disabled
                      />
                    </td>
                    <td class="border border-gray-300 p-2">
                      {{ variation.variation_id }}
                    </td>
                    <td class="border border-gray-300 p-2 text-center">
                      <button
                        @click="deleteVariation(index)"
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
            </div>
          </div>

          <div class="flex justify-end space-x-4">
            <button
              type="button"
              class="px-4 py-2 bg-[#000180] text-white rounded-lg"
              @click="save"
            >
              Save
            </button>
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
            <form>
              <div class="grid grid-cols-1 gap-4 mb-4">
                <div>
                  <label class="block text-red-500 mb-2"
                    >Cost Price [Without Tax]</label
                  >
                  <input
                    type="text"
                    v-model="product_prices.cost_price"
                    class="border border-grey rounded-md shadow-sm px-2 py-1 w-full"
                  />
                </div>
                <div>
                  <label class="block text-red-500 mb-2">Selling Price</label>
                  <input
                    type="text"
                    v-model="product_prices.selling_price"
                    class="border border-grey rounded-md shadow-sm px-2 py-1 w-full"
                  />
                </div>
                <div>
                  <label class="block mb-2">Trade Price</label>
                  <input
                    type="text"
                    v-model="product_prices.trade_price"
                    class="border border-grey rounded-md shadow-sm px-2 py-1 w-full"
                  />
                </div>
                <div>
                  <label class="block mb-2">Vat</label>
                  <input
                    type="text"
                    v-model="product_prices.vat"
                    class="border border-grey rounded-md shadow-sm px-2 py-1 w-full"
                  />
                </div>
                <div>
                  <label class="block mb-2">Wholesale</label>
                  <input
                    type="text"
                    value="Present Off"
                    class="border border-grey rounded-md shadow-sm px-1 py-1 mr-px w-1/6"
                    readonly
                  />
                  <input
                    type="text"
                    v-model="product_prices.wholesale"
                    class="border border-grey rounded-md shadow-sm px-1 py-1 w-4/5"
                  />
                </div>
                <div>
                  <label class="block mb-2">Promo Price</label>
                  <input
                    type="text"
                    v-model="product_prices.promo_price"
                    class="border border-grey rounded-md shadow-sm px-2 py-1 w-full"
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
                    v-model="product_prices.allow_price_override"
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
                    v-model="product_prices.only_allow_whole_numbers"
                  />
                  <label>Only allow items to be sold in whole numbers</label>
                </div>
              </div>
              <div class="flex justify-end space-x-4">
                <button
                  type="button"
                  class="px-4 py-2 bg-[#000180] text-white rounded-lg"
                  @click="save"
                >
                  Save
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
          <form>
            <div class="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label class="block mb-2">Dhaka</label>
                <div class="grid grid-cols-1 gap-2">
                  <div>
                    <input
                      type="text"
                      value="Quantity"
                      class="border border-grey rounded-md shadow-sm px-1 py-1 mr-px w-5/12"
                      readonly
                    />
                    <input
                      type="text"
                      v-model="product_inventories.quantity"
                      class="border border-grey rounded-md shadow-sm px-1 py-1 w-5/12"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      value="Recorder Level"
                      class="border border-grey rounded-md shadow-sm px-1 py-1 mr-px w-5/12"
                      readonly
                    />
                    <input
                      type="text"
                      v-model="product_inventories.recorder_level"
                      class="border border-grey rounded-md shadow-sm px-1 py-1 w-5/12"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="flex justify-end space-x-4">
              <button
                type="button"
                class="px-4 py-2 bg-[#000180] text-white rounded-lg"
                @click="save"
              >
                Save
              </button>
            </div>
          </form>
        </template>
        <!-- <Images v-if="activeTab=='images'"></Images> -->
        <template v-if="activeTab == 'images'">
          <h3 class="text-md font-semibold mb-2">
            <span class="text-blue-500">Image</span>
          </h3>
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
              type="button"
              class="px-4 py-2 bg-[#000180] text-white rounded-lg"
            >
              Save
            </button>
          </div>
        </template>
        <!-- <Locations v-if="activeTab=='locations'"></Locations>  -->
        <template v-if="activeTab == 'locations'">
          <div class="bg-white p-5 rounded-lg shadow">
            <h3 class="text-md font-semibold mb-4">
              <span class="text-blue-500">Locations</span>
            </h3>

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
                type="button"
                class="px-4 py-2 bg-[#000180] text-white rounded-lg"
                @click="save"
              >
                Save
              </button>
            </div>
          </div>
        </template>
      </div>
    </div>
  </MainLayout>
</template>
