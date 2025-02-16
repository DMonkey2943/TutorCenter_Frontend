import { defineStore } from "pinia";
import AuthService from "@/services/auth.service";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: {},
    token: localStorage.getItem("token"),
    loading: false,
    error: null,
    validationErrors: {},
    initialized: false,
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
  },

  actions: {
    // Khởi tạo store
    async init() {
      if (this.token && !this.user && !this.initialized) {
        try {
          await this.fetchUser();
        } catch (error) {
          this.logout();
        } finally {
          this.initialized = true;
        }
      }
    },

    clearErrors() {
      this.validationErrors = {};
    },

    // Lấy thông tin user
    async fetchUser() {
      try {
        this.loading = true;
        this.error = null;
        const response = await AuthService.getAccount();
        console.log(response);
        this.user = response.user;
        console.log(this.user);
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
        // this.clearErrors();

        const response = await AuthService.login(credentials);

        this.token = response.token;
        localStorage.setItem("token", this.token);

        await this.fetchUser();

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
        this.user = null;
        this.initialized = false;
        localStorage.removeItem("token");
        this.loading = false;
      }
    },
  },
});
