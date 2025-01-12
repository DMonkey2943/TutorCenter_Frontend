export default [
    {
        path: "/admin",
        component: () => import('../layouts/AdminLayout.vue'),
        children: [
            {
                path: "",
                name: "admin.dashboard",
                component: () => import('../views/admin/Dashboard.vue')
            },
            {
                path: "tutors",
                name: "admin.tutors",
                component: () => import('../views/admin/Tutors.vue')
            },
            {
                path: "parents",
                name: "admin.parents",
                component: () => import('../views/admin/Parents.vue')
            },
        ]
    }
]