<template>
  <a-card title="QUẢN LÝ PHỤ HUYNH" style="width: 100%">
    <div class="row mb-3">
      <div class="col-12 d-flex justify-content-end">
        <router-link :to="{ name: 'admin.parents.create' }">
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
      <TheInputSearch
        v-model="searchText"
        placeholder="Tìm kiếm theo họ tên, email hoặc SĐT"
        @submit="handleSearch"
        @clear="handleClearSearch"
        :loading="loading"
      />
    </div>

    <div class="row">
      <div class="col-12">
        <a-table
          :dataSource="filteredParents"
          :columns="columns"
          :scroll="{ x: 576 }"
          :loading="loading"
          :pagination="{
            pageSizeOptions: ['10', '20', '50'],
            showSizeChanger: true,
            showTotal: (total) => `Tổng ${total} phụ huynh`,
          }"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'status'">
              <a-tag v-if="record.blocked_at" color="error">Tạm khóa</a-tag>
            </template>
            <template v-if="column.key === 'action'">
              <router-link
                :to="{ name: 'admin.parents.edit', params: { id: record.id } }"
              >
                <a-button type="primary" class="me-0 me-sm-2 mb-2 mb-sm-0">
                  <EditOutlined class="d-flex" />
                </a-button>
              </router-link>
              <span>
                <a-button
                  @click="deleteParent(record.id)"
                  type="primary"
                  danger
                >
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
import { ref, onMounted, computed } from "vue";
import { useMenuAdmin } from "@/stores/use-menu-admin";
import ParentService from "@/services/parent.service";
import { Modal } from "ant-design-vue";
import message from "ant-design-vue/es/message";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons-vue";
import TheInputSearch from "@/components/TheInputSearch.vue";

useMenuAdmin().onSelectedKeys(["admin-parents"]);

const parents = ref([]);
const allParents = ref([]); // Lưu trữ danh sách đầy đủ không lọc
const loading = ref(false);
const searchText = ref("");

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Họ tên",
    dataIndex: ["user", "name"], // Sử dụng mảng để truy cập nested object
    key: "name",
  },
  {
    title: "Email",
    dataIndex: ["user", "email"],
    key: "email",
  },
  {
    title: "SĐT",
    dataIndex: ["user", "phone"],
    key: "phone",
  },
  {
    title: "Tình trạng",
    dataIndex: "blocked_at",
    key: "status",
  },
  {
    title: "Tùy chọn",
    key: "action",
    fixed: "right",
  },
];

const filteredParents = computed(() => {
  if (!searchText.value) return parents.value;

  const searchLower = searchText.value.toLowerCase();
  return parents.value.filter((parent) => {
    const userName = parent.user?.name?.toLowerCase() || "";
    const userEmail = parent.user?.email?.toLowerCase() || "";
    const userPhone = parent.user?.phone?.toLowerCase() || "";

    return (
      userName.includes(searchLower) ||
      userEmail.includes(searchLower) ||
      userPhone.includes(searchLower)
    );
  });
});

const getAllParents = async () => {
  try {
    loading.value = true;
    const response = await ParentService.index();
    parents.value = response.data;
    allParents.value = response.data; // Lưu danh sách đầy đủ
  } catch (error) {
    console.log(error);
    message.error("Đã xảy ra lỗi khi tải danh sách gia sư");
  } finally {
    loading.value = false;
  }
};

const handleSearch = () => {
  // Nếu muốn tìm kiếm qua API thay vì lọc phía client
  // Có thể gọi API search ở đây với searchText
  // Hoặc dùng lọc phía client như đã triển khai
  console.log("Tìm kiếm với từ khóa:", searchText.value);
};

const handleClearSearch = () => {
  // Reset lại danh sách khi xóa tìm kiếm
  parents.value = allParents.value;
};

const deleteParent = async (id) => {
  Modal.confirm({
    title: "Bạn có chắc sẽ xóa phụ huynh này?",
    // icon: createVNode(ExclamationCircleOutlined),
    // content: "Some descriptions",
    okText: "Xóa",
    okType: "danger",
    cancelText: "Hủy",
    async onOk() {
      try {
        loading.value = true;
        await ParentService.destroy(id);
        await getAllParents();
        message.success("Xóa phụ huynh thành công");
      } catch (error) {
        console.log(error);
        message.error("Đã xảy ra lỗi khi xóa gia sư");
      } finally {
        loading.value = false;
      }
    },
    onCancel() {
      Modal.destroyAll();
    },
  });
};

onMounted(() => {
  getAllParents();
});
</script>
