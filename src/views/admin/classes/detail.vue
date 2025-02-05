<template>
  <a-card title="THÔNG TIN LỚP HỌC" style="width: 100%">
    <div class="row">
      <div class="col-12 col-lg-7 col-xxl-6">
        <h2 class="fw-bold">Mã lớp: {{ class2.id }}</h2>
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
      <div class="col-12 col-lg-5 col-xxl-6">
        <h3 class="fw-bold mt-4">Thông tin phụ huynh</h3>
        <div>
          <span class="fw-bold">Phụ huynh: </span>
          <span>{{ class2.parent.name }}</span>
        </div>
        <div>
          <span class="fw-bold">SĐT liên hệ: </span>
          <span>{{ class2.parent.phone }}</span>
        </div>
        <span v-if="class2.status == 1">
          <h3 class="fw-bold mt-4">Thông tin gia sư nhận lớp</h3>
          <div>
            <span class="fw-bold">Gia sư: </span>
            <span>{{ class2.tutor.name }}</span>
          </div>
          <div>
            <span class="fw-bold">SĐT liên hệ: </span>
            <span>{{ class2.tutor.phone }}</span>
          </div>
        </span>
      </div>
    </div>

    <div class="row mt-3">
      <div class="col-12 d-grid d-sm-flex justify-content-sm-end mx-auto">
        <a-button class="me-sm-2 mb-2">
          <router-link :to="{ name: 'admin.classes' }">
            <span>Trở về</span>
          </router-link>
        </a-button>
      </div>
    </div>
  </a-card>
</template>
<script setup>
import { ref, reactive, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { useMenuAdmin } from "@/stores/use-menu-admin";
import ClassService from "@/services/class.service";

useMenuAdmin().onSelectedKeys(["admin-classes"]);

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
  class_times: [],
  level: "",
  gender_tutor: "",
  request: "",
  status: "",
});
const status = ref(0);

const getClass = async () => {
  try {
    const id = route.params.id;

    const result = await ClassService.show(id);

    const dataClass = result.data;
    console.log(dataClass);

    class2.id = id;
    class2.parent = dataClass.parent?.user ?? "";
    class2.tutor = dataClass.tutor?.user ?? "";
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
    class2.class_times = dataClass.class_times ?? "";
    class2.gender_tutor = dataClass.gender_tutor ?? "";
    class2.level = dataClass.level?.name ?? "";
    class2.request = dataClass.request ?? "";
    class2.status = dataClass.status ?? "";

    console.log(class2);
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

onMounted(() => {
  getClass();
});
</script>
