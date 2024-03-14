<script setup>
import Loader from "@/components/Loader.vue";
import { CheckCircleOutlined } from "@ant-design/icons-vue";
import { storeToRefs } from "pinia";
import { useDataStore } from "@/stores/data";
import { onMounted, ref, computed } from "vue";
import moment from "moment";

const dataStore = useDataStore();
const { userList, isUpdating } = storeToRefs(dataStore);
const { getVirtualAssistant, statusUpdate } = dataStore;
const currPage = ref(1);
const pageSize = ref(5);
const updateButton = ref([]);
const hitButton = ref("");
const backupData = ref(null);

onMounted(async () => {
  await getVirtualAssistant();
  backupData.value = userList.value;
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

const filterByDate = (date, dateString) => {
  if (!dateString) {
    userList.value = backupData.value;
    return 0;
  }

  userList.value = backupData.value.filter(
    (item) =>
      moment(item?.created_at).format("L") == moment(dateString).format("L")
  );
};
</script>

<template>
  <label class="mr-3">Date</label>

  <a-date-picker @change="filterByDate" class="mb-5" />

  <div class="overflow-hidden mb-3">
    <table class="table-auto min-w-full text-left">
      <thead class="hidden md:table-header-group">
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
      <tbody v-for="(data, index) in slicedData" :key="index">
        <tr class="hidden md:table-row">
          <td class="w-24">{{ data?.user_id }}</td>
          <td class="w-32">{{ moment(data?.created_at).format("LL") }}</td>
          <td class="w-16">
            <button
              type="button"
              @click="downloadText(data?.text)"
              v-if="data?.text"
            >
              <img src="@/assets/images/audio.png" alt="text" class="w-full" />
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
          <td class="w-52 text-center">
            <button
              v-if="data?.status == 'pending'"
              type="button"
              class="bg-[#4D5865] text-white border border-[#4D5865] px-3 py-2 rounded-md text-sm capitalize hover:bg-white hover:text-[#4D5865]"
              ref="updateButton"
              :id="index"
              @click="
                async () => {
                  hitButton = index;
                  const result = await statusUpdate(data?.id);
                  result && (await getVirtualAssistant());
                }
              "
            >
              <span class="align-middle"> Add to data set</span>
              <Loader
                v-if="isUpdating && updateButton[index].id == hitButton"
              />
            </button>
            <button
              type="button"
              class="text-green-500 text-xl"
              disabled
              v-else
            >
              <CheckCircleOutlined />
            </button>
          </td>
        </tr>
        <!-- Small Screen -->
        <tr class="md:hidden">
          <td>
            <div>
              <h6 class="font-medium">User ID</h6>
              <p class="mb-3">{{ data?.user_id }}</p>
              <h6 class="font-medium">Date</h6>
              <p class="mb-3">{{ moment(data?.created_at).format("LL") }}</p>
              <h6 class="font-medium">Text</h6>
              <p class="mb-3">
                <button
                  type="button"
                  @click="downloadText(data?.text)"
                  v-if="data?.text"
                >
                  <img
                    src="@/assets/images/audio.png"
                    alt="text"
                    class="w-10"
                  />
                </button>
                <img
                  src="@/assets/images/text-disabled.png"
                  alt="text"
                  class="w-10"
                  v-else
                  title="No Text Found"
                />
              </p>
              <h6 class="font-medium">Voice</h6>
              <p class="mb-3">
                <a :href="data?.voice" target="_blank" v-if="data?.voice">
                  <img src="@/assets/images/file.png" alt="text" class="w-10" />
                </a>
                <img
                  src="@/assets/images/voice-disabled.png"
                  alt="text"
                  class="w-10"
                  v-else
                  title="No audio found"
                />
              </p>
              <h6 class="font-medium">File</h6>
              <p class="mb-3">
                <a :href="data?.file" target="_blank" v-if="data?.file">
                  <img src="@/assets/images/text.png" alt="text" class="w-10" />
                </a>
                <img
                  src="@/assets/images/file-disabled.png"
                  alt="text"
                  class="w-10"
                  v-else
                  title="No file found"
                />
              </p>
              <h6 class="font-medium">Feedback</h6>
              <p class="mb-3">{{ data?.feedback || "-" }}</p>
              <h6 class="font-medium">Reviewed</h6>
              <p class="mb-3">
                <button
                  v-if="data?.status == 'pending'"
                  type="button"
                  class="bg-[#4D5865] text-white border border-[#4D5865] px-3 py-2 rounded-md text-sm capitalize hover:bg-white hover:text-[#4D5865]"
                  ref="updateButton"
                  :id="index"
                  @click="
                    async () => {
                      hitButton = index;
                      const result = await statusUpdate(data?.id);
                      result && (await getVirtualAssistant());
                    }
                  "
                >
                  <span class="align-middle"> Add to data set</span>
                  <Loader
                    v-if="isUpdating && updateButton[index].id == hitButton"
                  />
                </button>
                <button
                  type="button"
                  class="text-green-500 text-xl"
                  disabled
                  v-else
                >
                  <CheckCircleOutlined />
                </button>
              </p>
            </div>
          </td>
        </tr>
      </tbody>
      <tbody v-if="!userList?.length">
        <tr>
          <td colspan="7"><span class="text-red-600">No Data Found</span></td>
        </tr>
      </tbody>
    </table>
  </div>
  <a-back-top />
  <a-pagination
    v-model:current="currPage"
    v-model:pageSize="pageSize"
    :total="userList?.length"
  />
</template>
