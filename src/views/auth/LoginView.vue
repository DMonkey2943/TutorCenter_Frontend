<template>
  <div class="container-xxl py-5">
    <div class="container">
      <div
        class="mx-auto mb-5 wow fadeInUp"
        data-wow-delay="0.1s"
        style="max-width: 450px"
      >
        <h1 class="text-center mb-2">Đăng nhập</h1>

        <a-card class="py-2">
          <form @submit.prevent="handleLogin">
            <div class="row mb-4">
              <div class="col-12 text-start">
                <label for="">
                  <span class="text-danger">*</span>
                  <span>Email:</span>
                </label>
              </div>
              <div class="col-12">
                <a-input v-model:value="user.email" />
                <div class="w-100"></div>
                <small v-if="validationErrors.email" class="text-danger">
                  {{ validationErrors.email[0] }}
                </small>
              </div>
            </div>

            <div class="row mb-4">
              <div class="col-12 text-start">
                <label for="">
                  <span class="text-danger">*</span>
                  <span>Mật khẩu:</span>
                </label>
              </div>
              <div class="col-12">
                <a-input-password v-model:value="user.password" />
                <div class="w-100"></div>
                <small v-if="validationErrors.password" class="text-danger">
                  {{ validationErrors.password[0] }}
                </small>
              </div>
            </div>

            <div class="row mb-4">
              <div class="col-12 d-grid">
                <a-button
                  type="primary"
                  html-type="submit"
                  :disabled="authStore.loading"
                >
                  <span class="button-with-icon justify-content-center">
                    {{authStore.loading ? "Đang xử lý..." : "Đăng nhập"}}
                  <LoginOutlined class="ms-2" />
                  </span>
                </a-button>
              </div>
            </div>
          </form>

          <div class="text-center">
            <div class="my-1">Bạn chưa có tài khoản?</div>
            <div class="my-1">
              <router-link :to="{ name: 'register.parent' }">
                Đăng ký tìm gia sư ngay
                <i class="fa fa-search"></i>
              </router-link>
            </div>
            <div class="my-1">
              <router-link :to="{ name: 'register.tutor' }">
                Đăng ký làm gia sư ngay
                <i class="fa fa-briefcase" aria-hidden="true"></i>
              </router-link>
            </div>
          </div>
        </a-card>
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive, ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import message from "ant-design-vue/es/message";
import { LoginOutlined } from "@ant-design/icons-vue";

const router = useRouter();
const authStore = useAuthStore();

const user = reactive({
  email: "",
  password: "",
});

const validationErrors = ref({});

const handleLogin = async () => {
  const success = await authStore.login(user);
  if (success) {
    // await authStore.fetchUser();
    // await authStore.getIdByUserId();
    message.success("Đăng nhập thành công");
    if (authStore.user_role === "admin") {
      router.push({ name: "admin.dashboard" });
    } else {
      router.push({ name: "home" });
    }
  } else {
    validationErrors.value = authStore.validationErrors ?? {};
    if (authStore.error) {
      message.error(authStore.error);
    }
  }
};
</script>
