<script setup>
import Navbar from '../../components/admin/navbar.vue'
import Footer from '../../components/admin/footer.vue'

const statCards = [
  { title: 'Total Skripsi', value: '1,248', icon: 'book', colorClass: 'text-primary bg-primary/5', change: '+4.2%', changeClass: 'text-green-600 bg-green-50' },
  { title: 'Total Klaster', value: '18', icon: 'hub', colorClass: 'text-secondary bg-secondary/5', change: 'Optimal', changeClass: 'text-secondary bg-secondary/5' },
  { title: 'Pencarian Bulan Ini', value: '342', icon: 'search', colorClass: 'text-on-primary-container bg-primary-fixed', change: 'High', changeClass: 'text-primary bg-primary-fixed' },
  { title: 'Klaster Jenuh', value: '3', icon: 'warning', colorClass: 'text-[#C77700] bg-orange-50', change: 'Attention', changeClass: 'text-[#C77700] bg-orange-50' },
]

const clusters = [
  { name: 'Kecerdasan Buatan (AI)', items: 245, percentage: 85, saturated: false },
  { name: 'Sistem Informasi Geografis', items: 198, percentage: 95, saturated: true },
  { name: 'Jaringan & Keamanan', items: 162, percentage: 60, saturated: false },
  { name: 'Interaksi Manusia & Komputer', items: 144, percentage: 55, saturated: false },
]
</script>

<template>
  <div class="flex min-h-screen text-on-surface bg-[#EAF0F8]">
    <Navbar />
    
    <main class="ml-[240px] flex-1 flex flex-col relative z-0">
      <!-- Dashboard Canvas -->
      <div class="p-8 space-y-8 max-w-[1400px] mx-auto w-full">
        <!-- Stat Cards Row -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="stat in statCards" :key="stat.title" class="bg-white p-6 rounded-xl shadow-[0px_2px_4px_rgba(31,56,100,0.05)] border border-primary/5 hover:shadow-[0px_12px_24px_rgba(31,56,100,0.08)] transition-all flex flex-col gap-2">
            <div class="flex items-center justify-between">
              <span class="material-symbols-outlined p-2 rounded-lg" :class="stat.colorClass" style="font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;">{{ stat.icon }}</span>
              <span class="text-xs font-bold px-2 py-1 rounded-full" :class="stat.changeClass">{{ stat.change }}</span>
            </div>
            <div class="mt-4">
              <h4 class="text-[28px] font-bold tracking-tight" :class="stat.title === 'Klaster Jenuh' ? 'text-[#C77700]' : 'text-primary'">{{ stat.value }}</h4>
              <p class="font-label-md text-label-md text-on-surface-variant/70">{{ stat.title }}</p>
            </div>
          </div>
        </div>

        <!-- Distribution Section -->
        <div class="grid grid-cols-1 lg:grid-cols-10 gap-8">
          <div class="lg:col-span-6 bg-white p-8 rounded-xl shadow-[0px_2px_4px_rgba(31,56,100,0.05)] border border-primary/5">
            <div class="flex justify-between items-center mb-8">
              <h3 class="font-headline-md text-headline-md text-primary font-bold">Distribusi Klaster</h3>
              <button class="text-primary text-sm font-semibold flex items-center gap-1 hover:underline">
                Filter
                <span class="material-symbols-outlined text-sm">expand_more</span>
              </button>
            </div>
            
            <div class="space-y-6">
              <div v-for="cluster in clusters" :key="cluster.name" class="space-y-1.5">
                <div class="flex justify-between text-sm font-medium">
                  <span class="text-on-surface-variant">{{ cluster.name }}</span>
                  <span :class="cluster.saturated ? 'text-[#C62828] font-bold' : 'text-primary'">{{ cluster.items }} Items {{ cluster.saturated ? '(Jenuh)' : '' }}</span>
                </div>
                <div class="w-full bg-surface-container-low h-3 rounded-full overflow-hidden">
                  <div :class="cluster.saturated ? 'bg-[#C62828]' : 'bg-[#2E5395]'" class="h-full rounded-full transition-all duration-1000 ease-out" :style="{ width: cluster.percentage + '%' }"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  </div>
</template>
