<script setup>
import { ref, computed, onActivated, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSearchStore } from '@/stores/search'
import { post } from '@/services/api'

defineOptions({ name: 'SearchResults' })

const route = useRoute()
const router = useRouter()
const searchStore = useSearchStore()

const searchQuery = ref(route.query.q || '')
const localError = ref(null)
const loadingSuggestions = ref(false)
const suggestionsError = ref(null)

// suggestions live in the store so they survive navigation and page refresh
const suggestions = computed(() => searchStore.suggestions)

// Similarity score → label
const scoreLabel = computed(() => {
  const s = searchStore.result?.similarity_score ?? 0
  if (s >= 70) return { text: 'Jenuh', color: 'bg-red-100 border-red-200 text-[#C62828]', dot: 'bg-[#C62828]' }
  if (s >= 40) return { text: 'Sedang', color: 'bg-orange-100 border-orange-200 text-[#C77700]', dot: 'bg-[#C77700]' }
  return { text: 'Jarang', color: 'bg-green-100 border-green-200 text-green-700', dot: 'bg-green-600' }
})

function similarityBorderColor(score) {
  const s = score ?? 0
  if (s >= 70) return '#C62828'
  if (s >= 40) return '#C77700'
  return '#16a34a'
}

async function loadSuggestions(idea) {
  if (!idea?.trim()) return
  loadingSuggestions.value = true
  suggestionsError.value = null
  try {
    const data = await post('/api/suggest-titles', { idea: idea.trim() })
    // Persist to store so suggestions survive navigation and refresh
    searchStore.setSuggestions(data.suggestions || [])
  } catch (e) {
    suggestionsError.value = e.message || 'Gagal memuat saran judul.'
  } finally {
    loadingSuggestions.value = false
  }
}

async function runSearch(q) {
  if (!q?.trim()) return
  localError.value = null
  const result = await searchStore.checkIdea(q.trim())
  if (!result) {
    localError.value = searchStore.error || 'Gagal mengambil data dari server.'
  } else {
    // Only fetch suggestions if not already cached for this query
    if (!searchStore.suggestions.length) {
      await loadSuggestions(q.trim())
    }
  }
}

function openDetail(id) {
  router.push({ path: '/detail', query: { id } })
}

function reSearch(idea) {
  searchQuery.value = idea
  router.push({ path: '/results', query: { q: idea } })
}

// On activate: use cached data if the idea matches; otherwise call the API.
// onActivated fires both on first mount AND when navigating back (KeepAlive re-activation).
onActivated(() => {
  const q = route.query.q || ''
  searchQuery.value = q
  if (searchStore.result && searchStore.idea === q) {
    // Data already in store — no API call needed
    return
  }
  runSearch(q)
})

// If query param changes (e.g., clicking "Cari Judul Ini" from a suggestion).
// Guard: if the store already has a result for this query (back-nav), skip the API call.
watch(() => route.query.q, (newQ) => {
  if (!newQ) return
  if (searchStore.result && searchStore.idea === newQ) return
  searchQuery.value = newQ
  runSearch(newQ)
})
</script>

<template>
  <main class="flex-grow max-w-container-max mx-auto w-full px-margin-desktop py-stack-lg">
    <!-- Search Bar Row -->
    <div class="mb-stack-xl">
      <div class="flex flex-col md:flex-row gap-4 items-center">
        <div class="relative w-full">
          <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
          <input
            v-model="searchQuery"
            class="w-full pl-12 pr-4 py-4 rounded-xl border border-outline-variant bg-surface-container-lowest focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-body-md text-on-surface"
            type="text"
            placeholder="Masukkan ide topik skripsi..."
            @keyup.enter="reSearch(searchQuery)"
          >
        </div>
        <button
          @click="reSearch(searchQuery)"
          :disabled="searchStore.isLoading"
          class="whitespace-nowrap px-6 py-4 rounded-xl border border-secondary text-secondary font-label-md hover:bg-surface-container-low transition-colors flex items-center gap-2 h-[58px] disabled:opacity-50"
        >
          <span class="material-symbols-outlined text-[20px]" :class="{'animate-spin': searchStore.isLoading}">{{ searchStore.isLoading ? 'progress_activity' : 'refresh' }}</span>
          Cari Ulang
        </button>
      </div>
    </div>

    <!-- Loading Skeleton -->
    <div v-if="searchStore.isLoading" class="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
      <div class="lg:col-span-8 space-y-stack-lg">
        <div class="h-20 bg-surface-container-low rounded-xl animate-pulse"></div>
        <div v-for="i in 4" :key="i" class="h-28 bg-surface-container-low rounded-xl animate-pulse"></div>
      </div>
      <div class="lg:col-span-4 space-y-6">
        <div class="h-48 bg-surface-container-low rounded-xl animate-pulse"></div>
        <div class="h-36 bg-surface-container-low rounded-xl animate-pulse"></div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="localError" class="flex flex-col items-center justify-center py-24 gap-4 text-center">
      <span class="material-symbols-outlined text-error text-5xl">error_outline</span>
      <p class="text-headline-md font-headline-md text-on-surface">Terjadi Kesalahan</p>
      <p class="text-body-md text-on-surface-variant">{{ localError }}</p>
      <button @click="runSearch(searchQuery)" class="mt-2 px-6 py-3 bg-primary text-white rounded-xl font-label-md">Coba Lagi</button>
    </div>

    <!-- Results -->
    <div v-else-if="searchStore.result" class="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
      <!-- Left Column: Cluster Analysis + Similar Theses -->
      <div class="lg:col-span-8 space-y-stack-lg">

        <!-- Section B: Analisis Klaster -->
        <section>
          <div class="bg-[#EAF0F8] p-6 rounded-xl flex justify-between items-center hover:-translate-y-0.5 transition-transform">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-lg bg-white flex items-center justify-center">
                <span class="material-symbols-outlined text-primary">analytics</span>
              </div>
              <div>
                <h2 class="text-headline-md font-headline-md text-primary">Analisis Kemiripan Topik</h2>
                <p class="text-body-md text-on-surface-variant">
                  {{ searchStore.result.similar_titles?.length || 0 }} skripsi serupa terdeteksi
                </p>
              </div>
            </div>
            <div :class="['flex items-center gap-2 px-4 py-2 rounded-full border', scoreLabel.color]">
              <div :class="['w-2 h-2 rounded-full animate-pulse', scoreLabel.dot]"></div>
              <span class="text-label-sm font-label-sm">{{ scoreLabel.text }}</span>
            </div>
          </div>
        </section>

        <!-- Section A: Skripsi Termirip -->
        <section>
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-headline-md font-headline-md text-on-surface">Skripsi Termirip</h3>
            <span class="text-label-md text-on-surface-variant">
              Menampilkan {{ searchStore.result.similar_titles?.length || 0 }} hasil
            </span>
          </div>

          <!-- Empty state -->
          <div v-if="!searchStore.result.similar_titles?.length" class="flex flex-col items-center py-16 gap-3 text-center bg-surface-container-lowest rounded-xl border border-outline-variant">
            <span class="material-symbols-outlined text-4xl text-outline-variant">search_off</span>
            <p class="text-body-md text-on-surface-variant">Tidak ada skripsi serupa ditemukan di repositori.</p>
            <p class="text-label-md text-secondary">Topik ini sangat orisinal!</p>
          </div>

          <div v-else class="flex flex-col gap-4">
            <div
              v-for="(thesis, idx) in searchStore.result.similar_titles"
              :key="thesis.eprintid || idx"
              class="bg-surface-container-lowest p-6 rounded-xl hover:-translate-y-0.5 flex justify-between items-start border border-transparent hover:border-primary-fixed-dim transition-all shadow-sm"
            >
              <div class="space-y-2 flex-1 min-w-0 pr-4">
                <h4 class="text-body-lg font-bold text-primary leading-snug">{{ thesis.title }}</h4>
                <div class="flex flex-wrap items-center gap-4 text-label-md text-on-surface-variant">
                  <span v-if="thesis.year" class="flex items-center gap-1">
                    <span class="material-symbols-outlined text-[16px]">calendar_today</span>
                    {{ thesis.year }}
                  </span>
                </div>
                <button
                  v-if="thesis.eprintid"
                  @click="openDetail(thesis.eprintid)"
                  class="inline-block pt-2 text-primary font-label-md hover:underline"
                >Lihat Detail</button>
              </div>
              <div class="flex flex-col items-center gap-1 shrink-0">
                <div
                  class="w-12 h-12 rounded-full border-[3px] flex items-center justify-center"
                  :style="{ borderColor: similarityBorderColor(thesis.score) }"
                >
                  <span class="text-label-sm font-bold" :style="{ color: similarityBorderColor(thesis.score) }">
                    {{ thesis.score != null ? Math.round(Math.min(thesis.score, 100)) + '%' : '—' }}
                  </span>
                </div>
                <span class="text-[10px] uppercase font-bold text-outline">Skor</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- Right Column: AI Verdict + Next Steps -->
      <div class="lg:col-span-4 gap-6 flex flex-col">
        <!-- Section C: Komentar AI -->
        <div class="bg-gradient-to-br from-primary-container to-primary p-8 rounded-xl text-white hover:-translate-y-0.5 transition-transform relative overflow-hidden group shadow-sm">
          <div class="absolute -right-4 -top-4 opacity-10 group-hover:scale-110 transition-transform duration-700">
            <span class="material-symbols-outlined text-[120px]" style="font-variation-settings: 'FILL' 1;">auto_awesome</span>
          </div>
          <div class="relative z-10">
            <div class="flex items-center gap-2 mb-4">
              <span class="material-symbols-outlined text-secondary-container" style="font-variation-settings: 'FILL' 1;">auto_awesome</span>
              <h3 class="text-headline-md font-headline-md">Penilaian AI</h3>
            </div>
            <!-- Score Badge -->
            <div class="mb-4 flex items-center gap-3">
              <div class="w-14 h-14 rounded-full border-4 border-white/50 flex items-center justify-center">
                <span class="text-headline-md font-bold">{{ searchStore.result.similarity_score }}</span>
              </div>
              <div>
                <p class="text-label-sm font-bold uppercase opacity-70">Skor Kemiripan</p>
                <p class="text-label-md font-bold">{{ scoreLabel.text }}</p>
              </div>
            </div>
            <p class="text-body-md leading-relaxed text-blue-100 opacity-90">
              {{ searchStore.result.verdict || 'Analisis selesai.' }}
            </p>
          </div>
        </div>

        <!-- Saran Judul Alternatif -->
        <section class="space-y-4">
          <div class="flex items-center justify-between px-2">
            <h3 class="text-headline-md font-headline-md text-on-surface">Saran Judul Alternatif</h3>
            <button
              v-if="suggestions.length"
              @click="loadSuggestions(searchQuery)"
              :disabled="loadingSuggestions"
              class="text-primary text-label-sm font-bold flex items-center gap-1 hover:underline disabled:opacity-50"
            >
              <span class="material-symbols-outlined text-[16px]" :class="{'animate-spin': loadingSuggestions}">refresh</span>
              {{ loadingSuggestions ? 'Memuat...' : 'Generate Ulang' }}
            </button>
          </div>

          <!-- Loading -->
          <div v-if="loadingSuggestions" class="space-y-3">
            <div v-for="i in 3" :key="i" class="h-16 bg-surface-container-low rounded-xl animate-pulse"></div>
          </div>

          <!-- Error -->
          <div v-else-if="suggestionsError" class="bg-error-container text-on-error-container p-4 rounded-xl text-body-sm">
            {{ suggestionsError }}
          </div>

          <!-- Empty / Initial -->
          <div v-else-if="!suggestions.length" class="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant text-center">
            <span class="material-symbols-outlined text-outline-variant text-4xl mb-2">lightbulb</span>
            <p class="text-body-md text-on-surface-variant">Saran judul alternatif akan muncul di sini.</p>
          </div>

          <!-- Suggestions List -->
          <div v-else class="space-y-3">
            <div
              v-for="(title, idx) in suggestions"
              :key="idx"
              class="bg-surface-container-lowest p-4 rounded-xl shadow-sm border border-outline-variant flex gap-4 items-start hover:-translate-y-0.5 transition-transform"
            >
              <div class="w-10 h-10 rounded-lg bg-secondary-container flex items-center justify-center shrink-0">
                <span class="material-symbols-outlined text-primary">lightbulb</span>
              </div>
              <div class="flex-1 min-w-0">
                <h4 class="font-bold text-primary text-label-md leading-snug">{{ title }}</h4>
                <button
                  @click="reSearch(title)"
                  class="text-secondary text-label-sm mt-1 hover:underline flex items-center gap-1"
                >
                  <span class="material-symbols-outlined text-[14px]">search</span>
                  Cari Judul Ini
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>

    <!-- Empty (no query) -->
    <div v-else class="flex flex-col items-center justify-center py-32 gap-4 text-center">
      <span class="material-symbols-outlined text-5xl text-outline-variant">manage_search</span>
      <p class="text-body-md text-on-surface-variant">Masukkan ide topik skripsi untuk mulai analisis.</p>
    </div>
  </main>
</template>
