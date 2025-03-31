<template>
  <div class="container-xxl py-5">
    <div class="container">
      <a-spin :spinning="loading">
        <div
          class="text-center mx-auto mb-5 wow fadeInUp"
          data-wow-delay="0.1s"
          style="max-width: 600px"
        >
          <h1 class="mb-2">Lớp mới</h1>
          <p>
            Trung tâm gia sư Cần Thơ thường xuyên cập nhật nhiều lớp dạy kèm mới
            mỗi ngày.
          </p>
          <!-- New button for recommended classes -->
          <div class="mt-4">
            <button
              class="btn me-2"
              @click="showAllClasses"
              :class="isRecommendedView ? 'btn-outline-success' : 'btn-success'"
            >
              Tất cả lớp học
            </button>
            <button
            v-if="authStore.user.role == 'tutor'"
              class="btn"
              @click="showRecommendedClasses"
              :class="
                !isRecommendedView ? 'btn-outline-success' : 'btn-success'
              "
            >
              Gợi ý lớp học phù hợp
            </button>
          </div>
        </div>
        <!-- Conditional rendering for no classes -->
        <div
          v-if="classes.data.length === 0 && !loading"
          class="text-center alert alert-info"
        >
          {{
            isRecommendedView
              ? "Chưa có lớp học nào phù hợp với bạn."
              : "Không có lớp học nào."
          }}
        </div>

        <!-- Only show class list if there are classes -->
        <TheClassList
          v-if="classes.data.length > 0 && !loading"
          :classes="classes"
          @pageChange="handlePageChange"
        ></TheClassList>
      </a-spin>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import ClassService from "@/services/class.service";
import TheClassList from "@/components/TheClassList.vue";
import message from "ant-design-vue/es/message";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

// Biến lưu dữ liệu phân trang từ API
const classes = ref({
  data: [],
  current_page: 1,
  last_page: 1,
  total: 0,
  per_page: 6,
});

// State to track whether we're showing recommended or all classes
const isRecommendedView = ref(false);

// Loading state
const loading = ref(false);

// Hàm gọi API, truyền tham số page
const getAllNewClasses = async (page = 1) => {
  loading.value = true; // Bật loading
  try {
    const response = await ClassService.getAllNewClasses(page);
    classes.value = response;
    console.log("getAllNewClasses");
    console.log(classes.value);
    isRecommendedView.value = false;
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false; // Tắt loading
  }
};

// Hàm gọi API lớp học được gợi ý
const getRecommendedClasses = async (page = 1) => {
  loading.value = true; // Bật loading
  try {
    const response = await ClassService.recommendClasses(page);
    if (response.success) {
      classes.value = response.data;
      console.log("getRecommendedClasses");
      console.log(classes.value);
      isRecommendedView.value = true;
    }
  } catch (error) {
    console.log(error);
    if (error.response) {
      const status = error.response.status;
      const errorMessage = error.response.data.message || "Có lỗi xảy ra";

      if (status === 403) {
        message.error(errorMessage);
      } else if (status === 404) {
        message.error(errorMessage);
      } else {
        message.error(errorMessage);
      }
    } else {
      console.log(error);
      message.error("Lỗi kết nối hoặc không thể xử lý yêu cầu");
    }
  } finally {
    loading.value = false; // Tắt loading
  }
};

// Hàm xử lý khi người dùng chuyển trang
const handlePageChange = (page) => {
  if (isRecommendedView.value) {
    getRecommendedClasses(page);
  } else {
    getAllNewClasses(page);
  }
};

// Hiển thị tất cả lớp học
const showAllClasses = () => {
  getAllNewClasses();
};

// Hiển thị lớp học gợi ý
const showRecommendedClasses = () => {
  getRecommendedClasses();
};

// Gọi API ngay khi component được mount
onMounted(() => {
  getAllNewClasses();
});
</script>
