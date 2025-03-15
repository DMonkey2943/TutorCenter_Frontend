export default [
  {
    path: "/",
    component: () => import("../layouts/MainLayout.vue"),
    children: [
      {
        path: "account",
        name: "account",
        component: () => import("../views/auth/AccountView.vue"),
      },
    ],
  },
];
