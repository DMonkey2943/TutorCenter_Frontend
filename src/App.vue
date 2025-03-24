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
