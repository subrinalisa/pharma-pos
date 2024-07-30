<script setup>
import { ref, reactive, onMounted } from "vue";
import axios from "axios";
import Cookies from "js-cookie";
import MainLayout from "@/components/MainLayout.vue";
import { apiBase } from "@/config";
import { useRouter } from "vue-router";

// Define props and emits
const props = defineProps({
  isDrawerOpen: Boolean,
  fetchUsers: Function,
});

const emit = defineEmits(["update:isDrawerOpen"]);

// State management
const isSnackbarVisible = ref(false);
const isLoading = ref(false);
const permissionsList = ref([]);
const form = reactive({
  name: "",
});

// Reset function to clear form and close drawer
const reset = () => {
  emit("update:isDrawerOpen", false);
  form.name = "";
};

// Get the router instance
const router = useRouter();

// Function to add new permissions
const addNewPermissions = async () => {
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

    // Debugging: Log the payload to ensure it's correct
    console.log("Payload:", payload);

    const res = await axios.post(`${apiBase}/permissions`, payload, config);

    if (res) {
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
</script>

<template>
  <MainLayout>
    <form @submit.prevent="addNewPermissions" class="space-y-6">
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
