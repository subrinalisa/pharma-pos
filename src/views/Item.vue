<script setup>
import MainLayout from "@/components/MainLayout.vue";
import { PictureOutlined } from "@ant-design/icons-vue";
</script>

<template>
  <MainLayout>
    <div class="space-y-5">
      <div
        class="overflow-hidden rounded-xl border border-gray-100 bg-gray-50 p-1"
      >
        <ul class="flex items-center gap-2 text-sm font-medium">
          <li class="flex-1">
            <a
              href="#"
              class="text-gra relative flex items-center justify-center gap-2 rounded-lg bg-white px-3 py-2 shadow hover:bg-white hover:text-gray-700"
            >
              Item info</a
            >
          </li>
          <li class="flex-1">
            <a
              href="#"
              class="flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-gray-500 hover:bg-white hover:text-gray-700 hover:shadow"
            >
              Variations</a
            >
          </li>
          <li class="flex-1">
            <a
              href="#"
              class="flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-gray-500 hover:bg-white hover:text-gray-700 hover:shadow"
            >
              Pricing
             </a
            >
          </li>
          <li class="flex-1">
            <a
              href="#"
              class="flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-gray-500 hover:bg-white hover:text-gray-700 hover:shadow"
            >
              Inventory</a
            >
          </li>
          <li class="flex-1">
            <a
              href="#"
              class="flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-gray-500 hover:bg-white hover:text-gray-700 hover:shadow"
            >
              Images</a
            >
          </li>
          <li class="flex-1">
            <a
              href="#"
              class="flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-gray-500 hover:bg-white hover:text-gray-700 hover:shadow"
            >
              Locations</a
            >
          </li>
        </ul>
      </div>
    </div>
  </MainLayout>
</template>
