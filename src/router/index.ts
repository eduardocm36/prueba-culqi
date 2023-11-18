import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import("../views/LoginView.vue")
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/UsersView.vue'),
      children: [
        { path: '', name: 'admin.home', redirect: { name: 'admin.empleados' } },
        { path:"empleados", name: "admin.empleados", component: () => import("@/components/Users.vue")},
        { path:"reclutamiento", name: "admin.reclutados", component: () => import("@/components/Reclutamiento.vue")}
      ]
    }
  ]
})

export default router
