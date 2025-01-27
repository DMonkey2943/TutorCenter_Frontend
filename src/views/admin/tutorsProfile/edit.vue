<template>
  <a-card title="CẬP NHẬT HỒ SƠ GIA SƯ" style="width: 100%">
    <div class="d-flex justify-content-center mb-4">
      <span class="fw-bold text-uppercase fs-4">{{ tutorProfile.name }}</span>
    </div>
    <form @submit.prevent="updateTutorProfile()">
      <div class="row">
        <div class="col-12 col-lg-4">
          <div class="row">
            <div class="col-12 d-flex justify-content-center mb-3">
              <a-avatar shape="square" :size="200">
                <template #icon>
                  <img :src="previewImage || fullAvatarUrl" alt="Avatar" />
                </template>
              </a-avatar>
            </div>
            <div class="col-12 d-flex justify-content-center">
              <a-upload
                name="avatar"
                :before-upload="beforeUpload"
                :show-upload-list="false"
                @change="handleChange"
              >
                <a-button>
                  <upload-outlined></upload-outlined>
                  Cập nhật ảnh đại diện
                </a-button>
              </a-upload>
            </div>
          </div>
        </div>

        <div class="col-12 col-lg-8">
          <!-- Gender -->
          <div class="row mb-3">
            <div class="col-12 col-md-3 text-start text-md-end">
              <label for="">
                <span class="text-danger">*</span>
                <span>Giới tính:</span>
              </label>
            </div>
            <div class="col-12 col-md-8">
              <a-radio-group v-model:value="tutorProfile.gender">
                <a-radio :value="'M'">Nam</a-radio>
                <a-radio :value="'F'">Nữ</a-radio>
              </a-radio-group>
              <div class="w-100"></div>
              <small v-if="errors.gender" class="text-danger">
                {{ errors.gender[0] }}
              </small>
            </div>
          </div>

          <!-- Birthday -->
          <div class="row mb-3">
            <div class="col-12 col-md-3 text-start text-md-end">
              <label for="">
                <span class="text-danger">*</span>
                <span>Ngày sinh:</span>
              </label>
            </div>
            <div class="col-12 col-md-8">
              <a-date-picker
                v-model:value="tutorProfile.birthday"
                format="YYYY-MM-DD"
                placeholder="Chọn ngày sinh"
              />
              <div class="w-100"></div>
              <small v-if="errors.birthday" class="text-danger">
                {{ errors.birthday[0] }}
              </small>
            </div>
          </div>

          <!-- Address -->
          <div class="row mb-3">
            <div class="col-12 col-md-3 text-start text-md-end">
              <label for="">
                <span class="text-danger">*</span>
                <span>Địa chỉ hiện tại:</span>
              </label>
            </div>
            <div class="col-12 col-md-8">
              <a-input v-model:value="tutorProfile.address" />
              <div class="w-100"></div>
              <small v-if="errors.address" class="text-danger">
                {{ errors.address[0] }}
              </small>
            </div>
          </div>

          <!-- Level -->
          <div class="row mb-3">
            <div class="col-12 col-md-3 text-start text-md-end">
              <label for="">
                <span class="text-danger">*</span>
                <span>Trình độ:</span>
              </label>
            </div>
            <div class="col-12 col-md-8">
              <a-select
                v-model:value="tutorProfile.level_id"
                show-search
                placeholder="--- Chọn trình độ ---"
                style="width: 100%"
                :options="_levels"
                :filter-option="filterOption"
              ></a-select>
              <div class="w-100"></div>
              <small v-if="errors.level_id" class="text-danger">
                {{ errors.level_id[0] }}
              </small>
            </div>
          </div>

          <!-- Major -->
          <div class="row mb-3">
            <div class="col-12 col-md-3 text-start text-md-end">
              <label for="">
                <span class="text-danger">*</span>
                <span>Chuyên ngành:</span>
              </label>
            </div>
            <div class="col-12 col-md-8">
              <a-input v-model:value="tutorProfile.major" />
              <div class="w-100"></div>
              <small v-if="errors.major" class="text-danger">
                {{ errors.major[0] }}
              </small>
            </div>
          </div>

          <!-- School -->
          <div class="row mb-3">
            <div class="col-12 col-md-3 text-start text-md-end">
              <label for="">
                <span class="text-danger">*</span>
                <span>Nơi công tác/học tập:</span>
              </label>
            </div>
            <div class="col-12 col-md-8">
              <a-input v-model:value="tutorProfile.school" />
              <div class="w-100"></div>
              <small v-if="errors.school" class="text-danger">
                {{ errors.school[0] }}
              </small>
            </div>
          </div>

          <!-- Districts -->
          <div class="row mb-3">
            <div class="col-12 col-md-3 text-start text-md-end">
              <label for="">
                <span class="text-danger">*</span>
                <span>Khu vực dạy:</span>
              </label>
            </div>
            <div class="col-12 col-md-8">
              <a-checkbox-group
                v-model:value="tutorProfile.districts"
                style="width: 100%"
              >
                <a-row>
                  <a-col
                    v-for="district in _districts"
                    :key="district.id"
                    :span="12"
                  >
                    <a-checkbox :value="district.id">
                      {{ district.name }}
                    </a-checkbox>
                  </a-col>
                </a-row>
              </a-checkbox-group>
              <div class="w-100"></div>
              <small v-if="errors.districts" class="text-danger">
                {{ errors.districts[0] }}
              </small>
            </div>
          </div>

          <!-- Subjects -->
          <div class="row mb-3">
            <div class="col-12 col-md-3 text-start text-md-end">
              <label for="">
                <span class="text-danger">*</span>
                <span>Môn dạy:</span>
              </label>
            </div>
            <div class="col-12 col-md-8">
              <a-checkbox-group
                v-model:value="tutorProfile.subjects"
                style="width: 100%"
              >
                <a-row>
                  <a-col
                    v-for="subject in _subjects"
                    :key="subject.id"
                    :span="12"
                  >
                    <a-checkbox :value="subject.id">
                      {{ subject.name }}
                    </a-checkbox>
                  </a-col>
                </a-row>
              </a-checkbox-group>
              <div class="w-100"></div>
              <small v-if="errors.subjects" class="text-danger">
                {{ errors.subjects[0] }}
              </small>
            </div>
          </div>

          <!-- Grades -->
          <div class="row mb-3">
            <div class="col-12 col-md-3 text-start text-md-end">
              <label for="">
                <span class="text-danger">*</span>
                <span>Khối lớp dạy:</span>
              </label>
            </div>
            <div class="col-12 col-md-8">
              <a-checkbox-group
                v-model:value="tutorProfile.grades"
                style="width: 100%"
              >
                <a-row>
                  <a-col v-for="grade in _grades" :key="grade.id" :span="12">
                    <a-checkbox :value="grade.id">
                      {{ grade.name }}
                    </a-checkbox>
                  </a-col>
                </a-row>
              </a-checkbox-group>
              <div class="w-100"></div>
              <small v-if="errors.grades" class="text-danger">
                {{ errors.grades[0] }}
              </small>
            </div>
          </div>

          <!-- Experiences -->
          <div class="row mb-3">
            <div class="col-12 col-md-3 text-start text-md-end">
              <label for="">
                <!-- <span class="text-danger">*</span> -->
                <span>Kinh nghiệm:</span>
              </label>
            </div>
            <div class="col-12 col-md-8">
              <!-- <a-input v-model:value="tutorProfile.school" /> -->
              <a-textarea
                v-model:value="tutorProfile.experiences"
                placeholder=""
                :rows="4"
              />
              <div class="w-100"></div>
              <small v-if="errors.experiences" class="text-danger">
                {{ errors.experiences[0] }}
              </small>
            </div>
          </div>

          <!-- Tuition -->
          <div class="row mb-3">
            <div class="col-12 col-md-3 text-start text-md-end">
              <label for="">
                <span class="text-danger">*</span>
                <span>Học phí/buổi:</span>
              </label>
            </div>
            <div class="col-12 col-md-8">
              <a-select
                v-model:value="tutorProfile.tuition_id"
                show-search
                placeholder="--- Chọn học phí/buổi ---"
                style="width: 100%"
                :options="_tuitions"
                :filter-option="filterOption"
              ></a-select>
              <div class="w-100"></div>
              <small v-if="errors.tuition_id" class="text-danger">
                {{ errors.tuition_id[0] }}
              </small>
            </div>
          </div>

          <div class="row mt-1">
            <div class="col-12 d-grid d-sm-flex justify-content-sm-end mx-auto">
              <a-button class="me-sm-2 mb-2">
                <router-link :to="{ name: 'admin.tutors.profile' }">
                  <span>Trở về</span>
                </router-link>
              </a-button>
              <a-button type="primary" html-type="submit">
                <span>Lưu</span>
              </a-button>
            </div>
          </div>
        </div>
      </div>
    </form>
  </a-card>
</template>
<script setup>
import { ref, reactive, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { useMenuAdmin } from "@/stores/use-menu-admin";
import TutorService from "@/services/tutor.service";
import DistrictService from "@/services/district.service";
import SubjectsService from "@/services/subject.service";
import GradesService from "@/services/grade.service";
import LevelService from "@/services/level.service";
import TuitionService from "@/services/tuition.service";
import message from "ant-design-vue/es/message";
import dayjs from "dayjs";

useMenuAdmin().onSelectedKeys(["admin-tutors-profile"]);

const router = useRouter();
const route = useRoute();
const dateFormat = "YYYY-MM-DD";
const tutorProfile = reactive({
  name: "",
  gender: "",
  birthday: "",
  address: "",
  level_id: "",
  major: "",
  school: "",
  avatar: "",
  subjects: [],
  grades: [],
  districts: [],
  experiences: "",
  tuition_id: "",
});
const _districts = ref([]);
const _subjects = ref([]);
const _grades = ref([]);
const _levels = ref([]);
const _tuitions = ref([]);

const errors = ref({});

// Host của backend
const backendHost = "http://127.0.0.1:8000";
const fullAvatarUrl = computed(() => {
  if (!tutorProfile.avatar) {
    return null;
  }
  return `${backendHost}/storage/${tutorProfile.avatar}`;
});

const getTutorProfile = async () => {
  try {
    const id = route.params.id;
    const result = await TutorService.show(id);
    const dataProfile = result.data;
    // console.log(dataProfile);
    tutorProfile.name = dataProfile.user.name;
    tutorProfile.gender = dataProfile.gender ?? null;
    tutorProfile.birthday = ref(dayjs(dataProfile.birthday, dateFormat));
    tutorProfile.address = dataProfile.address ?? null;
    tutorProfile.level_id = dataProfile?.level?.id ?? null;
    tutorProfile.major = dataProfile.major ?? null;
    tutorProfile.school = dataProfile.school ?? null;
    tutorProfile.avatar = dataProfile.avatar ?? null;
    tutorProfile.subjects = Array.isArray(dataProfile.subjects)
      ? dataProfile.subjects.map((subject) => subject.id)
      : [];
    tutorProfile.grades = Array.isArray(dataProfile.grades)
      ? dataProfile.grades.map((grade) => grade.id)
      : [];
    tutorProfile.districts = Array.isArray(dataProfile.districts)
      ? dataProfile.districts.map((district) => district.id)
      : [];
    tutorProfile.experiences = dataProfile.experiences ?? null;
    tutorProfile.tuition_id = dataProfile?.tuition?.id ?? null;
    // console.log(tutorProfile);
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

const getDistricts = async () => {
  try {
    const response = await DistrictService.index();
    _districts.value = response.data;
  } catch (error) {
    console.log(error);
  }
};
const getSubjects = async () => {
  try {
    const response = await SubjectsService.index();
    _subjects.value = response.data;
  } catch (error) {
    console.log(error);
  }
};
const getGrades = async () => {
  try {
    const response = await GradesService.index();
    _grades.value = response.data;
  } catch (error) {
    console.log(error);
  }
};
const getLevels = async () => {
  try {
    const response = await LevelService.index();
    _levels.value = response.data;
  } catch (error) {
    console.log(error);
  }
};
const getTuitions = async () => {
  try {
    const response = await TuitionService.index();
    _tuitions.value = response.data;
  } catch (error) {
    console.log(error);
  }
};

const filterOption = (input, option) => {
  return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};

const beforeUpload = (file) => {
  const isImage = file.type.startsWith("image/");
  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isImage) {
    message.error("Bạn chỉ có thể tải lên tệp ảnh!");
  }
  if (!isLt2M) {
    message.error("Ảnh phải nhỏ hơn 2MB!");
  }

  return isImage && isLt2M;
};
const previewImage = ref("");
const handleChange = (info) => {
  const file = info.file.originFileObj;
  if (file && beforeUpload(file)) {
    const reader = new FileReader();
    reader.onload = (e) => {
      previewImage.value = e.target.result;
      tutorProfile.avatar = file;
    };
    reader.readAsDataURL(file);
  }
};

const updateTutorProfile = async () => {
  try {
    const id = route.params.id;

    // Tạo FormData
    const formData = new FormData();

    // Thêm các trường vào FormData
    Object.entries(tutorProfile).forEach(([key, value]) => {
      if (key === "avatar" && value instanceof File) {
        formData.append(key, value); // Thêm ảnh
      } else if (key === "birthday") {
        formData.append(
          key,
          value ? dayjs(value).format("YYYY-MM-DD") : null // Format ngày
        );
      } else if (
        key === "districts" ||
        key === "grades" ||
        key === "subjects"
      ) {
        value?.forEach((item) => {
          formData.append(key + "[]", item); // Thêm mỗi phần tử trong mảng
        });
      } else {
        formData.append(key, value); // Thêm các trường khác
      }
    });

    formData.append("_method", "PATCH");

    console.log(formData);

    const result = await TutorService.update(id, formData);

    if (result.success) {
      message.success("Cập nhật hồ sơ gia sư thành công");
      router.push({ name: "admin.tutors.profile" });
    }
  } catch (error) {
    console.error(error);
    errors.value = error.response?.data?.errors || {};
  }
};

onMounted(() => {
  getDistricts(); // Lấy danh sách districts
  getSubjects(); // Lấy danh sách subjects
  getGrades(); // Lấy danh sách subjects
  getLevels(); // Lấy danh sách levels
  getTuitions(); // Lấy danh sách tuitions
  getTutorProfile(); // Lấy thông tin tutor profile
});
</script>
