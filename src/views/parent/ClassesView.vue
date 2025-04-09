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

      <!-- Thêm filter trạng thái ở đây -->
      <div class="mb-4">
        <span class="me-2 fw-semibold fs-5">Trạng thái:</span>
        <a-select
          v-model:value="selectedStatus"
          style="width: 150px"
          @change="handleStatusChange"
          placeholder="Tất cả"
        >
          <a-select-option :value="null">Tất cả</a-select-option>
          <a-select-option value="pending">Chưa giao</a-select-option>
          <a-select-option value="assigned">Đã giao</a-select-option>
          <a-select-option value="ended">Đã kết thúc</a-select-option>
          <a-select-option value="canceled">Đã hủy</a-select-option>
        </a-select>
      </div>

      <div
        v-if="classes.data.length === 0 && !loading"
        class="text-center alert alert-info"
      >
        Không có lớp học nào.
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
import { ref, onMounted, watch, onBeforeUnmount } from "vue";
import ClassService from "@/services/class.service";
import TheClassList from "@/components/parent/TheClassList.vue";
import { useRoute, useRouter } from "vue-router";
import { useNavigationStore } from "@/stores/navigation";

const navigationStore = useNavigationStore();

const route = useRoute();
const router = useRouter();

// Biến lưu dữ liệu phân trang từ API
const classes = ref({
  data: [],
  current_page: 1,
  last_page: 1,
  total: 0,
  per_page: 12, // Số bản ghi trên mỗi trang (theo backend của bạn)
});

const selectedStatus = ref(null);
// Loading state
const loading = ref(false);

// Danh sách các status text hợp lệ
const validStatusValues = ["pending", "assigned", "ended", "canceled"];

// Map giữa status text và giá trị hiển thị
const statusLabels = {
  canceled: "Đã hủy",
  pending: "Chưa giao",
  assigned: "Đã giao",
  ended: "Đã kết thúc",
};

// Map giữa status số và status text (ngược lại với map trong ClassService)
const statusTextMap = {
  "-1": "canceled",
  0: "pending",
  1: "assigned",
  2: "ended",
};

// Hàm gọi API, truyền tham số page
const getRegisterdClasses = async (statusText = null, page = 1) => {
  loading.value = true; // Bật loading
  try {
    const response = await ClassService.getRegisteredClasses(statusText, page);
    classes.value = response;
    console.log(classes.value);
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false; // Tắt loading
  }
};

const handleStatusChange = (value) => {
  selectedStatus.value = value;

  // Cập nhật URL với status text
  if (value === null) {
    router.replace({ query: {} });
  } else {
    router.replace({ query: { status: value } });
  }

  getRegisterdClasses(value);
};

// Hàm xử lý khi người dùng chuyển trang (Ant Design Vue sẽ trả về số trang mới)
const handlePageChange = (page) => {
  const statusText = route.query.status;
  getRegisterdClasses(statusText, page);
};

// onMounted(() => {
//   getRegisterdClasses();
// });

onMounted(() => {
  // Kiểm tra nếu có status trong URL
  if (route.query.status !== undefined) {
    const statusText = route.query.status;

    // Kiểm tra xem giá trị status có hợp lệ không
    if (validStatusValues.includes(statusText)) {
      selectedStatus.value = statusText;
      getRegisterdClasses(statusText);
    } else {
      // Xử lý khi giá trị không hợp lệ:
      // 1. Đặt dropdown về "Tất cả"
      selectedStatus.value = null;
      // 2. Xóa query param không hợp lệ
      router.replace({ query: {} });
      // 3. Tải tất cả dữ liệu
      getRegisterdClasses();
      // 4. Thông báo cho người dùng (tùy chọn)
      message.warning("Bộ lọc trạng thái không hợp lệ đã được đặt lại");
    }
  } else {
    getRegisterdClasses();
  }

  navigationStore.setActiveRoute('parent.classes');
});

// Reset khi rời khỏi trang
onBeforeUnmount(() => {
  navigationStore.resetActiveRoute();
});

// Theo dõi thay đổi route để cập nhật lại danh sách
watch(
  () => route.query.status,
  (newStatus) => {
    if (newStatus !== undefined) {
      if (
        validStatusValues.includes(newStatus) &&
        selectedStatus.value !== newStatus
      ) {
        // Nếu giá trị mới hợp lệ và khác với giá trị hiện tại
        selectedStatus.value = newStatus;
        getRegisterdClasses(newStatus);
      } else if (!validStatusValues.includes(newStatus)) {
        // Nếu giá trị mới không hợp lệ, đặt lại về null và xóa query
        selectedStatus.value = null;
        router.replace({ query: {} });
        getRegisterdClasses();
        message.warning("Bộ lọc trạng thái không hợp lệ đã được đặt lại");
      }
    } else if (newStatus === undefined && selectedStatus.value !== null) {
      selectedStatus.value = null;
      getRegisterdClasses(null);
    }
  }
);
</script>
