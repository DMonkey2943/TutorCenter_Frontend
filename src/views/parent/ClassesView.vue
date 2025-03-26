<template>
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
      <div
        v-if="classes.data.length === 0 && !loading"
        class="text-center alert alert-info"
      >
        Bạn chưa đăng ký lớp học.
      </div>
      <TheClassList
        v-if="classes.data.length > 0 && !loading"
        :classes="classes"
        @pageChange="handlePageChange"
        @retrieveClasses="getRegisterdClasses"
      ></TheClassList>
    </div>
  </div>
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

// Loading state
const loading = ref(false);

// Hàm gọi API, truyền tham số page
const getRegisterdClasses = async (page = 1) => {
  loading.value = true; // Bật loading
  try {
    const response = await ClassService.getRegisteredClasses(page);
    classes.value = response;
    console.log(classes.value);
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false; // Tắt loading
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
