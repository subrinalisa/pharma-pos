import { apiBase } from "@/config";
import { showNotification } from "@/utilities/notification";
import axios from "axios";
import Cookies from "js-cookie";
import { defineStore } from "pinia";

export const useLoginStore = defineStore("loginStore", {
  state: () => ({
    isLoading: false,
    userInfo: null,
    is_superuser: null,
  }),

  actions: {
    // Login
    async handleLogin(data, router) {
      this.isLoading = true;

      try {
        const response = await axios.post(`${apiBase}/login`, data);
        this.isLoading = false;

        if (response.status === 200) {
          const res = response?.data;
          if (res?.status == 400) {
            showNotification("error", res?.message);
            return 0;
          }
          this.userInfo = res;
          this.is_superuser = res?.is_superuser;
          Cookies.set("token", res?.access_token, { expires: null });
          showNotification("success", "Successfully Logged In");
          router.push({ name: "home" });
        }
      } catch (error) {
        this.isLoading = false;
        this.userInfo = null;
        this.is_superuser = null;
        showNotification("error", error?.message);
      }
    },
    // Register
    async handleRegister(data, router) {
      this.isLoading = true;

      try {
        const response = await axios.post(`${apiBase}/register`, data);
        this.isLoading = false;

        if (response.status === 200) {
          const res = response?.data;

          if (res?.status == 200) {
            showNotification("success", res?.message);
            router.push({ name: "login" });
            return 0;
          }
          if (res?.status == 400) {
            showNotification("error", res?.message);
            return 0;
          }
        }
      } catch (error) {
        this.isLoading = false;
        showNotification("error", error?.message);
      }
    },
  },
  persist: true,
});
