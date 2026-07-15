<script setup>
import { computed } from 'vue'
import { useRoute, RouterView } from 'vue-router'
import AdminLayout from '@/layouts/AdminLayout.vue'
import MahasiswaLayout from '@/layouts/MahasiswaLayout.vue'

const route = useRoute()

const layout = computed(() => {
  if (route.path.startsWith('/admin')) {
    return AdminLayout
  }
  return MahasiswaLayout
})
</script>

<template>
  <component :is="layout">
    <RouterView />
  </component>
</template>
