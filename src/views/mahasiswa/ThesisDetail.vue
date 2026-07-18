<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { get } from '@/services/api'

const route = useRoute()
const router = useRouter()

const id = route.query.id
const record = ref(null)
const files = ref([])
const isLoading = ref(true)
const error = ref(null)
const pdfUrl = ref(null)

const goBack = () => {
  router.back()
}

// Derive PDF proxy URL
const pdfProxyUrl = computed(() => {
  if (!id) return null
  return `/api/record/${id}/pdf`
})

onMounted(async () => {
  if (!id) {
    error.value = 'ID skripsi tidak ditemukan.'
    isLoading.value = false
    return
  }

  try {
    const [rec, fileData] = await Promise.all([
      get(`/api/record/${id}`),
      get(`/api/record/${id}/files`).catch(() => ({ files: [], pages: null })),
    ])
    record.value = rec
    files.value = fileData.files || []
    // Set PDF URL
    pdfUrl.value = pdfProxyUrl.value
  } catch (e) {
    error.value = e.message || 'Gagal mengambil detail skripsi.'
  } finally {
    isLoading.value = false
  }
})

function formatCreators(creators) {
  if (!creators || !creators.length) return '—'
  if (Array.isArray(creators)) return creators.join(', ')
  return String(creators)
}

function formatSubjects(subjects) {
  if (!subjects || !subjects.length) return []
  return Array.isArray(subjects) ? subjects : [String(subjects)]
}
</script>

<template>
  <main class="flex-grow max-w-container-max mx-auto px-margin-desktop py-stack-lg w-full">
    <!-- Breadcrumb Row -->
    <nav @click="goBack" class="flex items-center w-fit mb-stack-lg gap-2 group cursor-pointer">
      <span class="material-symbols-outlined text-primary group-hover:-translate-x-1 transition-transform">arrow_back</span>
      <span class="text-label-md font-label-md text-primary">Kembali ke Hasil Pencarian</span>
    </nav>

    <!-- Loading Skeleton -->
    <div v-if="isLoading" class="grid grid-cols-1 lg:grid-cols-10 gap-gutter">
      <div class="lg:col-span-6">
        <div class="bg-surface-container-low rounded-xl min-h-[600px] animate-pulse"></div>
      </div>
      <div class="lg:col-span-4 space-y-gutter">
        <div v-for="i in 4" :key="i" class="h-32 bg-surface-container-low rounded-xl animate-pulse"></div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="flex flex-col items-center justify-center py-24 gap-4 text-center">
      <span class="material-symbols-outlined text-error text-5xl">error_outline</span>
      <p class="text-headline-md font-headline-md text-on-surface">Skripsi tidak ditemukan</p>
      <p class="text-body-md text-on-surface-variant">{{ error }}</p>
      <button @click="goBack" class="mt-2 px-6 py-3 bg-primary text-white rounded-xl font-label-md">Kembali</button>
    </div>

    <!-- Two-Column Layout -->
    <div v-else-if="record" class="grid grid-cols-1 lg:grid-cols-10 gap-gutter">
      <!-- LEFT COLUMN: PDF Preview Panel (60%) -->
      <div class="lg:col-span-6 space-y-gutter">
        <div class="bg-[#F5F5F5] rounded-xl p-stack-md flex flex-col items-center custom-shadow border border-surface-variant" style="min-height: 700px">
          <!-- PDF Toolbar -->
          <div class="w-full bg-white rounded-lg p-2 mb-stack-lg flex items-center justify-between shadow-sm">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-primary">picture_as_pdf</span>
              <span class="text-label-md font-label-md truncate max-w-[200px]">{{ record.title }}</span>
            </div>
            <a
              v-if="pdfUrl"
              :href="pdfUrl"
              target="_blank"
              download
              class="flex items-center gap-2 bg-primary text-white px-4 py-1.5 rounded-lg text-label-md font-label-md hover:opacity-90 transition-all"
            >
              <span class="material-symbols-outlined text-[18px]">download</span>
              Unduh
            </a>
          </div>

          <!-- PDF Iframe Viewer -->
          <div class="w-full flex-1 rounded-xl overflow-hidden bg-white shadow-lg" style="min-height: 600px">
            <iframe
              v-if="pdfUrl"
              :src="pdfUrl"
              class="w-full h-full"
              style="min-height: 600px; border: none;"
              title="PDF Preview"
            ></iframe>
            <div v-else class="flex flex-col items-center justify-center h-full py-24 gap-4 text-center">
              <span class="material-symbols-outlined text-5xl text-outline-variant">picture_as_pdf</span>
              <p class="text-body-md text-on-surface-variant">File PDF tidak tersedia untuk skripsi ini.</p>
            </div>
          </div>

          <!-- PDF file list -->
          <div v-if="files.length > 1" class="flex gap-stack-md pb-stack-sm overflow-x-auto w-full px-stack-md justify-start mt-4">
            <a
              v-for="(file, idx) in files"
              :key="idx"
              :href="`/api/pdf?url=${encodeURIComponent(file)}`"
              target="_blank"
              class="flex-shrink-0 px-3 py-1.5 bg-white border border-surface-variant rounded-lg text-label-sm text-primary hover:border-primary transition-colors"
            >
              File {{ idx + 1 }}
            </a>
          </div>
        </div>
      </div>

      <!-- RIGHT COLUMN: Sidebar (40%) -->
      <div class="lg:col-span-4 space-y-gutter">
        <!-- Card 1: Informasi Skripsi -->
        <div class="bg-white rounded-xl p-stack-lg shadow-sm border border-surface-variant">
          <h3 class="text-label-sm font-label-sm text-outline uppercase tracking-wider mb-stack-sm">Informasi Skripsi</h3>
          <h2 class="text-headline-md font-headline-md text-primary mb-stack-md leading-tight">{{ record.title }}</h2>
          <div class="space-y-stack-md">
            <div class="grid grid-cols-2 gap-stack-sm">
              <div>
                <p class="text-label-sm font-label-sm text-on-surface-variant">Penulis</p>
                <p class="text-label-md font-bold text-on-surface">{{ formatCreators(record.creators) }}</p>
              </div>
              <div>
                <p class="text-label-sm font-label-sm text-on-surface-variant">Tahun</p>
                <p class="text-label-md font-bold text-on-surface">{{ record.year || '—' }}</p>
              </div>
            </div>
            <div v-if="record.division">
              <p class="text-label-sm font-label-sm text-on-surface-variant">Program Studi / Divisi</p>
              <p class="text-label-md font-bold text-on-surface">{{ record.division }}</p>
            </div>
            <div v-if="record.type">
              <p class="text-label-sm font-label-sm text-on-surface-variant">Tipe Dokumen</p>
              <p class="text-label-md font-bold text-on-surface capitalize">{{ record.type }}</p>
            </div>
          </div>
        </div>

        <!-- Card 2: Subjects / Tags -->
        <div v-if="formatSubjects(record.subjects).length" class="bg-white rounded-xl p-stack-lg shadow-sm border border-surface-variant">
          <h3 class="text-label-sm font-label-sm text-outline uppercase tracking-wider mb-stack-sm">Kata Kunci / Subjek</h3>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="sub in formatSubjects(record.subjects)"
              :key="sub"
              class="px-3 py-1 bg-primary/10 text-primary rounded-full text-label-sm font-bold"
            >{{ sub }}</span>
          </div>
        </div>

        <!-- Card 3: Abstrak -->
        <div v-if="record.abstract || record.description" class="bg-white rounded-xl p-stack-lg shadow-sm border border-surface-variant">
          <h3 class="text-label-sm font-label-sm text-outline uppercase mb-stack-sm">Abstrak</h3>
          <div class="max-h-40 overflow-y-auto pr-2">
            <p class="text-body-md font-body-md text-on-surface-variant leading-relaxed">
              {{ record.abstract || record.description }}
            </p>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-col gap-stack-md pt-stack-sm">
          <a
            :href="pdfUrl || '#'"
            :class="pdfUrl ? 'bg-[#1F3864] hover:bg-primary' : 'bg-surface-container-high cursor-not-allowed opacity-50'"
            target="_blank"
            class="w-full text-white h-[52px] rounded-xl font-bold flex items-center justify-center gap-stack-sm transition-all shadow-md active:scale-[0.98]"
          >
            <span class="material-symbols-outlined">picture_as_pdf</span>
            Unduh PDF Lengkap
          </a>
          <a
            v-if="record.uri"
            :href="record.uri"
            target="_blank"
            class="w-full border-2 border-secondary text-secondary h-[52px] rounded-xl font-bold flex items-center justify-center gap-stack-sm hover:bg-secondary-fixed transition-all active:scale-[0.98]"
          >
            <span class="material-symbols-outlined">open_in_new</span>
            Buka di Repositori
          </a>
        </div>
      </div>
    </div>
  </main>
</template>
