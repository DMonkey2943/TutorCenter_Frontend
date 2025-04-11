<template>
  <a-card title="QUẢN LÝ GIA SƯ" style="width: 100%">
    <div class="row mb-3">
      <div class="col-12 d-flex justify-content-end">
        <router-link :to="{ name: 'admin.tutors.create' }">
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
          :dataSource="filteredTutors"
          :columns="columns"
          :scroll="{ x: 576 }"
          :loading="loading"
          :pagination="{
            pageSizeOptions: ['10', '20', '50'],
            showSizeChanger: true,
            showTotal: (total) => `Tổng ${total} gia sư`,
          }"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'status'">
              <span v-if="record.profile_status !== null">
                <a-tag v-if="record.profile_status == 0" color="warning"
                  >Chờ duyệt</a-tag
                >
                <a-tag v-else-if="record.profile_status == 1" color="success"
                  >Đã duyệt</a-tag
                >
                <a-tag v-else color="error">Không đạt</a-tag>
              </span>
              <a-tag v-else color="processing">Chưa tạo</a-tag>
            </template>
            <template v-if="column.key === 'action'">
              <router-link
                :to="{
                  name: 'admin.tutors.edit',
                  params: { id: record.id },
                }"
              >
                <a-button type="primary" class="me-0 me-sm-2 mb-2 mb-sm-0">
                  <EditOutlined class="d-flex" />
                </a-button>
              </router-link>
              <span>
                <a-button @click="deleteTutor(record.id)" type="primary" danger>
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
import { ref, computed, onMounted } from "vue";
import { useMenuAdmin } from "@/stores/use-menu-admin";
import TutorService from "@/services/tutor.service";
import { Modal } from "ant-design-vue";
import message from "ant-design-vue/es/message";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons-vue";
import TheInputSearch from "@/components/TheInputSearch.vue";

useMenuAdmin().onSelectedKeys(["admin-tutors"]);

const tutors = ref([]);
const allTutors = ref([]); // Lưu trữ danh sách đầy đủ không lọc
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
    dataIndex: ["user", "name"],
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
    title: "Tình trạng hồ sơ",
    dataIndex: "profile_status",
    key: "status",
  },
  {
    title: "Tùy chọn",
    key: "action",
    fixed: "right",
  },
];

const filteredTutors = computed(() => {
  if (!searchText.value) return tutors.value;

  const searchLower = searchText.value.toLowerCase();
  return tutors.value.filter((tutor) => {
    const userName = tutor.user?.name?.toLowerCase() || "";
    const userEmail = tutor.user?.email?.toLowerCase() || "";
    const userPhone = tutor.user?.phone?.toLowerCase() || "";

    return (
      userName.includes(searchLower) ||
      userEmail.includes(searchLower) ||
      userPhone.includes(searchLower)
    );
  });
});

const getAllTutors = async () => {
  try {
    loading.value = true;
    const response = await TutorService.index();
    tutors.value = response.data;
    allTutors.value = response.data; // Lưu danh sách đầy đủ
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
  tutors.value = allTutors.value;
};

const deleteTutor = async (id) => {
  Modal.confirm({
    title: "Bạn có chắc sẽ xóa gia sư này?",
    okText: "Xóa",
    okType: "danger",
    cancelText: "Hủy",
    async onOk() {
      try {
        loading.value = true;
        await TutorService.destroy(id);
        await getAllTutors();
        message.success("Xóa gia sư thành công");
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
  getAllTutors();
});
</script>
