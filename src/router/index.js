import { createRouter, createWebHistory } from 'vue-router'
import MahasiswaDashboard from '../views/mahasiswa/Dashboard.vue'
import AdminDashboard from '../views/admin/Dashboard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'mahasiswa-dashboard',
      component: MahasiswaDashboard,
    },
    {
      path: '/results',
      name: 'mahasiswa-results',
      component: () => import('../views/mahasiswa/SearchResults.vue'),
    },
    {
      path: '/admin',
      name: 'admin-dashboard',
      component: AdminDashboard,
    },
  ],
})

export default router
