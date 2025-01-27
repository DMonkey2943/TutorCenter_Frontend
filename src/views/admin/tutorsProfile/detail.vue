<template>
  <a-card title="HỒ SƠ GIA SƯ" style="width: 100%">
    <div class="d-flex justify-content-center mb-4">
      <span class="fw-bold text-uppercase fs-5">
        {{ tutorName }}
      </span>
    </div>

    <div v-if="status" class="row">
      <div class="col-12 col-md-4">
        <!-- <span>Ảnh đại diện</span> -->
        <a-avatar shape="square" :size="200">
          <template #icon>
            <img :src="fullAvatarUrl" alt="Avatar" />
          </template>
        </a-avatar>
      </div>
      <div class="col-12 col-md-8">
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
      </div>
    </div>

    <div v-else class="row">
      <span class="d-flex justify-content-center">Chưa có hồ sơ</span>
    </div>

    <div class="row mt-3">
      <div class="col-12 d-grid d-sm-flex justify-content-sm-end mx-auto">
        <a-button v-if="!status" type="primary" class="me-sm-2 mb-2">
          <router-link
            :to="{
              name: 'admin.tutors.profile.edit',
              params: { id: tutorProfile.id },
            }"
          >
            <span>Cập nhật hồ sơ ngay!</span>
          </router-link>
        </a-button>
        <a-button class="me-sm-2 mb-2">
          <router-link :to="{ name: 'admin.tutors.profile' }">
            <span>Trở về</span>
          </router-link>
        </a-button>
      </div>
    </div>
  </a-card>
</template>
<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { useMenuAdmin } from "@/stores/use-menu-admin";
import TutorService from "@/services/tutor.service";

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

const getTutorProfile = async () => {
  try {
    const id = route.params.id;
    const result = await TutorService.show(id);
    if (result.data.profile_status !== null) {
      status.value = true;
    }
    tutorProfile.value = result.data;
    tutorName.value = result.data.user.name;
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

getTutorProfile();
</script>
