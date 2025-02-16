import axios from "axios";
import router from "@/router";

const commonConfig = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

export default (baseURL) => {
  const instance = axios.create({
    baseURL,
    ...commonConfig,
  });

  // Add interceptor để tự động thêm token vào header
  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Add interceptor để xử lý token hết hạn
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401) {
        if (error.config.url.includes("/login")) {
          return Promise.reject(error);
        }

        localStorage.removeItem("token");

        // Hiển thị thông báo thay vì redirect ngay lập tức
        message.error("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.");

        // Điều hướng nhẹ nhàng mà không reload trang
        router.push("/login");
      }

      return Promise.reject(error);
    }
  );

  return instance;
};
