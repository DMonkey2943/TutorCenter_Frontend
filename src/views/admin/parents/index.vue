<template>
  <a-card title="QUẢN LÝ PHỤ HUYNH" style="width: 100%">
    <div class="row mb-3">
      <div class="col-12 d-flex justify-content-end">
        <a-button type="primary">
          <router-link :to="{ name: 'admin.parents.create' }">Thêm</router-link>
        </a-button>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <a-table :dataSource="parents" :columns="columns" :scroll="{ x: 576 }">
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'status'">
              <span v-if="record.blocked_at" class="text-danger">
                Tạm khóa
              </span>
            </template>
            <template v-if="column.key === 'action'">
              <router-link
                :to="{ name: 'admin.parents.edit', params: { id: record.id } }"
              >
                <a-button type="primary" class="me-0 me-sm-2 mb-2 mb-sm-0">
                  Sửa
                </a-button>
              </router-link>
              <span>
                <a-button @click="showDeleteConfirm" type="primary" danger>
                  Xóa
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
import { ref, onMounted } from "vue";
import { useMenuAdmin } from "@/stores/use-menu-admin";
import ParentService from "@/services/parent.service";
import { Modal } from "ant-design-vue";

useMenuAdmin().onSelectedKeys(["admin-parents"]);

const parents = ref([]);

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

const getAllParents = async () => {
  try {
    const response = await ParentService.index();
    parents.value = response.data;
  } catch (error) {
    console.log(error);
  }
};

const showDeleteConfirm = () => {
  Modal.confirm({
    title: "Bạn có chắc sẽ xóa phụ huynh này?",
    // icon: createVNode(ExclamationCircleOutlined),
    // content: "Some descriptions",
    okText: "Xóa",
    okType: "danger",
    cancelText: "Hủy",
    onOk() {
      console.log("OK");
    },
    onCancel() {
      console.log("Cancel");
    },
  });
};

onMounted(() => {
  getAllParents();
});
</script>
