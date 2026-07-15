<script setup>
import { computed, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

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
  }
})

const router = useRouter()
const route = useRoute()
const showProfileMenu = ref(false)

const goBack = () => {
  router.back()
}

const handleLogout = () => {
  router.push('/login')
}

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
        <span class="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-primary">notifications</span>
        <span class="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-primary">help_outline</span>
        <div class="relative">
          <button @click="showProfileMenu = !showProfileMenu" class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden border border-outline-variant focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
            <img class="w-full h-full object-cover" alt="Admin Profile" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcJo4yiBuUwDkqQFBfL7Cpr3N_3ZrtRHCNSAUhmkI3EwuvuRTkBtSgCfOBEB3vH2ltZ-XsJPIMpabXrUsQnP0RZ0H-_t8XTGsRh5xiNf12BrzOcKfV-0FctTdbt0T0uqKp7N-g77yEb2IfpBUdMGXdubVlgx30h9g1BNj5nqe2TN1ftGlKwdnlIGXAJy-uvoIT5Kr_2dwjaNvMHm1_y6aTr0DezxnaJ5ktiyW32xgfZLPIK9CVZ05ICE9yvhNSj4nVf1wpIaTTfA"/>
          </button>
          
          <!-- Dropdown Menu -->
          <div v-if="showProfileMenu" class="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 border border-surface-container z-50">
            <button @click="handleLogout" class="w-full text-left px-4 py-2 hover:bg-surface-container-low text-error flex items-center gap-2 font-label-md transition-colors">
              <span class="material-symbols-outlined text-[20px]">logout</span>
              Keluar
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
