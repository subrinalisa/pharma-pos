<template>
  <MainLayout>
    <div class="bg-white p-3 rounded-md">
      <div class="flex justify-between items-center">
        <div class="mb-3"><h6 class="font-medium">Create New Supplier</h6></div>
        <div class="mb-3">
          <button
            type="button"
            class="px-4 py-2 bg-[#000180] text-white rounded hover:bg-indigo-600"
            @click="$router.go(-1)"
          >
            Back
          </button>
        </div>
      </div>
      <hr />
      <form @submit.prevent="submitForm()">
        <div class="lg:grid grid-cols-3 gap-4 items-center mt-4">
          <!-- Company Name -->
          <label for="company_name">Company Name:</label>
          <input
            placeholder="Enter here . . ."
            type="text"
            id="company_name"
            v-model="form.company_name"
            :class="{ 'border-red-500': formErrors.company_name }"
            class="input-text col-span-2"
          />
          <!-- First Name -->
          <label for="first_name">First Name:</label>
          <input
            placeholder="Enter here . . ."
            type="text"
            id="firstName"
            v-model="form.first_name"
            :class="{ 'border-red-500': formErrors.first_name }"
            class="input-text col-span-2"
          />
          <!-- Last Name -->
          <label for="lastName">Last Name:</label>
          <input
            placeholder="Enter here . . ."
            type="text"
            id="lastName"
            v-model="form.last_name"
            class="input-text col-span-2"
          />
          <!-- Email -->
          <label for="email">Email:</label>
          <input
            placeholder="Enter here . . ."
            type="email"
            id="email"
            v-model="form.email"
            class="input-text col-span-2"
          />
          <!-- Contact -->
          <label for="contact">Contact:</label>
          <input
            placeholder="Enter here . . ."
            type="text"
            id="contact"
            v-model="form.contact"
            :class="{ 'border-red-500': formErrors.contact }"
            class="input-text col-span-2"
          />
          <!-- Select Image -->
          <label for="image_path">Select Image:</label>
          <input
            placeholder="Enter here . . ."
            type="file"
            id="image_path"
            @change="handleImageUpload($event)"
            class="input-text col-span-2"
          />
          <!-- Contact -->
          <label for="address_1">Address 1:</label>
          <input
            placeholder="Enter here . . ."
            type="text"
            id="address_1"
            v-model="form.address_1"
            class="input-text col-span-2"
          />
          <!-- Contact -->
          <label for="address_2">Address 2:</label>
          <input
            placeholder="Enter here . . ."
            type="text"
            id="address_2"
            v-model="form.address_2"
            class="input-text col-span-2"
          />
          <!-- Contact -->
          <label for="city">City:</label>
          <input
            placeholder="Enter here . . ."
            type="text"
            id="city"
            v-model="form.city"
            class="input-text col-span-2"
          />
          <!-- Contact -->
          <label for="state">State/Proviance:</label>
          <input
            placeholder="Enter here . . ."
            type="text"
            id="state_or_province"
            v-model="form.state_or_province"
            class="input-text col-span-2"
          />
          <!-- Contact -->
          <label for="zip">Zip:</label>
          <input
            placeholder="Enter here . . ."
            type="text"
            id="zip"
            v-model="form.zip"
            class="input-text col-span-2"
          />
          <!-- Contact -->
          <label for="country">Country:</label>
          <input
            placeholder="Enter here . . ."
            type="text"
            id="country"
            v-model="form.country"
            class="input-text col-span-2"
          />
          <!-- Contact -->
          <label for="comments">Comments:</label>
          <textarea
            placeholder="Enter here . . ."
            type="text"
            id="comments"
            v-model="form.comments"
            class="input-text col-span-2"
          />
          <label for="account_no">Account#:</label>
          <input
            placeholder="Enter here . . ."
            type="text"
            id="account_no"
            v-model="form.account_no"
            class="input-text col-span-2"
          />
          <button
            type="button"
            @click="addFileInput()"
            class="px-4 py-2 bg-[#000180] text-white hover:bg-[#000180]-600"
          >
            Add Files
          </button>
          <div class="col-span-2">
            <label>Select Files:</label>
            <div
              v-for="(file, index) in form.files"
              :key="index"
              class="mb-2 flex items-center col-span-1"
            >
              <input
                type="file"
                @change="handleFileUpload($event, index)"
                class="input-text"
                multiple
              />
              <button
                type="button"
                @click="removeFileInput(index)"
                class="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                <i class="bi bi-trash text-white text-lg"></i>
              </button>
            </div>
          </div>
          <!-- Submit Button -->
        </div>
        <div>
          <button
            type="submit"
            class="px-4 py-2 min-w-32 inline-block bg-[#000180] text-white rounded-lg mt-3"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </MainLayout>
</template>
<script setup>
import MainLayout from "@/components/MainLayout.vue";
import supplier from "@/stores/supplier_api.js";
import { showNotification } from "@/utilities/notification";
import { ref } from "vue";
import { useRouter } from "vue-router";
const loading = ref(false);
const form = ref({
  company_name: "",
  first_name: "",
  last_name: "",
  email: "",
  contact: "",
  image_path: null,
  address_1: "",
  address_2: "",
  city: "",
  state_or_province: "",
  zip: "",
  country: "",
  comments: "",
  account_no: "",
  store_account_balance: 0,
  files: [],
});
// Define reactive form error state
const formErrors = ref({});
// Basic validation function
function validateForm() {
  const errors = {};
  if (!form.value.company_name)
    errors.company_name = "Company Name is required";
  if (!form.value.first_name) errors.first_name = "First Name is required";
  if (!form.value.email || !/\S+@\S+\.\S+/.test(form.value.email))
    errors.email = "A valid Email is required";
  // Add more validations as needed
  formErrors.value = errors;
  return Object.keys(errors).length === 0;
}
const handleImageUpload = (event) => {
  const img = event.target.files[0];
  form.value.image_path = img;
};
const handleFileUpload = (event, index) => {
  const file = event.target.files[0];
  form.value.files[index] = file;
  console.log(form.value.files[index]); // Log the first file
};
const addFileInput = () => {
  form.value.files.push(null);
};
const removeFileInput = (index) => {
  form.value.files.splice(index, 1);
};
const router = useRouter();
const submitForm = async () => {
  if (validateForm()) {
    loading.value = true;
    try {
      const response = await supplier.insertSupplier(form.value);
      console.log(response.status);
      if (response?.status === 201) {
        showNotification(
          "success",
          response?.data?.message || "Successfully inserted"
        );
        router.push({ name: "supplier" });
      }
    } catch (error) {
      console.error(error);
    } finally {
      loading.value = false;
    }
  } else {
    console.log("Form contains errors:", formErrors.value);
  }
};
</script>
