<template>
  <nav
    class="navbar navbar-expand-lg navbar-light sticky-top px-4 px-lg-5 py-lg-0"
    style="background-color: #f3f3f3"
  >
    <!-- Logo -->
    <router-link :to="{ name: 'home' }" class="navbar-brand">
      <h3 class="m-0 text-primary" style="color: #fe5d37">Gia Sư Cần Thơ</h3>
    </router-link>

    <!-- Toggle button -->
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
        <!-- Trang chủ -->
        <router-link
          :to="{ name: 'home' }"
          class="nav-item fw-semibold nav-link"
          :class="{ active: navigationStore.isActiveRoute('home') }"
          >Trang chủ</router-link
        >

        <!-- Lớp mới -->
        <router-link
          :to="{ name: 'classes' }"
          class="nav-item fw-semibold nav-link"
          :class="{ active: navigationStore.isActiveRoute('classes') }"
          >Lớp mới</router-link
        >

        <!-- Lớp đã đăng ký nhận (cho gia sư) -->
        <router-link
          v-if="authStore.user_role == 'tutor'"
          :to="{ name: 'tutor.enrolledClasses' }"
          class="nav-item fw-semibold nav-link"
          :class="{
            active: navigationStore.isActiveRoute('tutor.enrolledClasses'),
          }"
          >Lớp đã đăng ký nhận</router-link
        >

        <!-- Lớp đã đăng ký tìm gia sư (cho phụ huynh) -->
        <router-link
          v-if="authStore.user_role == 'parent'"
          :to="{ name: 'parent.classes' }"
          class="nav-item fw-semibold nav-link"
          :class="{ active: navigationStore.isActiveRoute('parent.classes') }"
          >Lớp đã đăng ký tìm gia sư</router-link
        >

        <!-- Dropdown menu cho user đã đăng nhập -->
        <div v-if="authStore.user_id" class="nav-item fw-semibold dropdown">
          <a
            href=""
            class="nav-link dropdown-toggle fw-semibold"
            data-bs-toggle="dropdown"
            >{{ authStore.user_name }}</a
          >
          <div
            class="dropdown-menu rounded-0 rounded-bottom border-0 shadow-sm m-0"
          >
            <router-link
              :to="{ name: 'account' }"
              class="dropdown-item"
              :class="{ active: navigationStore.isActiveRoute('account') }"
              >Tài khoản</router-link
            >
            <router-link
              v-if="authStore.user_role == 'tutor'"
              :to="{ name: 'tutor.profile' }"
              class="dropdown-item"
              :class="{
                active: navigationStore.isActiveRoute('tutor.profile'),
              }"
              >Hồ sơ</router-link
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

        <!-- Admin dashboard -->
        <router-link
          :to="{ name: 'admin.dashboard' }"
          v-if="authStore.user_role == 'admin'"
          class="nav-item fw-semibold nav-link"
          :class="{ active: navigationStore.isActiveRoute('admin.dashboard') }"
          >Quản trị</router-link
        >

        <!-- Đăng ký lớp học button (mobile) -->
        <router-link
          :to="{ name: 'parent.registerClass' }"
          v-if="authStore.user_role == 'parent'"
          class="nav-item fw-semibold nav-link btn btn-primary text-white px-3 mt-2 mt-lg-0 d-lg-none"
          :class="{
            active: navigationStore.isActiveRoute('parent.registerClass'),
          }"
        >
          Đăng ký lớp học
          <i class="fa fa-arrow-right ms-1"></i>
        </router-link>

        <!-- Đăng nhập button (mobile) -->
        <router-link
          :to="{ name: 'login' }"
          v-if="!authStore.isAuthenticated"
          class="nav-item fw-semibold nav-link btn btn-primary text-white px-3 mt-2 mt-lg-0 d-lg-none"
          :class="{ active: navigationStore.isActiveRoute('login') }"
        >
          <span class="button-with-icon justify-content-center">
            Đăng nhập
            <LoginOutlined class="ms-1 d-flex" />
          </span>
        </router-link>
      </div>

      <!-- Desktop buttons -->
      <button
        v-if="!authStore.isAuthenticated"
        class="btn btn-primary rounded-pill px-3 d-none d-lg-block fw-semibold text-white"
      >
        <router-link :to="{ name: 'login' }" class="text-white">
          <span class="button-with-icon">
            Đăng nhập
            <LoginOutlined class="ms-1" />
          </span>
        </router-link>
      </button>
      <button
        v-if="authStore.user_role == 'parent'"
        class="btn btn-primary rounded-pill px-3 d-none d-lg-block fw-semibold text-white"
      >
        <router-link :to="{ name: 'parent.registerClass' }" class="text-white">
          Đăng ký lớp học
          <i class="fa fa-arrow-right ms-1"></i>
        </router-link>
      </button>
    </div>
  </nav>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth";
import { useNavigationStore } from "@/stores/navigation";
import { useRouter } from "vue-router";
import message from "ant-design-vue/es/message";
import { onMounted, onBeforeUnmount } from "vue";
import { LoginOutlined } from "@ant-design/icons-vue";

const authStore = useAuthStore();
const navigationStore = useNavigationStore();
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

// Khi component unmount, reset active route để tránh ảnh hưởng đến các trang khác
onBeforeUnmount(() => {
  navigationStore.resetActiveRoute();
});
</script>
