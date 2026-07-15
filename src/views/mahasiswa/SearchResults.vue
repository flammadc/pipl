<script setup>
import Navbar from '../../components/mahasiswa/navbar.vue'
import Footer from '../../components/mahasiswa/footer.vue'
</script>

<template>
  <div class="bg-background min-h-screen flex flex-col">
    <Navbar />
    
    <main class="flex-grow max-w-container-max mx-auto w-full px-margin-desktop py-stack-lg">
      <!-- Search Bar Row -->
      <div class="mb-stack-xl">
        <div class="flex flex-col md:flex-row gap-4 items-center">
          <div class="relative w-full">
            <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
            <input class="w-full pl-12 pr-4 py-4 rounded-xl border border-outline-variant bg-surface-container-lowest focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-body-md text-on-surface" type="text" value="Sistem prediksi harga saham menggunakan machine learning">
          </div>
          <button class="whitespace-nowrap px-6 py-4 rounded-xl border border-secondary text-secondary font-label-md hover:bg-surface-container-low transition-colors flex items-center gap-2 h-[58px]">
            <span class="material-symbols-outlined text-[20px]">refresh</span>
            Cari Ulang
          </button>
        </div>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        <!-- Left Column: Search Results & Analysis -->
        <div class="lg:col-span-8 space-y-stack-lg">
          <!-- Section B: Analisis Klaster -->
          <section>
            <div class="bg-[#EAF0F8] p-6 rounded-xl flex justify-between items-center hover:-translate-y-0.5 transition-transform">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-lg bg-white flex items-center justify-center">
                  <span class="material-symbols-outlined text-primary">analytics</span>
                </div>
                <div>
                  <h2 class="text-headline-md font-headline-md text-primary">Prediksi Time Series &amp; Finansial</h2>
                  <p class="text-body-md text-on-surface-variant">42 skripsi serupa terdeteksi dalam klaster ini</p>
                </div>
              </div>
              <div class="flex items-center gap-2 px-4 py-2 rounded-full bg-red-100 border border-red-200">
                <div class="w-2 h-2 rounded-full bg-[#C62828] animate-pulse"></div>
                <span class="text-label-sm font-label-sm text-[#C62828]">Jenuh</span>
              </div>
            </div>
          </section>
          
          <!-- Section A: Skripsi Termirip -->
          <section>
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-headline-md font-headline-md text-on-surface">Skripsi Termirip</h3>
              <span class="text-label-md text-on-surface-variant">Menampilkan 4 hasil teratas</span>
            </div>
            <div class="flex flex-col gap-4">
              <!-- Result Card 1 -->
              <div class="bg-surface-container-lowest p-6 rounded-xl hover:-translate-y-0.5 flex justify-between items-start border border-transparent hover:border-primary-fixed-dim transition-all shadow-sm">
                <div class="space-y-2">
                  <h4 class="text-body-lg font-bold text-primary">Implementasi LSTM untuk Peramalan Saham</h4>
                  <div class="flex items-center gap-4 text-label-md text-on-surface-variant">
                    <span class="flex items-center gap-1"><span class="material-symbols-outlined text-[16px]">person</span> Andi Wijaya</span>
                    <span class="flex items-center gap-1"><span class="material-symbols-outlined text-[16px]">school</span> Teknik Informatika 2023</span>
                  </div>
                  <a class="inline-block pt-2 text-primary font-label-md hover:underline" href="#">Lihat Detail</a>
                </div>
                <div class="flex flex-col items-center gap-1">
                  <div class="w-12 h-12 rounded-full border-[3px] border-[#2E5395] flex items-center justify-center">
                    <span class="text-label-sm font-bold text-[#2E5395]">87%</span>
                  </div>
                  <span class="text-[10px] uppercase font-bold text-outline">Similarity</span>
                </div>
              </div>
              
              <!-- Result Card 2 -->
              <div class="bg-surface-container-lowest p-6 rounded-xl hover:-translate-y-0.5 flex justify-between items-start border border-transparent hover:border-primary-fixed-dim transition-all shadow-sm">
                <div class="space-y-2">
                  <h4 class="text-body-lg font-bold text-primary">Prediksi Indeks Saham Menggunakan Random Forest</h4>
                  <div class="flex items-center gap-4 text-label-md text-on-surface-variant">
                    <span class="flex items-center gap-1"><span class="material-symbols-outlined text-[16px]">person</span> Budi Santoso</span>
                    <span class="flex items-center gap-1"><span class="material-symbols-outlined text-[16px]">school</span> Teknik Informatika 2022</span>
                  </div>
                  <a class="inline-block pt-2 text-primary font-label-md hover:underline" href="#">Lihat Detail</a>
                </div>
                <div class="flex flex-col items-center gap-1">
                  <div class="w-12 h-12 rounded-full border-[3px] border-[#2E5395] opacity-80 flex items-center justify-center">
                    <span class="text-label-sm font-bold text-[#2E5395]">82%</span>
                  </div>
                  <span class="text-[10px] uppercase font-bold text-outline">Similarity</span>
                </div>
              </div>
              
              <!-- Result Card 3 -->
              <div class="bg-surface-container-lowest p-6 rounded-xl hover:-translate-y-0.5 flex justify-between items-start border border-transparent hover:border-primary-fixed-dim transition-all shadow-sm">
                <div class="space-y-2">
                  <h4 class="text-body-lg font-bold text-primary">Optimasi Hyperparameter CNN untuk Data Keuangan</h4>
                  <div class="flex items-center gap-4 text-label-md text-on-surface-variant">
                    <span class="flex items-center gap-1"><span class="material-symbols-outlined text-[16px]">person</span> Citra Lestari</span>
                    <span class="flex items-center gap-1"><span class="material-symbols-outlined text-[16px]">school</span> Sistem Informasi 2023</span>
                  </div>
                  <a class="inline-block pt-2 text-primary font-label-md hover:underline" href="#">Lihat Detail</a>
                </div>
                <div class="flex flex-col items-center gap-1">
                  <div class="w-12 h-12 rounded-full border-[3px] border-[#2E5395] opacity-60 flex items-center justify-center">
                    <span class="text-label-sm font-bold text-[#2E5395]">79%</span>
                  </div>
                  <span class="text-[10px] uppercase font-bold text-outline">Similarity</span>
                </div>
              </div>
              
              <!-- Result Card 4 -->
              <div class="bg-surface-container-lowest p-6 rounded-xl hover:-translate-y-0.5 flex justify-between items-start border border-transparent hover:border-primary-fixed-dim transition-all shadow-sm">
                <div class="space-y-2">
                  <h4 class="text-body-lg font-bold text-primary">Sentiment Analysis Terhadap Pergerakan IHSG</h4>
                  <div class="flex items-center gap-4 text-label-md text-on-surface-variant">
                    <span class="flex items-center gap-1"><span class="material-symbols-outlined text-[16px]">person</span> Dimas Yoga</span>
                    <span class="flex items-center gap-1"><span class="material-symbols-outlined text-[16px]">school</span> Teknik Informatika 2021</span>
                  </div>
                  <a class="inline-block pt-2 text-primary font-label-md hover:underline" href="#">Lihat Detail</a>
                </div>
                <div class="flex flex-col items-center gap-1">
                  <div class="w-12 h-12 rounded-full border-[3px] border-[#2E5395] opacity-40 flex items-center justify-center">
                    <span class="text-label-sm font-bold text-[#2E5395]">75%</span>
                  </div>
                  <span class="text-[10px] uppercase font-bold text-outline">Similarity</span>
                </div>
              </div>
            </div>
          </section>
        </div>
        
        <!-- Right Column: Sidebar -->
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
              <p class="text-body-md leading-relaxed text-blue-100 opacity-90">
                Topik Anda memiliki relevansi tinggi dengan klaster Finansial. Namun, tingkat kejenuhan <strong class="text-white">(Jenuh)</strong> menunjukkan banyak penelitian serupa. Disarankan untuk menambahkan variabel eksternal seperti sentimen berita untuk meningkatkan orisinalitas.
              </p>
            </div>
          </div>
          
          <section class="space-y-4">
            <div class="flex items-center gap-2 px-2">
              <span class="material-symbols-outlined text-secondary" style="font-variation-settings: 'FILL' 1;">lightbulb</span>
              <h3 class="text-headline-md font-headline-md text-on-surface">Rekomendasi Judul Baru</h3>
            </div>
            <div class="space-y-3">
              <!-- Suggestion 1 -->
              <div class="bg-surface-container-lowest p-4 rounded-xl shadow-sm border border-outline-variant flex flex-col gap-3">
                <h4 class="font-bold text-primary text-label-md leading-relaxed">Analisis Sentimen Berita Ekonomi Terhadap Volatilitas Saham Perbankan di Indonesia</h4>
                <button class="flex items-center gap-2 text-secondary font-label-sm hover:underline w-fit">
                  <span class="material-symbols-outlined text-[18px]">search</span>
                  Cari Judul Ini
                </button>
              </div>
              <!-- Suggestion 2 -->
              <div class="bg-surface-container-lowest p-4 rounded-xl shadow-sm border border-outline-variant flex flex-col gap-3">
                <h4 class="font-bold text-primary text-label-md leading-relaxed">Integrasi Variabel Makroekonomi pada Model LSTM untuk Prediksi Harga Saham Sektor Keuangan</h4>
                <button class="flex items-center gap-2 text-secondary font-label-sm hover:underline w-fit">
                  <span class="material-symbols-outlined text-[18px]">search</span>
                  Cari Judul Ini
                </button>
              </div>
            </div>
          </section>
          
          <!-- Rekomendasi Langkah Selanjutnya -->
          <section class="space-y-4">
            <h3 class="text-headline-md font-headline-md text-on-surface px-2">Rekomendasi Langkah Selanjutnya</h3>
            <div class="space-y-3">
              <!-- Card 1 -->
              <div class="bg-surface-container-lowest p-4 rounded-xl shadow-sm border border-outline-variant flex gap-4 items-start hover:-translate-y-0.5 transition-transform">
                <div class="w-10 h-10 rounded-lg bg-secondary-container flex items-center justify-center shrink-0">
                  <span class="material-symbols-outlined text-primary">variable_add</span>
                </div>
                <div>
                  <h4 class="font-bold text-primary text-label-md">Modifikasi Variabel</h4>
                  <p class="text-label-sm text-on-surface-variant mt-1">Tambahkan variabel unik seperti sentimen eksternal atau dataset spesifik untuk meningkatkan orisinalitas.</p>
                </div>
              </div>
              <!-- Card 2 -->
              <div class="bg-surface-container-lowest p-4 rounded-xl shadow-sm border border-outline-variant flex gap-4 items-start hover:-translate-y-0.5 transition-transform">
                <div class="w-10 h-10 rounded-lg bg-secondary-container flex items-center justify-center shrink-0">
                  <span class="material-symbols-outlined text-primary">swap_horiz</span>
                </div>
                <div>
                  <h4 class="font-bold text-primary text-label-md">Ganti Objek Penelitian</h4>
                  <p class="text-label-sm text-on-surface-variant mt-1">Pertimbangkan untuk menerapkan metode pada industri yang berbeda atau studi kasus yang lebih spesifik.</p>
                </div>
              </div>
              <!-- Card 3 -->
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
    </main>
    
    <Footer />
  </div>
</template>
