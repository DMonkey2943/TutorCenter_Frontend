<template>Đây là trang Dashboard của Admin</template>

<script setup>
import { useMenuAdmin } from "@/stores/use-menu-admin";

useMenuAdmin().onSelectedKeys(["admin-dashboard"]);
</script>
