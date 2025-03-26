import { defineStore } from "pinia";
import AuthService from "@/services/auth.service";
import ParentService from "@/services/parent.service";
import TutorService from "@/services/tutor.service";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: {},
    parent_id: null,
    tutor_id: null,
    tutor_profile_status: null,
    token: localStorage.getItem("token"),
    loading: false,
    error: null,
    validationErrors: {},
    initialized: false,
    pageLoading: false, // Trạng thái cho biết đang tải auth
  }),

  getters: {
    // Kiểm tra user đã đăng nhập chưa
    isAuthenticated: (state) => !!state.token,

    // Lấy thông tin user
    getCurrentUser: (state) => state.user,

    // Lấy user ID
    user_id: (state) => state.user?.id || null,

    // Lấy user name
    user_name: (state) => state.user?.name || "",

    // Lấy user role
    user_role: (state) => state.user?.role || "",

    // Kiểm tra có đang loading không
    isLoading: (state) => state.loading,

    // Lấy thông tin lỗi
    getError: (state) => state.error,

    // Kiểm tra auth đang khởi tạo
    isPageLoading: (state) => state.pageLoading || !state.initialized,
  },

  actions: {
    // Khởi tạo store
    async init() {
      this.pageLoading = true; // Bật trạng thái loading

      if (this.token && !this.user?.id && !this.initialized) {
        try {
          await this.fetchUser();
          await this.getIdByUserId();
        } catch (error) {
          this.logout();
        } finally {
          this.initialized = true;
          this.pageLoading = false; // Tắt loading sau khi xong
        }
      } else {
        // Nếu không cần khởi tạo, vẫn phải cập nhật trạng thái
        this.initialized = true;
        this.pageLoading = false;
      }
    },

    // Lấy thông tin user
    async fetchUser() {
      try {
        this.loading = true;
        this.error = null;
        const response = await AuthService.getAccount();
        // console.log(response);
        this.user = response.user;
      } catch (error) {
        this.error =
          error.response?.data?.message || "Không thể lấy thông tin người dùng";
        throw error;
      } finally {
        this.loading = false;
      }
    },

    // Đăng nhập
    async login(credentials) {
      try {
        this.loading = true;
        this.error = null;

        const response = await AuthService.login(credentials);

        this.token = response.token;
        localStorage.setItem("token", this.token);
        await this.fetchUser();
        await this.getIdByUserId();
        return true;
      } catch (error) {
        // console.log(error);
        if (error.response?.status === 422) {
          // Validation errors
          this.validationErrors = error.response.data.errors;
        } else {
          // General error
          this.error = error.response?.data?.message || "Đăng nhập thất bại";
        }
        return false;
      } finally {
        this.loading = false;
      }
    },

    // Đăng ký tài khoản mới
    async register(userData) {
      try {
        this.loading = true;
        this.error = null;

        const response = await AuthService.register(userData);
        return true;
      } catch (error) {
        console.log(error);
        if (error.response?.status === 422) {
          // Validation errors
          this.validationErrors = error.response.data.errors;
        } else {
          // General error
          this.error =
            error.response?.data?.message || "Đăng ký tài khoản thất bại";
        }
        return false;
      } finally {
        this.loading = false;
      }
    },

    // Đăng xuất
    async logout() {
      try {
        this.loading = true;
        if (this.token) {
          await AuthService.logout();
        }
        return true;
      } catch (error) {
        //   console.error("Logout error:", error);
        this.error = error.response?.data?.message || "Đăng xuất thất bại";
        return false;
      } finally {
        this.token = null;
        this.user = {};
        this.initialized = false;
        localStorage.removeItem("token");
        this.loading = false;
      }
    },

    async getIdByUserId() {
      try {
        const userId = this.user.id;
        const role = this.user.role;

        if (!userId) return;

        if (role == "parent") {
          // Lấy parent_id từ userId
          const response = await ParentService.getByUserId(userId);
          if (response.success) {
            this.parent_id = response.data.id;
          }
        } else if (role == "tutor") {
          // Lấy tutor_id từ userId
          const response = await TutorService.getByUserId(userId);
          if (response.success) {
            this.tutor_id = response.data.id;
            this.tutor_profile_status = response.data.profile_status;
          }
        }
      } catch (error) {
        console.error("Không thể lấy thông tin role ID:", error);
        this.error = "Không thể lấy thông tin role ID";
      }
    },
  },
});
