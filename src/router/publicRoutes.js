export default [
  {
    path: "/",
    component: () => import("../layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "home",
        component: () => import("../views/HomeView.vue"),
      },
      {
        path: "classes",
        name: "classes",
        component: () => import("../views/ClassesView.vue"),
      },
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
    ],
  },
];
