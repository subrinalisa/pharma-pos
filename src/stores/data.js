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
  }),

  actions: {
    // Review
    async virtualAssistant(data) {
      this.isLoading = true;
      const token = Cookies.get("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      try {
        const response = await axios.post(
          `${apiBase}/virtual_assistant`,
          data,
          config
        );
        this.isLoading = false;

        if (response.status === 200) {
          const res = response?.data;
          console.log("res", res);
          // if (res?.status == 400) {
          //   showNotification("error", res?.message);
          //   return 0;
          // }
          // this.userInfo = res;
          // this.is_superuser = res?.is_superuser;
          // Cookies.set("token", res?.access_token, { expires: null });
          // showNotification("success", "Successfully Logged In");
          // router.push({ name: "home" });
        }
      } catch (error) {
        this.isLoading = false;
        // this.userInfo = null;
        // this.is_superuser = null;
        showNotification("error", error?.message);
      }
    },
  },
  persist: true,
});
