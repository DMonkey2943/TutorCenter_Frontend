<template>
  <a-card title="QUẢN LÝ LỚP HỌC" style="width: 100%">
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
            <a-select-option value="pending">Chưa giao</a-select-option>
            <a-select-option value="assigned">Đã giao</a-select-option>
            <a-select-option value="ended">Đã kết thúc</a-select-option>
            <a-select-option value="canceled">Đã hủy</a-select-option>
          </a-select>
        </div>

        <router-link :to="{ name: 'admin.classes.create' }">
          <a-button type="primary">
            <span class="button-with-icon">
              <PlusOutlined class="me-1" />
              Thêm
            </span>
          </a-button>
        </router-link>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <a-table
          :dataSource="classes"
          :columns="columns"
          :scroll="{ x: 576 }"
          :loading="loading"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'subjects'">
              <span>{{ record.subjects.map((s) => s.name).join(", ") }}</span>
            </template>
            <template v-if="column.key === 'status'">
              <span
                v-if="record.status == 0"
                class="px-2 py-1 rounded badge text-bg-warning"
                >Chưa giao</span
              >
              <span
                v-else-if="record.status == 1"
                class="px-2 py-1 rounded badge text-bg-success"
                >Đã giao</span
              >
              <span
                v-else-if="record.status == 2"
                class="px-2 py-1 rounded badge text-bg-primary"
                >Đã kết thúc</span
              >
              <span v-else class="px-2 py-1 rounded badge text-bg-danger"
                >Đã hủy</span
              >
            </template>
            <template v-if="column.key === 'action'">
              <router-link
                :to="{
                  name: 'admin.classes.detail',
                  params: { id: record.id },
                }"
              >
                <a-button class="me-0 me-sm-2 mb-2 mb-sm-0">
                  <i class="fa fa-eye" aria-hidden="true"></i>
                </a-button>
              </router-link>
              <router-link
                :to="{
                  name: 'admin.classes.edit',
                  params: { id: record.id },
                }"
              >
                <a-button type="primary" class="me-0 me-sm-2 mb-2 mb-sm-0">
                  <EditOutlined class="d-flex" />
                </a-button>
              </router-link>
              <span>
                <a-button @click="deleteClass(record.id)" type="primary" danger>
                  <DeleteOutlined class="d-flex" />
                </a-button>
              </span>
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
import ClassService from "@/services/class.service";
import { Modal } from "ant-design-vue";
import message from "ant-design-vue/es/message";
import { useRoute, useRouter } from "vue-router";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons-vue";

useMenuAdmin().onSelectedKeys(["admin-classes"]);

const route = useRoute();
const router = useRouter();

const classes = ref([]);
const open = ref(false);
const selectedStatus = ref(null);
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

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    width: "5%",
    // ellipsis: true,
  },
  {
    title: "Môn dạy",
    dataIndex: ["subjects"],
    key: "subjects",
  },
  {
    title: "Khối lớp dạy",
    dataIndex: ["grade", "name"],
    key: "grade",
    width: "12%",
  },
  {
    title: "Phụ huynh",
    dataIndex: ["parent", "user", "name"], // Sử dụng mảng để truy cập nested object
    key: "parent",
  },
  {
    title: "Tình trạng",
    dataIndex: "status",
    key: "status",
    ellipsis: true,
    width: "10%",
  },
  {
    title: "Tùy chọn",
    key: "action",
    fixed: "right",
  },
];

const getAllClasses = async (statusText = null) => {
  loading.value = true;
  try {
    const response = await ClassService.index(statusText);
    classes.value = response.data;
  } catch (error) {
    console.log(error);
    message.error("Có lỗi xảy ra khi tải danh sách lớp học");
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

  getAllClasses(value);
};

const deleteClass = async (id) => {
  Modal.confirm({
    title: "Bạn có chắc sẽ xóa lớp học này?",
    // icon: createVNode(ExclamationCircleOutlined),
    // content: "Some descriptions",
    okText: "Xóa",
    okType: "danger",
    cancelText: "Hủy",
    async onOk() {
      try {
        await ClassService.destroy(id);
        getAllClasses();
        message.success("Xóa lớp học thành công");
      } catch (error) {
        console.log(error);
      }
    },
    onCancel() {
      Modal.destroyAll();
    },
  });
};

onMounted(() => {
  // Kiểm tra nếu có status trong URL
  if (route.query.status !== undefined) {
    const statusText = route.query.status;

    // Kiểm tra xem giá trị status có hợp lệ không
    if (validStatusValues.includes(statusText)) {
      selectedStatus.value = statusText;
      getAllClasses(statusText);
    } else {
      // Xử lý khi giá trị không hợp lệ:
      // 1. Đặt dropdown về "Tất cả"
      selectedStatus.value = null;
      // 2. Xóa query param không hợp lệ
      router.replace({ query: {} });
      // 3. Tải tất cả dữ liệu
      getAllClasses();
      // 4. Thông báo cho người dùng (tùy chọn)
      message.warning("Bộ lọc trạng thái không hợp lệ đã được đặt lại");
    }
  } else {
    getAllClasses();
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
        getAllClasses(newStatus);
      } else if (!validStatusValues.includes(newStatus)) {
        // Nếu giá trị mới không hợp lệ, đặt lại về null và xóa query
        selectedStatus.value = null;
        router.replace({ query: {} });
        getAllClasses();
        message.warning("Bộ lọc trạng thái không hợp lệ đã được đặt lại");
      }
    } else if (newStatus === undefined && selectedStatus.value !== null) {
      selectedStatus.value = null;
      getAllClasses(null);
    }
  }
);
</script>
