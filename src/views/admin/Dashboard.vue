<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import AdminTopbar from '@/components/admin/topbar.vue'
import { get } from '@/services/api'

const showBars = ref(false)
const trends = ref(null)
const records = ref([])
const isLoadingTrends = ref(true)
const isLoadingRecords = ref(true)
const tableSearch = ref('')
const searchTimeout = ref(null)

// Stats derived from trends
const totalSkripsi = computed(() => trends.value?.total || 0)
const totalKlaster = computed(() => trends.value?.clusters?.length || 0)
const jenuhCount = computed(() => trends.value?.clusters?.filter(c => c.saturated)?.length || 0)

// Top clusters sorted by count
const topClusters = computed(() => {
  if (!trends.value?.clusters) return []
  const sorted = [...trends.value.clusters].sort((a, b) => (b.count || 0) - (a.count || 0))
  const max = sorted[0]?.count || 1
  return sorted.slice(0, 8).map(c => ({
    ...c,
    pct: Math.round(((c.count || 0) / max) * 100),
  }))
})

async function loadTrends() {
  isLoadingTrends.value = true
  showBars.value = false
  try {
    const data = await get('/api/trends')
    trends.value = data
    setTimeout(() => { showBars.value = true }, 300)
  } catch (e) {
    console.error('Gagal load trends:', e.message)
  } finally {
    isLoadingTrends.value = false
  }
}

async function loadRecords(q = '') {
  isLoadingRecords.value = true
  try {
    if (q.trim()) {
      const data = await get('/api/search', { q: q.trim(), limit: 20 })
      records.value = data.results || []
    } else {
      const data = await get('/api/records')
      records.value = (data.records || []).slice(0, 20)
    }
  } catch (e) {
    console.error('Gagal load records:', e.message)
  } finally {
    isLoadingRecords.value = false
  }
}

watch(tableSearch, (val) => {
  clearTimeout(searchTimeout.value)
  searchTimeout.value = setTimeout(() => loadRecords(val), 500)
})

onMounted(() => {
  loadTrends()
  loadRecords()
})
</script>

<template>
  <!-- TopAppBar -->
  <AdminTopbar title="Dashboard" :show-back-button="false" :show-tabs="false">
    <template #actions>
      <router-link to="/admin/add" class="bg-primary text-white px-5 py-2.5 rounded-xl font-label-md text-label-md flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all shadow-sm">
        <span class="material-symbols-outlined text-[20px]" data-icon="add">add</span>
        Tambah Skripsi
      </router-link>
    </template>
  </AdminTopbar>

  <!-- Dashboard Canvas -->
  <div class="p-8 space-y-8 max-w-[1400px] mx-auto w-full">
    <!-- Stat Cards Row -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- Stat Card 1: Total Skripsi -->
      <div class="bg-white p-6 rounded-xl shadow-[0px_2px_4px_rgba(31,56,100,0.05)] border border-primary/5 hover:shadow-[0px_12px_24px_rgba(31,56,100,0.08)] transition-all flex flex-col gap-2">
        <div class="flex items-center justify-between">
          <span class="material-symbols-outlined text-primary bg-primary/5 p-2 rounded-lg">book</span>
          <span v-if="isLoadingTrends" class="w-12 h-5 bg-surface-container-low rounded animate-pulse"></span>
          <span v-else class="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">Live</span>
        </div>
        <div class="mt-4">
          <h4 class="text-[28px] font-bold text-primary tracking-tight">
            <span v-if="isLoadingTrends" class="inline-block w-20 h-8 bg-surface-container-low rounded animate-pulse"></span>
            <span v-else>{{ totalSkripsi.toLocaleString('id-ID') }}</span>
          </h4>
          <p class="font-label-md text-label-md text-on-surface-variant/70">Total Skripsi Terindeks</p>
        </div>
      </div>
      <!-- Stat Card 2: Total Klaster -->
      <div class="bg-white p-6 rounded-xl shadow-[0px_2px_4px_rgba(31,56,100,0.05)] border border-primary/5 hover:shadow-[0px_12px_24px_rgba(31,56,100,0.08)] transition-all flex flex-col gap-2">
        <div class="flex items-center justify-between">
          <span class="material-symbols-outlined text-secondary bg-secondary/5 p-2 rounded-lg">hub</span>
          <span class="text-xs font-bold text-secondary bg-secondary/5 px-2 py-1 rounded-full">Aktif</span>
        </div>
        <div class="mt-4">
          <h4 class="text-[28px] font-bold text-primary tracking-tight">
            <span v-if="isLoadingTrends" class="inline-block w-12 h-8 bg-surface-container-low rounded animate-pulse"></span>
            <span v-else>{{ totalKlaster }}</span>
          </h4>
          <p class="font-label-md text-label-md text-on-surface-variant/70">Total Klaster Topik</p>
        </div>
      </div>
      <!-- Stat Card 3: Records -->
      <div class="bg-white p-6 rounded-xl shadow-[0px_2px_4px_rgba(31,56,100,0.05)] border border-primary/5 hover:shadow-[0px_12px_24px_rgba(31,56,100,0.08)] transition-all flex flex-col gap-2">
        <div class="flex items-center justify-between">
          <span class="material-symbols-outlined text-on-primary-container bg-primary-fixed p-2 rounded-lg">search</span>
          <span class="text-xs font-bold text-primary bg-primary-fixed px-2 py-1 rounded-full">AI</span>
        </div>
        <div class="mt-4">
          <h4 class="text-[28px] font-bold text-primary tracking-tight">
            <span v-if="isLoadingRecords" class="inline-block w-16 h-8 bg-surface-container-low rounded animate-pulse"></span>
            <span v-else>{{ records.length }}</span>
          </h4>
          <p class="font-label-md text-label-md text-on-surface-variant/70">Data Ditampilkan</p>
        </div>
      </div>
      <!-- Stat Card 4: Jenuh -->
      <div class="bg-white p-6 rounded-xl shadow-[0px_2px_4px_rgba(31,56,100,0.05)] border border-primary/5 hover:shadow-[0px_12px_24px_rgba(31,56,100,0.08)] transition-all flex flex-col gap-2">
        <div class="flex items-center justify-between">
          <span class="material-symbols-outlined text-[#C77700] bg-orange-50 p-2 rounded-lg">warning</span>
          <span class="text-xs font-bold text-[#C77700] bg-orange-50 px-2 py-1 rounded-full">Attention</span>
        </div>
        <div class="mt-4">
          <h4 class="text-[28px] font-bold text-[#C77700] tracking-tight">
            <span v-if="isLoadingTrends" class="inline-block w-8 h-8 bg-surface-container-low rounded animate-pulse"></span>
            <span v-else>{{ jenuhCount }}</span>
          </h4>
          <p class="font-label-md text-label-md text-on-surface-variant/70">Klaster Jenuh</p>
        </div>
      </div>
    </div>

    <!-- Middle Section: Chart & Info -->
    <div class="grid grid-cols-1 lg:grid-cols-10 gap-8">
      <!-- Left: Distribusi Klaster (60%) -->
      <div class="lg:col-span-6 bg-white p-8 rounded-xl shadow-[0px_2px_4px_rgba(31,56,100,0.05)] border border-primary/5">
        <div class="flex justify-between items-center mb-8">
          <h3 class="font-headline-md text-headline-md text-primary font-bold">Distribusi Klaster</h3>
          <button @click="loadTrends" class="text-primary text-sm font-semibold flex items-center gap-1 hover:underline">
            <span class="material-symbols-outlined text-sm">refresh</span>
            Refresh
          </button>
        </div>
        <!-- Loading skeleton -->
        <div v-if="isLoadingTrends" class="space-y-5">
          <div v-for="i in 6" :key="i" class="space-y-1.5">
            <div class="h-4 bg-surface-container-low rounded animate-pulse w-3/4"></div>
            <div class="w-full bg-surface-container-low h-3 rounded-full animate-pulse"></div>
          </div>
        </div>
        <!-- No data -->
        <div v-else-if="!topClusters.length" class="flex flex-col items-center py-12 gap-3 text-center">
          <span class="material-symbols-outlined text-outline-variant text-4xl">bar_chart</span>
          <p class="text-body-md text-on-surface-variant">Data klaster belum tersedia. Backend mungkin masih sinkronisasi data awal.</p>
        </div>
        <!-- Chart -->
        <div v-else class="space-y-5">
          <div v-for="cluster in topClusters" :key="cluster.keyword || cluster.label" class="space-y-1.5">
            <div class="flex justify-between text-sm font-medium">
              <span class="text-on-surface-variant capitalize">{{ cluster.keyword || cluster.label }}</span>
              <span :class="cluster.saturated ? 'text-[#C62828] font-bold' : 'text-primary'">
                {{ cluster.count }} Items{{ cluster.saturated ? ' (Jenuh)' : '' }}
              </span>
            </div>
            <div class="w-full bg-surface-container-low h-3 rounded-full overflow-hidden">
              <div
                :class="cluster.saturated ? 'bg-[#C62828]' : 'bg-[#2E5395]'"
                class="h-full rounded-full transition-all duration-1000 ease-out"
                :style="{ width: showBars ? cluster.pct + '%' : '0%' }"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right: Info Tren (40%) -->
      <div class="lg:col-span-4 bg-white p-8 rounded-xl shadow-[0px_2px_4px_rgba(31,56,100,0.05)] border border-primary/5">
        <h3 class="font-headline-md text-headline-md text-primary font-bold mb-8">Info Tren AI</h3>
        <div v-if="isLoadingTrends" class="space-y-4">
          <div v-for="i in 4" :key="i" class="h-16 bg-surface-container-low rounded-xl animate-pulse"></div>
        </div>
        <div v-else-if="trends" class="space-y-4">
          <div v-if="trends.topKeyword" class="p-4 bg-primary/5 rounded-xl">
            <p class="text-label-sm text-on-surface-variant mb-1">Topik Terpopuler</p>
            <p class="text-body-md font-bold text-primary capitalize">{{ trends.topKeyword }}</p>
          </div>
          <div class="p-4 bg-surface-container-lowest rounded-xl border border-outline-variant">
            <p class="text-label-sm text-on-surface-variant mb-1">Status Data</p>
            <p class="text-body-md font-bold" :class="trends.cached ? 'text-secondary' : 'text-green-600'">
              {{ trends.cached ? 'Data dari cache' : 'Data real-time' }}
            </p>
          </div>
          <div v-for="cluster in topClusters.slice(0, 4)" :key="'info-' + (cluster.keyword || cluster.label)" class="flex items-center gap-3 p-3 rounded-xl border border-outline-variant/50">
            <div :class="cluster.saturated ? 'bg-red-100' : 'bg-primary/10'" class="w-8 h-8 rounded-full flex items-center justify-center shrink-0">
              <span :class="cluster.saturated ? 'text-[#C62828]' : 'text-primary'" class="material-symbols-outlined text-[16px]">
                {{ cluster.saturated ? 'warning' : 'check_circle' }}
              </span>
            </div>
            <div>
              <p class="text-label-md font-bold text-on-surface capitalize">{{ cluster.keyword || cluster.label }}</p>
              <p class="text-label-sm text-on-surface-variant">{{ cluster.count }} skripsi</p>
            </div>
          </div>
        </div>
        <div v-else class="flex flex-col items-center py-12 gap-3 text-center">
          <span class="material-symbols-outlined text-outline-variant text-4xl">analytics</span>
          <p class="text-body-md text-on-surface-variant">Data tren tidak tersedia.</p>
        </div>
      </div>
    </div>

    <!-- Bottom Section: Data Table -->
    <div class="bg-white rounded-xl shadow-[0px_2px_4px_rgba(31,56,100,0.05)] border border-primary/5 overflow-hidden">
      <div class="px-8 py-6 border-b border-surface-container-low flex justify-between items-center bg-white">
        <h3 class="font-headline-md text-headline-md text-primary font-bold">Data Skripsi</h3>
        <div class="flex gap-4">
          <div class="relative">
            <input
              v-model="tableSearch"
              class="pl-10 pr-4 py-2 border border-outline-variant/30 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-surface-container-low"
              placeholder="Cari skripsi..."
              type="text"
            />
            <span class="material-symbols-outlined absolute left-3 top-2.5 text-on-surface-variant text-[18px]">search</span>
          </div>
        </div>
      </div>
      <div class="overflow-x-auto">
        <!-- Loading skeleton -->
        <div v-if="isLoadingRecords" class="p-8 space-y-4">
          <div v-for="i in 5" :key="i" class="h-12 bg-surface-container-low rounded animate-pulse"></div>
        </div>
        <!-- Empty state -->
        <div v-else-if="!records.length" class="flex flex-col items-center py-16 gap-3 text-center">
          <span class="material-symbols-outlined text-outline-variant text-4xl">search_off</span>
          <p class="text-body-md text-on-surface-variant">Tidak ada data skripsi ditemukan.</p>
        </div>
        <!-- Table -->
        <table v-else class="w-full text-left border-collapse">
          <thead class="bg-surface-container-low/50">
            <tr>
              <th class="px-8 py-4 font-bold text-primary text-sm">Judul</th>
              <th class="px-6 py-4 font-bold text-primary text-sm">Penulis</th>
              <th class="px-6 py-4 font-bold text-primary text-sm">Tahun</th>
              <th class="px-6 py-4 font-bold text-primary text-sm">Tipe</th>
              <th class="px-8 py-4 font-bold text-primary text-sm text-center">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-surface-container-low">
            <tr v-for="rec in records" :key="rec.eprintid || rec.id" class="hover:bg-primary/5 transition-colors">
              <td class="px-8 py-5 text-sm font-medium text-on-surface max-w-xs">
                <p class="truncate">{{ rec.title || '—' }}</p>
              </td>
              <td class="px-6 py-5 text-sm text-on-surface-variant">
                {{ Array.isArray(rec.creators) ? rec.creators.join(', ') : (rec.creators || '—') }}
              </td>
              <td class="px-6 py-5 text-sm text-on-surface-variant">{{ rec.year || '—' }}</td>
              <td class="px-6 py-5">
                <span class="px-3 py-1 bg-[#2E5395]/10 text-[#2E5395] rounded-full text-xs font-bold capitalize">
                  {{ rec.type || 'thesis' }}
                </span>
              </td>
              <td class="px-8 py-5">
                <div class="flex items-center justify-center gap-3">
                  <router-link
                    :to="{ path: '/detail', query: { id: rec.eprintid } }"
                    class="p-2 text-primary hover:bg-primary hover:text-white rounded-lg transition-all"
                    title="Lihat Detail"
                  >
                    <span class="material-symbols-outlined text-[18px]">visibility</span>
                  </router-link>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
