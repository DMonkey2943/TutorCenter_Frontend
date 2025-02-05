<template>
  <a-menu
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    mode="inline"
    :items="items"
    @click="onMenuClick"
  ></a-menu>
</template>
<script setup>
import { reactive, h } from "vue";
import { useRouter } from "vue-router";
import { useMenuAdmin } from "@/stores/use-menu-admin";
import { storeToRefs } from "pinia";

const router = useRouter();

const store = useMenuAdmin();
const { selectedKeys, openKeys } = storeToRefs(store);

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
    key: "admin-tutors-profile",
    label: "Quản lý hồ sơ gia sư",
    title: "Quản lý hồ sơ gia sư",
    pathName: "admin.tutors.profile",
  },
  {
    key: "admin-parents",
    label: "Quản lý phụ huynh",
    title: "Quản lý phụ huynh",
    pathName: "admin.parents",
  },
  {
    key: "admin-classes",
    label: "Quản lý lớp học",
    title: "Quản lý lớp học",
    pathName: "admin.classes",
  },
]);

const onMenuClick = (info) => {
  const selectedItem = items.find((item) => item.key === info.key);
  if (selectedItem && selectedItem.pathName) {
    router.push({ name: selectedItem.pathName }); // Navigate to the route
  }
};
</script>
