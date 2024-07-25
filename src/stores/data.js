import { apiBase } from "@/config";
import { showNotification } from "@/utilities/notification";
import axios from "axios";
import Cookies from "js-cookie";
import { defineStore } from "pinia";

export const useDataStore = defineStore("dataStore", {
  state: () => ({
    isLoading: false,
    userInfo: null,
    searchProduct: null,
  }),

  actions: {
    // Login
    async handleLogin(data, router) {
      this.isLoading = true;
      try {
        const response = await axios.post(`${apiBase}/pharmacy-app/api/login`, data);
        this.isLoading = false;
        if (response?.status === 200) {
          const res = response?.data;
          Cookies.set("token", res?.token, { expires: null });
          showNotification("success", res?.message || "Welcome back! You've successfully logged in");
          router.push({ name: "home" });
        }
      } catch (error) {
        this.isLoading = false;
        Cookies.set("token", "");
        if (error?.response?.status == 401)
          showNotification("error", error?.response?.data?.message || "Login failed. Please check your credentials and try again");
        else showNotification("error", error?.message);
      }
    },
    // User Info
    async getUser() {
      this.isLoading = true;
      try {
        const token = Cookies.get("token");
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
        const response = await axios.get(`${apiBase}/pharmacy-app/api/loggeduser`, config);
        this.isLoading = false;
        if (response?.status == 200)
          this.userInfo = response?.data?.user;

      } catch (error) {
        this.isLoading = false;
        this.userInfo = null;
        console.log(error);
      }
    },
    // Product Search
    async getSearch(query) {
      if (query?.length < 2) return 0
      this.isLoading = true;
      try {
        const token = Cookies.get("token");
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
        const response = await axios.get(`${apiBase}/pharmacy-app/api/products/search?term=${query}`, config);
        this.isLoading = false;
        if (response?.status == 200)
          return response?.data;
      } catch (error) {
        this.isLoading = false;
        console.log(error);
      }
    },
  },

  persist: true,
});
