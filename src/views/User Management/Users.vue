<script setup>
import { apiBase } from "@/config";
import { onMounted, ref } from "vue";
import MainLayout from "@/components/MainLayout.vue";
import axios from "axios";
import Cookies from "js-cookie";

// Store
const searchQuery = ref("");
const isDrawerOpen = ref(false);
const isSnackbarVisible = ref(false);
const isDeleteUser = ref(false);
const deletedMessage = ref(null);

const deleteUserInfo = ref({
  name: null,
  id: null,
});

const colors = ["info", "success", "warning", "primary", "error"];
const users = ref([]);
const backup = ref([]);
const roleList = ref([]);
const isLoading = ref(false);

// Headers
const headers = [
  {
    title: "User",
    key: "user",
  },
  {
    title: "Email",
    key: "email",
  },
  {
    title: "Role",
    key: "roles",
  },
  {
    title: "Permissions",
    key: "permissions",
  },
  {
    title: "Status",
    key: "status",
  },
  {
    title: "Actions",
    key: "actions",
    sortable: false,
  },
];

onMounted(async () => {
  await fetchUsers();
  await getRoles();
});

const getRoles = async () => {
  isLoading.value = true;
  try {
    const token = Cookies.get("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.get(`${apiBase}/roles`, config);

    isLoading.value = false;
    roleList.value = res?.data?.role?.map((role) => role.name);
  } catch (err) {
    isLoading.value = false;
    roleList.value = [];
    console.error(err);
  }
};

const fetchUsers = async () => {
  isLoading.value = true;
  try {
    const token = Cookies.get("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.get(`${apiBase}/user_list`, config);

    isLoading.value = false;
    users.value = res?.data?.users;
    backup.value = res?.data?.users;
  } catch (err) {
    isLoading.value = false;
    console.error(err);
  }
};

// Delete user function
const deleteUser = async (id) => {
  try {
    const token = Cookies.get("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.delete(`${apiBase}/user_delete/${id}`, config);

    if (res.data.status === "Success") {
      isDeleteUser.value = false;
      isSnackbarVisible.value = true;
      deletedMessage.value = res.data.message;
      await fetchUsers();
    }
  } catch (err) {
    isSnackbarVisible.value = true;
    deletedMessage.value = err?.response?.data?.message || err.message;
    console.error(err);
  }
};

const handleSearch = () => {
  const searchTerm = searchQuery.value.toLowerCase();
  if (searchTerm) {
    const res = backup.value.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm)
    );

    users.value = res;
  } else users.value = backup.value;
};

const avatarText = (name) => {
  if (!name) return "";
  const nameSplit = name.split(" ");
  return nameSplit.length > 1
    ? nameSplit[0][0] + nameSplit[1][0]
    : nameSplit[0][0];
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
            @click="$router.push({ path: 'role' })"
            class="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Role List
          </button>
          <button
            @click="$router.push({ path: 'permissions' })"
            class="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Permissions List
          </button>
          <button
            @click="$router.push({ path: 'useradd' })"
            class="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add New User
          </button>
        </div>
        <table class="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th class="py-2 px-4 border border-gray-300">User</th>
              <th class="py-2 px-4 border border-gray-300">Email</th>
              <th class="py-2 px-4 border border-gray-300">Role</th>
              <th class="py-2 px-4 border border-gray-300">Permissions</th>
              <th class="py-2 px-4 border border-gray-300">Status</th>
              <th class="py-2 px-4 border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id" class="border-t">
              <td class="py-2 px-4 border-gray-300 flex items-center">
                <div
                  class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mr-2"
                >
                  <span>{{ avatarText(user.name) }}</span>
                </div>
                {{ user.name }}
              </td>
              <td class="py-2 px-4 border border-gray-300">{{ user.email }}</td>
              <td class="py-2 px-4 border border-gray-300">
                <div v-if="!user.roles.length">-</div>
                <div v-else class="flex gap-2">
                  <span
                    v-for="(role, index) in user.roles"
                    :key="index"
                    :class="`bg-${colors[index]}-200 text-${colors[index]}-800 rounded-full px-2`"
                  >
                    {{ role.name }}
                  </span>
                </div>
              </td>
              <td class="py-2 px-4 border border-gray-300">
                <div v-if="!user.permissions.length">-</div>
                <div v-else class="flex gap-2">
                  <span
                    v-for="(permission, index) in user.permissions"
                    :key="index"
                    :class="`bg-${colors[index]}-200 text-${colors[index]}-800 rounded-full px-2`"
                  >
                    {{ permission.name }}
                  </span>
                </div>
              </td>
              <td class="py-2 px-4 border border-gray-300">
                <span
                  :class="`px-2 py-1 rounded-full ${
                    user.status == 1
                      ? 'bg-blue-200 text-blue-800'
                      : 'bg-yellow-200 text-yellow-800'
                  }`"
                >
                  {{ user.status == 1 ? "Active" : "Inactive" }}
                </span>
              </td>
              <td class="py-2 px-4 border-gray-300 flex gap-2">
                <button
                  @click="deleteUser(user.id)"
                  class="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
                <button
                  @click="
                    $router.push({
                      path: 'useredit',
                      params: { id: user.id },
                      query: { name: user.name, email: user?.email },
                    })
                  "
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
