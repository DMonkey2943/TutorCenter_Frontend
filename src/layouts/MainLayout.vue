<template>
  <div class="page-container">
    <div class="content-wrap">
      <TheNavbar></TheNavbar>
      <router-view></router-view>
    </div>
    <TheFooter class="footer"></TheFooter>
  </div>
</template>

<script setup>
import TheNavbar from "@/components/TheNavbar.vue";
import TheFooter from "@/components/TheFooter.vue";
</script>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Chiếm toàn bộ chiều cao màn hình */
}

.content-wrap {
  flex: 1 0 auto; /* Cho phép nội dung mở rộng */
}

.footer {
  flex-shrink: 0; /* Ngăn footer co lại */
}
</style>