<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isDropdownOpen = ref(false)

const goToDashboard = () => {
  router.push('/')
}

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}
</script>

<template>
  <header class="bg-surface shadow-sm docked full-width top-0 z-50">
    <div class="flex justify-between items-center w-full px-margin-desktop h-16 max-w-container-max mx-auto">
      <h1 @click="goToDashboard" class="text-headline-md font-headline-md font-bold text-primary cursor-pointer">
        Smart Repositori TA
      </h1>
      <div class="relative">
        <div @click="toggleDropdown" class="flex items-center gap-4 group cursor-pointer transition-all active:opacity-80 active:scale-95">
          <span class="hidden md:block text-label-md font-label-md text-on-surface">Budi Santoso</span>
          <div class="w-10 h-10 rounded-full bg-surface-container-high overflow-hidden border border-outline-variant">
            <img class="w-full h-full object-cover" alt="Profile" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBe5w_psX9Rvrpm3SfUaJj366w6-BxNVQe4JArz-9qu5gV3Nt5cdhnBj0D_GjdDLxQ3PFrCYWSfpLeVHCXBeTFrOXS8yB-ZBtJw2KwLxtSpkGfXht-8BxqT8t5XOQkTjRr80gz-8-cgSKRmFPEFdmNO5wBMGt_ELpnlZoyQebYmW4M8Dx2L78wD_tEJf6ZIcnhrqgs5xTjZ0u1-svmuUTT0QHe2cHnnNQ9WzoRRXSPrDsnhS0t1EYJynz-Hv2wqwQQ8UyqPOP2neQ">
          </div>
        </div>
        
        <!-- Dropdown Menu -->
        <div v-if="isDropdownOpen" class="absolute right-0 mt-2 w-48 bg-surface-container-lowest border border-surface-variant rounded-xl shadow-md overflow-hidden z-50">
          <router-link @click="isDropdownOpen = false" to="/history" class="block w-full text-left px-4 py-3 text-label-md text-on-surface hover:bg-surface-container-low transition-colors border-b border-surface-variant">
            <span class="flex items-center gap-2">
              <span class="material-symbols-outlined text-[20px]">history</span>
              Riwayat
            </span>
          </router-link>
          <button @click="isDropdownOpen = false" class="block w-full text-left px-4 py-3 text-label-md text-custom-danger hover:bg-error-container/20 transition-colors">
            <span class="flex items-center gap-2">
              <span class="material-symbols-outlined text-[20px]">logout</span>
              Log out
            </span>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>
