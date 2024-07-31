import { apiBase } from "@/config"; // Adjust this to your API base URL
// Adjust the import path as needed
import axios from 'axios';
import Cookies from 'js-cookie';
const token = Cookies.get('token');

const apiClient = axios.create({
  baseURL: 'http://api.acigroup.info',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
});
const apiClientMultiple = axios.create({
  baseURL: 'http://api.acigroup.info',

  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'multipart/form-data',
  },
});

export default {
  insertSupplier(formdata) {
    return apiClientMultiple.post(`${apiBase}/suppliers`, formdata);
  },
  fetchSupplierList(page) {
    return apiClient.get(`${apiBase}/all-suppliers-paginated?page=${page}`);
  },
};