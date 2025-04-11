<template>
  <a-card title="QUẢN LÝ BÁO CÁO LỚP HỌC CỦA GIA SƯ" style="width: 100%">
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
            <a-select-option value="pending">Chờ xử lý</a-select-option>
            <a-select-option value="ok">Đã xử lý</a-select-option>
          </a-select>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <a-table
          :dataSource="reports"
          :columns="columns"
          :scroll="{ x: 576 }"
          :loading="loadingReports"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'subjects'">
              <span>{{ record.subjects.map((s) => s.name).join(", ") }}</span>
            </template>
            <template v-if="column.key === 'status'">
              <span
                v-if="record.status == 0"
                class="px-2 py-1 rounded badge text-bg-warning"
                >Chờ xử lý</span
              >
              <span
                v-else-if="record.status == 1"
                class="px-2 py-1 rounded badge text-bg-success"
                >Đã xử lý</span
              >
            </template>
            <template v-if="column.key === 'action'">
              <a-button
                class="me-0 me-sm-2 mb-2 mb-sm-0"
                @click="showReportModal(record.id)"
              >
                <i class="fa fa-eye" aria-hidden="true"></i>
              </a-button>
            </template>
          </template>
        </a-table>
      </div>
    </div>
    <!-- Report Modal -->
    <a-modal
      v-model:visible="modalVisible"
      :title="'Chi tiết báo cáo #' + selectedReportId"
      @ok="handleModalOk"
      :confirmLoading="confirmLoading"
      @cancel="handleModalCancel"
      width="800px"
      cancelText="Hủy"
      okText="Lưu"
    >
      <div v-if="reportDetail">
        <div class="report-content">
          <!-- Report details will be displayed here -->
          <div v-if="loading" class="text-center">
            <a-spin tip="Đang tải dữ liệu..."></a-spin>
          </div>
          <div v-else>
            <!-- Display report details here -->
            <h5>Thông tin lớp học</h5>
            <div class="row mb-3">
              <div class="col-md-3">
                <strong>Mã lớp:</strong> {{ reportDetail.class_id }}
              </div>
              <div class="col-md-6">
                <strong>Ngày bắt đầu lớp học:</strong>
                {{ reportDetail.class.start_date }}
              </div>
            </div>

            <h5>Thông tin phụ huynh</h5>
            <div class="row mb-3">
              <div class="col-md-4">
                <strong>Họ tên:</strong>
                {{ reportDetail.class.parent.user.name }}
              </div>
              <div class="col-md-3">
                <strong>SĐT:</strong> {{ reportDetail.class.parent.user.phone }}
              </div>
              <div class="col-md-5">
                <strong>Email:</strong>
                {{ reportDetail.class.parent.user.email }}
              </div>
            </div>

            <h5>Thông tin gia sư</h5>
            <div class="row mb-3">
              <div class="col-md-4">
                <strong>Họ tên:</strong> {{ reportDetail.tutor.user.name }}
              </div>
              <div class="col-md-3">
                <strong>SĐT:</strong> {{ reportDetail.tutor.user.phone }}
              </div>
              <div class="col-md-5">
                <strong>Email:</strong> {{ reportDetail.tutor.user.email }}
              </div>
            </div>

            <h5>Thông tin vấn đề</h5>
            <!-- <div class="row mb-3">
              <div class="col-md-6">
                <strong>Trạng thái:</strong>
                <span v-if="reportDetail.status == 0" class="badge text-bg-warning">Chưa xử lý</span>
                <span v-else-if="reportDetail.status == 1" class="badge text-bg-success">Đã xử lý</span>
              </div>
              <div class="col-md-6">
                <strong>Ngày báo cáo:</strong> {{ reportDetail.created_at }}
              </div>
            </div> -->
            <div class="row mb-3">
              <div class="col-12">
                <strong>Nội dung báo cáo: </strong>
                <span class="mt-1">{{ reportDetail.content }}</span>
              </div>
              <div class="col-12">
                <label for="">
                  <span class="text-danger">*</span>
                  <strong>Phản hồi:</strong>
                </label>
                <a-input v-model:value="reportDetail.response" />
                <div class="w-100"></div>
                <small v-if="errors.response" class="text-danger">
                  {{ errors.response[0] }}
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </a-modal>
  </a-card>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from "vue";
import { useMenuAdmin } from "@/stores/use-menu-admin";
import ReportService from "@/services/report.service";
import { Modal } from "ant-design-vue";
import message from "ant-design-vue/es/message";
import { useRoute, useRouter } from "vue-router";

useMenuAdmin().onSelectedKeys(["admin-reports"]);

const route = useRoute();
const router = useRouter();

const reports = ref([]);
const open = ref(false);
const selectedStatus = ref(null);
const loadingReports = ref(false);

// Danh sách các status text hợp lệ
const validStatusValues = ["pending", "ok"];

// Map giữa status text và giá trị hiển thị
const statusLabels = {
  pending: "Chờ xử lý",
  ok: "Đã xử lý",
};

// Map giữa status số và status text (ngược lại với map trong ClassService)
const statusTextMap = {
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
    title: "Mã lớp",
    dataIndex: ["class_id"],
    key: "class",
    width: "8%",
  },
  {
    title: "Gia sư",
    dataIndex: ["tutor", "user", "name"],
    key: "tutor",
  },
  // {
  //   title: "Phụ huynh",
  //   dataIndex: ["parent", "user", "name"], // Sử dụng mảng để truy cập nested object
  //   key: "parent",
  // },
  {
    title: "Nội dung Báo cáo",
    dataIndex: "content",
    key: "content",
  },
  {
    title: "Phản hồi",
    dataIndex: "response",
    key: "response",
  },
  {
    title: "Tình trạng",
    dataIndex: "status",
    key: "status",
    ellipsis: true,
  },
  {
    title: "Tùy chọn",
    key: "action",
    fixed: "right",
  },
];

const getAllReports = async (statusText = null) => {
  loadingReports.value = true;
  try {
    const response = await ReportService.index(statusText);
    reports.value = response.data;
  } catch (error) {
    console.log(error);
    message.error("Có lỗi xảy ra khi tải danh sách báo cáo lớp học");
  } finally {
    loadingReports.value = false;
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

  getAllReports(value);
};

// State for modal
const modalVisible = ref(false);
const confirmLoading = ref(false);
const selectedReportId = ref(null);
const reportDetail = ref(null);
const loading = ref(false);

// Function to handle showing the modal and fetching report details
const showReportModal = async (id) => {
  errors.value = {};
  selectedReportId.value = id;
  modalVisible.value = true;
  loading.value = true;

  try {
    // Call the getReport function to fetch report details
    const response = await ReportService.show(id);

    if (response.success) {
      reportDetail.value = response.data;
    }
    console.log(reportDetail.value);
  } catch (error) {
    console.error("Lỗi lấy chi tiết báo cáo:", error);
  } finally {
    loading.value = false;
  }
};
const errors = ref({});
// Modal handlers
const handleModalOk = async () => {
  // alert(selectedReportId.value);
  const statusText = route.query.status;
  try {
    confirmLoading.value = true;
    const result = await ReportService.update(selectedReportId.value, {
      response: reportDetail.value.response,
    });
    console.log(result);
    if (result.success) {
      message.success("Phản hồi báo cáo thành công");
      modalVisible.value = false;
    }
    errors.value = {};
    getAllReports(statusText);
  } catch (error) {
    console.log(error);
    errors.value = error.response.data.errors;
  } finally {
    confirmLoading.value = false;
  }
};

const handleModalCancel = () => {
  modalVisible.value = false;
};

onMounted(() => {
  // Kiểm tra nếu có status trong URL
  if (route.query.status !== undefined) {
    const statusText = route.query.status;

    // Kiểm tra xem giá trị status có hợp lệ không
    if (validStatusValues.includes(statusText)) {
      selectedStatus.value = statusText;
      getAllReports(statusText);
    } else {
      // Xử lý khi giá trị không hợp lệ:
      // 1. Đặt dropdown về "Tất cả"
      selectedStatus.value = null;
      // 2. Xóa query param không hợp lệ
      router.replace({ query: {} });
      // 3. Tải tất cả dữ liệu
      getAllReports();
      // 4. Thông báo cho người dùng (tùy chọn)
      message.warning("Bộ lọc trạng thái không hợp lệ đã được đặt lại");
    }
  } else {
    getAllReports();
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
        getAllReports(newStatus);
      } else if (!validStatusValues.includes(newStatus)) {
        // Nếu giá trị mới không hợp lệ, đặt lại về null và xóa query
        selectedStatus.value = null;
        router.replace({ query: {} });
        getAllReports();
        message.warning("Bộ lọc trạng thái không hợp lệ đã được đặt lại");
      }
    } else if (newStatus === undefined && selectedStatus.value !== null) {
      selectedStatus.value = null;
      getAllReports(null);
    }
  }
);
</script>
