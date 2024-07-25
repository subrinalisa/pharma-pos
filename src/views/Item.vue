<script>
import MainLayout from "@/components/MainLayout.vue";
import ItemInfo from "@/components/ItemInfo.vue";
import Variations from "@/components/Variations.vue";
import Pricing from "@/components/Pricing.vue";
import Inventory from "@/components/Inventory.vue";
import Images from "@/components/Images.vue";
import Locations from "@/components/Locations.vue";

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
    };
  },
  computed: {
    tabComponents() {
      return {
        itemInfo: ItemInfo,
        variations: Variations,
        pricing: Pricing,
        inventory: Inventory,
        images: Images,
        locations: Locations,
      };
    },
    tabClass() {
      return (tab) => ({
        'bg-blue-800 text-white shadow': this.activeTab === tab,
        'text-gray-500 hover:bg-white hover:text-gray-700 hover:shadow': this.activeTab !== tab,
      });
    },
  },
  methods: {
    setActiveTab(tab) {
      this.activeTab = tab;
    },
  },
};
</script>

<template>
  <MainLayout>
    <div class="space-y-5 p-5">
      <div class="overflow-hidden rounded-xl border border-gray-100 bg-gray-50 p-1">
        <ul class="flex items-center gap-2 text-sm font-medium">
          <li class="flex-1" v-for="(tab, index) in ['itemInfo', 'variations', 'pricing', 'inventory', 'images', 'locations']" :key="index">
            <a
              href="#"
              class="relative flex items-center justify-center gap-2 rounded-lg px-3 py-2"
              :class="tabClass(tab)"
              @click="setActiveTab(tab)"
            >
              {{ tab.charAt(0).toUpperCase() + tab.slice(1) }}
            </a>
          </li>
        </ul>
      </div>
      <div class="bg-white p-5 rounded-lg shadow">
        <component :is="tabComponents[activeTab]"></component>
      </div>
    </div>
  </MainLayout>
</template>
