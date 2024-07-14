import { apiBase } from "@/config";
import { showNotification } from "@/utilities/notification";
import axios from "axios";
import Cookies from "js-cookie";
import { defineStore } from "pinia";

export const useLoginStore = defineStore("loginStore", {
  state: () => ({
    isLoading: false,
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
          Cookies.set("token", res?.access_token, { expires: null });
          showNotification("success", "Successfully Logged In");
          router.push({ name: "home" });
        }
      } catch (error) {
        this.isLoading = false;
        showNotification("error", error?.message);
      }
    },
  },
  
  persist: true,
});
