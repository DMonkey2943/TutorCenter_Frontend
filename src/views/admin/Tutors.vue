<template>Trang quản lý gia sư</template>

<script setup>
import { useMenuAdmin } from "@/stores/use-menu-admin";

useMenuAdmin().onSelectedKeys(["admin-tutors"]);
</script>
