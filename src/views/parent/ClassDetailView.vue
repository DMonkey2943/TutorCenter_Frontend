<template>
  <!-- Spinner Start -->
  <!-- <div
    id="spinner"
    class="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center"
  >
    <div
      class="spinner-border text-primary"
      style="width: 3rem; height: 3rem"
      role="status"
    >
      <span class="sr-only">Loading...</span>
    </div>
  </div> -->
  <!-- Spinner End -->

  <div class="container-xxl py-5">
    <div class="container">
      <div
        class="text-center mx-auto mb-5 wow fadeInUp"
        data-wow-delay="0.1s"
        style="max-width: 600px"
      >
        <h1 class="mb-2">Thông tin lớp học mã số: {{ class2.id }}</h1>
        <p>
          Trung tâm gia sư Cần Thơ bảo đảm sẽ gửi tới quý phụ huynh và học sinh
          những gia sư tốt đã được chọn lọc kỹ càng và phù hợp với yêu cầu riêng
          biệt của từng học viên.
        </p>
      </div>
      <a-card style="width: 100%" class="fs-6">
        <div class="row">
          <div class="col-12 col-lg-8 col-xxl-7">
            <div>
              <span class="fw-bold">Môn dạy: </span>
              <span>
                {{ class2.subjects.join(", ") }}
              </span>
            </div>
            <div>
              <span class="fw-bold">Khối lớp dạy: </span>
              <span>{{ class2.grade }}</span>
            </div>
            <div>
              <span class="fw-bold">Địa chỉ: </span>
              <span>{{ class2.address }}</span>
            </div>
            <div>
              <span class="fw-bold">Số học viên: </span>
              <span>{{ class2.num_of_students }}</span>
            </div>
            <div>
              <span class="fw-bold">Số buổi: </span>
              <span>{{ class2.num_of_sessions }}</span>
            </div>
            <div>
              <span class="fw-bold">Học phí/buổi: </span>
              <span>{{ formattedTuition }}</span>
            </div>
            <div>
              <span class="fw-bold">Thời gian: </span>
              <span>{{ formattedClassTimes }}</span>
            </div>
            <div>
              <span class="fw-bold">Ngày dự kiến bắt đầu: </span>
              <span>{{ class2.start_date }}</span>
            </div>

            <h3 class="fw-bold mt-4">Yêu cầu gia sư</h3>
            <div>
              <span class="fw-bold">Trình độ: </span>
              <span>{{ class2.level || "Tùy trung tâm" }}</span>
            </div>
            <div>
              <span class="fw-bold">Giới tính GS: </span>
              <span>{{ formattedGender }}</span>
            </div>
            <div>
              <span class="fw-bold">Yêu cầu khác: </span>
              <span>{{ class2.request }}</span>
            </div>
          </div>
          <div class="col-12 col-lg-4 col-xxl-5">
            <div v-if="class2.status == 1 || class2.status == 2">
              <h3 class="fw-bold mt-4">Gia sư nhận lớp</h3>
              <div>
                <span class="fw-bold">Gia sư: </span>
                <span>{{ class2.tutor.name }}</span>
              </div>
              <div>
                <span class="fw-bold">SĐT liên hệ: </span>
                <span>{{ class2.tutor.phone }}</span>
              </div>
              <!-- Hiển thị đánh giá -->
              <div class="mt-2" v-if="class2.status == 2">
                <span class="fw-bold">Đánh giá: </span>
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
            </div>
            <div v-else>
              <h4 class="fw-bold mt-4">Gia sư đăng ký nhận lớp</h4>

              <span v-if="class2.approvals && class2.approvals.length > 0">
                <div
                  v-for="approval in class2.approvals"
                  :key="approval.tutor_id"
                  class="mb-2"
                >
                  <a-card>
                    <h6
                      class="text-primary"
                      style="cursor: pointer"
                      @click="showTutorInfo(approval.tutor_id)"
                    >
                      Mã số gia sư: {{ approval.tutor_id }}
                    </h6>
                    <span v-if="approval.status == 0">
                      <button
                        class="btn btn-success"
                        @click="approveTutor(class2.id, approval.tutor_id, 1)"
                      >
                        Duyệt
                      </button>
                      <button
                        class="btn btn-outline-danger ms-3"
                        @click="approveTutor(class2.id, approval.tutor_id, -1)"
                      >
                        Từ chối
                      </button>
                    </span>
                    <span v-else-if="approval.status == 1">
                      <p class="text-success">Đang đợi gia sư xác nhận</p>
                    </span>
                    <span v-else>
                      <p class="text-danger">Bạn đã từ chối gia sư này</p>
                    </span>
                  </a-card>
                </div>
              </span>
              <span v-else>
                <p>Chưa có gia sư nào đăng ký nhận lớp này</p>
              </span>
            </div>
          </div>
        </div>

        <!-- Modal hiển thị thông tin gia sư -->
        <a-modal
          v-model:open="visible"
          title="Thông tin gia sư"
          @cancel="visible = false"
          :footer="null"
        >
          <a-spin v-if="loading"></a-spin>
          <div v-else>
            <p><strong>ID:</strong> {{ tutorInfo.id }}</p>
            <p><strong>Họ tên:</strong> {{ tutorInfo.user.name }}</p>
            <p><strong>Chuyên ngành:</strong> {{ tutorInfo.major }}</p>
            <p><strong>Trường:</strong> {{ tutorInfo.major }}</p>
            <p><strong>Trình độ:</strong> {{ tutorInfo.level?.name ?? "" }}</p>
            <p>
              <strong>Mức lương/buổi:</strong> {{ tutorInfo.tuition.range }}
            </p>
          </div>
        </a-modal>

        <div class="row mt-3">
          <div class="col-12 d-grid d-sm-flex justify-content-sm-end mx-auto">
            <a-button
              v-if="showCompleteButton"
              type="primary"
              @click="showCompleteModal"
              class="me-4"
            >
              Kết thúc lớp học
            </a-button>

            <a-button class="me-sm-2 mb-2">
              <router-link :to="{ name: 'parent.classes' }">
                <span>Trở về</span>
              </router-link>
            </a-button>
          </div>
        </div>

        <!-- Modal xác nhận kết thúc lớp học và đánh giá gia sư -->
        <a-modal
          v-model:visible="completeModalVisible"
          title="Kết thúc lớp học"
          @ok="handleCompleteClass"
          :confirmLoading="confirmLoading"
          width="700px"
        >
          <p>
            Bạn có chắc chắn muốn kết thúc lớp học này? Sau khi kết thúc, vui
            lòng đánh giá gia sư.
          </p>

          <!-- Form đánh giá gia sư -->
          <a-form :model="ratingForm" layout="vertical">
            <a-form-item label="Đánh giá" name="rating">
              <a-rate v-model:value="ratingForm.stars" />
            </a-form-item>

            <a-form-item label="Nhận xét" name="comment">
              <a-textarea
                v-model:value="ratingForm.comment"
                :rows="4"
                placeholder="Nhận xét về gia sư (không bắt buộc)"
              />
            </a-form-item>
          </a-form>
        </a-modal>
      </a-card>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import message from "ant-design-vue/es/message";
import ClassService from "@/services/class.service";
import TutorService from "@/services/tutor.service";
import ApprovalService from "@/services/approval.service";
import RateService from "@/services/rate.service";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

const router = useRouter();
const route = useRoute();
const class1 = ref({});
const class2 = reactive({
  id: "",
  parent: {},
  tutor: {},
  subjects: [],
  grade: "",
  address: "",
  num_of_students: "",
  num_of_sessions: "",
  tuition: "",
  start_date: "",
  end_date: "",
  class_times: [],
  level: "",
  gender_tutor: "",
  request: "",
  status: "",
  approvals: [],
  tutor_id: "",
  parent_id: "",
});

const status = ref(0);

const getClass = async () => {
  try {
    const id = route.params.id;

    const result = await ClassService.show(id);

    if (authStore.parent_id != result.data.parent_id) {
      router.push({
        name: "notfound",
        params: {
          pathMatch: route.path.split("/").slice(1),
        },
        query: route.query,
        hash: route.hash,
      });
    }

    const dataClass = result.data;
    console.log(dataClass);

    class2.id = id;
    class2.parent = dataClass.parent?.user ?? "";
    class2.tutor = dataClass.tutor?.user ?? "";
    class2.parent_id = dataClass.parent_id ?? "";
    class2.tutor_id = dataClass.tutor_id ?? "";

    class2.subjects = Array.isArray(dataClass.subjects)
      ? dataClass.subjects.map((subject) => subject.name)
      : [];
    class2.grade = dataClass.grade?.name ?? "";
    class2.address =
      dataClass.address.detail +
        ", " +
        dataClass.address.ward.name +
        ", " +
        dataClass.address.ward.district.name ?? "";
    class2.num_of_students = dataClass.num_of_students;
    class2.num_of_sessions = dataClass.num_of_sessions;
    class2.tuition = dataClass.tuition;
    class2.start_date = dataClass.start_date;
    class2.class_times = dataClass.class_times ?? [];
    class2.gender_tutor = dataClass.gender_tutor ?? "";
    class2.level = dataClass.level?.name ?? "";
    class2.request = dataClass.request ?? "";
    class2.status = dataClass.status ?? "";
    class2.approvals = dataClass.approvals ?? [];

    console.log(class2);

    fetchTutorRating();
  } catch (error) {
    console.log(error);
    router.push({
      name: "notfound",
      params: {
        pathMatch: route.path.split("/").slice(1),
      },
      query: route.query,
      hash: route.hash,
    });
  }
};

const visible = ref(false);
const loading = ref(false);
const tutorInfo = ref({});
const showTutorInfo = async (tutor_id) => {
  visible.value = true;
  loading.value = true;
  try {
    const result = await TutorService.show(tutor_id);
    console.log(result);
    tutorInfo.value = result.data;
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};

const approveTutor = async (classId, tutorId, status) => {
  try {
    const data = reactive({
      status: status ?? "",
      tutor_id: tutorId ?? "",
    });

    console.log(data);
    const result = await ApprovalService.approve(classId, data);
    console.log(result);
    if (result.success) {
      message.success("Xét duyệt gia sư thành công");
    }
  } catch (error) {
    console.error(error);
    message.error("Lỗi xét duyệt gia sư");
  } finally {
    getClass();
  }
};

const formattedSubjects = computed(() => {
  return class2.subjects.join(", ");
});
const formattedClassTimes = computed(() => {
  return class2.class_times
    .map(
      (time) =>
        `${time.day} (${time.start.slice(0, 5)} - ${time.end.slice(0, 5)})`
    )
    .join("; ");
});
const formattedTuition = computed(() => {
  return isNaN(class2.tuition)
    ? class2.tuition
    : new Intl.NumberFormat("vi-VN").format(class2.tuition) + "đ";
});
const formattedGender = computed(() => {
  switch (class2.gender_tutor) {
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

const completeModalVisible = ref(false);
const confirmLoading = ref(false);
// Form đánh giá
const ratingForm = reactive({
  stars: 5,
  comment: "",
  tutor_id: null,
  parent_id: null,
  class_id: null,
});

const showCompleteButton = computed(() => {
  // Kiểm tra đủ điều kiện: đã giao, đã bắt đầu, và chưa kết thúc
  const today = new Date().toISOString().split("T")[0];
  return (
    class2.status == 1 &&
    class2.start_date &&
    class2.start_date <= today &&
    !class2.end_date
  );
});

// Hiển thị modal kết thúc lớp học
const showCompleteModal = () => {
  ratingForm.tutor_id = class2.tutor_id;
  ratingForm.parent_id = class2.parent_id;
  ratingForm.class_id = class2.id;
  completeModalVisible.value = true;
};

// Xử lý kết thúc lớp học và đánh giá
const handleCompleteClass = async () => {
  confirmLoading.value = true;

  try {
    // Bước 1: Kết thúc lớp học
    const completeResponse = await ClassService.completeClass(class2.id);

    // Bước 2: Đánh giá gia sư
    await RateService.store(ratingForm);

    message.success("Lớp học đã kết thúc và đánh giá đã được gửi thành công");

    // Cập nhật dữ liệu lớp học
    // classData.value = completeResponse.data.class;
    completeModalVisible.value = false;

    // Làm mới dữ liệu
  } catch (error) {
    message.error(
      "Có lỗi xảy ra: " + (error.response?.data?.message || "Vui lòng thử lại")
    );
  } finally {
    getClass();
    confirmLoading.value = false;
  }
};

const tutorRating = ref(null);
// Hàm để lấy đánh giá của gia sư
const fetchTutorRating = async () => {
  // if(class2.status)
  try {    
    const response = await RateService.show(class2.id);
    
    console.log(response);

    if (response.success) {
      tutorRating.value = response.data ?? null;
    }
  } catch (error) {
    console.error('Không thể tải đánh giá gia sư:', error);
  }
};

onMounted(() => {
  getClass();
});
</script>
