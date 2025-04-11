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
      <div class="col-12">
        <a-table :dataSource="tutors" :columns="columns" :scroll="{ x: 576 }">
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'status'">
              <span v-if="record.profile_status !== null">
                <span v-if="record.profile_status == 0" class="text-warning"
                  >Chờ duyệt</span
                >
                <span
                  v-else-if="record.profile_status == 1"
                  class="text-success"
                  >Đã duyệt</span
                >
                <span v-else class="text-danger">Không đạt</span>
              </span>
              <span v-else class="text-info">Chưa tạo</span>
            </template>
            <template v-if="column.key === 'action'">
              <router-link
                :to="{ name: 'admin.tutors.edit', params: { id: record.id } }"
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
import { ref } from "vue";
import { useMenuAdmin } from "@/stores/use-menu-admin";
import TutorService from "@/services/tutor.service";
import { Modal } from "ant-design-vue";
import message from "ant-design-vue/es/message";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons-vue";

useMenuAdmin().onSelectedKeys(["admin-tutors"]);

const tutors = ref([]);

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

const getAllTutors = async () => {
  try {
    const response = await TutorService.index();
    tutors.value = response.data;
  } catch (error) {
    console.log(error);
  }
};

const deleteTutor = async (id) => {
  Modal.confirm({
    title: "Bạn có chắc sẽ xóa gia sư này?",
    // icon: createVNode(ExclamationCircleOutlined),
    // content: "Some descriptions",
    okText: "Xóa",
    okType: "danger",
    cancelText: "Hủy",
    async onOk() {
      try {
        await TutorService.destroy(id);
        getAllTutors();
        message.success("Xóa gia sư thành công");
      } catch (error) {
        console.log(error);
      }
    },
    onCancel() {
      Modal.destroyAll();
    },
  });
};

// onMounted(() => {
getAllTutors();
// });
</script>
