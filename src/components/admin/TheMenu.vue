<template>
  <a-menu
    v-model:openKeys="state.openKeys"
    v-model:selectedKeys="state.selectedKeys"
    mode="inline"
    :items="items"
    @click="onMenuClick"
  ></a-menu>
</template>
<script setup>
import { reactive, h } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const state = reactive({
  selectedKeys: ["admin-dashboard"],
  openKeys: [],
});
const items = reactive([
  {
    key: "admin-dashboard",
    label: "Dashboard",
    title: "Dashboard",
    pathName: "admin.dashboard",
  },
  {
    key: "admin-tutors",
    label: "Quản lý gia sư",
    title: "Quản lý gia sư",
    pathName: "admin.tutors",
  },
  {
    key: "admin-parents",
    label: "Quản lý phụ huynh",
    title: "Quản lý phụ huynh",
    pathName: "admin.parents",
  },
]);

const onMenuClick = (info) => {
  const selectedItem = items.find((item) => item.key === info.key);
  if (selectedItem && selectedItem.pathName) {
    router.push({ name: selectedItem.pathName }); // Navigate to the route
  }
};
</script>
