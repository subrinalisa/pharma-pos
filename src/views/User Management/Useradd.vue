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
const roleList = ref([]);

const form = reactive({
  name: "",
  email: "",
  password: "",
  roles: null,
});

// Reset function to clear form and close drawer
const reset = () => {
  emit("update:isDrawerOpen", false);
  form.name = "";
  form.email = "";
  form.password = "";
  form.roles = null;
};

// Get the router instance
const router = useRouter();

// Function to add new user
const addNewUser = async () => {
  isLoading.value = true;
  try {
    const token = Cookies.get("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await axios.post(`${apiBase}/register`, form, config);

    if (res) {
      router.push({ name: "users" });
    }
  } catch (err) {
    console.error(err);
  } finally {
    isLoading.value = false;
  }
};

// Fetch roles on component mount
onMounted(async () => {
  const token = Cookies.get("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const res = await axios.get(`${apiBase}/roles`, config);
    roleList.value = res.data.role.map((role) => role.name); // Corrected mapping
  } catch (err) {
    console.error(err);
  }
});
</script>

<template>
  <MainLayout>
    <form @submit.prevent="addNewUser">
      <div class="p-4 space-y-4">
        <div class="flex flex-col">
          <label for="name" class="text-sm font-semibold mb-1">Name</label>
          <input
            id="name"
            v-model="form.name"
            type="text"
            placeholder="Enter here.."
            class="border border-gray-300 rounded-lg p-2"
          />
        </div>

        <div class="flex flex-col">
          <label for="email" class="text-sm font-semibold mb-1">Email</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            placeholder="example@demo.com"
            class="border border-gray-300 rounded-lg p-2"
          />
        </div>

        <div class="flex flex-col">
          <label for="password" class="text-sm font-semibold mb-1"
            >Password</label
          >
          <input
            id="password"
            v-model="form.password"
            type="password"
            placeholder="Password"
            class="border border-gray-300 rounded-lg p-2"
          />
        </div>

        <div class="flex flex-col">
          <label for="roles" class="text-sm font-semibold mb-1"
            >Select Role</label
          >
          <select
            id="roles"
            v-model="form.roles"
            class="border border-gray-300 rounded-lg p-2"
          >
            <option v-for="(role, index) in roleList" :key="index">
              {{ role }}
            </option>
            <!-- Corrected option value -->
          </select>
        </div>

        <div class="flex gap-4 mt-4">
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
      </div>
    </form>
  </MainLayout>
</template>

<style scoped>
.scrollable-content {
  overflow-y: auto;
}
</style>
