<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { get } from '@/services/api'
import { useSearchStore } from '@/stores/search'

const router = useRouter()
const searchStore = useSearchStore()

const history = ref([])
const isLoading = ref(true)
const error = ref(null)
const filterChip = ref('Semua')
const searchText = ref('')

function getLabel(score) {
  if (score >= 70) return 'Jenuh'
  if (score >= 40) return 'Sedang'
  return 'Jarang'
}

function getLabelClass(score) {
  if (score >= 70) return 'bg-error-container text-custom-danger'
  if (score >= 40) return 'bg-orange-100 text-custom-warning'
  return 'bg-green-100 text-custom-success'
}

function formatDate(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  const now = new Date()
  const diffMs = now - d
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)
  if (diffMins < 60) return `${diffMins} menit lalu`
  if (diffHours < 24) return `${diffHours} jam lalu`
  if (diffDays < 7) return `${diffDays} hari lalu`
  return d.toLocaleDateString('id-ID')
}

const filteredHistory = computed(() => {
  let list = history.value
  if (filterChip.value !== 'Semua') {
    list = list.filter(h => getLabel(h.similarity_score) === filterChip.value)
  }
  if (searchText.value.trim()) {
    const q = searchText.value.toLowerCase()
    list = list.filter(h => h.idea.toLowerCase().includes(q))
  }
  return list
})

async function loadHistory() {
  isLoading.value = true
  error.value = null
  try {
    const data = await get('/api/history')
    history.value = data
  } catch (e) {
    error.value = e.message
  } finally {
    isLoading.value = false
  }
}

function viewResult(item) {
  searchStore.loadFromHistory(item)
  router.push({ path: '/results', query: { q: item.idea } })
}

onMounted(loadHistory)
</script>

<template>
  <main class="flex-grow w-full max-w-container-max mx-auto px-margin-desktop py-stack-lg">
    <!-- Page Header -->
    <header class="flex flex-col md:flex-row md:items-center justify-between mb-stack-lg gap-stack-md">
      <h1 class="text-headline-lg font-headline-lg text-primary">Riwayat Pencarian</h1>
      <div class="flex flex-wrap items-center gap-stack-md">
        <div class="relative min-w-[280px]">
          <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
          <input
            v-model="searchText"
            class="w-full pl-10 pr-4 py-2 bg-surface-container-lowest border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none text-body-md transition-all"
            placeholder="Cari dalam riwayat..."
            type="text"
          >
        </div>
      </div>
    </header>

    <!-- Filter Chips -->
    <section class="flex flex-wrap gap-stack-sm mb-stack-lg">
      <button
        v-for="chip in ['Semua', 'Jenuh', 'Sedang', 'Jarang']"
        :key="chip"
        @click="filterChip = chip"
        :class="filterChip === chip
          ? 'bg-primary text-on-primary'
          : 'bg-surface-container-highest/50 text-on-surface-variant hover:bg-surface-container-high'"
        class="px-6 py-2 rounded-full text-label-md font-label-md transition-all"
      >{{ chip }}</button>
    </section>

    <!-- Loading Skeleton -->
    <div v-if="isLoading" class="flex flex-col gap-gutter">
      <div v-for="i in 4" :key="i" class="h-36 bg-surface-container-low rounded-xl animate-pulse"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="flex flex-col items-center justify-center py-24 gap-4 text-center">
      <span class="material-symbols-outlined text-error text-5xl">error_outline</span>
      <p class="text-body-md text-on-surface-variant">{{ error }}</p>
      <button @click="loadHistory" class="mt-2 px-6 py-3 bg-primary text-white rounded-xl font-label-md">Coba Lagi</button>
    </div>

    <!-- Empty State -->
    <div v-else-if="!filteredHistory.length" class="flex flex-col items-center justify-center py-24 gap-4 text-center">
      <span class="material-symbols-outlined text-outline-variant text-5xl">history</span>
      <p class="text-body-md text-on-surface-variant">
        {{ history.length === 0 ? 'Belum ada riwayat pencarian.' : 'Tidak ada riwayat yang cocok dengan filter.' }}
      </p>
    </div>

    <!-- History List -->
    <div v-else class="flex flex-col gap-gutter">
      <article
        v-for="item in filteredHistory"
        :key="item.id"
        class="bg-surface-container-lowest rounded-xl p-stack-lg shadow-sm hover:shadow-md transition-shadow"
      >
        <div class="flex justify-between items-start mb-stack-sm">
          <h3 class="text-body-lg font-bold text-primary max-w-[80%] leading-snug">{{ item.idea }}</h3>
          <span class="text-label-sm font-label-sm text-outline shrink-0 ml-2">{{ formatDate(item.created_at) }}</span>
        </div>
        <div class="flex flex-wrap gap-2 mb-stack-md">
          <span :class="['px-3 py-1 rounded-full text-label-sm font-label-sm', getLabelClass(item.similarity_score)]">
            {{ getLabel(item.similarity_score) }}
          </span>
          <span class="px-3 py-1 rounded-full bg-surface-container text-on-surface-variant text-label-sm font-label-sm">
            Skor kemiripan: {{ item.similarity_score }}
          </span>
          <span v-if="item.similar_titles?.length" class="px-3 py-1 rounded-full bg-surface-container text-on-surface-variant text-label-sm font-label-sm">
            {{ item.similar_titles.length }} skripsi mirip
          </span>
        </div>
        <div v-if="item.verdict" class="mb-stack-md">
          <p class="text-body-md text-outline italic line-clamp-2">{{ item.verdict }}</p>
        </div>
        <div class="flex justify-end gap-stack-lg items-center border-t border-surface-variant pt-stack-sm">
          <button @click="viewResult(item)" class="bg-primary text-white px-6 py-2 rounded-xl text-label-md font-bold transition-transform active:scale-95">
            Lihat Hasil
          </button>
        </div>
      </article>
    </div>
  </main>
</template>
