<template>
  <a-card title="THÊM MỚI LỚP HỌC" style="width: 100%">
    <div class="row">
      <div class="col-12 col-lg-7">
        <h5 class="">Thông tin lớp học</h5>
        <!-- Subjects -->
        <div class="row mb-3">
          <div class="col-12 col-md-3 text-start text-md-end">
            <label for="">
              <span class="text-danger">*</span>
              <span>Môn học:</span>
            </label>
          </div>
          <div class="col-12 col-md-8">
            <a-checkbox-group
              v-model:value="class1.subjects"
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
        <!-- Grade -->
        <div class="row mb-3">
          <div class="col-12 col-md-3 text-start text-md-end">
            <label for="">
              <span class="text-danger">*</span>
              <span>Khối lớp:</span>
            </label>
          </div>
          <div class="col-12 col-md-8">
            <a-select
              v-model:value="class1.grade_id"
              show-search
              placeholder="--- Chọn khối lớp ---"
              style="width: 100%"
              :options="_grades"
              :filter-option="filterOption"
            ></a-select>
            <div class="w-100"></div>
            <small v-if="errors.grade_id" class="text-danger">
              {{ errors.grade_id[0] }}
            </small>
          </div>
        </div>
        <!-- Num of students -->
        <div class="row mb-3">
          <div class="col-12 col-md-3 text-start text-md-end">
            <label for="">
              <span class="text-danger">*</span>
              <span>Số người học:</span>
            </label>
          </div>
          <div class="col-12 col-md-8">
            <a-radio-group v-model:value="class1.num_of_students">
              <a-radio :value="'1'">1</a-radio>
              <a-radio :value="'2'">2</a-radio>
              <a-radio :value="'3'">3</a-radio>
              <a-radio :value="'4'">4</a-radio>
              <a-radio :value="'5'">5</a-radio>
            </a-radio-group>
            <div class="w-100"></div>
            <small v-if="errors.num_of_students" class="text-danger">
              {{ errors.num_of_students[0] }}
            </small>
          </div>
        </div>
        <!-- Times -->
        <div class="row mb-3">
          <div class="col-12 col-md-3 text-start text-md-end">
            <label for="">
              <span class="text-danger">*</span>
              <span>Thời gian học:</span>
            </label>
          </div>
          <div class="col-12 col-md-8">
            <TheClassTimePicker v-model="class1.times"></TheClassTimePicker>
            <div class="w-100"></div>
            <small v-if="errors.times" class="text-danger">
              {{ errors.times[0] }}
            </small>
          </div>
        </div>
      </div>
      <div class="col-12 col-lg-5">
        <h5 class="">Thông tin liên lạc</h5>
        <!-- Parent -->
        <div class="row mb-3">
          <div class="col-12 col-md-3 text-start text-md-end">
            <label for="">
              <span class="text-danger">*</span>
              <span>Phụ huynh:</span>
            </label>
          </div>
          <div class="col-12 col-md-8">
            <a-select
              v-model:value="class1.parent_id"
              show-search
              placeholder="--- Chọn phụ huynh ---"
              style="width: 100%"
              :options="_parents"
              :filter-option="filterOption"
            ></a-select>
            <div class="w-100"></div>
            <small v-if="errors.parent_id" class="text-danger">
              {{ errors.parent_id[0] }}
            </small>
          </div>
        </div>
        <!-- Address (deatail, ward_id, district_id) -->
        <div class="row mb-3">
          <div class="col-12 col-md-3 text-start text-md-end">
            <label for="">
              <span class="text-danger">*</span>
              <span>Địa chỉ:</span>
            </label>
          </div>
          <div class="col-12 col-md-8">
            <!-- Quận/Huyện -->
            <a-select
              v-model:value="class1.district_id"
              class="mt-0"
              show-search
              placeholder="--- Chọn Quận/huyện ---"
              style="width: 100%"
              :options="_districts"
              :filter-option="filterOption"
              @change="getWards"
            ></a-select>
            <small v-if="errors.district_id" class="text-danger">
              {{ errors.district_id[0] }}
            </small>
            <!-- Phường/Xã -->
            <a-select
              v-model:value="class1.ward_id"
              class="mt-2"
              show-search
              placeholder="--- Chọn Phường/Xã ---"
              style="width: 100%"
              :options="_wards"
              :filter-option="filterOption"
            ></a-select>
            <div class="w-100"></div>
            <small v-if="errors.ward_id" class="text-danger">
              {{ errors.ward_id[0] }}
            </small>
            <!-- Số nhà, tên đường -->
            <a-input
              class="mt-2"
              v-model:value="class1.detail"
              placeholder="Số nhà, tên đường"
            />
            <div class="w-100"></div>
            <small v-if="errors.detail" class="text-danger">
              {{ errors.detail[0] }}
            </small>
          </div>
        </div>

        <!-- Start date -->
        <div class="row mb-3">
          <div class="col-12 col-md-3 text-start text-md-end">
            <label for="">
              <span class="text-danger">*</span>
              <span>Ngày dự kiến bắt đầu:</span>
            </label>
          </div>
          <div class="col-12 col-md-8">
            <a-date-picker
              v-model:value="class1.start_date"
              :disabled-date="disabledStartDate"
              format="YYYY-MM-DD"
              placeholder="Chọn ngày bắt đầu"
            />
            <div class="w-100"></div>
            <small v-if="errors.start_date" class="text-danger">
              {{ errors.start_date[0] }}
            </small>
          </div>
        </div>

        <h5 class="">Yêu cầu gia sư</h5>
        <!-- Tuition -->
        <div class="row mb-3">
          <div class="col-12 col-md-3 text-start text-md-end">
            <label for="">
              <span class="text-danger">*</span>
              <span>Học phí /buổi:</span>
            </label>
          </div>
          <div class="col-12 col-md-8">
            <!-- <a-radio-group v-model:value="class1.tuition"> </a-radio-group> -->
            <a-radio-group v-model:value="selectedTuitionType">
              <a-radio value="negotiable">Thỏa thuận</a-radio>
              <a-radio value="fixed">Học phí cố định</a-radio>
            </a-radio-group>

            <!-- Input học phí chỉ hiện khi chọn "Học phí cố định" -->
            <div v-if="selectedTuitionType === 'fixed'" class="mt-2">
              <a-input-number
                v-model:value="fixedTuitionAmount"
                :min="50000"
                :max="1000000"
                :step="5000"
                placeholder="Nhập học phí"
                @change="handleTuitionChange"
              />
              <span class="ms-2">VNĐ/buổi</span>
            </div>

            <div class="w-100"></div>
            <small v-if="errors.tuition" class="text-danger">
              {{ errors.tuition[0] }}
            </small>
          </div>
        </div>
        <!-- Gender -->
        <div class="row mb-3">
          <div class="col-12 col-md-3 text-start text-md-end">
            <label for="">
              <span>Giới tính GS:</span>
            </label>
          </div>
          <div class="col-12 col-md-8">
            <a-radio-group v-model:value="class1.gender">
              <a-radio :value="'M'">Nam</a-radio>
              <a-radio :value="'F'">Nữ</a-radio>
            </a-radio-group>
            <div class="w-100"></div>
            <small v-if="errors.gender" class="text-danger">
              {{ errors.gender[0] }}
            </small>
          </div>
        </div>
        <!-- Level -->
        <div class="row mb-3">
          <div class="col-12 col-md-3 text-start text-md-end">
            <label for="">
              <span>Trình độ GS:</span>
            </label>
          </div>
          <div class="col-12 col-md-8">
            <a-select
              v-model:value="class1.level_id"
              show-search
              placeholder="--- Chọn trình độ GS ---"
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
        <!-- Request -->
        <div class="row mb-3">
          <div class="col-12 col-md-3 text-start text-md-end">
            <label for="">
              <span>Yêu cầu khác:</span>
            </label>
          </div>
          <div class="col-12 col-md-8">
            <a-textarea
              v-model:value="class1.request"
              placeholder=""
              :rows="2"
            />
            <div class="w-100"></div>
            <small v-if="errors.request" class="text-danger">
              {{ errors.request[0] }}
            </small>
          </div>
        </div>
        <hr />
        <!-- Search tutors to choose for class -->
        <div class="row">
          <a-form-item>
            <a-button type="primary" @click="searchTutors" :loading="loading">
              <span class="button-with-icon">
                <BulbFilled class="me-1" />
                Gợi ý gia sư phù hợp
              </span>
            </a-button>
          </a-form-item>
          <!-- Danh sách gia sư -->
          <div v-if="tutors.length > 0" class="tutor-list">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h5>Gia sư phù hợp ({{ tutors.length }})</h5>
              <span class="text-muted"
                >Đã chọn: {{ class1.tutors.length }}</span
              >
            </div>
            <div>
              <a-checkbox-group v-model:value="class1.tutors" class="w-100">
                <div class="row" style="height: 300px; overflow-y: auto">
                  <div
                    class="col-12 mb-3"
                    v-for="tutor in tutors"
                    :key="tutor.id"
                  >
                    <a-card hoverable class="tutor-card position-relative">
                      <a-checkbox
                        :value="tutor.id"
                        class="tutor-select position-absolute"
                        style="top: 10px; right: 10px"
                      ></a-checkbox>
                      <div class="d-flex">
                        <div class="tutor-avatar me-3">
                          <!-- Display avatar if available, otherwise show initials -->
                          <img
                            v-if="tutor.avatar"
                            :src="getAvatarUrl(tutor.avatar)"
                            class="rounded-circle"
                            style="width: 50px; height: 50px; object-fit: cover"
                            :alt="tutor.user.name"
                          />
                          <div
                            v-else
                            class="rounded-circle bg-secondary text-white d-flex justify-content-center align-items-center"
                            style="width: 50px; height: 50px; font-size: 18px"
                          >
                            {{ tutor.user.name.charAt(0) }}
                          </div>
                        </div>
                        <div class="tutor-info w-100">
                          <a-popover
                            :title="tutor.user.name"
                            trigger="hover"
                            placement="top"
                          >
                            <template #content>
                              <p>
                                <strong>Trình độ:</strong>
                                {{ tutor.level.name }}
                              </p>
                              <p>
                                <strong>Chuyên ngành:</strong>
                                {{ tutor.major }} - {{ tutor.school }}
                              </p>
                              <p>
                                <strong>Môn dạy:</strong>
                                {{
                                  tutor.subjects.map((s) => s.name).join(", ")
                                }}
                              </p>
                              <p>
                                <strong>Khối lớp dạy:</strong>
                                {{ tutor.grades.map((s) => s.name).join(", ") }}
                              </p>
                              <p>
                                <strong>Mức lương/buổi:</strong>
                                {{ tutor.tuition.range }}
                              </p>
                            </template>
                            <div>
                              <h6 class="mb-1">{{ tutor.user.name }}</h6>
                              <p class="text-muted mb-1">MS: {{ tutor.id }}</p>
                            </div>
                          </a-popover>
                        </div>
                      </div>
                    </a-card>
                  </div>
                </div>
              </a-checkbox-group>
            </div>
          </div>

          <div v-else-if="searched" class="alert alert-info">
            Không tìm thấy gia sư phù hợp với tiêu chí của bạn.
          </div>
        </div>
      </div>

      <!-- Action -->
      <div class="row mt-5">
        <div class="col-12 d-grid d-sm-flex justify-content-sm-end mx-auto">
          <router-link :to="{ name: 'admin.classes' }">
            <a-button class="me-sm-2 mb-2">
              <span> Trở về </span>
            </a-button>
          </router-link>
          <a-button type="primary" html-type="submit" @click="createClass">
            <span class="button-with-icon">
              <SaveFilled class="me-1" />
              Lưu
            </span>
          </a-button>
        </div>
      </div>
    </div>
  </a-card>
</template>
<script setup>
import { watch, ref, reactive, toRefs, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useMenuAdmin } from "@/stores/use-menu-admin";
import { TimePicker } from "ant-design-vue";
import dayjs from "dayjs";
import TheClassTimePicker from "@/components/admin/TheClassTimePicker.vue";
import ClassService from "@/services/class.service";
import DistrictService from "@/services/district.service";
import SubjectsService from "@/services/subject.service";
import GradesService from "@/services/grade.service";
import LevelService from "@/services/level.service";
import message from "ant-design-vue/es/message";
import ParentService from "@/services/parent.service";
import TutorService from "@/services/tutor.service";
import WardService from "@/services/ward.service";
import { BulbFilled, SaveFilled } from "@ant-design/icons-vue";

useMenuAdmin().onSelectedKeys(["admin-classes"]);

const router = useRouter();
const class1 = reactive({
  parent_id: null,
  tutor_id: null,
  num_of_students: null,
  num_of_sessions: null,
  grade_id: null,
  detail: null,
  ward_id: null,
  district_id: null,
  subjects: [],
  tuition: null,
  start_date: null,
  end_date: null,
  level_id: null,
  gender_tutor: null,
  request: null,
  times: [],
  status: null,
});
const _parents = ref([]);
const _districts = ref([]);
const _wards = ref([]);
const _subjects = ref([]);
const _grades = ref([]);
const _levels = ref([]);

const errors = ref({});

const createClass = async () => {
  try {
    // console.log(class1.tuition);
    console.log(JSON.stringify(class1, null, 2));
    // console.log(JSON.stringify(class1.times, null, 2));
    // console.log(JSON.stringify(class1.tuition, null, 2));
    const result = await ClassService.store(class1);
    console.log(result);
    if (result.success) {
      message.success("Thêm mới lớp học thành công");
      router.push({ name: "admin.classes" });
    }
  } catch (error) {
    console.log(error);
    errors.value = error.response.data.errors;
  }
};
const getParents = async () => {
  try {
    const response = await ParentService.getAll();
    _parents.value = response.data;
  } catch (error) {
    console.log(error);
  }
};
const getDistricts = async () => {
  try {
    const response = await DistrictService.index();
    _districts.value = response.data.map((item) => ({
      value: item.id,
      label: item.name,
    }));
  } catch (error) {
    console.log(error);
  }
};
const getWards = async (district_id) => {
  try {
    const response = await WardService.getAllBelongToDistrict(district_id);
    _wards.value = response.data.map((item) => ({
      value: item.id,
      label: item.name,
    }));
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
    _grades.value = response.data.map((item) => ({
      value: item.id,
      label: item.name,
    }));
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

const filterOption = (input, option) => {
  return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};

// TUITION
// Biến để kiểm soát loại học phí được chọn
const selectedTuitionType = ref("");
// Biến để lưu giá trị học phí cố định
const fixedTuitionAmount = ref(null);
// Theo dõi thay đổi của selectedTuitionType
watch(selectedTuitionType, (newValue) => {
  if (newValue === "negotiable") {
    class1.tuition = "Thỏa thuận";
  } else {
    // Khi chuyển sang fixed, set giá trị từ fixedTuitionAmount nếu có
    class1.tuition = fixedTuitionAmount.value?.toString() || "";
  }
});
// Xử lý khi thay đổi giá trị học phí cố định
const handleTuitionChange = (value) => {
  class1.tuition = value?.toString() || "";
};

// ADDRESS
// Watch district_id: Khi thay đổi, xóa ward_id và cập nhật danh sách ward mới
watch(
  () => class1.district_id, // Theo dõi sự thay đổi của district_id
  async (newDistrict) => {
    class1.ward_id = null; // Xóa ward đã chọn trước đó
    _wards.value = []; // Xóa danh sách wards cũ
    if (newDistrict) {
      await getWards(newDistrict);
    }
  },
  { immediate: true }
); // `immediate: true` giúp gọi ngay khi component mounted

// Hàm chặn các ngày bắt đầu lớp học không hợp lệ
const disabledStartDate = (current) => {
  // Không cho chọn các ngày trước 2 ngày kể từ hôm nay
  return current && current.isBefore(dayjs().add(2, "day").startOf("day"));
};

// Tìm kiếm gia sư để chọn gia sư cho lớp học
const tutors = ref([]);
const loading = ref(false);
const searched = ref(false);
const searchTutors = async () => {
  loading.value = true;
  class1.tutors = []; // Reset selected tutors when searching again

  try {
    const searchData = {
      district_id: class1.district_id,
      subjects: class1.subjects,
      grade_id: class1.grade_id,
      level_id: class1.level_id,
      gender: class1.gender,
    };
    console.log(searchData);

    const response = await TutorService.getAvailableTutors(searchData);
    console.log(response);

    tutors.value = response.data;
    console.log(tutors.value);
    searched.value = true;
  } catch (error) {
    console.error("Lỗi khi tìm kiếm gia sư:", error);
    message.error("Không thể tìm kiếm gia sư, vui lòng thử lại sau");
  } finally {
    loading.value = false;
  }
};

const baseStorageUrl = "http://127.0.0.1:8000/storage/";
// Function to generate full avatar URL
const getAvatarUrl = (avatarPath) => {
  if (!avatarPath) return null;

  // If the avatar path already includes the base URL, return it as is
  if (avatarPath.startsWith("http")) {
    return avatarPath;
  }

  // Otherwise, prepend the storage URL
  return `${baseStorageUrl}${avatarPath}`;
};

onMounted(() => {
  getParents();
  getDistricts();
  getSubjects();
  getGrades();
  getLevels();
});
</script>
