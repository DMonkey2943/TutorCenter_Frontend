import { createRouter, createWebHistory } from "vue-router";
import publicRoutes from "./publicRoutes";
import authRoutes from "./authRoutes";
import parentRoutes from "./parentRoutes";
import tutorRoutes from "./tutorRoutes";
import adminRoutes from "./adminRoutes";
import accountRoutes from "./accountRoutes";
import { useAuthStore } from "@/stores/auth";

const routes = [
  ...publicRoutes.map((route) => ({
    ...route,
    meta: { ...route.meta, requiresAuth: false },
  })),

  ...authRoutes.map((route) => ({
    ...route,
    meta: { ...route.meta, requiresAuth: false, requiresGuest: true },
  })),

  ...accountRoutes.map((route) => ({
    ...route,
    meta: { ...route.meta, requiresAuth: true},
  })),

  ...parentRoutes.map((route) => ({
    ...route,
    meta: { ...route.meta, requiresAuth: true, role: "parent" },
  })),

  ...tutorRoutes.map((route) => ({
    ...route,
    meta: { ...route.meta, requiresAuth: true, role: "tutor" },
  })),

  ...adminRoutes.map((route) => ({
    ...route,
    meta: { ...route.meta, requiresAuth: true, role: "admin" },
  })),

  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: () => import("@/views/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Navigation Guards
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  if (!authStore.initialized) {
    await authStore.init();
  }

  const isAuthenticated = authStore.isAuthenticated;
  const userRole = authStore.user_role;

  // 1. Kiểm tra routes yêu cầu guest (như login, register)
  if (to.meta.requiresGuest && isAuthenticated) {
    return next({ name: "home" });
  }

  // 2. Kiểm tra routes yêu cầu authentication
  if (to.meta.requiresAuth) {
    if (!isAuthenticated) {
      // Nếu chưa đăng nhập, chuyển về trang login với redirect
      return next({
        name: "login",
        // query: { redirect: to.fullPath },
      });
    }

    // Kiểm tra role nếu route yêu cầu role cụ thể
    if (to.meta.role && to.meta.role !== userRole) {
      return next({ name: "home" });
    }
  }

  // 3. Cho phép truy cập các public routes
  next();
});

export default router;
