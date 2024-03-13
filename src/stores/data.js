import { apiBase } from "@/config";
import { showNotification } from "@/utilities/notification";
import axios from "axios";
import Cookies from "js-cookie";
import { defineStore } from "pinia";

export const useDataStore = defineStore("dataStore", {
  state: () => ({
    isLoading: false,
    reviewData: {
      text: "",
      voice: "",
      file: "",
      feedback: "",
    },
    userList: null,
  }),

  actions: {
    // Review
    async virtualAssistant(data) {
      if (!data.text && !data.voice && !data.file && !data.feedback) return 0;

      this.isLoading = true;
      const token = Cookies.get("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };
      try {
        const response = await axios.post(
          `${apiBase}/virtual_assistant`,
          data,
          config
        );
        this.isLoading = false;

        if (response.status === 201) {
          const res = response?.data;
          showNotification("success", res?.message);
          this.reviewData = {
            text: "",
            voice: "",
            file: "",
            feedback: "",
          };
        }
      } catch (error) {
        this.isLoading = false;
        showNotification("error", error?.message);
        this.reviewData = {
          text: "",
          voice: "",
          file: "",
          feedback: "",
        };
      }
    },
    // List
    async getVirtualAssistant() {
      this.isLoading = true;
      const token = Cookies.get("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const response = await axios.get(
          `${apiBase}/virtual_assistant`,
          config
        );
        this.isLoading = false;
        const res = response?.data;
        if (res.status == 200) this.userList = res?.data;
      } catch (error) {
        this.isLoading = false;
        this.userList = null;
        showNotification("error", error?.message);
      }
    },
  },
  persist: true,
});
