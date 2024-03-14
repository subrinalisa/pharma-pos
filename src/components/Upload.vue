<script setup>
import Modal from "./Modal.vue";
import { ref } from "vue";

const isTextModal = ref(false);
const isAudioModal = ref(false);
const isFileModal = ref(false);
const isRecording = ref(false);
const audioUrl = ref();
const mediaRecorder = ref();

// Pinia
import { storeToRefs } from "pinia";
import { useDataStore } from "@/stores/data";
import { showNotification } from "@/utilities/notification";

const dataStore = useDataStore();
const { reviewData } = storeToRefs(dataStore);

const handleAudioUpload = (event) => {
  const file = event?.target?.files[0];
  reviewData.value.voice = file;
  const objectURL = URL.createObjectURL(file);
  audioUrl.value = objectURL;
};

const handleRecording = async () => {
  try {
    let recordedChunks = [];
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder.value = new MediaRecorder(stream);

    mediaRecorder.value.addEventListener("dataavailable", (event) => {
      recordedChunks.push(event.data);
    });

    mediaRecorder.value.addEventListener("stop", () => {
      const blob = new Blob(recordedChunks, { type: "audio/wav" });
      reviewData.value.voice = blob;
      audioUrl.value = URL.createObjectURL(blob);
    });

    mediaRecorder.value.start();
    isRecording.value = true;
  } catch (error) {
    console.error("Error accessing microphone:", error);
    showNotification("warning", "Please Connect your microphone");
  }
};
const stopRecording = () => {
  mediaRecorder.value.stop();
  isRecording.value = false;
};
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
    <div class="grid grid-cols-2 gap-4 text-center">
      <div>
        <button type="button" @click="handleRecording" v-if="!isRecording">
          <img src="@/assets/images/record.png" class="w-10" alt="img" />
        </button>
        <button type="button" @click="stopRecording" v-if="isRecording">
          <img src="@/assets/images/record-play.png" class="w-10" alt="img" />
        </button>
        <h6 class="font-semibold mb-3">Record your input</h6>
      </div>
      <div>
        <input
          type="file"
          id="voice"
          class="hidden"
          accept="audio/*"
          @change="handleAudioUpload($event)"
        />
        <label for="voice">
          <img
            src="@/assets/images/file.png"
            alt="img"
            class="inline-block w-16"
          />
        </label>

        <h6 class="font-semibold mb-3">Upload your audio</h6>
      </div>
    </div>
    <p class="text-blue-500 mt-3 text-center" v-if="reviewData.voice?.name">
      <i class="bi bi-paperclip mr-2"></i>{{ reviewData.voice?.name }}
    </p>
    <div class="text-center">
      <audio :src="audioUrl" controls class="mt-5 w-10/12 mx-auto" />
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
