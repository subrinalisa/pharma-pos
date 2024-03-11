<template>
  <div
    class="flex justify-between items-center bg-[#072C66] rounded-md py-2 px-4 header"
  >
    <div>
      <h1 class="text-base md:text-lg xl:text-2xl font-semibold text-white">
        Welcome
        <span class="text-yellow-400 capitalize">{{ userInfo?.username }}</span>
        to
        {{ title }}
      </h1>
    </div>
    <div>
      <button
        type="button"
        title="Logout"
        class="text-white font-semibold w-10 hover:text-yellow-300 md:text-xl"
        @click="handleLogout"
      >
        <PoweroffOutlined class="align-baseline" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { showNotification } from "@/utilities/notification.js";
import { PoweroffOutlined } from "@ant-design/icons-vue";
import Cookies from "js-cookie";
import { useRouter } from "vue-router";

// Pinia
import { storeToRefs } from "pinia";
import { useLoginStore } from "@/stores/login";
const loginStore = useLoginStore();
const { userInfo } = storeToRefs(loginStore);

const router = useRouter();

defineProps(["title"]);

const handleLogout = () => {
  Cookies.set("token", "");
  localStorage.clear();
  loginStore.$reset();
  router.push({ name: "login" });
  showNotification("success", "Logged Out");
};
</script>
