import { createRouter, createWebHistory } from "vue-router";
import publicRoutes from "./publicRoutes";
import parentRoutes from "./parentRoutes";
import tutorRoutes from "./tutorRoutes";
import adminRoutes from "./adminRoutes";

const routes = [
  ...publicRoutes,
  ...parentRoutes,
  ...tutorRoutes,
  ...adminRoutes,
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

export default router;
