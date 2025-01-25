export default [
  {
    path: "/admin",
    component: () => import("../layouts/AdminLayout.vue"),
    children: [
      //   Dashboard
      {
        path: "",
        name: "admin.dashboard",
        component: () => import("../views/admin/Dashboard.vue"),
      },
      //   Quản lý gia sư
      {
        path: "tutors",
        name: "admin.tutors",
        component: () => import("../views/admin/tutors/index.vue"),
      },
      {
        path: "tutors/create",
        name: "admin.tutors.create",
        component: () => import("../views/admin/tutors/create.vue"),
      },
      {
        path: "tutors/:id/edit",
        name: "admin.tutors.edit",
        component: () => import("../views/admin/tutors/edit.vue"),
      },
      //   Quản lý gia sư
      {
        path: "tutors/profile",
        name: "admin.tutors.profile",
        component: () => import("../views/admin/tutorsProfile/index.vue"),
      },
      {
        path: "tutors/profile/:id/edit",
        name: "admin.tutors.profile.edit",
        component: () => import("../views/admin/tutorsProfile/edit.vue"),
      },
      {
        path: "tutors/profile/:id",
        name: "admin.tutors.profile.detail",
        component: () => import("../views/admin/tutorsProfile/detail.vue"),
      },
      //   Quản lý phụ huynh
      {
        path: "parents",
        name: "admin.parents",
        component: () => import("../views/admin/parents/index.vue"),
      },
      {
        path: "parents/create",
        name: "admin.parents.create",
        component: () => import("../views/admin/parents/create.vue"),
      },
      {
        path: "parents/:id/edit",
        name: "admin.parents.edit",
        component: () => import("../views/admin/parents/edit.vue"),
      },
    ],
  },
];
