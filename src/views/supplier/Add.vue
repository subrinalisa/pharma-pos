<template>
  <MainLayout>
    <div class="grid grid-cols-3">
      <form @submit.prevent="submitForm()">
        <!-- Company Name -->
        <div class="mb-4 flex items-center">
          <label for="company_name" class="w-32 text-right mr-4"
            >Company Name:</label
          >
          <input
            type="text"
            id="company_name"
            v-model="form.company_name"
            :class="{ 'border-red-500': formErrors.company_name }"
            class="flex-1 p-2 border border-gray-300"
          />
        </div>

        <!-- First Name -->
        <div class="mb-4 flex items-center">
          <label for="first_name" class="w-32 text-right mr-4"
            >First Name:</label
          >
          <input
            type="text"
            id="firstName"
            v-model="form.first_name"
            :class="{ 'border-red-500': formErrors.first_name }"
            class="flex-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>

        <!-- Last Name -->
        <div class="mb-4 flex items-center">
          <label for="lastName" class="w-32 text-right mr-4">Last Name:</label>
          <input
            type="text"
            id="lastName"
            v-model="form.last_name"
            class="flex-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>

        <!-- Email -->
        <div class="mb-4 flex items-center">
          <label for="email" class="w-32 text-right mr-4">Email:</label>
          <input
            type="email"
            id="email"
            v-model="form.email"
            class="flex-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>

        <!-- Contact -->
        <div class="mb-4 flex items-center">
          <label for="contact" class="w-32 text-right mr-4">Contact:</label>
          <input
            type="text"
            id="contact"
            v-model="form.contact"
            :class="{ 'border-red-500': formErrors.contact }"
            class="flex-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <!-- Select Image -->
        <div class="mb-4 flex items-center">
          <label for="image_path" class="w-32 text-right mr-4"
            >Select Image:</label
          >
          <input
            type="file"
            id="image_path"
            @change="handleImageUpload($event)"
            class="flex-1 p-2 border border-gray-300 rounded"
          />
        </div>

        <!-- Contact -->
        <div class="mb-4 flex items-center">
          <label for="address_1" class="w-32 text-right mr-4">Address 1:</label>
          <input
            type="text"
            id="address_1"
            v-model="form.address_1"
            class="flex-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <!-- Contact -->
        <div class="mb-4 flex items-center">
          <label for="address_2" class="w-32 text-right mr-4">Address 2:</label>
          <input
            type="text"
            id="address_2"
            v-model="form.address_2"
            class="flex-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <!-- Contact -->
        <div class="mb-4 flex items-center">
          <label for="city" class="w-32 text-right mr-4">City:</label>
          <input
            type="text"
            id="city"
            v-model="form.city"
            class="flex-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <!-- Contact -->
        <div class="mb-4 flex items-center">
          <label for="state" class="w-32 text-right mr-4"
            >State/Proviance:</label
          >
          <input
            type="text"
            id="state_or_province"
            v-model="form.state_or_province"
            class="flex-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <!-- Contact -->
        <div class="mb-4 flex items-center">
          <label for="zip" class="w-32 text-right mr-4">Zip:</label>
          <input
            type="text"
            id="zip"
            v-model="form.zip"
            class="flex-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <!-- Contact -->
        <div class="mb-4 flex items-center">
          <label for="country" class="w-32 text-right mr-4">Country:</label>
          <input
            type="text"
            id="country"
            v-model="form.country"
            class="flex-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <!-- Contact -->
        <div class="mb-4 flex items-center">
          <label for="comments" class="w-32 text-right mr-4">Comments:</label>
          <textarea
            type="text"
            id="comments"
            v-model="form.comments"
            class="flex-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div class="mb-4 flex items-center">
          <label for="account_no" class="w-32 text-right mr-4">Account#:</label>
          <input
            type="text"
            id="account_no"
            v-model="form.account_no"
            class="flex-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>

        <div class="mb-4 items-center">
          <button
            type="button"
            @click="addFileInput()"
            class="px-4 py-2 bg-[#000180] text-white hover:bg-[#000180]-600"
          >
            Add Files
          </button>
        </div>

        <div class="mb-4">
          <label class="w-32 text-right mr-4">Select Files:</label>
          <div
            v-for="(file, index) in form.files"
            :key="index"
            class="mb-2 flex items-center col-span-1"
          >
            <input
              type="file"
              @change="handleFileUpload($event, index)"
              class="flex-1 p-2 border border-gray-300 rounded w-full"
              multiple
            />
            <button
              type="button"
              @click="removeFileInput(index)"
              class="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              <i class="bi bi-closed text-white text-lg"></i>
            </button>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="text-center">
          <button
            type="submit"
            class="in-line px-4 py-2 bg-[#000180] text-white w-full hover:bg-[#000180]-600"
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
