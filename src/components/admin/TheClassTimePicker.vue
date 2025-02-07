<script setup>
import { ref, computed, watch } from "vue";
import { TimePicker } from "ant-design-vue";
import dayjs from "dayjs";

const props = defineProps({
  modelValue: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

const weekDays = [
  { id: 2, name: "Thứ 2" },
  { id: 3, name: "Thứ 3" },
  { id: 4, name: "Thứ 4" },
  { id: 5, name: "Thứ 5" },
  { id: 6, name: "Thứ 6" },
  { id: 7, name: "Thứ 7" },
  { id: 8, name: "Chủ nhật" },
];

const times = ref([]);

// Sửa lại watch để không ghi đè hoàn toàn times
watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue && newValue.length > 0) {
      // Giữ lại các time slot đã có và thêm mới từ API
      const existingDays = times.value.filter((t) => !t.id).map((t) => t.day);
      const apiTimes = newValue.filter((t) => !existingDays.includes(t.day));

      times.value = [
        ...times.value.filter((t) => !t.id), // Giữ lại các time slot người dùng vừa chọn
        ...apiTimes.map((time) => ({
          day: time.day,
          start: time.start,
          end: time.end,
          id: time.id,
          class_id: time.class_id,
        })),
      ];
    }
  },
  { immediate: true }
);

const handleDayToggle = (dayId) => {
  const dayName = weekDays.find((d) => d.id === dayId)?.name || "";
  const existingTimeSlot = times.value.find((t) => t.day === dayName);

  if (!existingTimeSlot) {
    // Thêm time slot mới
    times.value.push({
      day: dayName,
      start: null,
      end: null,
    });
  } else {
    // Xóa time slot
    times.value = times.value.filter((t) => t.day !== dayName);
  }
  updateModelValue();
};

const handleTimeChange = (time, dayId) => {
  const dayName = weekDays.find((d) => d.id === dayId)?.name;
  const timeSlot = times.value.find((t) => t.day === dayName);

  if (timeSlot && time) {
    const startTime = dayjs(time).format("HH:mm:ss");
    const endTime = dayjs(time).add(1.5, "hour").format("HH:mm:ss");

    timeSlot.start = startTime;
    timeSlot.end = endTime;

    updateModelValue();
  }
};

const updateModelValue = () => {
  const validTimes = times.value.filter((t) => t.start && t.end);
  emit("update:modelValue", validTimes);
};

const isDaySelected = (dayId) => {
  const dayName = weekDays.find((d) => d.id === dayId)?.name;
  return times.value.some((t) => t.day === dayName);
};

const getTimeValue = (dayId) => {
  const dayName = weekDays.find((d) => d.id === dayId)?.name;
  const timeSlot = times.value.find((t) => t.day === dayName);
  return timeSlot?.start ? dayjs(timeSlot.start, "HH:mm:ss") : null;
};

const validTimesForDisplay = computed(() => {
  return times.value.filter(
    (time, index, self) => self.findIndex((t) => t.day === time.day) === index
  );
});
</script>

<template>
  <div class="schedule-picker">
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
