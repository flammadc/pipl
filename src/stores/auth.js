import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { post, get } from '@/services/api'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('auth_token') || null)
  const user = ref(JSON.parse(localStorage.getItem('auth_user') || 'null'))
  const error = ref(null)
  const isLoading = ref(false)

  const isLoggedIn = computed(() => !!token.value)
  const isAdmin = computed(() => user.value?.role === 'admin')

  function _persist(t, u) {
    token.value = t
    user.value = u
    localStorage.setItem('auth_token', t)
    localStorage.setItem('auth_user', JSON.stringify(u))
  }

  function logout() {
    token.value = null
    user.value = null
    error.value = null
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_user')
  }

  async function login(email, password) {
    isLoading.value = true
    error.value = null
    try {
      const data = await post('/api/auth/login', { email, password })
      _persist(data.token, data.user)
      return true
    } catch (e) {
      error.value = e.message
      return false
    } finally {
      isLoading.value = false
    }
  }

  async function register(name, email, password) {
    isLoading.value = true
    error.value = null
    try {
      const data = await post('/api/auth/register', { name, email, password })
      _persist(data.token, data.user)
      return true
    } catch (e) {
      error.value = e.message
      return false
    } finally {
      isLoading.value = false
    }
  }

  async function fetchMe() {
    if (!token.value) return false
    try {
      const data = await get('/api/auth/me')
      user.value = data.user
      localStorage.setItem('auth_user', JSON.stringify(data.user))
      return true
    } catch {
      logout()
      return false
    }
  }

  return { token, user, error, isLoading, isLoggedIn, isAdmin, login, register, logout, fetchMe }
})
