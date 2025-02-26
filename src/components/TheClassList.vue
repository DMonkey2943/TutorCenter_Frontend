<template>
  <div class="row g-4">
    <div
      v-for="classItem in classes.data"
      :key="classItem.id"
      class="col-lg-4 col-md-6 wow fadeInUp"
      data-wow-delay="0.1s"
    >
      <div class="card h-100">
        <div
          class="card-header d-flex justify-content-between align-items-center"
        >
          <h5 class="mb-0">MS: {{ classItem.id }}</h5>
          <p
            v-if="classItem.status == 0"
            class="p-2 m-0 bg-danger text-white rounded"
          >
            Chưa giao
          </p>
          <p
            v-else-if="classItem.status == 1"
            class="p-2 m-0 bg-success text-white rounded"
          >
            Đã giao
          </p>
        </div>
        <div class="card-body">
          <div>
            <span class="fw-semibold">Môn dạy: </span>
            <span class="text-primary">{{
              classItem.subjects.map((s) => s.name).join(", ")
            }}</span>
          </div>
          <div>
            <span class="fw-semibold">Khối lớp: </span>
            <span class="text-primary">{{ classItem.grade.name }}</span>
          </div>
          <div>
            <span class="fw-semibold">Địa chỉ: </span>
            {{ classItem.address.ward.name }},
            {{ classItem.address.ward.district.name }}
          </div>
          <div>
            <span class="fw-semibold">Mức lương/buổi: </span>
            {{
              isNaN(classItem.tuition)
                ? classItem.tuition
                : new Intl.NumberFormat("vi-VN").format(classItem.tuition) + "đ"
            }}
          </div>
          <div>
            <span class="fw-semibold">Thời gian dạy: </span>
            {{
              classItem.class_times
                .map(
                  (time) =>
                    `${time.day} (${time.start.slice(0, 5)} - ${time.end.slice(
                      0,
                      5
                    )})`
                )
                .join("; ")
            }}
          </div>
          <div>
            <span class="fw-semibold">Yêu cầu: </span>
            {{ formattedLevelGender(classItem) }}
          </div>
          <div
            v-if="authStore.user_role == 'tutor' && classItem.status == 0"
            class="mt-3 text-end"
          >
            <button type="submit" class="btn btn-success" @click="enrollClass(classItem.id)">
              Đăng ký nhận lớp
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row g-4 mt-2 text-center">
    <!-- Phân trang -->
    <a-pagination
      :current="classes.current_page"
      :pageSize="classes.per_page"
      :total="classes.total"
      @change="onPageChange"
      show-quick-jumper
    />
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import { useAuthStore } from "@/stores/auth";
import ApprovalService from "@/services/approval.service";
import message from "ant-design-vue/es/message";


const authStore = useAuthStore();

// Nhận prop classes từ component cha
const props = defineProps({
  classes: {
    type: Object,
    required: true,
  },
});

// Emit sự kiện khi người dùng thay đổi trang
const emit = defineEmits(["pageChange"]);

// Hàm xử lý chuyển trang, emit sự kiện 'pageChange'
const onPageChange = (page) => {
  emit("pageChange", page);
};

const formattedLevelGender = (classItem) => {
  if (!classItem) return ""; // Nếu classItem undefined, trả về chuỗi rỗng
  if (classItem.level && classItem.gender_tutor) {
    const gender = classItem.gender_tutor == "M" ? "Nam" : "Nữ";
    return `${classItem.level.name} + ${gender}`;
  } else if (classItem.level) {
    return classItem.level.name;
  } else if (classItem.gender_tutor) {
    return classItem.gender_tutor == "M" ? "Nam" : "Nữ";
  }
  return ""; // Trường hợp cả 2 đều null
};

const enrollClass = async (classId) => {
  try {
    const result = await ApprovalService.enrollClass({class_id: classId});
    // console.log(result);
    if (result.success) {
      message.success(`Đăng ký nhận lớp học MS:${classId} thành công`);
    }
  } catch (error) {
    console.log(error);
  }
};
</script>
