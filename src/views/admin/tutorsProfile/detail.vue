<template>
  <a-card title="HỒ SƠ GIA SƯ" style="width: 100%">
    <div class="d-flex justify-content-center mb-4">
      <span class="fw-bold text-uppercase fs-5">
        {{ tutorName }}
      </span>
    </div>

    <div v-if="status" class="row">
      <div>
        <div
          v-if="tutorProfile.profile_status == 0"
          class="tutor-approval mt-2"
        >
          <h5>Xét duyệt hồ sơ</h5>
          <div class="d-flex gap-3 mb-3">
            <a-button
              type="primary"
              @click="approveProfile(1)"
              class="btn-approve"
            >
              Hồ sơ đạt yêu cầu
            </a-button>

            <a-button danger @click="showRejectModal = true" class="btn-reject">
              Hồ sơ chưa đạt yêu cầu
            </a-button>
          </div>

          <a-modal
            v-model:visible="showRejectModal"
            title="Lý do từ chối hồ sơ"
            @ok="handleReject"
            okText="Lưu"
            cancelText="Hủy"
          >
            <div class="mb-3">
              <label for="profile-reason" class="form-label fw-bold"
                >Lý do:</label
              >
              <a-textarea
                id="profile-reason"
                v-model:value="profile_reason"
                :rows="4"
                placeholder="Nhập lý do từ chối hồ sơ..."
              />
            </div>
          </a-modal>
        </div>
        <div v-else class="mt-2">
          <div
            v-if="tutorProfile.profile_status == 1"
            class="alert alert-success"
            role="alert"
          >
            <strong>Trạng thái hồ sơ:</strong> Đã duyệt
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
        </div>
      </div>
      <div class="col-12 col-lg-4">
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
      <div class="col-12 col-lg-8">
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
            tutorProfile.grades.map((s) => s.name).join(", ") || "Chưa cập nhật"
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

        <div class="mt-3">
          <span class="fw-bold">Đánh giá: </span>
          <span>
            <a-rate :value="averageRating" allowHalf disabled />
            <span class="ms-2"
              >{{ averageRating }} ({{ totalRatings }} đánh giá)</span
            >
          </span>
        </div>
      </div>
    </div>

    <div v-else class="row">
      <span class="d-flex justify-content-center">Chưa có hồ sơ</span>
    </div>

    <div class="row mt-3">
      <div class="col-12 d-grid d-sm-flex justify-content-sm-end mx-auto">
        <router-link :to="{ name: 'admin.tutors.profile' }">
          <a-button class="me-sm-2 mb-2">
            <span>Trở về</span>
          </a-button>
        </router-link>
        <router-link
          :to="{
            name: 'admin.tutors.profile.edit',
            params: { id: tutorProfile.id },
          }"
        >
          <a-button v-if="!status" type="primary" class="me-sm-2 mb-2">
            <span class="button-with-icon">
              <FormOutlined class="me-1" />
              Cập nhật hồ sơ ngay!
            </span>
          </a-button>
        </router-link>
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
</template>
<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { useMenuAdmin } from "@/stores/use-menu-admin";
import TutorService from "@/services/tutor.service";
import message from "ant-design-vue/es/message";
import { FormOutlined } from "@ant-design/icons-vue";

useMenuAdmin().onSelectedKeys(["admin-tutors-profile"]);

const router = useRouter();
const route = useRoute();
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

const averageRating = ref(0);
const totalRatings = ref(0);
const fetchTutorRating = async () => {
  try {
    const id = route.params.id;
    const response = await TutorService.averageRating(id);
    // console.log(response);
    if (response.success) {
      averageRating.value = response.data.average_rating;
      totalRatings.value = response.data.total_ratings;
    }
  } catch (error) {
    console.error("Không thể lấy đánh giá trung bình:", error);
  }
};

const getTutorProfile = async () => {
  try {
    const id = route.params.id;
    const result = await TutorService.show(id);
    if (result.data.profile_status !== null) {
      status.value = true;
    }
    tutorProfile.value = result.data;
    tutorName.value = result.data.user.name;
    fetchTutorRating();
    // console.log(tutorProfile.value);
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

const showRejectModal = ref(false);
const handleReject = () => {
  approveProfile(-1);
  showRejectModal.value = false;
};
const profile_reason = ref(null);
const approveProfile = async (status) => {
  try {
    const id = route.params.id;
    let result;
    if (status == 1) {
      result = await TutorService.approveProfile(id, {
        profile_status: status,
      });
    } else if (status == -1) {
      result = await TutorService.approveProfile(id, {
        profile_status: status,
        profile_reason: profile_reason.value,
      });
    }

    if (result.success) {
      message.success("Xét duyệt hồ sơ gia sư thành công");
    }
  } catch (error) {
    console.log(error);
    message.error("Có lỗi xảy ra khi xét duyệt hồ sơ");
  } finally {
    getTutorProfile();
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

.tutor-approval {
  border-top: 1px solid #eee;
  padding-top: 1rem;
}

.btn-approve {
  min-width: 160px;
}

.btn-reject {
  min-width: 180px;
}
</style>
