<script setup>
import { ref, reactive, onMounted } from "vue";
import axios from "axios";
import Cookies from "js-cookie";
import MainLayout from "@/components/MainLayout.vue";
import { apiBase } from "@/config";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const emit = defineEmits(["update:isDrawerOpen"]);

const isSnackbarVisible = ref(false);
const isLoading = ref(false);
const form = reactive({
  name: "",
});

const permissionId = ref(route.params.id || null);

const reset = () => {
  emit("update:isDrawerOpen", false);
  form.name = "";
};

const addOrUpdatePermissions = async () => {
  isLoading.value = true;
  try {
    const token = Cookies.get("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const payload = {
      name: form.name,
    };

    console.log("Payload:", payload);

    let res;
    if (permissionId.value) {
      res = await axios.put(
        `${apiBase}/permissions/${permissionId.value}`,
        payload,
        config
      );
    } else {
      res = await axios.post(`${apiBase}/permissions`, payload, config);
    }

    if (res.status === 200 || res.status === 201) {
      router.push({ name: "permissions" });
    } else {
      console.error(res.data.message);
    }
  } catch (err) {
    console.error(err);
  } finally {
    isLoading.value = false;
  }
};

const fetchPermissionData = async () => {
  if (!permissionId.value) return;
  try {
    const token = Cookies.get("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.get(
      `${apiBase}/permissions/${permissionId.value}/edit`,
      config
    );
    const permissionData = res?.data?.permission;
    if (permissionData) {
      form.name = permissionData.name;
    } else {
      console.error("Permission data is undefined");
    }
  } catch (err) {
    console.error(err);
  }
};

onMounted(async () => {
  await fetchPermissionData();
});
</script>

<template>
  <MainLayout>
    <form @submit.prevent="addOrUpdatePermissions" class="space-y-6">
      <div class="space-y-4">
        <div class="flex flex-col">
          <label for="name" class="text-sm font-semibold mb-2"
            >Permission Name</label
          >
          <input
            id="name"
            v-model="form.name"
            type="text"
            placeholder="Enter permission name.."
            class="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div class="flex gap-4 mt-4">
        <button
          type="submit"
          class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          :disabled="isLoading"
        >
          Submit
        </button>
        <button
          type="button"
          @click="reset"
          class="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50"
        >
          Cancel
        </button>
      </div>
    </form>
  </MainLayout>
</template>

<style scoped>
.scrollable-content {
  overflow-y: auto;
}
</style>
