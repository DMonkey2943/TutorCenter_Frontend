<template>
  <div class="container-xxl py-5">
    <div class="container">
      <div
        class="mx-auto mb-5 wow fadeInUp"
        data-wow-delay="0.1s"
        style="max-width: 450px"
      >
        <h1 class="text-center mb-2">Đăng ký làm gia sư</h1>

        <a-card class="py-2">
          <form @submit.prevent="handleRegister">
            <div class="row mb-4">
              <div class="col-12 text-start">
                <label for="">
                  <span class="text-danger">*</span>
                  <span>Họ tên:</span>
                </label>
              </div>
              <div class="col-12">
                <a-input v-model:value="user.name" />
                <div class="w-100"></div>
                <small v-if="validationErrors.name" class="text-danger">
                  {{ validationErrors.name[0] }}
                </small>
              </div>
            </div>

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
                  <span>SĐT:</span>
                </label>
              </div>
              <div class="col-12">
                <a-input v-model:value="user.phone" />
                <div class="w-100"></div>
                <small v-if="validationErrors.phone" class="text-danger">
                  {{ validationErrors.phone[0] }}
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
                  <span>{{
                    authStore.loading ? "Đang xử lý..." : "Đăng ký"
                  }}</span>
                </a-button>
              </div>
            </div>
          </form>
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

const router = useRouter();
const authStore = useAuthStore();

const user = reactive({
  name: "",
  email: "",
  phone: "",
  password: "",
  role: "tutor",
});

const validationErrors = ref({});

const handleRegister = async () => {
  const success = await authStore.register(user);
  if (success) {
    message.success("Đăng ký tài khoản gia sư thành công");
    router.push({ name: "login" });
  } else {
    validationErrors.value = authStore.validationErrors ?? {};
    if (authStore.error) {
      message.error(authStore.error);
    }
  }
};
</script>
