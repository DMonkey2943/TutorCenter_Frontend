<template>
  <nav
    class="navbar navbar-expand-lg navbar-light sticky-top px-4 px-lg-5 py-lg-0"
    style="background-color: #f3f3f3"
  >
    <router-link :to="{ name: 'home' }" class="navbar-brand">
      <h3 class="m-0 text-primary" style="color: #fe5d37">Gia Sư Cần Thơ</h3>
    </router-link>
    <button
      type="button"
      class="navbar-toggler"
      data-bs-toggle="collapse"
      data-bs-target="#navbarCollapse"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarCollapse">
      <div class="navbar-nav mx-auto text-uppercase">
        <router-link
          :to="{ name: 'home' }"
          class="nav-item fw-semibold nav-link active"
          >Trang chủ</router-link
        >
        <!-- <a href="about.html" class="nav-item fw-semibold nav-link">Gia sư</a> -->
        <router-link
          :to="{ name: 'classes' }"
          class="nav-item fw-semibold nav-link"
          >Lớp mới</router-link
        >
        <router-link
          v-if="authStore.user_role == 'tutor'"
          :to="{ name: 'tutor.enrolledClasses' }"
          class="nav-item fw-semibold nav-link"
          >Lớp đã đăng ký nhận</router-link
        >
        <div v-if="authStore.user_id" class="nav-item fw-semibold dropdown">
          <a
            href="#"
            class="nav-link dropdown-toggle fw-semibold"
            data-bs-toggle="dropdown"
            >{{ authStore.user_name }}</a
          >
          <div
            class="dropdown-menu rounded-0 rounded-bottom border-0 shadow-sm m-0"
          >
            <a href="" class="dropdown-item">Tài khoản</a>
            <a
              v-if="authStore.user_role == 'tutor'"
              href=""
              class="dropdown-item"
              >Hồ sơ</a
            >
            <div
              class="dropdown-item"
              @click="handleLogout"
              style="cursor: pointer"
            >
              Đăng xuất
            </div>
          </div>
        </div>

        <router-link
          :to="{ name: 'admin.dashboard' }"
          v-if="authStore.user_role == 'admin'"
          class="nav-item fw-semibold nav-link"
          >Quản trị</router-link
        >

        <router-link
          :to="{ name: 'login' }"
          v-if="!authStore.isAuthenticated"
          class="nav-item fw-semibold nav-link btn btn-primary text-white px-3 mt-2 mt-lg-0 d-lg-none"
        >
          Đăng nhập
          <i class="fa fa-arrow-right ms-2"></i>
        </router-link>
      </div>
      <button
        v-if="!authStore.isAuthenticated"
        class="btn btn-primary rounded-pill px-3 d-none d-lg-block fw-semibold text-white"
      >
        <router-link :to="{ name: 'login' }" class="text-white">
          Đăng nhập
          <i class="fa fa-arrow-right ms-3"></i>
        </router-link>
      </button>
    </div>
  </nav>
</template>
<script setup>
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import message from "ant-design-vue/es/message";

const authStore = useAuthStore();
const router = useRouter();

const handleLogout = async () => {
  const success = await authStore.logout();
  if (success) {
    message.success("Đăng xuất thành công");
    router.push({ name: "login" });
  } else {
    if (authStore.error) {
      message.error(authStore.error);
    }
  }
};
</script>
