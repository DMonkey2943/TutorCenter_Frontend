<template>
  <a-card title="QUẢN LÝ LỚP HỌC" style="width: 100%">
    <div class="row mb-3">
      <div class="col-12 d-flex justify-content-end">
        <a-button type="primary">
          <router-link :to="{ name: 'admin.classes.create' }">Thêm</router-link>
        </a-button>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <a-table :dataSource="classes" :columns="columns" :scroll="{ x: 576 }">
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
                >Thất bại</span
              >
            </template>
            <template v-if="column.key === 'action'">
              <router-link
                :to="{
                  name: 'admin.classes.detail',
                  params: { id: record.id },
                }"
              >
                <a-button class="me-0 me-sm-2 mb-2 mb-sm-0"> Xem </a-button>
              </router-link>
              <router-link
                :to="{
                  name: 'admin.classes.edit',
                  params: { id: record.id },
                }"
              >
                <a-button type="primary" class="me-0 me-sm-2 mb-2 mb-sm-0">
                  Sửa
                </a-button> </router-link
              ><span>
                <a-button @click="deleteClass(record.id)" type="primary" danger>
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
import ClassService from "@/services/class.service";
import { Modal } from "ant-design-vue";
import message from "ant-design-vue/es/message";

useMenuAdmin().onSelectedKeys(["admin-classes"]);

const classes = ref([]);
const open = ref(false);

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
  },
  {
    title: "Tùy chọn",
    key: "action",
    fixed: "right",
  },
];

const getAllClasses = async () => {
  try {
    const response = await ClassService.index();
    classes.value = response.data;
  } catch (error) {
    console.log(error);
  }
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
  getAllClasses();
});
</script>
