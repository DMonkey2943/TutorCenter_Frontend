export default [
  {
    path: "/tutor",
    component: () => import("../layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "tutor",
        component: () => import("../views/tutor/TutorView.vue"),
      },
      {
        path: "enrolledClasses",
        name: "tutor.enrolledClasses",
        component: () => import("../views/tutor/EnrolledClassesView.vue"),
      },
    ],
  },
];
