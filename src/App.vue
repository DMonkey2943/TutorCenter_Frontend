<template>
  <TheLoadingSpinner />
  <router-view></router-view>
</template>

<script setup>
import { onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";
import TheLoadingSpinner from '@/components/TheLoadingSpinner.vue';

const authStore = useAuthStore();

onMounted(async () => {
  await authStore.init();
});
</script>

<style>
.button-with-icon {
  display: flex !important;
  align-items: center; /* Căn giữa theo chiều dọc */
}
</style>