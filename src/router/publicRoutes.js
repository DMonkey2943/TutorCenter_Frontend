export default [
    {
        path: "/",
        component: () => import('../layouts/MainLayout.vue'),
        children: [
            {path: "", name: "home", component: () => import('../views/HomeView.vue')},
        ]
    }
]