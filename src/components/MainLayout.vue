<template>
  <section class="w-full box-border overflow-x-hidden p-3">
    <!-- header -->
    <header class="mb-4">
      <div class="flex justify-between">
        <div>
          <img src="@/assets/images/logo.png" alt="logo" class="w-full" />
        </div>
        <div>
          <ul class="flex items-center space-x-3 list-none p-0 profile-menu">
            <li>
              <span class="font-bold">{{ time }}</span>
            </li>
            <li>
              <span class="font-bold">{{ date }}</span>
            </li>

            <li>
              <a-dropdown :trigger="['click']">
                <a class="ant-dropdown-link cursor-pointer" @click.prevent>
                  <i
                    class="bi bi-person-circle text-lg mr-2 text-indigo-500"
                  ></i>
                  <span>{{ userInfo?.name }} ({{ userInfo?.email }})</span>
                </a>
                <template #overlay>
                  <a-menu>
                    <a-menu-item>
                      <button
                        type="button"
                        class="w-full text-left"
                        @click="handleLogout($router)"
                      >
                        Logout
                      </button>
                    </a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown>
            </li>
          </ul>
        </div>
      </div>
    </header>
    <!-- content -->
    <div class="border-double border-4 border-slate-300 p-3">
      <div class="flex">
        <!-- sidebar -->
        <Menu />
        <div class="grow"><slot></slot></div>
      </div>
    </div>
  </section>
</template>

<script setup>
import Menu from "./Menu.vue";
import { useDataStore } from "@/stores/data";
import Cookies from "js-cookie";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";

const dataStore = useDataStore();
const { userInfo } = storeToRefs(dataStore);

let timeOptions = {
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
};

let dateOptions = {
  month: "2-digit",
  day: "2-digit",
  year: "numeric",
};

let time = ref();
let date = ref();

function updateDateTime() {
  let now = new Date();
  time.value = now.toLocaleString("en-US", timeOptions);
  date.value = now.toLocaleString("en-US", dateOptions);
}
onMounted(() => {
  updateDateTime();
  setInterval(updateDateTime, 60000);
});

const handleLogout = (router) => {
  Cookies.set("token", "");
  localStorage.clear();
  dataStore.$reset();
  router.push({ name: "login" });
};
</script>
