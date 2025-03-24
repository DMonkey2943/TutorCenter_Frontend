<template>
  <div v-if="isLoading" class="loading-overlay">
    <div class="spinner-container">
      <a-spin size="large" />
      <p class="mt-3">Đang tải...</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useAuthStore } from '@/stores/auth'; // Điều chỉnh đường dẫn đến file auth store của bạn

const authStore = useAuthStore();
const isLoading = computed(() => authStore.isLoading || !authStore.initialized);
</script>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.spinner-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.mt-3 {
  margin-top: 1rem;
}
</style>