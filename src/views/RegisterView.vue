<script setup>
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
} from "@ant-design/icons-vue";
import MainLayout from "@/components/MainLayout.vue";
import { reactive } from "vue";

// Pinia
import { storeToRefs } from "pinia";
import { useLoginStore } from "@/stores/login";

const loginStore = useLoginStore();
const { isLoading } = storeToRefs(loginStore);
const { handleRegister } = loginStore;

const formState = reactive({
  username: "",
  email: "",
  password: "",
});
</script>

<template>
  <MainLayout>
    <div class="md:p-10">
      <h1 class="text-4xl xl:text-5xl font-semibold mb-8">Register</h1>
      <a-form
        :model="formState"
        layout="vertical"
        @finish="handleRegister(formState, $router)"
      >
        <a-form-item
          class="mb-3"
          label="Username"
          name="username"
          :rules="[{ required: true, message: 'Please input your Username!' }]"
        >
          <a-input v-model:value="formState.username" placeholder="Username">
            <template #prefix>
              <UserOutlined class="site-form-item-icon" />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item
          class="mb-3"
          label="Email Address"
          name="email"
          :rules="[
            { required: true, message: 'Please input your Email Address!' },
          ]"
        >
          <a-input v-model:value="formState.email" placeholder="Email">
            <template #prefix>
              <MailOutlined class="site-form-item-icon" />
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
          <button type="submit" class="btn-submit" :disabled="isLoading">
            <i class="bi bi-check2-circle mr-2"></i>Register
          </button>
          <p class="mt-3">
            Already have an account?
            <router-link :to="{ name: 'login' }" class="text-purple-600"
              >Login</router-link
            >
          </p>
        </a-form-item>
      </a-form>
    </div>
  </MainLayout>
</template>
