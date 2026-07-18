<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSearchStore } from '@/stores/search'

const route = useRoute()
const router = useRouter()
const searchStore = useSearchStore()

const searchQuery = ref(route.query.q || '')
const localError = ref(null)

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

async function runSearch(q) {
  if (!q?.trim()) return
  localError.value = null
  const result = await searchStore.checkIdea(q.trim())
  if (!result) {
    localError.value = searchStore.error || 'Gagal mengambil data dari server.'
  }
}

function openDetail(id) {
  router.push({ path: '/detail', query: { id } })
}

function reSearch(idea) {
  searchQuery.value = idea
  router.push({ path: '/results', query: { q: idea } })
}

// On mount: if no result yet (fresh navigation), trigger API call
onMounted(() => {
  if (!searchStore.result || searchStore.idea !== searchQuery.value) {
    runSearch(searchQuery.value)
  }
})

// If query param changes (from clicking a suggestion title "Cari Judul Ini")
watch(() => route.query.q, (newQ) => {
  if (newQ && newQ !== searchStore.idea) {
    searchQuery.value = newQ
    runSearch(newQ)
  }
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
                    {{ thesis.score != null ? Math.round(Math.min(thesis.score * 10, 99)) + '%' : '—' }}
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

        <!-- Rekomendasi Langkah Selanjutnya -->
        <section class="space-y-4">
          <h3 class="text-headline-md font-headline-md text-on-surface px-2">Rekomendasi Langkah Selanjutnya</h3>
          <div class="space-y-3">
            <div class="bg-surface-container-lowest p-4 rounded-xl shadow-sm border border-outline-variant flex gap-4 items-start hover:-translate-y-0.5 transition-transform">
              <div class="w-10 h-10 rounded-lg bg-secondary-container flex items-center justify-center shrink-0">
                <span class="material-symbols-outlined text-primary">variable_add</span>
              </div>
              <div>
                <h4 class="font-bold text-primary text-label-md">Modifikasi Variabel</h4>
                <p class="text-label-sm text-on-surface-variant mt-1">Tambahkan variabel unik seperti sentimen eksternal atau dataset spesifik untuk meningkatkan orisinalitas.</p>
              </div>
            </div>
            <div class="bg-surface-container-lowest p-4 rounded-xl shadow-sm border border-outline-variant flex gap-4 items-start hover:-translate-y-0.5 transition-transform">
              <div class="w-10 h-10 rounded-lg bg-secondary-container flex items-center justify-center shrink-0">
                <span class="material-symbols-outlined text-primary">swap_horiz</span>
              </div>
              <div>
                <h4 class="font-bold text-primary text-label-md">Ganti Objek Penelitian</h4>
                <p class="text-label-sm text-on-surface-variant mt-1">Pertimbangkan untuk menerapkan metode pada industri yang berbeda atau studi kasus yang lebih spesifik.</p>
              </div>
            </div>
            <div class="bg-surface-container-lowest p-4 rounded-xl shadow-sm border border-outline-variant flex gap-4 items-start hover:-translate-y-0.5 transition-transform">
              <div class="w-10 h-10 rounded-lg bg-secondary-container flex items-center justify-center shrink-0">
                <span class="material-symbols-outlined text-primary">record_voice_over</span>
              </div>
              <div>
                <h4 class="font-bold text-primary text-label-md">Konsultasi Dosen</h4>
                <p class="text-label-sm text-on-surface-variant mt-1">Diskusikan sudut pandang kebaruan (novelty) dengan dosen pembimbing Anda.</p>
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
