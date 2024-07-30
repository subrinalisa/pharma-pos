<template>
  <MainLayout>
    <div class="bg-white p-3 rounded-md">
      <div class="flex justify-between items-center">
        <div class="mb-3"><h6 class="font-medium">Edit Customer</h6></div>
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

      <form>
        <div class="lg:grid grid-cols-3 gap-4 items-center">
          <label>First Name</label>
          <input
            type="text"
            placeholder="Enter here . . ."
            class="input-text col-span-2"
          />
          <label>Last Name</label>
          <input
            type="text"
            placeholder="Enter here . . ."
            class="input-text col-span-2"
          />
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter here . . ."
            class="input-text col-span-2"
          />
          <label>Contact</label>
          <input
            type="tel"
            placeholder="Enter here . . ."
            class="input-text col-span-2"
          />
          <label>Select Images</label>
          <div class="col-span-2">
            <input
              type="file"
              placeholder="Enter here . . ."
              class="input-text"
            />
            <div>{{ showImage }}</div>
          </div>
          <label>Address 1</label>
          <input
            type="text"
            placeholder="Enter here . . ."
            class="input-text col-span-2"
          />
          <label>Address 2</label>
          <input
            type="text"
            placeholder="Enter here . . ."
            class="input-text col-span-2"
          />
          <label>City</label>
          <input
            type="text"
            placeholder="Enter here . . ."
            class="input-text col-span-2"
          />
          <label>Zip</label>
          <input
            type="text"
            placeholder="Enter here . . ."
            class="input-text col-span-2"
          />
          <label>Country</label>
          <input
            type="text"
            placeholder="Enter here . . ."
            class="input-text col-span-2"
          />
          <label>Comments</label>
          <textarea
            class="input-text col-span-2"
            placeholder="Enter here . . ."
          ></textarea>
          <label>Notes</label>
          <textarea
            class="input-text col-span-2"
            placeholder="Enter here . . ."
          ></textarea>
          <label>Store Account Balance</label>
          <input type="number" class="input-text col-span-2 text-right" />
          <label>Credit Limit</label>
          <input type="number" class="input-text col-span-2 text-right" />
          <label>Company Name</label>
          <input
            type="text"
            placeholder="Enter here . . ."
            class="input-text col-span-2"
          />
          <label>Account #</label>
          <input
            type="text"
            placeholder="Enter here . . ."
            class="input-text col-span-2"
          />

          <label class="col-span-3" for="override">
            <input type="checkbox" id="override" /><span class="pl-2"
              >Override Default Tax For Sale</span
            >
          </label>
          <label class="col-span-3" for="Taxable">
            <input type="checkbox" id="Taxable" /><span class="pl-2"
              >Taxable</span
            >
          </label>
          <label>Tier Type</label>
          <input
            type="text"
            placeholder="Enter here . . ."
            class="input-text col-span-2"
          />
          <label class="col-span-3" for="MRR">
            <input type="checkbox" id="MRR" /><span class="pl-2">MRR</span>
          </label>
          <label>MRR Supplier Name</label>
          <select class="input-text col-span-2"></select>

          <label>Add Files</label>
          <input
            type="file"
            placeholder="Enter here . . ."
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
import { ref } from "vue";

const showImage = ref(null);

const selectImage = (event) => {};
</script>
