<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const isDropdownOpen = ref(false)
const dropdownRef = ref(null)

const userInitials = computed(() => {
  const name = authStore.user?.name || 'Mahasiswa'
  const words = name.trim().split(' ').filter(w => w.length > 0)
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase()
  } else if (words.length === 1) {
    return (words[0][0]).toUpperCase()
  }
  return 'M'
})

const goToDashboard = () => {
  router.push('/')
}

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

const closeDropdown = (e) => {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target)) {
    isDropdownOpen.value = false
  }
}

const handleLogout = () => {
  isDropdownOpen.value = false
  authStore.logout()
  router.push('/login')
}

onMounted(() => {
  document.addEventListener('click', closeDropdown)
})

onUnmounted(() => {
  document.removeEventListener('click', closeDropdown)
})
</script>

<template>
  <header class="bg-surface shadow-sm docked full-width top-0 z-50">
    <div class="flex justify-between items-center w-full px-margin-desktop h-16 max-w-container-max mx-auto">
      <h1 @click="goToDashboard" class="text-headline-md font-headline-md font-bold text-primary cursor-pointer">
        Smart Repositori TA
      </h1>
      <div class="relative" ref="dropdownRef">
        <div @click="toggleDropdown" class="flex items-center gap-4 group cursor-pointer transition-all active:opacity-80 active:scale-95">
          <span class="hidden md:block text-label-md font-label-md text-on-surface">{{ authStore.user?.name || 'Mahasiswa' }}</span>
          <div class="w-10 h-10 rounded-full bg-primary flex items-center justify-center overflow-hidden border border-outline-variant">
            <span class="text-white font-bold text-label-md">{{ userInitials }}</span>
          </div>
        </div>
        
        <!-- Dropdown Menu -->
        <div v-if="isDropdownOpen" class="absolute right-0 mt-2 w-48 bg-surface-container-lowest border border-surface-variant rounded-xl shadow-md overflow-hidden z-50">
          <router-link @click="isDropdownOpen = false" to="/profile" class="block w-full text-left px-4 py-3 text-label-md text-on-surface hover:bg-surface-container-low transition-colors border-b border-surface-variant">
            <span class="flex items-center gap-2">
              <span class="material-symbols-outlined text-[20px]">person</span>
              Profile
            </span>
          </router-link>
          <router-link @click="isDropdownOpen = false" to="/history" class="block w-full text-left px-4 py-3 text-label-md text-on-surface hover:bg-surface-container-low transition-colors border-b border-surface-variant">
            <span class="flex items-center gap-2">
              <span class="material-symbols-outlined text-[20px]">history</span>
              Riwayat
            </span>
          </router-link>
          <button @click="handleLogout" class="block w-full text-left px-4 py-3 text-label-md text-custom-danger hover:bg-error-container/20 transition-colors">
            <span class="flex items-center gap-2 text-error">
              <span class="material-symbols-outlined text-[20px]">logout</span>
              Log out
            </span>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>
