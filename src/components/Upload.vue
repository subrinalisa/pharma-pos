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
      <!-- <input type="file" id="voice-upload" class="hidden" accept="audio/*" />
      <label for="voice-upload">
        <img
          src="@/assets/images/file.png"
          alt="img"
          class="inline-block h-32 w-32"
        />
        <p class="mt-3">Voice upload</p>
      </label> -->
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
      <!-- <input type="file" id="file-upload" class="hidden" />
      <label for="file-upload">
        <img
          src="@/assets/images/text.png"
          alt="img"
          class="inline-block h-32 w-32"
        />
        <p class="mt-3">File upload</p>
      </label> -->
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
    <h6 class="font-semibold mb-3">Write anything</h6>
    <a-textarea
      v-model:value="value"
      placeholder="Basic usage"
      :rows="5"
      class="bg-[#f1f1f1] border border-gray-400"
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

      <a-upload v-model:file-list="fileList" name="file" :max-count="1">
        <a-button class="border border-black">
          <upload-outlined></upload-outlined>
          Click to Upload
        </a-button>
      </a-upload>
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

      <a-upload
        v-model:file-list="fileList"
        name="avatar"
        list-type="picture-card"
        class="avatar-uploader"
      >
        <div class="">
          <plus-outlined></plus-outlined>
          <div class="ant-upload-text">Upload</div>
        </div>
      </a-upload>
    </div>
  </Modal>
</template>

<script setup>
import { UploadOutlined, PlusOutlined } from "@ant-design/icons-vue";

import { ref } from "vue";
import Modal from "./Modal.vue";
const isTextModal = ref(false);
const isAudioModal = ref(false);
const isFileModal = ref(false);
</script>
