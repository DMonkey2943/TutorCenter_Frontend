<template>
  <!-- Spinner Start -->
  <!-- <div
    id="spinner"
    class="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center"
  >
    <div
      class="spinner-border text-primary"
      style="width: 3rem; height: 3rem"
      role="status"
    >
      <span class="sr-only">Loading...</span>
    </div>
  </div> -->
  <!-- Spinner End -->

  <div class="container-xxl py-5">
    <div class="container">
      <div
        class="text-center mx-auto mb-5 wow fadeInUp"
        data-wow-delay="0.1s"
        style="max-width: 600px"
      >
        <h1 class="mb-2">Thông tin tài khoản</h1>
        <!-- <p>
          Trung tâm gia sư Cần Thơ bảo đảm sẽ gửi tới quý phụ huynh và học sinh
          những gia sư tốt đã được chọn lọc kỹ càng và phù hợp với yêu cầu riêng
          biệt của từng học viên.
        </p> -->
      </div>
      <a-card style="width: 100%" class="fs-6">
        <div class="row">
          <div class="card-body">
            <div class="row mb-3">
              <div class="col-md-3 fw-bold">Họ tên:</div>
              <div class="col-md-9">{{ user.name }}</div>
            </div>
            <div class="row mb-3">
              <div class="col-md-3 fw-bold">Email:</div>
              <div class="col-md-9">{{ user.email }}</div>
            </div>
            <div class="row mb-3">
              <div class="col-md-3 fw-bold">Số điện thoại:</div>
              <div class="col-md-9">{{ user.phone }}</div>
            </div>
            <div class="d-flex justify-content-end">
              <button
                class="btn btn-outline-primary"
                @click="showPasswordModal = true"
              >
                <i class="bi bi-key-fill me-1"></i> Đổi mật khẩu
              </button>
            </div>
          </div>
        </div>
      </a-card>

      <!-- Modal đổi mật khẩu -->
      <div
        class="modal fade"
        :class="{ 'show d-block': showPasswordModal }"
        tabindex="-1"
        :style="{
          'background-color': showPasswordModal ? 'rgba(0,0,0,0.5)' : '',
        }"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Đổi mật khẩu</h5>
              <button
                type="button"
                class="btn-close"
                @click="closePasswordModal"
              ></button>
            </div>
            <div class="modal-body">
              <div v-if="error" class="alert alert-danger" role="alert">
                {{ error }}
              </div>
              <form @submit.prevent="changePassword">
                <div class="mb-3">
                  <label for="currentPassword" class="form-label"
                    >Mật khẩu hiện tại</label
                  >
                  <input
                    type="password"
                    class="form-control"
                    id="currentPassword"
                    v-model="passwordForm.currentPassword"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="newPassword" class="form-label"
                    >Mật khẩu mới</label
                  >
                  <input
                    type="password"
                    class="form-control"
                    id="newPassword"
                    v-model="passwordForm.newPassword"
                    required
                  />
                  <div class="form-text">Mật khẩu phải có ít nhất 8 ký tự</div>
                </div>
                <div class="mb-3">
                  <label for="confirmPassword" class="form-label"
                    >Xác nhận mật khẩu</label
                  >
                  <input
                    type="password"
                    class="form-control"
                    id="confirmPassword"
                    v-model="passwordForm.confirmPassword"
                    required
                  />
                  <div class="text-danger mt-1" v-if="passwordMismatch">
                    Mật khẩu xác nhận không khớp!
                  </div>
                </div>
                <div class="d-flex justify-content-end">
                  <button
                    type="button"
                    class="btn btn-secondary me-2"
                    @click="closePasswordModal"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    class="btn btn-primary"
                    :disabled="isSubmitting"
                  >
                    <span
                      v-if="isSubmitting"
                      class="spinner-border spinner-border-sm me-1"
                    ></span>
                    Cập nhật mật khẩu
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import message from "ant-design-vue/es/message";
import { useAuthStore } from "@/stores/auth";
import AuthService from "@/services/auth.service";

const authStore = useAuthStore();

const router = useRouter();
const route = useRoute();
const user = reactive({
  id: authStore.user.id,
  name: authStore.user.name,
  email: authStore.user.email,
  phone: authStore.user.phone,
});

// const errors = ref({});

// Trạng thái modal
const showPasswordModal = ref(false);
const isSubmitting = ref(false);
const error = ref("");

// Form đổi mật khẩu
const passwordForm = reactive({
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
});

// Computed kiểm tra mật khẩu xác nhận
const passwordMismatch = computed(() => {
  return (
    passwordForm.newPassword &&
    passwordForm.confirmPassword &&
    passwordForm.newPassword !== passwordForm.confirmPassword
  );
});

// Methods
const closePasswordModal = () => {
  showPasswordModal.value = false;
  resetPasswordForm();
};

const resetPasswordForm = () => {
  passwordForm.currentPassword = "";
  passwordForm.newPassword = "";
  passwordForm.confirmPassword = "";
  error.value = "";
};

const changePassword = async () => {
  // Kiểm tra mật khẩu xác nhận
  if (passwordMismatch.value) {
    return;
  }

  // Kiểm tra chiều dài mật khẩu
  if (passwordForm.newPassword.length < 8) {
    error.value = "Mật khẩu mới phải có ít nhất 8 ký tự";
    return;
  }

  isSubmitting.value = true;
  error.value = "";

  try {
    const result = await AuthService.changePassword({
      current_password: passwordForm.currentPassword,
      new_password: passwordForm.newPassword,
      //   new_password_confirmation: passwordForm.confirmPassword,
    });

    console.log(result);

    if (result.success) {
      closePasswordModal();
      message.success("Đổi mật khẩu thành công");
    }
  } catch (err) {
    console.log(err);
    if (err.response && err.response.data) {
      error.value =
        err.response.data.message || "Đã xảy ra lỗi khi đổi mật khẩu";
    } else {
      error.value = "Lỗi kết nối máy chủ";
    }
  } finally {
    isSubmitting.value = false;
  }
};
</script>
