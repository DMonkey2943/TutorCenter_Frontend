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
          <p
            v-else-if="classItem.status == 2"
            class="p-2 m-0 bg-primary text-white rounded"
          >
            Đã kết thúc
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
            <span class="fw-semibold">Ngày dự kiến bắt đầu: </span>
            {{ classItem.start_date }}
          </div>
          <div>
            <span class="fw-semibold">Yêu cầu: </span>
            {{ formattedLevelGender(classItem) }}
          </div>

          <!-- If user's role is tutor and class is not finish -->
          <div
            v-if="authStore.user_role == 'tutor' && classItem.status == 0"
            class="mt-3 text-end"
          >
            <button
              v-if="classItem.approvals?.[0]?.status == 0"
              type="submit"
              class="btn btn-outline-danger"
              @click="unenrollClass(classItem.id)"
            >
              <span class="button-with-icon">
                Hủy đăng ký
                <CloseCircleOutlined class="ms-1" />
              </span>
            </button>
            <button
              v-else-if="
                classItem.approvals?.[0]?.status == 1 ||
                classItem.approvals?.[0]?.status == 2
              "
              type="submit"
              class="btn btn-success"
              @click="confirmClassTeaching(classItem.id)"
            >
              <span class="button-with-icon">
                Xác nhận nhận lớp
                <CheckCircleOutlined class="ms-1" />
              </span>
            </button>
            <div
              v-else-if="classItem.approvals?.[0]?.status == -1"
              class="alert alert-danger text-center p-2"
              role="alert"
            >
              Phụ huynh từ chối bạn
            </div>
            <button
              v-else
              type="submit"
              class="btn btn-primary"
              @click="enrollClass(classItem.id)"
            >
              <span class="button-with-icon">
                Đăng ký nhận lớp
                <ImportOutlined class="ms-1" />
              </span>
            </button>

            <div
              v-if="classItem.approvals?.[0]?.status == 2"
              class="alert alert-info text-center p-2 mt-2"
              role="alert"
            >
              Phụ huynh muốn bạn dạy cho lớp học
            </div>
          </div>
          <div
            v-if="
              authStore.user_role == 'tutor' &&
              (classItem.status == 1 || classItem.status == 2)
            "
            class="mt-3 text-end"
          >
            <button
              v-if="authStore.tutor_id == classItem.tutor_id"
              class="btn btn-outline-info"
              data-bs-toggle="modal"
              data-bs-target="#classDetailModal"
              @click="getClassDetail(classItem.id)"
            >
              <span class="button-with-icon">
                Xem chi tiết
                <InfoCircleOutlined class="ms-1" />
              </span>
            </button>
            <div
              v-else
              class="alert alert-secondary text-center p-2"
              role="alert"
            >
              Đã có gia sư nhận lớp này!
            </div>
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
  <!--Modal Class Detail -->
  <div
    class="modal fade"
    id="classDetailModal"
    tabindex="-1"
    aria-labelledby="classDetailModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="classDetailModalLabel">
            Chi tiết lớp học - MS: {{ classDetail.id }}
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            @click="clearClassDetail"
          ></button>
        </div>
        <div class="modal-body">
          <div v-if="loading" class="text-center">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
          <div v-else>
            <!-- Hiển thị đánh giá -->
            <div class="mb-4" v-if="classDetail.status == 2">
              <span class="fw-bold">Phụ huynh đánh giá: </span>
              <template v-if="tutorRating">
                <a-rate :value="tutorRating.stars" disabled />
                <span class="ms-2">({{ tutorRating.stars }}/5)</span>
                <div v-if="tutorRating.comment" class="mt-1">
                  <span class="fst-italic">{{ tutorRating.comment }}</span>
                </div>
              </template>
              <template v-else>
                <span class="text-muted">Chưa có đánh giá</span>
              </template>
            </div>
            <h5>Thông tin liên lạc phụ huynh</h5>
            <p><strong>Phụ huynh:</strong> {{ classDetail.parent.name }}</p>
            <p>
              <strong>SĐT phụ huynh:</strong> {{ classDetail.parent.phone }}
            </p>
            <p><strong>Địa chỉ lớp học:</strong> {{ classDetail.address }}</p>
            <h5>Thông tin lớp học</h5>
            <p>
              <strong>Môn dạy:</strong> {{ classDetail.subjects.join(", ") }}
            </p>
            <p><strong>Khối lớp dạy:</strong> {{ classDetail.grade }}</p>
            <p>
              <strong>Số học viên:</strong> {{ classDetail.num_of_students }}
            </p>
            <p><strong>Học phí/buổi:</strong> {{ formattedTuition }}</p>
            <p><strong>Thời gian:</strong> {{ formattedClassTimes }}</p>
            <p>
              <strong>Trình độ GS:</strong>
              {{ classDetail.level || "Tùy trung tâm" }}
            </p>
            <p><strong>Giới tính GS:</strong> {{ formattedGender }}</p>
            <p><strong>Yêu cầu khác:</strong> {{ classDetail.request }}</p>

            <h5>Thông tin báo cáo vấn đề</h5>
            <p v-if="!tutorReports || tutorReports.length == 0">Không có</p>
            <div v-else>
              <div v-for="report in tutorReports" :key="report.id" class="mb-3">
                <p
                  class="fw-bold mb-1"
                  :class="report.status === 1 ? 'text-success' : 'text-warning'"
                >
                  Báo cáo #{{ report.id }} -
                  {{ report.status == 1 ? "Đã xử lý" : "Chưa xử lý" }}
                </p>
                <p class="mb-1">
                  <strong>Nội dung:</strong> {{ report.content }}
                </p>
                <p v-if="report.response" class="ms-2">
                  <i class="fas fa-reply me-1"></i>
                  <strong>Phản hồi:</strong> {{ report.response }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer" v-if="classDetail.status == 1">
          <button
            type="button"
            class="btn btn-warning"
            data-bs-toggle="modal"
            data-bs-target="#reportModal"
          >
            <span class="button-with-icon">
              Báo cáo vấn đề
              <WarningOutlined class="ms-1"/>
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal Report -->
  <div
    class="modal fade"
    id="reportModal"
    tabindex="-1"
    aria-labelledby="reportModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="reportModalLabel">
            Báo cáo vấn đề - MS lớp học: {{ classDetail.id }}
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            @click="resetReportForm"
          ></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="submitReport">
            <div class="mb-3">
              <label for="reportContent" class="form-label fw-bold">
                Nội dung <span class="text-danger">*</span>
              </label>
              <textarea
                v-model="reportForm.content"
                class="form-control"
                id="reportContent"
                rows="4"
                required
                placeholder="Vui lòng mô tả chi tiết vấn đề bạn gặp phải..."
              ></textarea>
            </div>

            <div v-if="reportForm.loading" class="text-center">
              <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Đang xử lý...</span>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            @click="resetReportForm"
          >
            Hủy
          </button>
          <button
            type="button"
            class="btn btn-primary"
            :disabled="reportForm.loading"
            @click="submitReport"
          >
            Gửi báo cáo
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from "vue";
import { useAuthStore } from "@/stores/auth";
import ApprovalService from "@/services/approval.service";
import message from "ant-design-vue/es/message";
import { Modal } from "ant-design-vue";
import ClassService from "@/services/class.service";
import RateService from "@/services/rate.service";
import ReportService from "@/services/report.service";
import {
  ImportOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined,
  InfoCircleOutlined,
  WarningOutlined,
} from "@ant-design/icons-vue";

const authStore = useAuthStore();

// Nhận prop classes từ component cha
const props = defineProps({
  classes: {
    type: Object,
    required: true,
  },
});

// Emit sự kiện khi người dùng thay đổi trang
const emit = defineEmits(["pageChange", "retrieveClasses"]);

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
    const result = await ApprovalService.enrollClass({ class_id: classId });
    // console.log(result);
    if (result.success) {
      message.success(`Đăng ký nhận lớp học MS:${classId} thành công`);
    }
  } catch (error) {
    console.log(error);
    if (error.response) {
      const status = error.response.status;
      const errorMessage = error.response.data.message || "Có lỗi xảy ra";

      // Xử lý cụ thể lỗi 403 (AuthorizationException)
      if (status === 403) {
        message.error(errorMessage); // Hiển thị thông báo từ backend
      } else if (status === 404) {
        message.error(errorMessage); // Lỗi không tìm thấy lớp
      } else {
        message.error(errorMessage); // Các lỗi khác
      }
    } else {
      console.log(error);
      message.error("Lỗi kết nối hoặc không thể xử lý yêu cầu");
    }
  }
};

const unenrollClass = async (classId) => {
  Modal.confirm({
    title: "Bạn có chắc sẽ hủy đăng ký nhận lớp học này?",
    // icon: createVNode(ExclamationCircleOutlined),
    okText: "Hủy đăng ký",
    okType: "danger",
    cancelText: "Cancel",
    async onOk() {
      try {
        await ApprovalService.unenrollClass(classId);
        message.success("Hủy đăng ký lớp học thành công");

        // Gọi lên component cha để cập nhật danh sách lớp học
        emit("retrieveClasses");
      } catch (error) {
        console.log(error);
      }
    },
    onCancel() {
      Modal.destroyAll();
    },
  });
};

const confirmClassTeaching = async (classId) => {
  try {
    const result = await ClassService.confirmClassTeaching(classId);
    console.log(result);
    if (result.success) {
      message.success(`Nhận dạy lớp học MS:${classId} thành công`);
      emit("retrieveClasses");
    }
  } catch (error) {
    console.log(error);
    emit("retrieveClasses");
  }
};

const classDetail = reactive({
  id: "",
  parent: {},
  tutor: {},
  subjects: [],
  grade: "",
  address: "",
  num_of_students: "",
  num_of_sessions: "",
  tuition: "",
  class_times: [],
  level: "",
  gender_tutor: "",
  request: "",
  status: "",
  tutor_id: "",
  parent_id: "",
});
const loading = ref(false);
const getClassDetail = async (classId) => {
  loading.value = true;
  try {
    const result = await ClassService.show(classId);
    const dataClass = result.data;
    // console.log(dataClass);

    classDetail.id = classId;
    classDetail.parent = dataClass.parent?.user ?? "";
    classDetail.tutor = dataClass.tutor?.user ?? "";
    classDetail.parent_id = dataClass.parent_id ?? "";
    classDetail.tutor_id = dataClass.tutor_id ?? "";
    classDetail.subjects = Array.isArray(dataClass.subjects)
      ? dataClass.subjects.map((subject) => subject.name)
      : [];
    classDetail.grade = dataClass.grade?.name ?? "";
    classDetail.address =
      dataClass.address.detail +
        ", " +
        dataClass.address.ward.name +
        ", " +
        dataClass.address.ward.district.name ?? "";
    classDetail.num_of_students = dataClass.num_of_students;
    classDetail.num_of_sessions = dataClass.num_of_sessions;
    classDetail.tuition = dataClass.tuition;
    classDetail.class_times = dataClass.class_times ?? "";
    classDetail.gender_tutor = dataClass.gender_tutor ?? "";
    classDetail.level = dataClass.level?.name ?? "";
    classDetail.request = dataClass.request ?? "";
    classDetail.status = dataClass.status ?? "";

    if (classDetail.status == 1 || classDetail.status == 2) {
      getTutorReportsForClass(classId);
    }
    if (classDetail.status == 2) {
      fetchTutorRating();
    }
    // console.log(classDetail);
  } catch (error) {
    console.error("Lỗi khi lấy chi tiết lớp:", error);
  } finally {
    loading.value = false;
  }
};
const clearClassDetail = () => {
  classDetail.value = {};
};
const formattedSubjects = computed(() => {
  return classDetail.subjects.join(", ");
});
const formattedClassTimes = computed(() => {
  return classDetail.class_times
    .map(
      (time) =>
        `${time.day} (${time.start.slice(0, 5)} - ${time.end.slice(0, 5)})`
    )
    .join("; ");
});
const formattedTuition = computed(() => {
  return isNaN(classDetail.tuition)
    ? classDetail.tuition
    : new Intl.NumberFormat("vi-VN").format(classDetail.tuition) + "đ";
});
const formattedGender = computed(() => {
  switch (classDetail.gender_tutor) {
    case "M":
      return "Nam";
    case "F":
      return "Nữ";
    case "":
    case null:
    case undefined:
      return "Tùy trung tâm";
  }
});

const tutorRating = ref(null);
// Hàm để lấy đánh giá của gia sư
const fetchTutorRating = async () => {
  try {
    const response = await RateService.show(classDetail.id);

    // console.log(response);

    if (response.success) {
      tutorRating.value = response.data ?? null;
    }
  } catch (error) {
    console.error("Không thể tải đánh giá gia sư:", error);
  }
};

// Report Form
const reportForm = ref({
  tutor_id: null,
  class_id: null,
  content: "",
  loading: false,
});

// Reset form khi đóng modal
const resetReportForm = () => {
  reportForm.value = {
    content: "",
    loading: false,
  };
};

// Xử lý gửi báo cáo
const submitReport = async () => {
  if (!reportForm.value.content) {
    message.error("Vui lòng điền nội dung");
    return;
  }

  try {
    reportForm.value.loading = true;
    reportForm.value.tutor_id = classDetail.tutor_id;
    reportForm.value.class_id = classDetail.id;

    // console.log(reportForm.value);

    const response = await ReportService.store(reportForm.value);

    if (response.success) {
      message.success("Báo cáo đã được gửi thành công");
      bootstrap.Modal.getInstance(
        document.getElementById("reportModal")
      ).hide();
      resetReportForm();
    }
  } catch (error) {
    message.error("Không thể gửi báo cáo: " + error.message);
  } finally {
    reportForm.value.loading = false;
    await getTutorReportsForClass(classDetail.id);
  }
};

const tutorReports = ref([]);
const getTutorReportsForClass = async (classId) => {
  try {
    const result = await ReportService.getTutorReportsForClass(classId);
    console.log(result);
    tutorReports.value = result.data;
    console.log(tutorReports.value);
  } catch (error) {
    message.error("Không thể lấy các báo cáo: " + error.message);
  }
};
</script>
