<template>
  <div class="container-xxl py-5">
    <div class="container">
      <div
        class="text-center mx-auto mb-5 wow fadeInUp"
        data-wow-delay="0.1s"
        style="max-width: 1000px"
      >
        <h1 class="mb-2">HỒ SƠ GIA SƯ</h1>
        <p>
          Hãy cập nhật hồ sơ và đợi được duyệt thì gia sư mới có thể đăng ký
          nhận lớp.
        </p>
      </div>
      <a-card title="" style="width: 100%">
        <div class="d-flex justify-content-center mb-4">
          <span class="fw-bold text-uppercase fs-5">
            {{ tutorName }} - Mã số gia sư: {{ tutorProfile.id }}
          </span>
        </div>

        <div v-if="status" class="row">
          <span class="profile_status-alert">
            <div
              v-if="tutorProfile.profile_status == 1"
              class="alert alert-success"
              role="alert"
            >
              <strong>Trạng thái hồ sơ:</strong> Đã duyệt
            </div>
            <div
              v-else-if="tutorProfile.profile_status == 0"
              class="alert alert-warning"
              role="alert"
            >
              <strong>Trạng thái hồ sơ:</strong> Đang chờ duyệt
            </div>
            <div
              v-else-if="tutorProfile.profile_status == -1"
              class="alert alert-danger"
              role="alert"
            >
              <strong>Trạng thái hồ sơ:</strong> Không đạt
              <br />
              <p class="ms-3 mb-0">
                <strong>Lý do:</strong> {{ tutorProfile.profile_reason ?? "" }}
              </p>
            </div>
          </span>

          <div class="col-12 col-lg-5">
            <div class="row mb-2">
              <div class="col-12 d-flex justify-content-center mb-3">
                <!-- <span>Ảnh đại diện</span> -->
                <a-avatar v-if="fullAvatarUrl" shape="square" :size="200">
                  <template #icon>
                    <img :src="fullAvatarUrl" alt="Avatar" />
                  </template>
                </a-avatar>
              </div>
            </div>
            <div class="row mb-2">
              <div class="col-12 d-flex justify-content-center mb-3">
                <img
                  v-if="fullDegreeUrl"
                  :src="fullDegreeUrl"
                  alt="Degree"
                  style="width: 100%; height: auto; max-width: 260px"
                  @click="zoomDegree"
                />
              </div>
            </div>
          </div>
          <div class="col-12 col-lg-7">
            <!-- <div>
              <span class="fw-bold">Mã số gia sư: </span>
              <span>{{ tutorProfile.id }}</span>
            </div> -->
            <div>
              <span class="fw-bold">Giới tính: </span>
              <span>{{ tutorProfile.gender === "M" ? "Nam" : "Nữ" }}</span>
            </div>
            <div>
              <span class="fw-bold">Ngày sinh: </span>
              <span>{{ tutorProfile.birthday }}</span>
            </div>
            <div>
              <span class="fw-bold">Địa chỉ hiện tại: </span>
              <span>{{ tutorProfile.address }}</span>
            </div>
            <div>
              <span class="fw-bold">Trình độ: </span>
              <span>{{ tutorProfile.level.name }}</span>
            </div>
            <div>
              <span class="fw-bold">Chuyên ngành: </span>
              <span>{{ tutorProfile.major }}</span>
            </div>
            <div>
              <span class="fw-bold">Nơi học tập/công tác: </span>
              <span>{{ tutorProfile.school }}</span>
            </div>
            <div>
              <span class="fw-bold">Môn dạy: </span>
              <span>{{
                tutorProfile.subjects.map((s) => s.name).join(", ") ||
                "Chưa cập nhật"
              }}</span>
            </div>
            <div>
              <span class="fw-bold">Khối lớp dạy: </span>
              <span>{{
                tutorProfile.grades.map((s) => s.name).join(", ") ||
                "Chưa cập nhật"
              }}</span>
            </div>
            <div>
              <span class="fw-bold">Khu vực dạy: </span>
              <span>{{
                tutorProfile.districts.map((s) => s.name).join(", ") ||
                "Chưa cập nhật"
              }}</span>
            </div>
            <div>
              <span class="fw-bold">Kinh nghiệm: </span>
              <span>{{ tutorProfile.experiences }}</span>
            </div>
            <div>
              <span class="fw-bold">Học phí/buổi: </span>
              <span>{{ tutorProfile.tuition.range }}</span>
            </div>
          </div>
        </div>

        <div v-else class="row">
          <span class="d-flex justify-content-center">Chưa có hồ sơ</span>
        </div>

        <div class="row mt-3">
          <div class="col-12 d-grid d-sm-flex justify-content-sm-end mx-auto">
            <a-button type="primary" class="me-sm-2 mb-2">
              <router-link :to="{ name: 'tutor.profile.edit' }">
                <span>Cập nhật hồ sơ!</span>
              </router-link>
            </a-button>
          </div>
        </div>
      </a-card>

      <!-- Modal để phóng to hình ảnh -->
      <a-modal
        v-model:open="isZoomDegree"
        :footer="null"
        closable
        class="modal-zoom-degree"
      >
        <img
          :src="previewDegree || fullDegreeUrl"
          alt="Degree"
          class="zoom-degree-image"
        />
      </a-modal>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
// import { useRoute } from "vue-router";
import TutorService from "@/services/tutor.service";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

const router = useRouter();
// const route = useRoute();
const tutorProfile = ref({});
const tutorName = ref("");
const status = ref(false);

// Host của backend
const backendHost = "http://127.0.0.1:8000";
const fullAvatarUrl = computed(() => {
  if (!tutorProfile.value.avatar) {
    return null;
  }
  return `${backendHost}/storage/${tutorProfile.value.avatar}`;
});
const fullDegreeUrl = computed(() => {
  if (!tutorProfile.value.degree) {
    return null;
  }
  return `${backendHost}/storage/${tutorProfile.value.degree}`;
});

const getTutorProfile = async () => {
  try {
    const id = authStore.tutor_id;
    const result = await TutorService.show(id);
    if (result.data.profile_status !== null) {
      status.value = true;
    }
    tutorProfile.value = result.data;
    tutorName.value = result.data.user.name;
    console.log(tutorProfile.value);
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

const isZoomDegree = ref(false);
const zoomDegree = () => {
  isZoomDegree.value = true;
};

onMounted(() => {
  getTutorProfile();
});
</script>

<style>
.modal-zoom-degree .ant-modal-content {
  max-width: none; /* Bỏ giới hạn max-width mặc định */
  padding: 0; /* Xóa padding để modal vừa với hình ảnh */
}

.zoom-degree-image {
  display: block;
  max-width: 100%; /* Hình ảnh không vượt quá chiều rộng modal */
  height: auto; /* Giữ tỷ lệ hình ảnh */
  margin: 0 auto; /* Căn giữa hình ảnh */
}
</style>
