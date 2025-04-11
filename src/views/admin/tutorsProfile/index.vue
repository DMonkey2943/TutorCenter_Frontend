<template>
  <a-card title="QUẢN LÝ HỒ SƠ GIA SƯ" style="width: 100%">
    <div class="row mb-3">
      <div class="col-12 d-flex justify-content-between align-items-center">
        <!-- Thêm filter trạng thái ở đây -->
        <div>
          <span class="me-2 fw-semibold">Trạng thái:</span>
          <a-select
            v-model:value="selectedStatus"
            style="width: 150px"
            @change="handleStatusChange"
            placeholder="Tất cả"
          >
            <a-select-option :value="null">Tất cả</a-select-option>
            <a-select-option value="not_created">Chưa tạo</a-select-option>
            <a-select-option value="failed">Không đạt</a-select-option>
            <a-select-option value="pending">Chờ duyệt</a-select-option>
            <a-select-option value="ok">Đã duyệt</a-select-option>
          </a-select>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <a-table
          :dataSource="tutors"
          :columns="columns"
          :scroll="{ x: 576 }"
          :loading="loading"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'subjects'">
              <span>{{ record.subjects.map((s) => s.name).join(", ") }}</span>
            </template>
            <template v-else-if="column.key === 'grades'">
              <span>{{ record.grades.map((g) => g.name).join(", ") }}</span>
            </template>
            <template v-if="column.key === 'status'">
              <span v-if="record.profile_status !== null">
                <span
                  v-if="record.profile_status == 0"
                  class="px-2 py-1 rounded badge text-bg-warning"
                  >Chờ duyệt</span
                >
                <span
                  v-else-if="record.profile_status == 1"
                  class="px-2 py-1 rounded badge text-bg-success"
                  >Đã duyệt</span
                >
                <span v-else class="px-2 py-1 rounded badge text-bg-danger"
                  >Không đạt</span
                >
              </span>
              <span v-else class="px-2 py-1 rounded badge text-bg-info"
                >Chưa tạo</span
              >
            </template>
            <template v-if="column.key === 'action'">
              <!-- <a-button type="primary" @click="getTutorProfile(record.id)"
                >Xem</a-button
              > -->
              <router-link
                :to="{
                  name: 'admin.tutors.profile.detail',
                  params: { id: record.id },
                }"
              >
                <a-button class="me-0 me-sm-2 mb-2 mb-sm-0">
                  <i class="fa fa-eye" aria-hidden="true"></i>
                </a-button>
              </router-link>
              <router-link
                :to="{
                  name: 'admin.tutors.profile.edit',
                  params: { id: record.id },
                }"
              >
                <a-button type="primary" class="me-0 me-sm-2 mb-2 mb-sm-0">
                  <EditOutlined class="d-flex" />
                </a-button>
              </router-link>
            </template>
          </template>
        </a-table>
      </div>
    </div>
  </a-card>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useMenuAdmin } from "@/stores/use-menu-admin";
import TutorService from "@/services/tutor.service";
import { Modal } from "ant-design-vue";
import message from "ant-design-vue/es/message";
import { useRoute, useRouter } from "vue-router";
import { EditOutlined } from "@ant-design/icons-vue";

useMenuAdmin().onSelectedKeys(["admin-tutors-profile"]);

const route = useRoute();
const router = useRouter();

const tutors = ref([]);
const tutorProfile = ref({});
const open = ref(false);
const selectedStatus = ref(null);
const loading = ref(false);

// Danh sách các status text hợp lệ
const validStatusValues = ["pending", "failed", "ok", "not_created"];

// Map giữa status text và giá trị hiển thị
const statusLabels = {
  not_created: "Chưa tạo",
  failed: "Không đạt",
  pending: "Chờ duyệt",
  ok: "Đã duyệt",
};

// Map giữa status số và status text (ngược lại với map trong ClassService)
const statusTextMap = {
  "": "not_created",
  "-1": "failed",
  0: "pending",
  1: "ok",
};

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    width: "5%",
    // ellipsis: true,
  },
  {
    title: "Họ tên",
    dataIndex: ["user", "name"], // Sử dụng mảng để truy cập nested object
    key: "name",
  },
  {
    title: "Trình độ",
    dataIndex: ["level", "name"],
    key: "level",
  },
  {
    title: "Chuyên ngành",
    dataIndex: "major",
    key: "major",
    // ellipsis: true,
  },
  {
    title: "Môn dạy",
    dataIndex: ["subjects"],
    key: "subjects",
  },
  {
    title: "Khối lớp dạy",
    dataIndex: "grades",
    key: "grades",
  },
  {
    title: "Tình trạng hồ sơ",
    dataIndex: "profile_status",
    key: "status",
    ellipsis: true,
  },
  {
    title: "Tùy chọn",
    key: "action",
    fixed: "right",
  },
];

const getAllTutors = async (statusText = null) => {
  loading.value = true;
  try {
    const response = await TutorService.index(statusText);
    tutors.value = response.data;
  } catch (error) {
    console.log(error);
    message.error("Có lỗi xảy ra khi tải danh sách hồ sơ gia sư");
  } finally {
    loading.value = false;
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

  getAllTutors(value);
};

onMounted(() => {
  // Kiểm tra nếu có status trong URL
  if (route.query.status !== undefined) {
    const statusText = route.query.status;

    // Kiểm tra xem giá trị status có hợp lệ không
    if (validStatusValues.includes(statusText)) {
      selectedStatus.value = statusText;
      getAllTutors(statusText);
    } else {
      // Xử lý khi giá trị không hợp lệ:
      // 1. Đặt dropdown về "Tất cả"
      selectedStatus.value = null;
      // 2. Xóa query param không hợp lệ
      router.replace({ query: {} });
      // 3. Tải tất cả dữ liệu
      getAllTutors();
      // 4. Thông báo cho người dùng (tùy chọn)
      message.warning("Bộ lọc trạng thái không hợp lệ đã được đặt lại");
    }
  } else {
    getAllTutors();
  }
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
        getAllTutors(newStatus);
      } else if (!validStatusValues.includes(newStatus)) {
        // Nếu giá trị mới không hợp lệ, đặt lại về null và xóa query
        selectedStatus.value = null;
        router.replace({ query: {} });
        getAllTutors();
        message.warning("Bộ lọc trạng thái không hợp lệ đã được đặt lại");
      }
    } else if (newStatus === undefined && selectedStatus.value !== null) {
      selectedStatus.value = null;
      getAllTutors(null);
    }
  }
);
</script>
