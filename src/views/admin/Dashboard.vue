<script setup>
import { ref, onMounted } from 'vue'
import AdminFooter from '@/components/admin/footer.vue'
import AdminTopbar from '@/components/admin/topbar.vue'

const showBars = ref(false)

onMounted(() => {
  setTimeout(() => {
    showBars.value = true
  }, 300)
})
</script>

<template>
  <div class="flex min-h-screen text-on-surface bg-[#EAF0F8]">
    <!-- SideNavBar -->
    <aside class="fixed left-0 top-0 h-screen w-[240px] bg-primary-container flex flex-col py-6 px-4 shadow-sm z-50">
      <!-- Brand Header -->
      <div class="mb-10 px-2">
        <h1 class="font-headline-md text-headline-md font-bold text-on-primary-container leading-tight">Smart Repositori TA</h1>
        <p class="font-label-md text-label-md text-on-primary-container/60 mt-1 uppercase tracking-wider">Academic Admin</p>
      </div>
      <!-- Navigation Links -->
      <nav class="flex-1 space-y-2">
        <a class="flex items-center gap-3 px-4 py-3 bg-secondary-container text-on-secondary-container rounded-lg font-bold transition-all scale-95 duration-200" href="#">
          <span class="material-symbols-outlined" data-icon="dashboard">dashboard</span>
          <span class="font-label-md text-label-md">Dashboard</span>
        </a>
        <a class="flex items-center gap-3 px-4 py-3 text-on-primary-container/70 hover:text-on-primary-container hover:bg-primary/50 transition-colors duration-200 rounded-lg" href="#">
          <span class="material-symbols-outlined" data-icon="description">description</span>
          <span class="font-label-md text-label-md">Data Skripsi</span>
        </a>
        <a class="flex items-center gap-3 px-4 py-3 text-on-primary-container/70 hover:text-on-primary-container hover:bg-primary/50 transition-colors duration-200 rounded-lg" href="#">
          <span class="material-symbols-outlined" data-icon="cluster">flutter</span>
          <span class="font-label-md text-label-md">Klaster</span>
        </a>
        <a class="flex items-center gap-3 px-4 py-3 text-on-primary-container/70 hover:text-on-primary-container hover:bg-primary/50 transition-colors duration-200 rounded-lg" href="#">
          <span class="material-symbols-outlined" data-icon="history">history</span>
          <span class="font-label-md text-label-md">Riwayat Pencarian</span>
        </a>
        <a class="flex items-center gap-3 px-4 py-3 text-on-primary-container/70 hover:text-on-primary-container hover:bg-primary/50 transition-colors duration-200 rounded-lg" href="#">
          <span class="material-symbols-outlined" data-icon="settings">settings</span>
          <span class="font-label-md text-label-md">Pengaturan</span>
        </a>
      </nav>
      <!-- Footer Tab -->
      <div class="mt-auto border-t border-on-primary-container/10 pt-6">
        <a class="flex items-center gap-3 px-4 py-3 text-on-primary-container/70 hover:text-on-primary-container hover:bg-primary/50 transition-colors duration-200 rounded-lg" href="#">
          <span class="material-symbols-outlined" data-icon="account_circle">account_circle</span>
          <span class="font-label-md text-label-md">Profile</span>
        </a>
      </div>
    </aside>
    
    <!-- Main Content Area -->
    <main class="ml-[240px] flex-1 flex flex-col w-full">
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
          <!-- Stat Card 1 -->
          <div class="bg-white p-6 rounded-xl shadow-[0px_2px_4px_rgba(31,56,100,0.05)] border border-primary/5 hover:shadow-[0px_12px_24px_rgba(31,56,100,0.08)] transition-all flex flex-col gap-2">
            <div class="flex items-center justify-between">
              <span class="material-symbols-outlined text-primary bg-primary/5 p-2 rounded-lg" data-icon="book">book</span>
              <span class="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">+4.2%</span>
            </div>
            <div class="mt-4">
              <h4 class="text-[28px] font-bold text-primary tracking-tight">1,248</h4>
              <p class="font-label-md text-label-md text-on-surface-variant/70">Total Skripsi</p>
            </div>
          </div>
          <!-- Stat Card 2 -->
          <div class="bg-white p-6 rounded-xl shadow-[0px_2px_4px_rgba(31,56,100,0.05)] border border-primary/5 hover:shadow-[0px_12px_24px_rgba(31,56,100,0.08)] transition-all flex flex-col gap-2">
            <div class="flex items-center justify-between">
              <span class="material-symbols-outlined text-secondary bg-secondary/5 p-2 rounded-lg" data-icon="hub">hub</span>
              <span class="text-xs font-bold text-secondary bg-secondary/5 px-2 py-1 rounded-full">Optimal</span>
            </div>
            <div class="mt-4">
              <h4 class="text-[28px] font-bold text-primary tracking-tight">18</h4>
              <p class="font-label-md text-label-md text-on-surface-variant/70">Total Klaster</p>
            </div>
          </div>
          <!-- Stat Card 3 -->
          <div class="bg-white p-6 rounded-xl shadow-[0px_2px_4px_rgba(31,56,100,0.05)] border border-primary/5 hover:shadow-[0px_12px_24px_rgba(31,56,100,0.08)] transition-all flex flex-col gap-2">
            <div class="flex items-center justify-between">
              <span class="material-symbols-outlined text-on-primary-container bg-primary-fixed p-2 rounded-lg" data-icon="search">search</span>
              <span class="text-xs font-bold text-primary bg-primary-fixed px-2 py-1 rounded-full">High</span>
            </div>
            <div class="mt-4">
              <h4 class="text-[28px] font-bold text-primary tracking-tight">342</h4>
              <p class="font-label-md text-label-md text-on-surface-variant/70">Pencarian Bulan Ini</p>
            </div>
          </div>
          <!-- Stat Card 4 -->
          <div class="bg-white p-6 rounded-xl shadow-[0px_2px_4px_rgba(31,56,100,0.05)] border border-primary/5 hover:shadow-[0px_12px_24px_rgba(31,56,100,0.08)] transition-all flex flex-col gap-2">
            <div class="flex items-center justify-between">
              <span class="material-symbols-outlined text-[#C77700] bg-orange-50 p-2 rounded-lg" data-icon="warning">warning</span>
              <span class="text-xs font-bold text-[#C77700] bg-orange-50 px-2 py-1 rounded-full">Attention</span>
            </div>
            <div class="mt-4">
              <h4 class="text-[28px] font-bold text-[#C77700] tracking-tight">3</h4>
              <p class="font-label-md text-label-md text-on-surface-variant/70">Klaster Jenuh</p>
            </div>
          </div>
        </div>
        
        <!-- Middle Section: Chart & Timeline -->
        <div class="grid grid-cols-1 lg:grid-cols-10 gap-8">
          <!-- Left: Distribusi Klaster (60%) -->
          <div class="lg:col-span-6 bg-white p-8 rounded-xl shadow-[0px_2px_4px_rgba(31,56,100,0.05)] border border-primary/5">
            <div class="flex justify-between items-center mb-8">
              <h3 class="font-headline-md text-headline-md text-primary font-bold">Distribusi Klaster</h3>
              <button class="text-primary text-sm font-semibold flex items-center gap-1 hover:underline">
                Filter
                <span class="material-symbols-outlined text-sm" data-icon="expand_more">expand_more</span>
              </button>
            </div>
            <div class="space-y-6">
              <!-- Horizontal Bar Chart -->
              <div class="space-y-4">
                <!-- Cluster Row 1 -->
                <div class="space-y-1.5">
                  <div class="flex justify-between text-sm font-medium">
                    <span class="text-on-surface-variant">Kecerdasan Buatan (AI)</span>
                    <span class="text-primary">245 Items</span>
                  </div>
                  <div class="w-full bg-surface-container-low h-3 rounded-full overflow-hidden">
                    <div class="bg-[#2E5395] h-full rounded-full transition-all duration-1000 ease-out" :style="{ width: showBars ? '85%' : '0%' }"></div>
                  </div>
                </div>
                <!-- Cluster Row 2 (Saturated) -->
                <div class="space-y-1.5">
                  <div class="flex justify-between text-sm font-medium">
                    <span class="text-on-surface-variant">Sistem Informasi Geografis</span>
                    <span class="text-[#C62828] font-bold">198 Items (Jenuh)</span>
                  </div>
                  <div class="w-full bg-surface-container-low h-3 rounded-full overflow-hidden">
                    <div class="bg-[#C62828] h-full rounded-full transition-all duration-1000 ease-out" :style="{ width: showBars ? '95%' : '0%' }"></div>
                  </div>
                </div>
                <!-- Cluster Row 3 -->
                <div class="space-y-1.5">
                  <div class="flex justify-between text-sm font-medium">
                    <span class="text-on-surface-variant">Jaringan &amp; Keamanan</span>
                    <span class="text-primary">162 Items</span>
                  </div>
                  <div class="w-full bg-surface-container-low h-3 rounded-full overflow-hidden">
                    <div class="bg-[#2E5395] h-full rounded-full transition-all duration-1000 ease-out" :style="{ width: showBars ? '60%' : '0%' }"></div>
                  </div>
                </div>
                <!-- Cluster Row 4 -->
                <div class="space-y-1.5">
                  <div class="flex justify-between text-sm font-medium">
                    <span class="text-on-surface-variant">Interaksi Manusia &amp; Komputer</span>
                    <span class="text-primary">144 Items</span>
                  </div>
                  <div class="w-full bg-surface-container-low h-3 rounded-full overflow-hidden">
                    <div class="bg-[#2E5395] h-full rounded-full transition-all duration-1000 ease-out" :style="{ width: showBars ? '55%' : '0%' }"></div>
                  </div>
                </div>
                <!-- Cluster Row 5 (Saturated) -->
                <div class="space-y-1.5">
                  <div class="flex justify-between text-sm font-medium">
                    <span class="text-on-surface-variant">Data Mining &amp; Big Data</span>
                    <span class="text-[#C62828] font-bold">132 Items (Jenuh)</span>
                  </div>
                  <div class="w-full bg-surface-container-low h-3 rounded-full overflow-hidden">
                    <div class="bg-[#C62828] h-full rounded-full transition-all duration-1000 ease-out" :style="{ width: showBars ? '90%' : '0%' }"></div>
                  </div>
                </div>
                <!-- Cluster Row 6 -->
                <div class="space-y-1.5">
                  <div class="flex justify-between text-sm font-medium">
                    <span class="text-on-surface-variant">Cloud Computing</span>
                    <span class="text-primary">92 Items</span>
                  </div>
                  <div class="w-full bg-surface-container-low h-3 rounded-full overflow-hidden">
                    <div class="bg-[#2E5395] h-full rounded-full transition-all duration-1000 ease-out" :style="{ width: showBars ? '40%' : '0%' }"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Right: Aktivitas Terbaru (40%) -->
          <div class="lg:col-span-4 bg-white p-8 rounded-xl shadow-[0px_2px_4px_rgba(31,56,100,0.05)] border border-primary/5">
            <h3 class="font-headline-md text-headline-md text-primary font-bold mb-8">Aktivitas Terbaru</h3>
            <div class="relative space-y-8 before:absolute before:inset-0 before:ml-4 before:h-full before:w-0.5 before:bg-surface-container">
              <!-- Activity 1 -->
              <div class="relative flex items-start gap-6 pl-10">
                <span class="absolute left-0 top-1.5 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white ring-4 ring-white z-10">
                  <span class="material-symbols-outlined text-[16px]" data-icon="add">add</span>
                </span>
                <div>
                  <p class="text-sm font-bold text-on-surface">Skripsi baru ditambahkan</p>
                  <p class="text-xs text-on-surface-variant mt-0.5">Oleh Admin Utama</p>
                  <p class="text-xs text-secondary mt-1 font-medium">2 menit yang lalu</p>
                </div>
              </div>
              <!-- Activity 2 -->
              <div class="relative flex items-start gap-6 pl-10">
                <span class="absolute left-0 top-1.5 w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-white ring-4 ring-white z-10">
                  <span class="material-symbols-outlined text-[16px]" data-icon="refresh">refresh</span>
                </span>
                <div>
                  <p class="text-sm font-bold text-on-surface">Re-clustering selesai</p>
                  <p class="text-xs text-on-surface-variant mt-0.5">Sistem otomatis</p>
                  <p class="text-xs text-secondary mt-1 font-medium">15 menit yang lalu</p>
                </div>
              </div>
              <!-- Activity 3 -->
              <div class="relative flex items-start gap-6 pl-10">
                <span class="absolute left-0 top-1.5 w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white ring-4 ring-white z-10">
                  <span class="material-symbols-outlined text-[16px]" data-icon="check_circle">check_circle</span>
                </span>
                <div>
                  <p class="text-sm font-bold text-on-surface">Validasi data skripsi</p>
                  <p class="text-xs text-on-surface-variant mt-0.5">Oleh Budi Santoso</p>
                  <p class="text-xs text-secondary mt-1 font-medium">1 jam yang lalu</p>
                </div>
              </div>
              <!-- Activity 4 -->
              <div class="relative flex items-start gap-6 pl-10">
                <span class="absolute left-0 top-1.5 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary ring-4 ring-white z-10">
                  <span class="material-symbols-outlined text-[16px]" data-icon="search">search</span>
                </span>
                <div>
                  <p class="text-sm font-bold text-on-surface">Lonjakan pencarian terdeteksi</p>
                  <p class="text-xs text-on-surface-variant mt-0.5">Keyword: "Artificial Intelligence"</p>
                  <p class="text-xs text-secondary mt-1 font-medium">3 jam yang lalu</p>
                </div>
              </div>
              <!-- Activity 5 -->
              <div class="relative flex items-start gap-6 pl-10">
                <span class="absolute left-0 top-1.5 w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 ring-4 ring-white z-10">
                  <span class="material-symbols-outlined text-[16px]" data-icon="delete">delete</span>
                </span>
                <div>
                  <p class="text-sm font-bold text-on-surface">Skripsi dihapus</p>
                  <p class="text-xs text-on-surface-variant mt-0.5">ID: #TA-2023-004</p>
                  <p class="text-xs text-secondary mt-1 font-medium">Kemarin, 14:20</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Bottom Section: Data Table -->
        <div class="bg-white rounded-xl shadow-[0px_2px_4px_rgba(31,56,100,0.05)] border border-primary/5 overflow-hidden">
          <div class="px-8 py-6 border-b border-surface-container-low flex justify-between items-center bg-white">
            <h3 class="font-headline-md text-headline-md text-primary font-bold">Data Skripsi Terbaru</h3>
            <div class="flex gap-4">
              <div class="relative">
                <input class="pl-10 pr-4 py-2 border border-outline-variant/30 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-surface-container-low" placeholder="Cari skripsi..." type="text"/>
                <span class="material-symbols-outlined absolute left-3 top-2.5 text-on-surface-variant text-[18px]" data-icon="search">search</span>
              </div>
            </div>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead class="bg-surface-container-low/50">
                <tr>
                  <th class="px-8 py-4 font-bold text-primary text-sm">Judul</th>
                  <th class="px-6 py-4 font-bold text-primary text-sm">Penulis</th>
                  <th class="px-6 py-4 font-bold text-primary text-sm">Prodi</th>
                  <th class="px-6 py-4 font-bold text-primary text-sm">Tahun</th>
                  <th class="px-6 py-4 font-bold text-primary text-sm">Klaster</th>
                  <th class="px-8 py-4 font-bold text-primary text-sm text-center">Aksi</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-surface-container-low">
                <tr class="hover:bg-primary/5 transition-colors group">
                  <td class="px-8 py-5 text-sm font-medium text-on-surface max-w-xs truncate">Penerapan CNN untuk Deteksi Kanker Paru-paru</td>
                  <td class="px-6 py-5 text-sm text-on-surface-variant">Ahmad Syarif</td>
                  <td class="px-6 py-5 text-sm text-on-surface-variant">Teknik Informatika</td>
                  <td class="px-6 py-5 text-sm text-on-surface-variant">2024</td>
                  <td class="px-6 py-5">
                    <span class="px-3 py-1 bg-[#2E5395]/10 text-[#2E5395] rounded-full text-xs font-bold">AI &amp; Vision</span>
                  </td>
                  <td class="px-8 py-5">
                    <div class="flex items-center justify-center gap-3">
                      <button class="p-2 text-primary hover:bg-primary hover:text-white rounded-lg transition-all">
                        <span class="material-symbols-outlined text-[18px]" data-icon="edit">edit</span>
                      </button>
                      <button class="p-2 text-red-600 hover:bg-red-600 hover:text-white rounded-lg transition-all">
                        <span class="material-symbols-outlined text-[18px]" data-icon="delete">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
                <tr class="hover:bg-primary/5 transition-colors">
                  <td class="px-8 py-5 text-sm font-medium text-on-surface max-w-xs truncate">Analisis Keamanan Jaringan WPA3 pada Kantor</td>
                  <td class="px-6 py-5 text-sm text-on-surface-variant">Riska Amalia</td>
                  <td class="px-6 py-5 text-sm text-on-surface-variant">Sistem Informasi</td>
                  <td class="px-6 py-5 text-sm text-on-surface-variant">2024</td>
                  <td class="px-6 py-5">
                    <span class="px-3 py-1 bg-[#2E5395]/10 text-[#2E5395] rounded-full text-xs font-bold">Networking</span>
                  </td>
                  <td class="px-8 py-5">
                    <div class="flex items-center justify-center gap-3">
                      <button class="p-2 text-primary hover:bg-primary hover:text-white rounded-lg transition-all">
                        <span class="material-symbols-outlined text-[18px]" data-icon="edit">edit</span>
                      </button>
                      <button class="p-2 text-red-600 hover:bg-red-600 hover:text-white rounded-lg transition-all">
                        <span class="material-symbols-outlined text-[18px]" data-icon="delete">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
                <tr class="hover:bg-primary/5 transition-colors">
                  <td class="px-8 py-5 text-sm font-medium text-on-surface max-w-xs truncate">Sistem Pakar Diagnosa Penyakit Tanaman Padi</td>
                  <td class="px-6 py-5 text-sm text-on-surface-variant">Fahmi Azis</td>
                  <td class="px-6 py-5 text-sm text-on-surface-variant">Teknik Informatika</td>
                  <td class="px-6 py-5 text-sm text-on-surface-variant">2023</td>
                  <td class="px-6 py-5">
                    <span class="px-3 py-1 bg-[#C62828]/10 text-[#C62828] rounded-full text-xs font-bold">Expert System</span>
                  </td>
                  <td class="px-8 py-5">
                    <div class="flex items-center justify-center gap-3">
                      <button class="p-2 text-primary hover:bg-primary hover:text-white rounded-lg transition-all">
                        <span class="material-symbols-outlined text-[18px]" data-icon="edit">edit</span>
                      </button>
                      <button class="p-2 text-red-600 hover:bg-red-600 hover:text-white rounded-lg transition-all">
                        <span class="material-symbols-outlined text-[18px]" data-icon="delete">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
                <tr class="hover:bg-primary/5 transition-colors">
                  <td class="px-8 py-5 text-sm font-medium text-on-surface max-w-xs truncate">Visualisasi Data Persebaran COVID-19 Berbasis Web</td>
                  <td class="px-6 py-5 text-sm text-on-surface-variant">Dian Pratama</td>
                  <td class="px-6 py-5 text-sm text-on-surface-variant">Sains Data</td>
                  <td class="px-6 py-5 text-sm text-on-surface-variant">2023</td>
                  <td class="px-6 py-5">
                    <span class="px-3 py-1 bg-[#2E5395]/10 text-[#2E5395] rounded-full text-xs font-bold">GIS &amp; Data</span>
                  </td>
                  <td class="px-8 py-5">
                    <div class="flex items-center justify-center gap-3">
                      <button class="p-2 text-primary hover:bg-primary hover:text-white rounded-lg transition-all">
                        <span class="material-symbols-outlined text-[18px]" data-icon="edit">edit</span>
                      </button>
                      <button class="p-2 text-red-600 hover:bg-red-600 hover:text-white rounded-lg transition-all">
                        <span class="material-symbols-outlined text-[18px]" data-icon="delete">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
                <tr class="hover:bg-primary/5 transition-colors">
                  <td class="px-8 py-5 text-sm font-medium text-on-surface max-w-xs truncate">Optimasi Penjadwalan Bus dengan Algoritma Genetika</td>
                  <td class="px-6 py-5 text-sm text-on-surface-variant">Siti Aminah</td>
                  <td class="px-6 py-5 text-sm text-on-surface-variant">Teknik Informatika</td>
                  <td class="px-6 py-5 text-sm text-on-surface-variant">2023</td>
                  <td class="px-6 py-5">
                    <span class="px-3 py-1 bg-[#2E5395]/10 text-[#2E5395] rounded-full text-xs font-bold">Optimization</span>
                  </td>
                  <td class="px-8 py-5">
                    <div class="flex items-center justify-center gap-3">
                      <button class="p-2 text-primary hover:bg-primary hover:text-white rounded-lg transition-all">
                        <span class="material-symbols-outlined text-[18px]" data-icon="edit">edit</span>
                      </button>
                      <button class="p-2 text-red-600 hover:bg-red-600 hover:text-white rounded-lg transition-all">
                        <span class="material-symbols-outlined text-[18px]" data-icon="delete">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="px-8 py-4 bg-surface-container-low/30 border-t border-surface-container-low text-right">
            <a class="text-primary font-bold text-sm hover:underline inline-flex items-center gap-1" href="#">
              Lihat Semua
              <span class="material-symbols-outlined text-[18px]" data-icon="chevron_right">chevron_right</span>
            </a>
          </div>
        </div>
      </div>
    <AdminFooter />

    </main>

  </div>
</template>
