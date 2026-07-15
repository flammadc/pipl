<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  router.back()
}
</script>

<template>
    <main class="flex-grow max-w-container-max mx-auto px-margin-desktop py-stack-lg w-full">
      <!-- Breadcrumb Row -->
      <nav @click="goBack" class="flex items-center w-fit mb-stack-lg gap-2 group cursor-pointer">
        <span class="material-symbols-outlined text-primary group-hover:-translate-x-1 transition-transform">arrow_back</span>
        <span class="text-label-md font-label-md text-primary">Kembali ke Hasil Pencarian</span>
      </nav>
      
      <!-- Two-Column Layout -->
      <div class="grid grid-cols-1 lg:grid-cols-10 gap-gutter">
        <!-- LEFT COLUMN: PDF Preview Panel (65%) -->
        <div class="lg:col-span-6 space-y-gutter">
          <div class="bg-[#F5F5F5] rounded-xl p-stack-md flex flex-col items-center custom-shadow border border-surface-variant min-h-[800px]">
            <!-- PDF Toolbar -->
            <div class="w-full bg-white rounded-lg p-2 mb-stack-lg flex items-center justify-between shadow-sm">
              <div class="flex items-center gap-4">
                <button class="p-1 hover:bg-surface-container-low rounded-md transition-colors">
                  <span class="material-symbols-outlined">chevron_left</span>
                </button>
                <span class="text-label-md font-label-md">Halaman 3 dari 58</span>
                <button class="p-1 hover:bg-surface-container-low rounded-md transition-colors">
                  <span class="material-symbols-outlined">chevron_right</span>
                </button>
              </div>
              <div class="flex items-center gap-stack-md border-l border-r border-surface-variant px-stack-md">
                <button class="p-1 hover:bg-surface-container-low rounded-md transition-colors">
                  <span class="material-symbols-outlined">zoom_out</span>
                </button>
                <span class="text-label-md font-label-md w-12 text-center">100%</span>
                <button class="p-1 hover:bg-surface-container-low rounded-md transition-colors">
                  <span class="material-symbols-outlined">zoom_in</span>
                </button>
              </div>
              <button class="flex items-center gap-2 bg-primary text-white px-4 py-1.5 rounded-lg text-label-md font-label-md hover:opacity-90 transition-all">
                <span class="material-symbols-outlined text-[18px]">download</span>
                Unduh
              </button>
            </div>
            <!-- Page Preview Canvas -->
            <div class="bg-white w-[595px] h-[842px] max-w-full shadow-lg relative p-12 overflow-hidden mb-stack-lg transition-transform hover:scale-[1.01] duration-300">
              <div class="space-y-4">
                <div class="h-6 bg-surface-container-highest w-3/4 rounded-sm"></div>
                <div class="space-y-2 pt-4">
                  <div class="h-3 bg-surface-variant w-full rounded-sm"></div>
                  <div class="h-3 bg-surface-variant w-full rounded-sm"></div>
                  <div class="h-3 bg-surface-variant w-11/12 rounded-sm"></div>
                  <div class="h-3 bg-surface-variant w-full rounded-sm"></div>
                  <div class="h-3 bg-surface-variant w-4/5 rounded-sm"></div>
                </div>
                <div class="h-4 bg-surface-container-highest w-1/2 rounded-sm pt-8"></div>
                <div class="space-y-2">
                  <div class="h-3 bg-surface-variant w-full rounded-sm"></div>
                  <div class="h-3 bg-surface-variant w-full rounded-sm"></div>
                  <div class="h-3 bg-surface-variant w-full rounded-sm"></div>
                  <div class="h-3 bg-surface-variant w-5/6 rounded-sm"></div>
                </div>
                <!-- Large placeholder image inside PDF -->
                <div class="w-full h-64 bg-surface-container mt-stack-lg rounded-lg border border-dashed border-outline-variant flex items-center justify-center">
                  <span class="material-symbols-outlined text-outline-variant text-4xl">image</span>
                </div>
              </div>
            </div>
            <!-- Bottom Thumbnail Strip -->
            <div class="flex gap-stack-md pb-stack-sm overflow-x-auto w-full px-stack-md justify-center">
              <div class="w-16 h-20 bg-white border border-surface-variant rounded-sm flex-shrink-0 cursor-pointer hover:border-primary transition-colors opacity-60"></div>
              <div class="w-16 h-20 bg-white border border-surface-variant rounded-sm flex-shrink-0 cursor-pointer hover:border-primary transition-colors opacity-60"></div>
              <div class="w-16 h-20 bg-white border-2 border-primary rounded-sm flex-shrink-0 cursor-pointer shadow-md"></div>
              <div class="w-16 h-20 bg-white border border-surface-variant rounded-sm flex-shrink-0 cursor-pointer hover:border-primary transition-colors opacity-60"></div>
              <div class="w-16 h-20 bg-white border border-surface-variant rounded-sm flex-shrink-0 cursor-pointer hover:border-primary transition-colors opacity-60"></div>
            </div>
          </div>
        </div>
        
        <!-- RIGHT COLUMN: Sidebar (35%) -->
        <div class="lg:col-span-4 space-y-gutter">
          <!-- Card 1: Informasi Skripsi -->
          <div class="bg-white rounded-xl p-stack-lg shadow-sm border border-surface-variant">
            <h3 class="text-label-sm font-label-sm text-outline uppercase tracking-wider mb-stack-sm">Informasi Skripsi</h3>
            <h2 class="text-headline-md font-headline-md text-primary mb-stack-md leading-tight">Analisis Prediksi Harga Saham Sektor Perbankan Menggunakan Algoritma LSTM (Long Short-Term Memory)</h2>
            <div class="space-y-stack-md">
              <div class="grid grid-cols-2 gap-stack-sm">
                <div>
                  <p class="text-label-sm font-label-sm text-on-surface-variant">Penulis</p>
                  <p class="text-label-md font-bold text-on-surface">Aditya Wijaya</p>
                </div>
                <div>
                  <p class="text-label-sm font-label-sm text-on-surface-variant">Tahun</p>
                  <p class="text-label-md font-bold text-on-surface">2023</p>
                </div>
              </div>
              <div>
                <p class="text-label-sm font-label-sm text-on-surface-variant">Program Studi</p>
                <p class="text-label-md font-bold text-on-surface">Teknik Informatika</p>
              </div>
              <div>
                <p class="text-label-sm font-label-sm text-on-surface-variant">Dosen Pembimbing</p>
                <p class="text-label-md font-bold text-on-surface">Dr. Eng. Ir. Hendra Sasmita, M.T.</p>
              </div>
            </div>
          </div>
          
          <!-- Card 2: Skor Kemiripan -->
          <div class="bg-white rounded-xl p-stack-lg shadow-sm border border-surface-variant flex items-center gap-stack-lg">
            <div class="relative w-24 h-24 flex items-center justify-center shrink-0">
              <div class="w-full h-full rounded-full flex items-center justify-center border-4 border-secondary border-t-secondary-container">
                <span class="text-headline-md font-bold text-secondary">87%</span>
              </div>
            </div>
            <div>
              <h3 class="text-label-sm font-label-sm text-outline uppercase mb-1">Skor Kemiripan</h3>
              <p class="text-body-md font-body-md text-on-surface-variant leading-tight">Sangat mirip dengan topik yang kamu cari</p>
            </div>
          </div>
          
          <!-- Card 3: Info Klaster -->
          <div class="bg-white rounded-xl p-stack-lg shadow-sm border border-surface-variant">
            <div class="flex justify-between items-start mb-stack-sm">
              <h3 class="text-label-sm font-label-sm text-outline uppercase">Info Klaster</h3>
              <span class="bg-error-container text-on-error-container px-3 py-1 rounded-full text-label-sm font-bold">Jenuh</span>
            </div>
            <p class="text-body-lg font-bold text-on-surface mb-1">Prediksi Time Series &amp; Finansial</p>
            <p class="text-label-md font-label-md text-on-surface-variant">42 skripsi serupa dalam database</p>
          </div>
          
          <!-- Card 4: Abstrak -->
          <div class="bg-white rounded-xl p-stack-lg shadow-sm border border-surface-variant">
            <h3 class="text-label-sm font-label-sm text-outline uppercase mb-stack-sm">Abstrak</h3>
            <div class="max-h-32 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-surface-variant">
              <p class="text-body-md font-body-md text-on-surface-variant leading-relaxed">
                Penelitian ini bertujuan untuk mengevaluasi efektivitas arsitektur Neural Network khususnya Long Short-Term Memory (LSTM) dalam memprediksi volatilitas harga saham perbankan di Bursa Efek Indonesia. Data yang digunakan mencakup periode lima tahun terakhir dengan parameter teknikal seperti Moving Average dan RSI sebagai input pendukung. Hasil pengujian menunjukkan bahwa model mampu mencapai tingkat akurasi yang signifikan...
              </p>
            </div>
            <button class="mt-stack-sm text-secondary font-label-md hover:underline transition-all">Baca selengkapnya</button>
          </div>
          
          <!-- Action Buttons -->
          <div class="flex flex-col gap-stack-md pt-stack-sm">
            <button class="w-full bg-[#1F3864] text-white h-[52px] rounded-xl font-bold flex items-center justify-center gap-stack-sm hover:bg-primary transition-all shadow-md active:scale-[0.98]">
              <span class="material-symbols-outlined">picture_as_pdf</span>
              Unduh PDF Lengkap
            </button>
            <button class="w-full border-2 border-secondary text-secondary h-[52px] rounded-xl font-bold flex items-center justify-center gap-stack-sm hover:bg-secondary-fixed transition-all active:scale-[0.98]">
              <span class="material-symbols-outlined">bookmark</span>
              Simpan ke Riwayat
            </button>
          </div>
        </div>
      </div>
    </main>
</template>
