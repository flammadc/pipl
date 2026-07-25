import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import MahasiswaDashboard from '../views/mahasiswa/Dashboard.vue'
import AdminDashboard from '../views/admin/Dashboard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue'),
    },
    {
      path: '/',
      name: 'mahasiswa-dashboard',
      component: MahasiswaDashboard,
      meta: { requiresAuth: true },
    },
    {
      path: '/results',
      name: 'mahasiswa-results',
      component: () => import('../views/mahasiswa/SearchResults.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/history',
      name: 'mahasiswa-history',
      component: () => import('../views/mahasiswa/History.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/detail',
      name: 'mahasiswa-detail',
      component: () => import('../views/mahasiswa/ThesisDetail.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/admin',
      name: 'admin-dashboard',
      component: AdminDashboard,
      meta: { requiresAuth: true, requiresRole: ['admin'] },
    },
    {
      path: '/admin/add',
      name: 'admin-add',
      component: () => import('../views/admin/AddThesis.vue'),
      meta: { requiresAuth: true, requiresRole: ['admin'] },
    },
    {
      path: '/admin/bulk',
      name: 'admin-bulk',
      component: () => import('../views/admin/BulkImport.vue'),
      meta: { requiresAuth: true, requiresRole: ['admin'] },
    },
    {
      path: '/admin/users',
      name: 'admin-users',
      component: () => import('../views/admin/Users.vue'),
      meta: { requiresAuth: true, requiresRole: ['admin'] },
    },
  ],
})

router.beforeEach((to, _from, next) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    return next({ name: 'login', query: { redirect: to.fullPath } })
  }
  if (to.meta.requiresRole && !to.meta.requiresRole.includes(auth.user?.role)) {
    return next({ name: 'mahasiswa-dashboard' })
  }
  if (to.name === 'login' && auth.isLoggedIn) {
    return next(auth.isAdmin ? { name: 'admin-dashboard' } : { name: 'mahasiswa-dashboard' })
  }
  next()
})

export default router
