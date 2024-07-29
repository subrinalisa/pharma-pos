<template>
  <section class="w-full box-border overflow-x-hidden">
    <div class="flex flex-col md:flex-row h-screen items-center">
      <div
        class="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen"
      >
        <img
          src="@/assets/images/login-bg.jpg"
          alt="bg"
          class="w-full h-full object-cover"
        />
      </div>

      <div
        class="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12 flex items-center justify-center"
      >
        <div class="w-full h-100">
          <h1 class="text-xl md:text-2xl font-bold leading-tight mt-12">
            Log in to your account
          </h1>

          <form class="mt-6" @submit.prevent="handleLogin(data, $router)">
            <div>
              <label class="block text-gray-700">Email Address</label>
              <input
                type="email"
                placeholder="Enter Email Address"
                class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                autofocus
                required
                v-model="data.email"
              />
            </div>

            <div class="mt-4">
              <label class="block text-gray-700">Password</label>
              <input
                type="password"
                placeholder="Enter Password"
                class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                required
                v-model="data.password"
              />
            </div>

            <button
              type="submit"
              class="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg px-4 py-3 mt-6"
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useDataStore } from "@/stores/data";
import { storeToRefs } from "pinia";
import { reactive } from "vue";

const dataStore = useDataStore();
const { isLoading } = storeToRefs(dataStore);
const { handleLogin } = dataStore;

const data = reactive({
  email: "subrina10@gmail.com",
  password: 12345678,
});
</script>
