<script setup>
import { ref, computed } from "vue";
import { TimePicker } from "ant-design-vue";
import dayjs from "dayjs";

const props = defineProps({
  modelValue: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

// Định nghĩa các ngày trong tuần
const weekDays = [
  { id: 2, name: "Thứ 2" },
  { id: 3, name: "Thứ 3" },
  { id: 4, name: "Thứ 4" },
  { id: 5, name: "Thứ 5" },
  { id: 6, name: "Thứ 6" },
  { id: 7, name: "Thứ 7" },
  { id: 8, name: "Chủ nhật" },
];

// Biến lưu trữ kết quả tạm thời
const times = ref([]);

// Hàm xử lý khi chọn/bỏ chọn ngày
const handleDayToggle = (dayId) => {
  const dayName = weekDays.find((d) => d.id === dayId)?.name || "";

  // Lọc ra tất cả các time slots của ngày này
  const isSelected = times.value.some((t) => t.day === dayName);

  if (!isSelected) {
    // Thêm một time slot mới nếu chưa có
    times.value.push({
      day: dayName,
      start: null,
      end: null,
    });
  } else {
    // Xóa tất cả time slots của ngày này
    times.value = times.value.filter((t) => t.day !== dayName);
  }
  updateModelValue();
};

// Hàm xử lý khi chọn giờ bắt đầu
const handleTimeChange = (time, dayId) => {
  const dayName = weekDays.find((d) => d.id === dayId)?.name;
  const timeSlot = times.value.find((t) => t.day === dayName);

  if (timeSlot && time) {
    // Format thời gian theo yêu cầu HH:mm:ss
    const startTime = dayjs(time).format("HH:mm:ss");
    const endTime = dayjs(time).add(1.5, "hour").format("HH:mm:ss");

    timeSlot.start = startTime;
    timeSlot.end = endTime;

    updateModelValue();
  }
};

// Cập nhật giá trị cho v-model
const updateModelValue = () => {
  // Chỉ emit những time slot đã có đủ thông tin
  const validTimes = times.value.filter((t) => t.start && t.end);
  emit("update:modelValue", validTimes);
};

// Hàm kiểm tra ngày đã chọn
const isDaySelected = (dayId) => {
  const dayName = weekDays.find((d) => d.id === dayId)?.name;
  return times.value.some((t) => t.day === dayName);
};

// Hàm lấy giờ bắt đầu của một ngày
const getTimeValue = (dayId) => {
  const dayName = weekDays.find((d) => d.id === dayId)?.name;
  const timeSlot = times.value.find((t) => t.day === dayName);
  return timeSlot?.start ? dayjs(timeSlot.start, "HH:mm:ss") : null;
};

// Lọc ra các time slots hợp lệ cho hiển thị
const validTimesForDisplay = computed(() => {
  return times.value.filter(
    (time, index, self) =>
      // Chỉ giữ lại một time slot cho mỗi ngày
      self.findIndex((t) => t.day === time.day) === index
  );
});
</script>

<template>
  <div class="schedule-picker">
    <!-- Hiển thị các ngày trong tuần -->
    <div class="days-container my-1">
      <div v-for="day in weekDays" :key="day.id" class="day-item">
        <div class="form-check">
          <input
            type="checkbox"
            class="form-check-input me-1"
            :id="'day-' + day.id"
            :checked="isDaySelected(day.id)"
            @change="handleDayToggle(day.id)"
          />
          <label class="form-check-label" :for="'day-' + day.id">
            {{ day.name }}
          </label>
        </div>

        <!-- Time picker chỉ hiện khi ngày được chọn -->
        <a-time-picker
          v-if="isDaySelected(day.id)"
          :value="getTimeValue(day.id)"
          format="HH:mm"
          placeholder="Chọn giờ bắt đầu"
          class="mt-2"
          @change="(time) => handleTimeChange(time, day.id)"
        />
      </div>
    </div>

    <!-- Hiển thị kết quả đã chọn -->
    <div v-if="validTimesForDisplay.length > 0" class="selected-times mt-4">
      <h4>Lịch học đã chọn:</h4>
      <ul class="list-unstyled">
        <li v-for="time in validTimesForDisplay" :key="time.day">
          {{ time.day }}:
          {{
            time.start ? dayjs(time.start, "HH:mm:ss").format("HH:mm") : "--:--"
          }}
          -
          {{ time.end ? dayjs(time.end, "HH:mm:ss").format("HH:mm") : "--:--" }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.schedule-picker {
  max-width: 600px;
  margin: 0 auto;
}

.days-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}

.day-item {
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>
