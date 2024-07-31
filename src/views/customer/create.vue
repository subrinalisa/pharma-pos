<template>
  <MainLayout>
    <div class="bg-white p-3 rounded-md">
      <div class="flex justify-between items-center">
        <div class="mb-3"><h6 class="font-medium">Create New Customer</h6></div>
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
        <div class="lg:grid grid-cols-3 gap-4 items-center">
          <label>First Name</label>
          <input
            type="text"
            placeholder="Enter here . . ."
            v-model="form.first_name"
            :class="{ 'border-red-500': formErrors.first_name }"
            class="input-text col-span-2"
          />
          <label>Last Name</label>
          <input
            type="text"
            placeholder="Enter here . . ."
            v-model="form.last_name"
            :class="{ 'border-red-500': formErrors.last_name }"
            class="input-text col-span-2"
          />
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter here . . ."
            v-model="form.email"
            :class="{ 'border-red-500': formErrors.email }"
            class="input-text col-span-2"
          />
          <label>Contact</label>
          <input
            type="tel"
            placeholder="Enter here . . ."
            v-model="form.contact"
            :class="{ 'border-red-500': formErrors.contact }"
            class="input-text col-span-2"
          />
          <label>Select Images</label>
          <div class="col-span-2">
            <input
              type="file"
              placeholder="Enter here . . ."
              @change="handleImageUpload($event)"
              class="input-text"
            />
            <div>{{ showImage }}</div>
          </div>
          <label>Address 1</label>
          <input
            type="text"
            placeholder="Enter here . . ."
            v-model="form.address_1"
            class="input-text col-span-2"
          />
          <label>Address 2</label>
          <input
            type="text"
            placeholder="Enter here . . ."
            v-model="form.address_2"
            class="input-text col-span-2"
          />
          <label>City</label>
          <input
            type="text"
            placeholder="Enter here . . ."
            v-model="form.city"
            class="input-text col-span-2"
          />
          <label>Zip</label>
          <input
            type="text"
            placeholder="Enter here . . ."
            v-model="form.zip"
            class="input-text col-span-2"
          />
          <label>Country</label>
          <input
            type="text"
            placeholder="Enter here . . ."
            v-model="form.country"
            class="input-text col-span-2"
          />
          <label>Comments</label>
          <textarea
            class="input-text col-span-2"
            placeholder="Enter here . . ."
            v-model="form.comments"
          ></textarea>
          <label>Notes</label>
          <textarea
            class="input-text col-span-2"
            placeholder="Enter here . . ."
            v-model="form.notes"
          ></textarea>
          <label>Store Account Balance</label>
          <input
            type="number"
            class="input-text col-span-2 text-right"
            v-model="form.store_account_balance"
          />
          <label>Credit Limit</label>
          <input
            type="number"
            class="input-text col-span-2 text-right"
            v-model="form.credit_limit"
          />
          <label>Company Name</label>
          <input
            type="text"
            placeholder="Enter here . . ."
            v-model="form.company_name"
            class="input-text col-span-2"
          />
          <label>Account #</label>
          <input
            type="text"
            placeholder="Enter here . . ."
            v-model="form.account_no"
            class="input-text col-span-2"
          />

          <label class="col-span-3" for="override">
            <input type="checkbox" id="override" /><span class="pl-2"
              >Override Default Tax For Sale</span
            >
          </label>
          <label class="col-span-3" for="Taxable">
            <input type="checkbox" id="Taxable" v-model="form.taxable" /><span
              class="pl-2"
              >Taxable</span
            >
          </label>
          <label>Tier Type</label>
          <input
            type="text"
            placeholder="Enter here . . ."
            v-model="form.tier_type"
            class="input-text col-span-2"
          />
          <label class="col-span-3" for="MRR">
            <input type="checkbox" id="MRR" v-model="form.mrr" /><span
              class="pl-2"
              >MRR</span
            >
          </label>
          <label>MRR Supplier Name</label>
          <select
            class="input-text col-span-2"
            v-model="form.supplier_name"
          ></select>

          <label>Add Files</label>
          <input
            type="file"
            placeholder="Enter here . . ."
            @change="handleFileUpload($event)"
            class="input-text col-span-2"
          />
        </div>
        <button
          type="submit"
          class="px-4 py-2 min-w-32 inline-block bg-[#000180] text-white rounded-lg mt-3"
        >
          Submit
        </button>
      </form>
    </div>
  </MainLayout>
</template>

<script setup>
import MainLayout from "@/components/MainLayout.vue";
import customer from "@/stores/customer_api.js";
import { showNotification } from "@/utilities/notification";
import { ref } from "vue";
import { useRouter } from "vue-router";
const loading = ref(false);
const taxes = [
  { name: "salse Tax", percent: "10.22" },
  { name: "salse Tax 2", percent: "12.22" },
];

const form = ref({
  first_name: "",
  last_name: "",
  address_1: "",
  contact: "",
  email: "",
  image_path: null,
  address_2: "",
  city: "",
  state_or_province: "",
  zip: "",
  country: "",
  comments: "",
  internal_notes: "",
  store_account_balance: "",
  credit_limit: "",
  company_name: "",
  account_no: "",
  override_default_tax_for_sale: 1,
  tax_group: "",
  cumulative: "",
  taxable: "1",
  non_tax_certificate_number: "",
  tier_type: "",
  mrr: "",
  mrr_id: "",
  file: null,
  taxes: JSON.stringify(taxes),
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
const handleFileUpload = (event) => {
  const img = event.target.files[0];
  form.value.file = img;
};
const router = useRouter();
const submitForm = async () => {
  if (validateForm()) {
    loading.value = true;
    try {
      form.value.taxable = form.value.taxable ? 1 : 0;
      form.value.mrr = form.value.mrr ? 1 : 0;
      const response = await customer.insertCustomer(form.value);
      console.log(response.status);
      if (response?.status === 201) {
        console.log(response.data?.message);
        showNotification(
          "success",
          response?.data?.message || "Successfully inserted"
        );
        router.push({ name: "customer" });
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
