<script setup>
import { useRouter } from 'vue-router'
import AdminTopbar from '@/components/admin/topbar.vue'

const router = useRouter()
</script>

<template>
      <!-- TopAppBar -->
      <AdminTopbar title="Tambah Skripsi Massal" :show-tabs="true" :show-back-button="true" />

      <!-- Page Content -->
      <div class="flex-grow p-margin-desktop overflow-y-auto">
        <div class="max-w-5xl mx-auto w-full">
          <!-- 3-Step Import Workflow -->
          <div class="bg-white rounded-xl shadow-[0px_2px_4px_rgba(31,56,100,0.05)] p-stack-xl flex flex-col gap-10">
            <!-- STEP 1: Unduh Template -->
            <section class="flex flex-col md:flex-row items-start md:items-center justify-between gap-gutter">
              <div class="flex-1">
                <div class="flex items-center gap-3 mb-2">
                  <span class="w-8 h-8 flex items-center justify-center bg-primary-fixed text-primary font-label-md rounded-full text-label-md">1</span>
                  <h3 class="font-label-md text-label-md text-primary">Unduh Template</h3>
                </div>
                <p class="text-on-surface-variant font-body-md max-w-xl">Gunakan template CSV kami untuk memastikan format data yang benar sebelum melakukan unggah massal ke sistem.</p>
              </div>
              <button class="flex items-center gap-2 px-6 py-3 border-2 border-primary text-primary font-bold rounded-xl hover:bg-primary/5 transition-colors h-[44px]">
                <span class="material-symbols-outlined" data-icon="download">download</span>
                <span class="font-label-md text-label-md">Unduh Template CSV</span>
              </button>
            </section>
            <hr class="border-surface-container"/>
            
            <!-- STEP 2: Unggah File PDF (ZIP) -->
            <section class="flex flex-col gap-stack-lg">
              <div class="flex items-center gap-3">
                <span class="w-8 h-8 flex items-center justify-center bg-primary-fixed text-primary font-label-md rounded-full text-label-md">2</span>
                <h3 class="font-label-md text-label-md text-primary">Unggah File PDF (ZIP)</h3>
              </div>
              <div class="border-2 border-dashed border-outline-variant rounded-xl p-10 flex flex-col items-center justify-center bg-surface-container-low hover:bg-surface-container hover:border-primary hover:bg-primary-fixed/10 transition-all cursor-pointer group relative overflow-hidden">
                <input type="file" accept=".zip" class="absolute inset-0 opacity-0 cursor-pointer z-10" />
                <div class="w-14 h-14 bg-primary-fixed-dim rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span class="material-symbols-outlined text-primary text-3xl" data-icon="cloud_upload">cloud_upload</span>
                </div>
                <p class="font-label-md text-label-md text-primary mb-1 text-center">Seret file ZIP berisi PDF ke sini atau <span class="underline">klik untuk unggah</span></p>
                <p class="text-on-surface-variant font-label-md text-label-md">Maksimal ukuran 200MB. Nama setiap file PDF harus unik (contoh: 2023-001.pdf)</p>
              </div>
              <!-- File Confirmation Row -->
              <div class="flex items-center justify-between p-4 bg-surface-container-low rounded-xl border border-outline-variant/30">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-secondary-container/20 rounded flex items-center justify-center">
                    <span class="material-symbols-outlined text-secondary" data-icon="folder_zip">folder_zip</span>
                  </div>
                  <div>
                    <p class="font-label-md text-label-md text-on-surface font-bold">skripsi_2024.zip</p>
                    <p class="text-on-surface-variant text-[12px]">45.2 MB</p>
                  </div>
                </div>
                <div class="flex items-center gap-4">
                  <span class="material-symbols-outlined text-green-600" data-icon="check_circle">check_circle</span>
                  <button class="p-1 hover:bg-error-container/20 rounded-full text-error transition-colors z-20">
                    <span class="material-symbols-outlined text-xl" data-icon="close">close</span>
                  </button>
                </div>
              </div>
            </section>
            <hr class="border-surface-container"/>
            
            <!-- STEP 3: Unggah File Metadata (CSV) -->
            <section class="flex flex-col gap-stack-lg">
              <div class="flex items-center gap-3">
                <span class="w-8 h-8 flex items-center justify-center bg-primary-fixed text-primary font-label-md rounded-full text-label-md">3</span>
                <h3 class="font-label-md text-label-md text-primary">Unggah File Metadata (CSV)</h3>
              </div>
              <div class="border-2 border-dashed border-outline-variant rounded-xl p-10 flex flex-col items-center justify-center bg-surface-container-low hover:bg-surface-container hover:border-primary hover:bg-primary-fixed/10 transition-all cursor-pointer group relative overflow-hidden">
                <input type="file" accept=".csv" class="absolute inset-0 opacity-0 cursor-pointer z-10" />
                <div class="w-14 h-14 bg-primary-fixed-dim rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span class="material-symbols-outlined text-primary text-3xl" data-icon="upload_file">upload_file</span>
                </div>
                <p class="font-label-md text-label-md text-primary mb-1 text-center">Seret file CSV metadata ke sini atau <span class="underline">klik untuk unggah</span></p>
              </div>
              <div class="mt-2">
                <h4 class="font-label-md text-label-md text-on-surface-variant mb-3 uppercase tracking-wider">Kolom yang Diperlukan</h4>
                <div class="flex flex-wrap gap-2">
                  <span class="px-4 py-1.5 bg-secondary-fixed text-on-secondary-fixed rounded-full font-label-md text-label-md">Judul</span>
                  <span class="px-4 py-1.5 bg-secondary-fixed text-on-secondary-fixed rounded-full font-label-md text-label-md">Abstrak</span>
                  <span class="px-4 py-1.5 bg-secondary-fixed text-on-secondary-fixed rounded-full font-label-md text-label-md">Penulis</span>
                  <span class="px-4 py-1.5 bg-secondary-fixed text-on-secondary-fixed rounded-full font-label-md text-label-md">Prodi</span>
                  <span class="px-4 py-1.5 bg-secondary-fixed text-on-secondary-fixed rounded-full font-label-md text-label-md">Tahun</span>
                  <span class="px-4 py-1.5 bg-secondary-fixed text-on-secondary-fixed rounded-full font-label-md text-label-md">Pembimbing</span>
                  <span class="px-4 py-1.5 bg-primary/10 text-primary border border-primary/20 rounded-full font-label-md text-label-md flex items-center gap-1.5 group relative cursor-help">
                    nama_file_pdf
                    <span class="material-symbols-outlined text-sm" data-icon="info">info</span>
                    <!-- Tooltip -->
                    <span class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-inverse-surface text-inverse-on-surface text-[11px] rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                      Harus cocok dengan nama file PDF di dalam ZIP
                    </span>
                  </span>
                </div>
              </div>
            </section>
            
            <!-- Validation Preview Section -->
            <div class="bg-surface-container-low rounded-xl p-6 border border-outline-variant/30 flex flex-col gap-4">
              <div class="flex justify-between items-center">
                <h4 class="font-label-md text-label-md text-primary font-bold">Pratinjau Validasi</h4>
                <a class="text-primary font-label-md text-label-md flex items-center gap-1" href="#">
                  Lihat detail baris bermasalah
                  <span class="material-symbols-outlined text-sm" data-icon="keyboard_arrow_down">keyboard_arrow_down</span>
                </a>
              </div>
              <div class="flex flex-wrap gap-4">
                <div class="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 border border-green-200 rounded-lg font-label-md text-label-md">
                  <span class="w-2 h-2 rounded-full bg-green-600"></span>
                  142 baris valid
                </div>
                <div class="flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-700 border border-amber-200 rounded-lg font-label-md text-label-md">
                  <span class="w-2 h-2 rounded-full bg-amber-600"></span>
                  3 PDF tidak ditemukan
                </div>
                <div class="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-700 border border-red-200 rounded-lg font-label-md text-label-md">
                  <span class="w-2 h-2 rounded-full bg-red-600"></span>
                  1 baris data tidak lengkap
                </div>
              </div>
            </div>
          </div>
          
          <!-- Bottom Actions and Info Banner -->
          <div class="mt-10 flex flex-col gap-6">
            <div class="flex items-start gap-4 p-5 bg-secondary-container/10 rounded-xl border border-secondary-container/20">
              <span class="material-symbols-outlined text-secondary" data-icon="info">info</span>
              <p class="text-on-secondary-container font-body-md flex-1">
                Sistem akan memvalidasi data dan menghasilkan embedding secara massal. Skripsi dengan PDF tidak ditemukan tetap akan disimpan dan bisa dilengkapi kemudian.
              </p>
            </div>
            <div class="flex items-center justify-end gap-4">
              <button @click="router.push('/admin')" class="px-8 py-3 border-2 border-outline text-on-surface-variant font-bold rounded-xl hover:bg-surface-container-highest transition-colors min-h-[44px]">
                Batal
              </button>
              <button class="px-10 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-container shadow-sm active:scale-95 transition-all min-h-[44px]">
                Mulai Impor Data
              </button>
            </div>
          </div>
        </div>
      </div>
</template>
