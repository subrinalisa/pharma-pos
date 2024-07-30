<script setup>
import { apiBase } from "@/config";
import { onMounted, ref } from "vue";
import MainLayout from "@/components/MainLayout.vue";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "vue-router";

const searchQuery = ref("");
const isLoading = ref(false);

const permissions = ref([]);
const backupPermissions = ref([]);

const isSnackbarVisible = ref(false);
const deletedMessage = ref(null);

const router = useRouter();

onMounted(async () => {
  await getPermissions();
});

const getPermissions = async () => {
  isLoading.value = true;
  try {
    const token = Cookies.get("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.get(`${apiBase}/permissions`, config);
    permissions.value = res?.data?.permissions || [];
    backupPermissions.value = res?.data?.permissions || [];
  } catch (err) {
    console.error(err);
  } finally {
    isLoading.value = false;
  }
};

const handleSearch = () => {
  const searchTerm = searchQuery.value.toLowerCase();
  if (searchTerm) {
    permissions.value = backupPermissions.value.filter((permission) =>
      permission.name.toLowerCase().includes(searchTerm)
    );
  } else {
    permissions.value = backupPermissions.value;
  }
};

const deletePermission = async (id) => {
  isLoading.value = true;
  try {
    const token = Cookies.get("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.delete(`${apiBase}/permissions/${id}`, config);
    if (res.status === 200 || res.status === 204) {
      deletedMessage.value = "Permission deleted successfully";
      isSnackbarVisible.value = true;
      await getPermissions();  // Re-fetch the permissions
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
    <section class="p-6">
      <div
        v-if="isLoading"
        class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-50 bg-gray-500"
      >
        <div class="loader"></div>
      </div>
      <v-snackbar
        v-model="isSnackbarVisible"
        :timeout="2000"
        class="fixed top-4 right-4"
      >
        {{ deletedMessage }}
      </v-snackbar>
      <div class="card bg-white shadow-md rounded-lg p-6">
        <div class="flex justify-between items-center mb-4">
          <input
            v-model="searchQuery"
            @input="handleSearch"
            type="text"
            placeholder="Search"
            class="border border-gray-300 rounded p-2"
          />
          <button
            @click="$router.push({ path: 'permissionsadd' })"
            class="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add New Permission
          </button>
        </div>
        <table class="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th class="py-2 px-4 border border-gray-300">Permission Name</th>
              <th class="py-2 px-4 border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="permission in permissions"
              :key="permission.id"
              class="border-t"
            >
              <td class="py-2 px-4 border border-gray-300">
                {{ permission.name }}
              </td>
              <td class="py-2 px-4 border-gray-300 flex gap-2">
                <button
                  @click="deletePermission(permission.id)"
                  class="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
                <button
                  @click="$router.push({ name: 'permissionsedit', params: { id: permission.id }, query: { name: permission.name } })"
                  class="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </MainLayout>
</template>

<style>
.loader {
  border: 8px solid #f3f3f3;
  border-top: 8px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
