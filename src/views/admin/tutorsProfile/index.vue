<template>
  <a-card title="QUẢN LÝ HỒ SƠ GIA SƯ" style="width: 100%">
    <div class="row">
      <div class="col-12">
        <a-table :dataSource="tutors" :columns="columns" :scroll="{ x: 576 }">
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
                <a-button type="primary" class="me-0 me-sm-2 mb-2 mb-sm-0">
                  Xem
                </a-button>
              </router-link>
              <router-link
                :to="{
                  name: 'admin.tutors.profile.edit',
                  params: { id: record.id },
                }"
              >
                <a-button type="primary" class="me-0 me-sm-2 mb-2 mb-sm-0">
                  Sửa
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
import { ref } from "vue";
import { useMenuAdmin } from "@/stores/use-menu-admin";
import TutorService from "@/services/tutor.service";
import { Modal } from "ant-design-vue";
import message from "ant-design-vue/es/message";

useMenuAdmin().onSelectedKeys(["admin-tutors-profile"]);

const tutors = ref([]);
const tutorProfile = ref({});
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

const getAllTutors = async () => {
  try {
    const response = await TutorService.index();
    tutors.value = response.data;
  } catch (error) {
    console.log(error);
  }
};

const getTutorProfile = async (id) => {
  try {
    const result = await TutorService.show(id);
    tutorProfile.value = result.data;
    open.value = true;
    // console.log(result);
    console.log(tutorProfile.value);
  } catch (error) {
    console.log(error);
  }
};

// onMounted(() => {
getAllTutors();
// });
</script>
