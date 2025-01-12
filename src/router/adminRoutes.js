export default [
    {
        path: "/admin",
        component: () => import('../layouts/AdminLayout.vue'),
        children: [
            {path: "", name: "dashboard", component: () => import('../views/admin/Dashboard.vue')},
        ]
    }
]