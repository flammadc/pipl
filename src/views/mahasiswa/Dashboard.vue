<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from '../../components/mahasiswa/navbar.vue'
import Footer from '../../components/mahasiswa/footer.vue'

const router = useRouter()
const searchQuery = ref('')
const charCount = ref(0)

const updateCounter = () => {
  charCount.value = searchQuery.value.length
}

const recentSearches = [
  'Deteksi Hoaks',
  'IoT Smart Home',
  'Analisis Sentimen Twitter'
]

const setSearch = (query) => {
  searchQuery.value = query
  updateCounter()
  submitSearch()
}

const submitSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({ path: '/results', query: { q: searchQuery.value } })
  }
}
</script>

<template>
  <div class="bg-background min-h-screen flex flex-col">
    <Navbar />
    
    <main class="flex-grow flex flex-col items-center justify-center px-4 py-stack-xl relative overflow-hidden">
      <!-- Subtle Animated Background Elements -->
      <div class="absolute inset-0 -z-10 pointer-events-none opacity-40"></div>
      
      <div class="max-w-4xl w-full text-center space-y-stack-lg">
        <!-- Hero Section -->
        <div class="space-y-4">
          <h1 class="text-display-lg font-display-lg text-primary-container">
            Temukan &amp; Validasi Topik Skripsimu dengan AI
          </h1>
          <p class="text-body-lg font-body-lg text-outline max-w-2xl mx-auto">
            Pastikan keaslian ide penelitianmu dengan pencarian semantik cerdas terhadap ribuan repositori.
          </p>
        </div>
        
        <!-- Search Area -->
        <div class="bg-surface-container-lowest p-6 md:p-8 rounded-xl custom-shadow-resting custom-shadow-hover border border-surface-variant">
          <div class="relative w-full">
            <textarea 
              v-model="searchQuery"
              @input="updateCounter"
              class="w-full bg-surface border border-outline-variant rounded-xl p-4 text-body-md font-body-md focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none resize-none placeholder:text-on-surface-variant" 
              id="search-input" 
              maxlength="500" 
              placeholder="Contoh: sistem prediksi harga saham menggunakan machine learning" 
              rows="4">
            </textarea>
            <div class="absolute bottom-3 right-4 text-label-sm font-label-sm text-outline-variant">
              <span :class="{'text-error': charCount >= 450}">{{ charCount }}</span>/500
            </div>
          </div>
          <button @click="submitSearch" class="w-full mt-6 bg-primary-container text-on-tertiary py-4 rounded-xl flex items-center justify-center gap-2 font-label-md text-label-md transition-all hover:bg-primary active:scale-[0.98] custom-shadow-resting">
            <span class="material-symbols-outlined" style="font-variation-settings: 'wght' 600;">search</span>
            Cari Topik Serupa
          </button>
        </div>
        
        <!-- Recent Searches -->
        <div class="w-full pt-stack-md">
          <h3 class="text-label-sm font-label-sm uppercase tracking-wider text-outline mb-4 text-left md:text-center px-4">
            Pencarian Terakhir
          </h3>
          <div class="flex flex-wrap items-center justify-start md:justify-center gap-3 px-4">
            <button 
              v-for="search in recentSearches" 
              :key="search"
              @click="setSearch(search)"
              class="px-5 py-2 rounded-full bg-secondary-container/20 text-on-secondary-container border border-secondary-container/30 text-label-md font-label-md hover:bg-secondary-container/40 transition-colors">
              {{ search }}
            </button>
          </div>
        </div>
      </div>
    </main>
    
    <Footer />
  </div>
</template>
