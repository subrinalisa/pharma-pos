<script setup>
import Modal from "./Modal.vue";
import { ref } from "vue";

const isTextModal = ref(false);
const isAudioModal = ref(false);
const isFileModal = ref(false);

// Pinia
import { storeToRefs } from "pinia";
import { useDataStore } from "@/stores/data";

const dataStore = useDataStore();
const { reviewData } = storeToRefs(dataStore);
</script>

<template>
  <div class="sm:grid grid-cols-3 gap-4">
    <!-- single -->
    <div class="border p-3 text-center rounded-md mb-3">
      <button
        type="button"
        class="block text-center w-full"
        @click="isTextModal = true"
      >
        <img
          src="@/assets/images/audio.png"
          alt="img"
          class="inline-block h-32 w-32"
        />
        <p class="mt-3">Write a text message</p>
      </button>
    </div>
    <!-- single -->
    <div class="border p-3 text-center rounded-md mb-3">
      <button
        type="button"
        class="block text-center w-full"
        @click="isAudioModal = true"
      >
        <img
          src="@/assets/images/file.png"
          alt="img"
          class="inline-block h-32 w-32"
        />
        <p class="mt-3">Voice upload</p>
      </button>
    </div>
    <!-- single -->
    <div class="border p-3 text-center rounded-md mb-3">
      <button
        type="button"
        class="block text-center w-full"
        @click="isFileModal = true"
      >
        <img
          src="@/assets/images/text.png"
          alt="img"
          class="inline-block h-32 w-32"
        />
        <p class="mt-3">File upload</p>
      </button>
    </div>
    <!-- /single -->
  </div>
  <!-- Modal Text -->
  <Modal
    imgPath="audio.png"
    modalTitle="Write a text message"
    v-if="isTextModal"
    @button-clicked="isTextModal = false"
  >
    <h6 class="font-semibold mb-3">Write a text message</h6>
    <a-textarea
      v-model:value="reviewData.text"
      placeholder="Enter your text here..."
      :rows="5"
      class="bg-[#f1f1f1] border border-gray-400 focus:border-gray-600"
    />
  </Modal>
  <!-- Modal Audio -->
  <Modal
    imgPath="file.png"
    modalTitle="Voice upload"
    v-if="isAudioModal"
    @button-clicked="isAudioModal = false"
  >
    <div class="text-center">
      <h6 class="font-semibold mb-3">Record your input or upload your audio</h6>
      <input
        type="file"
        id="voice"
        class="hidden"
        accept="audio/*"
        @change="reviewData.voice = $event?.target?.files[0]"
      />
      <label for="voice">
        <img
          src="@/assets/images/file.png"
          alt="img"
          class="inline-block h-32 w-32"
        />
      </label>
      <p class="text-purple-500 mt-3" v-if="reviewData.voice?.name">
        <i class="bi bi-paperclip mr-2"></i>{{ reviewData.voice?.name }}
      </p>
    </div>
  </Modal>
  <!-- Modal File -->
  <Modal
    imgPath="text.png"
    modalTitle="File upload"
    v-if="isFileModal"
    @button-clicked="isFileModal = false"
  >
    <div class="text-center">
      <h6 class="font-semibold mb-3">Upload your file</h6>
      <input
        type="file"
        id="file"
        class="hidden"
        @change="reviewData.file = $event?.target?.files[0]"
      />
      <label for="file">
        <img
          src="@/assets/images/attach-file.png"
          alt="img"
          class="inline-block h-32 w-32"
        />
      </label>
      <p class="text-purple-500 mt-3" v-if="reviewData.file?.name">
        <i class="bi bi-paperclip mr-2"></i>{{ reviewData.file?.name }}
      </p>
    </div>
  </Modal>
</template>
