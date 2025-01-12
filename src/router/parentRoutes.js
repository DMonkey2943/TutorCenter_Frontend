export default [
    {
        path: "/parent",
        component: () => import('../layouts/MainLayout.vue'),
        children: [
            {path: "", name: "parent", component: () => import('../views/parent/ParentView.vue')},
        ]
    }
]