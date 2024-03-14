<script setup>
import { storeToRefs } from "pinia";
import { useDataStore } from "@/stores/data";
import Loader from "./Loader.vue";
const dataStore = useDataStore();
const { reviewData, isLoading } = storeToRefs(dataStore);
const { virtualAssistant } = dataStore;
</script>

<template>
  <div class="feedback mt-5">
    <h5 class="mb-3 text-lg">Feedback</h5>
    <textarea
      class="w-full px-3 py-2 border rounded-md bg-[#f1f1f1] focus:outline-none focus:ring-1 focus:ring-slate-500"
      v-model="reviewData.feedback"
    ></textarea>
    <div class="text-center mt-10">
      <button
        type="button"
        class="btn-submit"
        @click="virtualAssistant(reviewData)"
      >
        <i class="bi bi-check2-circle mr-2"></i>Submit
        <Loader v-if="isLoading" />
      </button>
    </div>
  </div>
</template>
