<template>
  <div class="container-fluid bg-white p-0">
    <!-- <h1>Main Layout</h1> -->
    <!-- <header>Đây là header</header> -->
     <TheNavbar></TheNavbar>
    <router-view></router-view>
     <TheFooter></TheFooter>

    
  </div>
</template>
<script setup>
import TheNavbar from '@/components/TheNavbar.vue';
import TheFooter from '@/components/TheFooter.vue';
</script>