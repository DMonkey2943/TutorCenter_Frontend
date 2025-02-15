<template>
  <div class="container-fluid p-0">
    <div class="row align-items-center bg-primary p-2 fs-5">
      <div
        class="col-1 d-flex d-sm-none align-items-center justify-content-center"
      >
        <span @click="showDrawer">X</span>
      </div>
      <div
        class="col-10 col-sm-9 d-flex align-items-center justify-content-center justify-content-sm-start"
      >
        <router-link :to="{ name: 'admin.dashboard' }">
          <img
            src="../../assets/img/favicon.png"
            alt=""
            width="40px"
            class="me-1"
          />
        </router-link>
        <span class="d-none d-sm-flex">QUẢN TRỊ</span>
      </div>
      <div
        class="col-sm-3 d-none d-sm-flex align-items-center justify-content-sm-end"
      >
        <span>Admin</span>
      </div>
      <div
        class="col-1 d-flex d-sm-none align-items-center justify-content-center"
      >
        <span @click="showDrawerUser">X</span>
      </div>
    </div>
  </div>

  <a-drawer v-model:open="open" title="DANH MỤC" placement="left">
    <TheMenu></TheMenu>
  </a-drawer>

  <a-drawer v-model:open="open_user" title="ADMIN" placement="right">
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </a-drawer>
</template>

<script setup>
import { ref } from "vue";

import TheMenu from "./TheMenu.vue";

const open = ref(false);
const open_user = ref(false);
const showDrawer = () => {
  open.value = true;
};
const showDrawerUser = () => {
  open_user.value = true;
};
</script>
