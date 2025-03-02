export default [
  {
    path: "/parent",
    component: () => import("../layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "parent",
        component: () => import("../views/parent/ParentView.vue"),
      },
      {
        path: "registerClass",
        name: "parent.registerClass",
        component: () => import("../views/parent/RegisterClassView.vue"),
      },
      {
        path: "classes",
        name: "parent.classes",
        component: () => import("../views/parent/ClassesView.vue"),
      },
      {
        path: "classes/:id",
        name: "parent.classes.detail",
        component: () => import("../views/parent/ClassDetailView.vue"),
      },
    ],
  },
];
