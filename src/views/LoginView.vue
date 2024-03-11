<template>
  <MainLayout>
    <div class="md:p-10">
      <h1 class="text-4xl xl:text-5xl font-semibold mb-8">Login</h1>
      <a-form
        :model="formState"
        layout="vertical"
        @finish="handleLogin(formState, $router)"
      >
        <a-form-item
          label="Username"
          name="username"
          :rules="[{ required: true, message: 'Please input your username!' }]"
        >
          <a-input v-model:value="formState.username" placeholder="User name">
            <template #prefix>
              <UserOutlined class="site-form-item-icon" />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item
          label="Password"
          name="password"
          :rules="[{ required: true, message: 'Please input your password!' }]"
        >
          <a-input-password
            v-model:value="formState.password"
            placeholder="Password"
          >
            <template #prefix>
              <LockOutlined class="site-form-item-icon" />
            </template>
          </a-input-password>
        </a-form-item>
        <a-form-item>
          <button
            type="submit"
            class="btn-submit disabled:bg-opacity-50"
            :disabled="isLoading"
          >
            <i class="bi bi-check2-circle mr-2"></i>Login
          </button>
          <p class="mt-3">
            New Here?
            <router-link :to="{ name: 'register' }" class="text-purple-600"
              >Register</router-link
            >
          </p>
        </a-form-item>
      </a-form>
    </div>
  </MainLayout>
</template>

<script setup>
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import MainLayout from "@/components/MainLayout.vue";
import { reactive } from "vue";

// Pinia
import { storeToRefs } from "pinia";
import { useLoginStore } from "@/stores/login";

const loginStore = useLoginStore();
const { isLoading } = storeToRefs(loginStore);
const { handleLogin } = loginStore;

const formState = reactive({
  username: "",
  password: "",
});
</script>
