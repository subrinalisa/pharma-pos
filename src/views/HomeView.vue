<script setup>
import MainLayout from "@/components/MainLayout.vue";
import Upload from "@/components/Upload.vue";
import Feedback from "@/components/Feedback.vue";
import { computed } from "vue";

// Pinia
import { storeToRefs } from "pinia";
import { useLoginStore } from "@/stores/login";

const loginStore = useLoginStore();
const { is_superuser } = storeToRefs(loginStore);

const userTypeLabel = computed(() => {
  return is_superuser.value
    ? "Virtual Assistant Admin Panel"
    : "Virtual Assistant Input Panel";
});
</script>

<template>
  <MainLayout :title="userTypeLabel">
    <template v-if="!is_superuser">
      <Upload />
      <Feedback />
    </template>
  </MainLayout>
</template>
