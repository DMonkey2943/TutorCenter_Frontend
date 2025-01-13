<template>Trang quản lý phụ huynh</template>

<script setup>
import { useMenuAdmin } from "@/stores/use-menu-admin";

useMenuAdmin().onSelectedKeys(["admin-parents"]);
</script>
