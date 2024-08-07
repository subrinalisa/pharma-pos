import { apiBase } from "@/config";
import { showNotification } from "@/utilities/notification";
import axios from "axios";
import Cookies from "js-cookie";
import { defineStore } from "pinia";

export const useDataStore = defineStore("dataStore", {
  state: () => ({
    isLoading: false,
    isSupplier: false,
    isMRR: false,
    userInfo: null,
    searchProduct: null,
    paymentList: null,
    isListing: null,


  }),

  actions: {
    // Login
    async handleLogin(data, router) {
      this.isLoading = true;
      try {
        const response = await axios.post(`${apiBase}/login`, data);
        this.isLoading = false;
        if (response?.status === 200) {
          const res = response?.data;
          this.userInfo = res?.user;
          Cookies.set("token", res?.token, { expires: null });
          showNotification("success", res?.message || "Welcome back! You've successfully logged in");
          router.push({ name: "home" });
        }
      } catch (error) {
        this.isLoading = false;
        this.userInfo = null;
        Cookies.set("token", "");
        if (error?.response?.status == 401)
          showNotification("error", error?.response?.data?.message || "Login failed. Please check your credentials and try again");
        else showNotification("error", error?.message);
      }
    },
    // Product Search
    async getProduct(query) {
      if (!query) return 0
      this.isLoading = true;
      try {
        const token = Cookies.get("token");
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
        const response = await axios.get(`${apiBase}/products/search?term=${query}`, config);
        this.isLoading = false;
        if (response?.status == 200)
          return response?.data;
      } catch (error) {
        this.isLoading = false;
        console.log(error);
        showNotification("error", error?.message);
      }
    },

    // Product Sale Search
    async getSaleProduct(query) {
      this.isLoading = true;
      try {
        const token = Cookies.get("token");
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
        const response = await axios.get(`${apiBase}/sales/products/search?term=${query}`, config);
        this.isLoading = false;
        if (response?.status == 200)
          return response?.data;
      } catch (error) {
        this.isLoading = false;
        console.log(error);
        showNotification("error", error?.message);
      }
    },
    // Supplier Search
    async getSupplier(query) {
      !query && (query = "");
      this.isSupplier = true;
      try {
        const token = Cookies.get("token");
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
        const response = await axios.get(`${apiBase}/supplier/search?term=${query}`, config);
        this.isSupplier = false;
        if (response?.status == 200)
          return response?.data;
      } catch (error) {
        this.isSupplier = false;
        console.log(error);
        showNotification("error", error?.message);
      }
    },
    // Customer Search
    async getCustomer() {
      try {
        const token = Cookies.get("token");
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
        const response = await axios.get(`${apiBase}/customer_all`, config);

        if (response?.status == 200)
          return response?.data;
      } catch (error) {

        console.log(error);
      }
    },
    // MRR Search
    async getMRR(query) {
      !query && (query = "");
      this.isMRR = true;
      try {
        const token = Cookies.get("token");
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
        const response = await axios.get(`${apiBase}/mrr/search?term=${query}`, config);
        this.isMRR = false;
        if (response?.status == 200)
          return response?.data;
      } catch (error) {
        this.isMRR = false;
        console.log(error);
        showNotification("error", error?.message);
      }
    },
    // Payment Gateway
    async getPayment() {
      try {
        const token = Cookies.get("token");
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
        const response = await axios.get(`${apiBase}/all-payment-methods`, config);
        if (response?.status == 200)
          this.paymentList = response?.data
      } catch (error) {
        this.paymentList = null
        console.log(error);
      }
    },
    // Purchase Insert
    async purchaseInsert(data) {
      try {
        const token = Cookies.get("token");
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
        const response = await axios.post(`${apiBase}/purchases`, data, config);
        if (response?.status == 200) {
          showNotification("success", response?.data?.message)
          return 1
        }
      } catch (error) {
        console.log(error);
        showNotification("error", error?.message);
      }
    },
    // Sale Insert
    async saleInsert(data) {
      try {
        const token = Cookies.get("token");
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
        const response = await axios.post(`${apiBase}/sales`, data, config);
        if (response?.status == 201) {
          showNotification("success", response?.data?.message)
          return 1
        }
      } catch (error) {
        console.log(error);
        showNotification("error", error?.message);
      }
    },
    // Product List
    async getProducts(page, paginate) {
      this.isLoading = true;
      try {
        const token = Cookies.get("token");
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
        const response = await axios.get(`${apiBase}/all-products-paginated?page=${page}&paginate=${paginate}`, config);
        this.isLoading = false;
        if (response?.status == 200)
          return response?.data;
      } catch (error) {
        this.isLoading = false;
        console.log(error);
        showNotification("error", error?.message);
      }
    },
    // Sales Verify List
    async getSalesVerify(page, paginate) {
      this.isLoading = true;
      try {
        const token = Cookies.get("token");
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
        const response = await axios.get(`${apiBase}/verify-sales-list?page=${page}&paginate=${paginate}`, config);
        this.isLoading = false;
        if (response?.status == 200)
          return response?.data;
      } catch (error) {
        this.isLoading = false;
        console.log(error);
        showNotification("error", error?.message);
      }
    },
    // Customer List
    async getCustomers(page, paginate) {
      this.isLoading = true;
      try {
        const token = Cookies.get("token");
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
        const response = await axios.get(`${apiBase}/all-customers-paginated?page=${page}&paginate=${paginate}`, config);
        this.isLoading = false;
        if (response?.status == 200)
          return response?.data;
      } catch (error) {
        this.isLoading = false;
        console.log(error);
        showNotification("error", error?.message);
      }
    },
    // Expenses List
    async getExpenses(page, paginate) {
      this.isLoading = true;
      try {
        const token = Cookies.get("token");
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
        const response = await axios.get(`${apiBase}/all-customers-paginated?page=${page}&paginate=${paginate}`, config);
        this.isLoading = false;
        if (response?.status == 200)
          return response?.data;
      } catch (error) {
        this.isLoading = false;
        console.log(error);
        showNotification("error", error?.message);
      }
    },
    // Expenses List
    async getSaleReport(from, to) {
      this.isLoading = true;
      try {
        const token = Cookies.get("token");
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
        const response = await axios.get(`${apiBase}/report/detailed-sales-report?sale_date_from=${from}&sale_date_to=${to}`, config);
        this.isLoading = false;
        if (response?.status == 200)
          return response?.data;
      } catch (error) {
        this.isLoading = false;
        console.log(error);
        showNotification("error", error?.message);
      }
    },
    // Purchase List
    async getPurchaseReport(from, to) {
      this.isLoading = true;
      try {
        const token = Cookies.get("token");
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
        const response = await axios.get(`${apiBase}/report/detailed-received-report?purchase_date_from=${from}&purchase_date_to=${to}`, config);
        this.isLoading = false;
        if (response?.status == 200)
          return response?.data;
      } catch (error) {
        this.isLoading = false;
        console.log(error);
        showNotification("error", error?.message);
      }
    },
    // Invoice
    async getInvoice(id) {
      this.isLoading = true;
      try {
        const token = Cookies.get("token");
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
        const response = await axios.get(`${apiBase}/report/detailed-sales-invoice?id=${id}`, config);
        this.isLoading = false;
        if (response?.status == 200)
          return response?.data;
      } catch (error) {
        this.isLoading = false;
        console.log(error);
        showNotification("error", error?.message);
      }
    },
    // Branch
    async getBranch() {
      this.isLoading = true;
      try {
        const token = Cookies.get("token");
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
        const response = await axios.get(`${apiBase}/all-branch`, config);
        this.isLoading = false;
        if (response?.status == 200)
          return response?.data;
      } catch (error) {
        this.isLoading = false;
        console.log(error);
        showNotification("error", error?.message);
      }
    },
    // Purchase List
    async getPurchaseList(page, query) {
      if (query) page = ""
      this.isListing = true;
      try {
        const token = Cookies.get("token");
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
        const response = await axios.get(`${apiBase}/all-purchases-paginated?page=${page}&search=${query}`, config);
        this.isListing = false;
        if (response?.status == 200)
          return response?.data;
      } catch (error) {
        this.isListing = false;
        console.log(error);
        showNotification("error", error?.message);
      }
    },
    // Sale List
    async getSalesList(page, query) {
      if (query) page = ""
      this.isListing = true;
      try {
        const token = Cookies.get("token");
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
        const response = await axios.get(`${apiBase}/all-sales-paginated?page=${page}&search=${query}`, config);
        this.isListing = false;
        if (response?.status == 200)
          return response?.data;
      } catch (error) {
        this.isListing = false;
        console.log(error);
        showNotification("error", error?.message);
      }
    },
  },

  persist: true,
});
