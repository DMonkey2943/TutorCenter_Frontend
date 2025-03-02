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

  <!-- Classes Start -->
  <div class="container-xxl py-5">
    <div class="container">
      <div
        class="text-center mx-auto mb-5 wow fadeInUp"
        data-wow-delay="0.1s"
        style="max-width: 600px"
      >
        <h1 class="mb-2">Lớp đã đăng ký tìm gia sư</h1>
        <p>
          Trung tâm gia sư Cần Thơ bảo đảm sẽ gửi tới quý phụ huynh và học sinh
          những gia sư tốt đã được chọn lọc kỹ càng và phù hợp với yêu cầu riêng
          biệt của từng học viên.
        </p>
      </div>
      <TheClassList
        :classes="classes"
        @pageChange="handlePageChange"
        @retrieveClasses="getRegisterdClasses"
      ></TheClassList>
    </div>
  </div>
  <!-- Classes End -->
</template>

<script setup>
import { ref, onMounted } from "vue";
import ClassService from "@/services/class.service";
import TheClassList from "@/components/parent/TheClassList.vue";

// Biến lưu dữ liệu phân trang từ API
const classes = ref({
  data: [],
  current_page: 1,
  last_page: 1,
  total: 0,
  per_page: 6, // Số bản ghi trên mỗi trang (theo backend của bạn)
});

// Hàm gọi API, truyền tham số page
const getRegisterdClasses = async (page = 1) => {
  try {
    const response = await ClassService.getRegisteredClasses(page);
    classes.value = response;
    console.log(classes.value);
  } catch (error) {
    console.log(error);
  }
};

// Hàm xử lý khi người dùng chuyển trang (Ant Design Vue sẽ trả về số trang mới)
const handlePageChange = (page) => {
  getRegisterdClasses(page);
};

// Gọi API ngay khi component được mount
onMounted(() => {
  getRegisterdClasses();
});
</script>
