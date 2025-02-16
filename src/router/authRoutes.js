export default [
  {
    path: "/",
    component: () => import("../layouts/MainLayout.vue"),
    children: [
      {
        path: "login",
        name: "login",
        component: () => import("../views/auth/LoginView.vue"),
      },
      {
        path: "register/parent",
        name: "register.parent",
        component: () => import("../views/auth/ParentRegisterView.vue"),
      },
      {
        path: "register/tutor",
        name: "register.tutor",
        component: () => import("../views/auth/TutorRegisterView.vue"),
      },
    ],
  },
];
