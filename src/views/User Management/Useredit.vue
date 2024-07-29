<script setup>
import { ref, reactive, onMounted } from "vue";
import axios from "axios";
import Cookies from "js-cookie";
import MainLayout from "@/components/MainLayout.vue";
import { apiBase } from "@/config";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const userData = ref([]);
const isLoading = ref(false);

const form = reactive({
  name: '',
  email: '',
  roles: [],
  status: '',
});

const roleList = ref([]);
const permissionList = ref([]);
const permissions = ref([]);

const statusList = ref([
  { title: 'Active', value: 1 },
  { title: 'Inactive', value: 0 },
]);

const message = ref();
const isSnackbarTopStartVisible = ref(false);

const getUserByID = async () => {
  isLoading.value = true;
  try {
    const token = Cookies.get("token");
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const res = await axios.get(`${apiBase}/pharmacy-app/api/user_edit/${route.params.id}`, config);
    if (res.data?.status == "success") {
      isLoading.value = false;
      userData.value = res.data?.user_info;
      form.name = userData.value.name;
      form.email = userData.value.email;
      form.status = userData.value.status;
      form.roles = userData.value?.roles?.map(role => role.name);
      permissions.value = userData.value?.permissions?.map(permission => permission.name);
    }
  } catch (error) {
    isLoading.value = false;
  }
};

console.log(userData);

const getRoleList = async () => {
  const token = Cookies.get("token");
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const res = await axios.get(`${apiBase}/pharmacy-app/api/roles/`, config);
  if (res.data?.status == "Success") {
    roleList.value = res.data?.role.map(role => role.name);
  }
};

const getPermissionList = async () => {
  const token = Cookies.get("token");
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const res = await axios.get(`${apiBase}/pharmacy-app/api/permissions/`, config);
  if (res.data?.status == "Success") {
    permissionList.value = res.data?.permissions.map(permission => permission.name);
  }
};

onMounted(async () => {
  await getUserByID();
  await getRoleList();
  await getPermissionList();
});

const editUser = async () => {
  const token = Cookies.get("token");
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const res = await axios.put(`${apiBase}/pharmacy-app/api/user_update/${route.params.id}?name=${form.name}&email=${form.email}`, config);
  if (res.data?.status == 'success') {
    message.value = res.data.message;
    isSnackbarTopStartVisible.value = true;
  }
};

const updatePermission = async () => {
  const token = Cookies.get("token");
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const res = await axios.put(`${apiBase}/pharmacy-app/api/assign_permission/${route.params.id}`, config);
  if (res.data?.status == 'success') {
    message.value = res.data.message;
    isSnackbarTopStartVisible.value = true;
  }
};
</script>
<template>
  <MainLayout>
    <div v-if="isLoading" class="fixed inset-0 flex items-center justify-center">
      <div class="loader"></div>
    </div>
    <div v-else class="container mx-auto py-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="col-span-1">
          <div class="bg-white shadow-md rounded p-4">
            <!-- <div v-if="userData">
              <div class="text-center mb-4">
                <div class="w-24 h-24 mx-auto rounded-full bg-primary text-white flex items-center justify-center text-5xl">
                  {{ userData.name[0] }}
                </div>
                <h2 class="text-xl font-semibold mt-4">{{ userData.name }}</h2>
                <div class="flex flex-wrap justify-center mt-2">
                  <span v-for="(role, index) in userData.roles" :key="index" class="bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">{{ role.name }}</span>
                </div>
              </div>
              <hr>
              <div class="mt-4">
                <h3 class="text-lg font-semibold">Details</h3>
                <p><strong>Name:</strong> {{ userData.name }}</p>
                <p><strong>Email:</strong> {{ userData.email }}</p>
                <p><strong>Roles:</strong> <span v-for="(role, index) in userData.roles" :key="index">{{ role.name }}<span v-if="index < userData.roles.length - 1">, </span></span></p>
                <p v-if="userData.permissions?.length"><strong>Permissions:</strong> <span v-for="(permission, index) in userData.permissions" :key="index">{{ permission.name }}<span v-if="index < userData.permissions.length - 1">, </span></span></p>
              </div>
            </div> -->
          </div>
        </div>
        <div class="col-span-2">
          <div class="bg-white shadow-md rounded p-4 mb-4">
            <h2 class="text-xl font-semibold mb-4">Update User</h2>
            <form @submit.prevent="editUser">
              <div class="grid grid-cols-1 gap-4">
                <div>
                  <label class="block text-gray-700">Name</label>
                  <input type="text" v-model="form.name" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required>
                </div>
                <div>
                  <label class="block text-gray-700">Email</label>
                  <input type="email" v-model="form.email" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required>
                </div>
                <div>
                  <label class="block text-gray-700">Change Password</label>
                  <input type="password" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                </div>
                <div>
                  <label class="block text-gray-700">Status</label>
                  <select v-model="form.status" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required>
                    <option v-for="status in statusList" :value="status.value">{{ status.title }}</option>
                  </select>
                </div>
                <div>
                  <label class="block text-gray-700">Roles</label>
                  <div class="flex flex-wrap">
                    <div v-for="(role, index) in roleList" :key="index" class="mr-2 mb-2">
                      <input type="checkbox" v-model="form.roles" :value="role">
                      <label class="ml-2">{{ role }}</label>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mt-4 flex justify-end">
                <button type="submit" class="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700">Submit</button>
                <button type="reset" @click="router.go(-1)" class="ml-2 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700">Cancel</button>
              </div>
            </form>
          </div>
          <div class="bg-white shadow-md rounded p-4">
            <h2 class="text-xl font-semibold mb-4">Update Permission</h2>
            <form @submit.prevent="updatePermission">
              <div>
                <label class="block text-gray-700">Select Permissions</label>
                <div class="flex flex-wrap">
                  <div v-for="(permission, index) in permissionList" :key="index" class="mr-2 mb-2">
                    <input type="checkbox" v-model="permissions" :value="permission">
                    <label class="ml-2">{{ permission }}</label>
                  </div>
                </div>
              </div>
              <div class="mt-4 flex justify-end">
                <button type="submit" class="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700">Submit</button>
                <button type="reset" @click="router.go(-1)" class="ml-2 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div v-if="isSnackbarTopStartVisible" class="fixed top-0 right-0 m-4 bg-green-600 text-white py-2 px-4 rounded-md">
        {{ message }}
      </div>
    </div>
  </MainLayout>
</template>

<style scoped>
.loader {
  border: 8px solid #f3f3f3; /* Light grey */
  border-top: 8px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>