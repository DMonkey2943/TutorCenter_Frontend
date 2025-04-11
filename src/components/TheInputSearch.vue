<script setup>
import { ref, defineProps, defineEmits, computed } from "vue";
import { SearchOutlined } from "@ant-design/icons-vue";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "Nhập thông tin cần tìm",
  },
  buttonText: {
    type: String,
    default: "Tìm kiếm",
  },
  loading: {
    type: Boolean,
    default: false,
  },
  allowClear: {
    type: Boolean,
    default: true,
  },
});

const emits = defineEmits(["submit", "update:modelValue", "clear"]);

const inputValue = computed({
  get: () => props.modelValue,
  set: (value) => emits("update:modelValue", value),
});

const handleSubmit = () => {
  emits("submit", inputValue.value);
};

const handleClear = () => {
  emits("update:modelValue", "");
  emits("clear");
};

const handleKeyUp = (e) => {
  if (e.key === "Enter") {
    handleSubmit();
  }
};
</script>

<template>
  <div class="search-wrapper mb-3">
    <!-- <div class="input-group"> -->
      <a-input
        v-model:value="inputValue"
        :placeholder="placeholder"
        @keyup.enter="handleSubmit"
        :loading="loading"
        :allowClear="allowClear"
        @pressEnter="handleSubmit"
      >
        <template #prefix>
          <SearchOutlined />
        </template>
      </a-input>
      <a-button
        type="primary"
        class="btn-search"
        @click="handleSubmit"
        :loading="loading"
      >
        <template #icon><SearchOutlined /></template>
        {{ buttonText }}
      </a-button>
    <!-- </div> -->
  </div>
</template>

<style scoped>
.search-wrapper {
  width: 100%;
  display: flex;
}

.btn-search {
    margin-left: 8px;
  display: flex;
  align-items: center;
}

:deep(.ant-input-group-addon) {
  padding: 0;
}

:deep(.ant-input-affix-wrapper) {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
</style>
