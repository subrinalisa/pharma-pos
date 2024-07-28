<script >
import MainLayout from "@/components/MainLayout.vue";
import ItemInfo from "@/components/item/ItemInfo.vue";
import Variations from "@/components/item/Variations.vue";
import Pricing from "@/components/item/Pricing.vue";
import Inventory from "@/components/item/Inventory.vue";
import Images from "@/components/item/Images.vue";
import Locations from "@/components/item/Locations.vue";


export default {
  components: {
    MainLayout,
    ItemInfo,
    Variations,
    Pricing,
    Inventory,
    Images,
    Locations,
  },
  data() {
    return {
      activeTab: 'itemInfo',
      tabComponents: {
        itemInfo: ItemInfo,
        variations: Variations,
        pricing: Pricing,
        inventory: Inventory,
        images: Images,
        locations: Locations,
      },
    };
  },
};


</script>

<template>
  <MainLayout>
    <div class="space-y-5 p-5">
      <div class="overflow-hidden rounded-xl border border-gray-100 bg-gray-50 p-1">
        <ul class="flex items-center gap-2 text-sm font-medium">
          <li class="flex-1">
            <a
              href="#"
              class="relative flex items-center justify-center gap-2 rounded-lg px-3 py-2"
              :class="{'bg-[#000180] text-white shadow': activeTab === 'itemInfo', 'text-gray-500 hover:bg-white hover:text-gray-700 hover:shadow': activeTab !== 'itemInfo'}"
              @click="this.activeTab = 'itemInfo'"
            >
              Item info
            </a>
          </li>
          <li class="flex-1">
            <a
              href="#"
              class="relative flex items-center justify-center gap-2 rounded-lg px-3 py-2"
              :class="{'bg-blue-800 text-white shadow': activeTab === 'variations', 'text-gray-500 hover:bg-white hover:text-gray-700 hover:shadow': activeTab !== 'variations'}"
              @click="this.activeTab = 'variations'"
            >
              Variations
            </a>
          </li>
          <li class="flex-1">
            <a
              href="#"
              class="relative flex items-center justify-center gap-2 rounded-lg px-3 py-2"
              :class="{'bg-blue-800 text-white shadow': activeTab === 'pricing', 'text-gray-500 hover:bg-white hover:text-gray-700 hover:shadow': activeTab !== 'pricing'}"
              @click="activeTab = 'pricing'"
            >
              Pricing
            </a>
          </li>
          <li class="flex-1">
            <a
              href="#"
              class="relative flex items-center justify-center gap-2 rounded-lg px-3 py-2"
              :class="{'bg-blue-800 text-white shadow': activeTab === 'inventory', 'text-gray-500 hover:bg-white hover:text-gray-700 hover:shadow': activeTab !== 'inventory'}"
              @click="activeTab = 'inventory'"
            >
              Inventory
            </a>
          </li>
          <li class="flex-1">
            <a
              href="#"
              class="relative flex items-center justify-center gap-2 rounded-lg px-3 py-2"
              :class="{'bg-blue-800 text-white shadow': activeTab === 'images', 'text-gray-500 hover:bg-white hover:text-gray-700 hover:shadow': activeTab !== 'images'}"
              @click="activeTab = 'images'"
            >
              Images
            </a>
          </li>
          <li class="flex-1">
            <a
              href="#"
              class="relative flex items-center justify-center gap-2 rounded-lg px-3 py-2"
              :class="{'bg-blue-800 text-white shadow': activeTab === 'locations', 'text-gray-500 hover:bg-white hover:text-gray-700 hover:shadow': activeTab !== 'locations'}"
              @click="activeTab = 'locations'"
            >
              Locations
            </a>
          </li>
        </ul>
      </div>
      <div >
        <ItemInfo v-if="activeTab=='itemInfo'"></ItemInfo>
        <Variations v-if="activeTab=='variations'"></Variations>
        <Pricing v-if="activeTab=='pricing'"></Pricing>
        <Inventory v-if="activeTab=='inventory'"></Inventory>
        <Images v-if="activeTab=='images'"></Images>
        <Locations v-if="activeTab=='locations'"></Locations>
      </div>
    </div>
  </MainLayout>
</template>
