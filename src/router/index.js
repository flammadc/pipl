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
      path: '/history',
      name: 'mahasiswa-history',
      component: () => import('../views/mahasiswa/History.vue'),
    },
    {
      path: '/detail',
      name: 'mahasiswa-detail',
      component: () => import('../views/mahasiswa/ThesisDetail.vue'),
    },
    {
      path: '/admin',
      name: 'admin-dashboard',
      component: AdminDashboard,
    },
    {
      path: '/admin/add',
      name: 'admin-add',
      component: () => import('../views/admin/AddThesis.vue'),
    },
    {
      path: '/admin/bulk',
      name: 'admin-bulk',
      component: () => import('../views/admin/BulkImport.vue'),
    },
  ],
})

export default router
