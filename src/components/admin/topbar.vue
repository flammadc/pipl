<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  showBackButton: {
    type: Boolean,
    default: false
  },
  showTabs: {
    type: Boolean,
    default: false
  },
  backTo: {
    type: [String, Object],
    default: null
  }
})

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const showProfileMenu = ref(false)
const profileMenuRef = ref(null)

const userInitials = computed(() => {
  const name = authStore.user?.name || 'Admin'
  const words = name.trim().split(' ').filter(w => w.length > 0)
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase()
  } else if (words.length === 1) {
    return (words[0][0]).toUpperCase()
  }
  return 'A'
})

const goBack = () => {
  if (props.backTo) {
    router.push(props.backTo)
  } else {
    router.back()
  }
}

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}

const closeMenu = (e) => {
  if (profileMenuRef.value && !profileMenuRef.value.contains(e.target)) {
    showProfileMenu.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', closeMenu)
})

onUnmounted(() => {
  document.removeEventListener('click', closeMenu)
})

const isManual = computed(() => route.path === '/admin/add')
const isBulk = computed(() => route.path === '/admin/bulk')
</script>

<template>
  <header class="flex justify-between items-center w-full h-20 px-margin-desktop bg-white shadow-sm z-40 sticky top-0">
    <div class="flex items-center gap-4">
      <button v-if="showBackButton" @click="goBack" class="flex items-center p-2 hover:bg-surface-container rounded-full transition-colors text-primary">
        <span class="material-symbols-outlined">arrow_back</span>
      </button>
      <h2 class="font-headline-md text-headline-md font-bold text-primary">{{ title }}</h2>
    </div>
    
    <div class="flex items-center gap-6">
      <div v-if="showTabs" class="flex items-center gap-3 p-1 bg-surface-container rounded-xl mr-8">
        <router-link to="/admin/add" :class="isManual ? 'bg-white shadow-sm text-primary font-bold' : 'text-on-surface-variant hover:text-primary transition-colors'" class="px-4 py-1.5 font-label-md text-label-md rounded-lg">Input Manual</router-link>
        <router-link to="/admin/bulk" :class="isBulk ? 'bg-white shadow-sm text-primary font-bold' : 'text-on-surface-variant hover:text-primary transition-colors'" class="px-4 py-1.5 font-label-md text-label-md rounded-lg">Impor Massal (CSV)</router-link>
      </div>

      <slot name="actions"></slot>
      
      <div v-if="$slots.actions" class="h-8 w-[1px] bg-outline-variant/30 hidden md:block"></div>
      <div class="flex items-center gap-4">
        <div class="relative flex items-center gap-4" ref="profileMenuRef">
          <span class="hidden md:block text-label-md font-label-md text-on-surface">{{ authStore.user?.name || 'Admin' }}</span>
          <button @click="showProfileMenu = !showProfileMenu" class="w-10 h-10 rounded-full bg-primary flex items-center justify-center overflow-hidden border border-outline-variant focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
            <span class="text-white font-bold text-label-md">{{ userInitials }}</span>
          </button>

          <!-- Dropdown Menu -->
          <div v-if="showProfileMenu" class="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 border border-surface-container z-50">
            <router-link @click="showProfileMenu = false" to="/admin/profile" class="block w-full text-left px-4 py-2 hover:bg-surface-container-low text-on-surface flex items-center gap-2 font-label-md transition-colors border-b border-surface-variant">
              <span class="material-symbols-outlined text-[20px]">person</span>
              Profile
            </router-link>
            <button @click="handleLogout" class="w-full text-left px-4 py-2 hover:bg-surface-container-low text-error flex items-center gap-2 font-label-md transition-colors">
              <span class="material-symbols-outlined text-[20px]">logout</span>
              Log out
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
