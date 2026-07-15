<script setup>
</script>

<template>
    <main class="flex-grow w-full max-w-container-max mx-auto px-margin-desktop py-stack-lg">
      <!-- Page Header -->
      <header class="flex flex-col md:flex-row md:items-center justify-between mb-stack-lg gap-stack-md">
        <h1 class="text-headline-lg font-headline-lg text-primary">Riwayat Pencarian</h1>
        <div class="flex flex-wrap items-center gap-stack-md">
          <div class="relative min-w-[280px]">
            <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
            <input class="w-full pl-10 pr-4 py-2 bg-surface-container-lowest border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none text-body-md transition-all" placeholder="Cari dalam riwayat..." type="text">
          </div>
          <div class="flex items-center gap-2 bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-2 cursor-pointer hover:bg-surface-container-low transition-colors">
            <span class="text-label-md font-label-md text-on-surface-variant">Urutkan:</span>
            <span class="text-label-md font-label-md text-primary font-bold">Terbaru</span>
            <span class="material-symbols-outlined text-primary">expand_more</span>
          </div>
        </div>
      </header>
      
      <!-- Filter Chips -->
      <section class="flex flex-wrap gap-stack-sm mb-stack-lg">
        <button class="px-6 py-2 rounded-full bg-primary text-on-primary text-label-md font-label-md transition-all">Semua</button>
        <button class="px-6 py-2 rounded-full bg-surface-container-highest/50 text-on-surface-variant hover:bg-surface-container-high text-label-md font-label-md transition-all">Jenuh</button>
        <button class="px-6 py-2 rounded-full bg-surface-container-highest/50 text-on-surface-variant hover:bg-surface-container-high text-label-md font-label-md transition-all">Sedang</button>
        <button class="px-6 py-2 rounded-full bg-surface-container-highest/50 text-on-surface-variant hover:bg-surface-container-high text-label-md font-label-md transition-all">Jarang</button>
      </section>
      
      <!-- History List -->
      <div class="flex flex-col gap-gutter">
        <!-- Card 1: Jenuh -->
        <article class="bg-surface-container-lowest rounded-xl p-stack-lg shadow-sm hover:shadow-md transition-shadow">
          <div class="flex justify-between items-start mb-stack-sm">
            <h3 class="text-body-lg font-bold text-primary max-w-[80%]">sistem prediksi harga saham menggunakan machine learning</h3>
            <span class="text-label-sm font-label-sm text-outline">2 hari lalu</span>
          </div>
          <div class="flex flex-wrap gap-2 mb-stack-md">
            <span class="px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant text-label-sm font-label-sm">Prediksi Time Series &amp; Finansial</span>
            <span class="px-3 py-1 rounded-full bg-error-container text-custom-danger text-label-sm font-label-sm">Jenuh</span>
            <span class="px-3 py-1 rounded-full bg-surface-container text-on-surface-variant text-label-sm font-label-sm">5 skripsi mirip ditemukan</span>
          </div>
          <div class="mb-stack-md">
            <p class="text-body-md text-outline italic line-clamp-1">Berdasarkan analisis repositori, topik ini telah banyak diteliti terutama menggunakan algoritma LSTM dan Regression...</p>
          </div>
          <div class="flex justify-end gap-stack-lg items-center border-t border-surface-variant pt-stack-sm">
            <button class="text-custom-danger text-label-md font-bold hover:underline">Hapus</button>
            <button class="bg-primary text-white px-6 py-2 rounded-xl text-label-md font-bold transition-transform active:scale-95">Lihat Hasil</button>
          </div>
        </article>
        
        <!-- Card 2: Sedang -->
        <article class="bg-surface-container-lowest rounded-xl p-stack-lg shadow-sm hover:shadow-md transition-shadow">
          <div class="flex justify-between items-start mb-stack-sm">
            <h3 class="text-body-lg font-bold text-primary max-w-[80%]">optimasi penjadwalan mata kuliah dengan algoritma genetika</h3>
            <span class="text-label-sm font-label-sm text-outline">3 hari lalu</span>
          </div>
          <div class="flex flex-wrap gap-2 mb-stack-md">
            <span class="px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant text-label-sm font-label-sm">Optimasi &amp; Heuristik</span>
            <span class="px-3 py-1 rounded-full bg-orange-100 text-custom-warning text-label-sm font-label-sm">Sedang</span>
            <span class="px-3 py-1 rounded-full bg-surface-container text-on-surface-variant text-label-sm font-label-sm">2 skripsi mirip ditemukan</span>
          </div>
          <div class="mb-stack-md">
            <p class="text-body-md text-outline italic line-clamp-1">Terdapat beberapa penelitian serupa namun masih ada ruang untuk eksplorasi pada konstrain multi-fakultas...</p>
          </div>
          <div class="flex justify-end gap-stack-lg items-center border-t border-surface-variant pt-stack-sm">
            <button class="text-custom-danger text-label-md font-bold hover:underline">Hapus</button>
            <button class="bg-primary text-white px-6 py-2 rounded-xl text-label-md font-bold transition-transform active:scale-95">Lihat Hasil</button>
          </div>
        </article>
        
        <!-- Card 3: Jenuh -->
        <article class="bg-surface-container-lowest rounded-xl p-stack-lg shadow-sm hover:shadow-md transition-shadow">
          <div class="flex justify-between items-start mb-stack-sm">
            <h3 class="text-body-lg font-bold text-primary max-w-[80%]">analisis sentimen twitter pilkada DKI 2024 naive bayes</h3>
            <span class="text-label-sm font-label-sm text-outline">5 hari lalu</span>
          </div>
          <div class="flex flex-wrap gap-2 mb-stack-md">
            <span class="px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant text-label-sm font-label-sm">NLP &amp; Social Media</span>
            <span class="px-3 py-1 rounded-full bg-error-container text-custom-danger text-label-sm font-label-sm">Jenuh</span>
            <span class="px-3 py-1 rounded-full bg-surface-container text-on-surface-variant text-label-sm font-label-sm">12 skripsi mirip ditemukan</span>
          </div>
          <div class="mb-stack-md">
            <p class="text-body-md text-outline italic line-clamp-1">Analisis sentimen politik menggunakan Naive Bayes dikategorikan sangat jenuh. Disarankan mengganti metode atau objek...</p>
          </div>
          <div class="flex justify-end gap-stack-lg items-center border-t border-surface-variant pt-stack-sm">
            <button class="text-custom-danger text-label-md font-bold hover:underline">Hapus</button>
            <button class="bg-primary text-white px-6 py-2 rounded-xl text-label-md font-bold transition-transform active:scale-95">Lihat Hasil</button>
          </div>
        </article>
        
        <!-- Card 4: Jarang -->
        <article class="bg-surface-container-lowest rounded-xl p-stack-lg shadow-sm hover:shadow-md transition-shadow">
          <div class="flex justify-between items-start mb-stack-sm">
            <h3 class="text-body-lg font-bold text-primary max-w-[80%]">implementasi blockchain untuk integritas data nilai akademik</h3>
            <span class="text-label-sm font-label-sm text-outline">1 minggu lalu</span>
          </div>
          <div class="flex flex-wrap gap-2 mb-stack-md">
            <span class="px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant text-label-sm font-label-sm">Keamanan Informasi</span>
            <span class="px-3 py-1 rounded-full bg-green-100 text-custom-success text-label-sm font-label-sm">Jarang</span>
            <span class="px-3 py-1 rounded-full bg-surface-container text-on-surface-variant text-label-sm font-label-sm">0 skripsi mirip ditemukan</span>
          </div>
          <div class="mb-stack-md">
            <p class="text-body-md text-outline italic line-clamp-1">Topik ini sangat potensial karena belum ada penelitian di repositori ini yang membahas implementasi blockchain...</p>
          </div>
          <div class="flex justify-end gap-stack-lg items-center border-t border-surface-variant pt-stack-sm">
            <button class="text-custom-danger text-label-md font-bold hover:underline">Hapus</button>
            <button class="bg-primary text-white px-6 py-2 rounded-xl text-label-md font-bold transition-transform active:scale-95">Lihat Hasil</button>
          </div>
        </article>
      </div>
      
      <!-- Pagination -->
      <nav class="flex justify-center items-center mt-stack-xl gap-stack-md">
        <button class="w-10 h-10 flex items-center justify-center rounded-xl border border-outline-variant hover:bg-surface-container-low text-primary transition-all">
          <span class="material-symbols-outlined">chevron_left</span>
        </button>
        <button class="w-10 h-10 flex items-center justify-center rounded-xl bg-primary text-white text-label-md font-bold">1</button>
        <button class="w-10 h-10 flex items-center justify-center rounded-xl border border-outline-variant hover:bg-surface-container-low text-primary text-label-md font-bold transition-all">2</button>
        <button class="w-10 h-10 flex items-center justify-center rounded-xl border border-outline-variant hover:bg-surface-container-low text-primary text-label-md font-bold transition-all">3</button>
        <button class="w-10 h-10 flex items-center justify-center rounded-xl border border-outline-variant hover:bg-surface-container-low text-primary transition-all">
          <span class="material-symbols-outlined">chevron_right</span>
        </button>
      </nav>
    </main>
</template>
