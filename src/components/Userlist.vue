<script setup>
import Modal from "@/components/Modal.vue";
import { CheckCircleOutlined } from "@ant-design/icons-vue";
import { storeToRefs } from "pinia";
import { useDataStore } from "@/stores/data";
import { onMounted, ref, computed } from "vue";
import moment from "moment";

const dataStore = useDataStore();
const { userList, isLoading } = storeToRefs(dataStore);
const { getVirtualAssistant } = dataStore;
const currPage = ref(1);
const pageSize = ref(5);

onMounted(async () => {
  await getVirtualAssistant();
});

const slicedData = computed(() => {
  let startIndex = (currPage.value - 1) * pageSize.value;
  const endIndex = startIndex + pageSize.value;
  return userList.value?.slice(startIndex, endIndex);
});
const downloadText = (text) => {
  const blob = new Blob([text], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "text.txt";
  document.body.appendChild(a);
  a.click();
  URL.revokeObjectURL(url);
  document.body.removeChild(a);
};
</script>

<template>
  <a-skeleton v-if="isLoading" />
  <template v-else>
    <div class="overflow-hidden mb-3">
      <table class="table-auto min-w-full text-left">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Date</th>
            <th>Text</th>
            <th>Voice</th>
            <th>File</th>
            <th>Feedback</th>
            <th>Reviewed</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, index) in slicedData" :key="index">
            <td class="w-24">{{ data?.user_id }}</td>
            <td class="w-32">{{ moment(data?.created_at).format("LL") }}</td>
            <td class="w-16">
              <button
                type="button"
                @click="downloadText(data?.text)"
                v-if="data?.text"
              >
                <img
                  src="@/assets/images/audio.png"
                  alt="text"
                  class="w-full"
                />
              </button>
              <img
                src="@/assets/images/text-disabled.png"
                alt="text"
                class="w-full"
                v-else
                title="No Text Found"
              />
            </td>
            <td class="w-16">
              <a :href="data?.voice" target="_blank" v-if="data?.voice">
                <img src="@/assets/images/file.png" alt="text" class="w-full" />
              </a>
              <img
                src="@/assets/images/voice-disabled.png"
                alt="text"
                class="w-full"
                v-else
                title="No audio found"
              />
            </td>
            <td class="w-16">
              <a :href="data?.file" target="_blank" v-if="data?.file">
                <img src="@/assets/images/text.png" alt="text" class="w-full" />
              </a>
              <img
                src="@/assets/images/file-disabled.png"
                alt="text"
                class="w-full"
                v-else
                title="No file found"
              />
            </td>
            <td>
              {{ data?.feedback || "-" }}
            </td>
            <td class="w-40 text-center">
              <button
                v-if="data?.status == 'pending'"
                type="button"
                class="bg-[#4D5865] text-white border border-[#4D5865] px-3 py-2 rounded-md text-sm capitalize hover:bg-white hover:text-[#4D5865]"
              >
                Add to data set
              </button>
              <button type="button" class="text-green-500 text-xl" v-else>
                <CheckCircleOutlined />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <a-pagination
      v-model:current="currPage"
      v-model:pageSize="pageSize"
      :total="userList?.length"
  /></template>
</template>
