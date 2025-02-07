<template>
  <a-card title="CẬP NHẬT THÔNG TIN LỚP HỌC" style="width: 100%">
    <div class="row">
      <div class="col-12 col-lg-5">
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
              allowClear
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
        <!-- Tuition -->
        <div class="row mb-3">
          <div class="col-12 col-md-3 text-start text-md-end">
            <label for="">
              <span class="text-danger">*</span>
              <span>Học phí/buổi:</span>
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
              :rows="4"
            />
            <div class="w-100"></div>
            <small v-if="errors.request" class="text-danger">
              {{ errors.request[0] }}
            </small>
          </div>
        </div>
      </div>

      <div class="col-12 col-lg-7">
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

        <!-- Action -->
        <div class="row mt-1">
          <div class="col-12 d-grid d-sm-flex justify-content-sm-end mx-auto">
            <a-button class="me-sm-2 mb-2">
              <router-link :to="{ name: 'admin.classes' }">
                <span>Trở về</span>
              </router-link>
            </a-button>
            <a-button type="primary" html-type="submit" @click="updateClass">
              <span>Lưu</span>
            </a-button>
          </div>
        </div>
      </div>
    </div>
  </a-card>
</template>
<script setup>
import { watch, ref, reactive, toRefs, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
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
import WardService from "@/services/ward.service";

useMenuAdmin().onSelectedKeys(["admin-classes"]);

const router = useRouter();
const route = useRoute();
const class1 = reactive({
  parent_id: null,
  tutor_id: null,
  num_of_students: null,
  grade_id: null,
  detail: null,
  ward_id: null,
  district_id: null,
  subjects: [],
  tuition: null,
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

const getClass = async () => {
  try {
    const id = route.params.id;
    const result = await ClassService.show(id);
    const dataClass = result.data;
    // console.log(dataClass);
    class1.parent_id = dataClass.parent_id ?? null;
    class1.tutor_id = dataClass.tutor_id ?? null;
    class1.num_of_students = dataClass.num_of_students ?? null;
    class1.grade_id = dataClass.grade_id ?? null;
    class1.detail = dataClass.address?.detail ?? null;
    class1.ward_id = dataClass.address?.ward_id ?? null;
    class1.district_id = dataClass.address?.ward?.district_id ?? null;
    class1.subjects = Array.isArray(dataClass.subjects)
      ? dataClass.subjects.map((subject) => subject.id)
      : [];
    class1.tuition = dataClass.tuition ?? null;
    class1.level_id = dataClass.level_id ?? null;
    class1.gender_tutor = dataClass.gender_tutor ?? null;
    class1.request = dataClass.request ?? null;
    class1.times = dataClass.class_times;
    class1.status = dataClass.status ?? null;
    console.log(class1);
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

const updateClass = async () => {
  try {
    console.log(JSON.stringify(class1, null, 2));
    const id = route.params.id;
    const result = await ClassService.update(id, class1);
    if (result.success) {
      message.success("Cập nhật lớp học thành công");
      router.push({ name: "admin.classes" });
    }
  } catch (error) {
    console.error(error);
    errors.value = error.response?.data?.errors || {};
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
// Theo dõi thay đổi của `class1.tuition` để cập nhật radio button phù hợp
watch(
  () => class1.tuition,
  (newValue) => {
    if (newValue === "Thỏa thuận") {
      selectedTuitionType.value = "negotiable";
      fixedTuitionAmount.value = null; // Xóa giá trị học phí cố định
    } else if (!isNaN(newValue) && Number(newValue) > 0) {
      selectedTuitionType.value = "fixed";
      fixedTuitionAmount.value = Number(newValue); // Gán số tiền học phí
    } else {
      selectedTuitionType.value = ""; // Không chọn radio nào nếu giá trị không hợp lệ
      fixedTuitionAmount.value = null;
    }
  },
  { immediate: true } // Gọi ngay khi component mounted
);
// Theo dõi thay đổi của selectedTuitionType
watch(selectedTuitionType, (newValue) => {
  if (newValue === "negotiable") {
    class1.tuition = "Thỏa thuận";
  } else {
    // Khi chuyển sang fixed, set giá trị từ fixedTuitionAmount nếu có
    class1.tuition = fixedTuitionAmount.value?.toString() || "";
  }
});
const handleTuitionChange = (value) => {
  fixedTuitionAmount.value = value;
  class1.tuition = value?.toString() || "";
};

// ADDRESS
// Watch district_id: Khi thay đổi, xóa ward_id và cập nhật danh sách ward mới
watch(
  () => class1.district_id, // Theo dõi sự thay đổi của district_id
  async (newDistrict) => {
    // class1.ward_id = null; // Xóa ward đã chọn trước đó
    _wards.value = []; // Xóa danh sách wards cũ
    if (newDistrict) {
      await getWards(newDistrict);
    }
  },
  { immediate: true }
); // `immediate: true` giúp gọi ngay khi component mounted

onMounted(() => {
  getClass();
  getParents();
  getDistricts();
  getSubjects();
  getGrades();
  getLevels();
});
</script>
