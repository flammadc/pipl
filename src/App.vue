<script setup>
import { computed, onMounted } from 'vue'
import { useRoute, RouterView } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import AdminLayout from '@/layouts/AdminLayout.vue'
import MahasiswaLayout from '@/layouts/MahasiswaLayout.vue'

const route = useRoute()
const auth = useAuthStore()

onMounted(() => {
  // Refresh data user agar role terbaru tersinkron dengan server.
  if (auth.isLoggedIn) {
    auth.fetchMe()
  }
})

const layout = computed(() => {
  if (route.path === '/login') {
    return 'div'
  }
  // Hanya tampilkan layout admin jika user benar-benar admin.
  // Jika bukan admin, fallback ke layout mahasiswa meskipun URL-nya /admin
  // (router guard seharusnya sudah redirect, ini sebagai safety).
  if (route.path.startsWith('/admin') && auth.isAdmin) {
    return AdminLayout
  }
  return MahasiswaLayout
})
</script>

<template>
  <component :is="layout">
    <RouterView v-slot="{ Component }">
      <KeepAlive include="SearchResults">
        <component :is="Component" />
      </KeepAlive>
    </RouterView>
  </component>
</template>
