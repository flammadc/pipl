<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AdminTopbar from '@/components/admin/topbar.vue'

const router = useRouter()
const isSaving = ref(false)
const isSaved = ref(false)

const goBack = () => {
  router.back()
}

const submitForm = () => {
  isSaving.value = true
  
  setTimeout(() => {
    isSaving.value = false
    isSaved.value = true
    
    setTimeout(() => {
      isSaved.value = false
      router.back()
    }, 2000)
  }, 1500)
}

const onDrop = (e) => {
  e.preventDefault()
  // Mock file drop handling
  const files = e.dataTransfer?.files || e.target?.files
  if(files && files.length > 0) {
      alert(`File ${files[0].name} diterima. Mempersiapkan unggahan...`)
  }
}
</script>

<template>
    <!-- TopAppBar Shell -->
      <AdminTopbar title="Tambah Skripsi Baru" />

      <!-- Form Content Container -->
      <div class="flex-grow p-margin-desktop overflow-y-auto">
        <div class="max-w-5xl mx-auto">
          <div class="bg-white rounded-xl shadow-[0px_2px_4px_rgba(31,56,100,0.05)] p-stack-xl flex flex-col gap-10">
            <form @submit.prevent="submitForm" class="space-y-gutter">
              <!-- Title Field -->
              <div class="space-y-stack-sm">
                <label class="font-label-md text-label-md text-primary font-semibold">Judul Skripsi</label>
                <input required class="w-full h-12 px-4 rounded-lg border border-outline-variant focus:border-secondary focus:ring-1 focus:ring-secondary/20 outline-none transition-all font-body-md text-body-md" placeholder="Masukkan judul lengkap skripsi" type="text"/>
              </div>
              
              <!-- Abstract Field -->
              <div class="space-y-stack-sm">
                <label class="font-label-md text-label-md text-primary font-semibold">Abstrak</label>
                <textarea required class="w-full px-4 py-3 rounded-lg border border-outline-variant focus:border-secondary focus:ring-1 focus:ring-secondary/20 outline-none transition-all font-body-md text-body-md resize-none" placeholder="Tuliskan ringkasan penelitian..." rows="6"></textarea>
              </div>
              
              <!-- Two Column Row for Basic Info -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-gutter">
                <div class="space-y-stack-sm">
                  <label class="font-label-md text-label-md text-primary font-semibold">Nama Penulis</label>
                  <input required class="w-full h-12 px-4 rounded-lg border border-outline-variant focus:border-secondary focus:ring-1 focus:ring-secondary/20 outline-none transition-all font-body-md text-body-md" placeholder="Nama mahasiswa lengkap" type="text"/>
                </div>
                <div class="space-y-stack-sm">
                  <label class="font-label-md text-label-md text-primary font-semibold">Program Studi</label>
                  <div class="relative">
                    <select required class="w-full h-12 px-4 appearance-none rounded-lg border border-outline-variant focus:border-secondary focus:ring-1 focus:ring-secondary/20 outline-none transition-all font-body-md text-body-md bg-transparent pr-10">
                      <option disabled selected value="">Pilih Program Studi</option>
                      <option>Informatika</option>
                      <option>Sistem Informasi</option>
                      <option>Teknik Komputer</option>
                      <option>Pendidikan Ilmu Komputer</option>
                    </select>
                    <span class="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">expand_more</span>
                  </div>
                </div>
              </div>
              
              <!-- Two Column Row for Meta Info -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-gutter">
                <div class="space-y-stack-sm">
                  <label class="font-label-md text-label-md text-primary font-semibold">Tahun</label>
                  <input required class="w-full h-12 px-4 rounded-lg border border-outline-variant focus:border-secondary focus:ring-1 focus:ring-secondary/20 outline-none transition-all font-body-md text-body-md" placeholder="2024" type="number"/>
                </div>
                <div class="space-y-stack-sm">
                  <label class="font-label-md text-label-md text-primary font-semibold">Nama Dosen Pembimbing</label>
                  <input required class="w-full h-12 px-4 rounded-lg border border-outline-variant focus:border-secondary focus:ring-1 focus:ring-secondary/20 outline-none transition-all font-body-md text-body-md" placeholder="Nama dosen pembimbing utama" type="text"/>
                </div>
              </div>
              
              <!-- Dropzone -->
              <div class="space-y-stack-sm">
                <label class="font-label-md text-label-md text-primary font-semibold">File PDF Skripsi</label>
                <div 
                  @drop="onDrop" 
                  @dragover.prevent 
                  class="custom-dropzone group flex flex-col items-center justify-center py-10 px-6 border border-dashed border-outline-variant rounded-xl cursor-pointer hover:bg-secondary/5 hover:border-secondary transition-colors duration-300 relative overflow-hidden">
                  <div class="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <span class="material-symbols-outlined text-secondary text-4xl">cloud_upload</span>
                  </div>
                  <p class="font-label-md text-label-md text-primary font-bold">Seret file PDF ke sini atau klik untuk unggah</p>
                  <p class="font-label-sm text-label-sm text-on-surface-variant mt-2">Embedding akan otomatis dibuat setelah file diunggah</p>
                  <input @change="onDrop" accept=".pdf" class="absolute inset-0 opacity-0 cursor-pointer" type="file"/>
                </div>
              </div>
              
              <!-- Info Banner -->
              <div class="flex items-start gap-4 p-4 bg-secondary-fixed/30 rounded-xl border border-secondary-fixed-dim/20">
                <span class="material-symbols-outlined text-secondary text-2xl mt-0.5">info</span>
                <p class="font-body-md text-body-md text-on-secondary-container">
                  Sistem akan otomatis menghasilkan embedding untuk pencarian semantik setelah data disimpan. Proses ini memerlukan waktu beberapa detik untuk analisis AI.
                </p>
              </div>
              
              <!-- Form Actions -->
              <div class="flex justify-end items-center gap-4 pt-8">
                <button @click="goBack" class="px-8 h-12 rounded-lg border border-secondary text-secondary font-bold hover:bg-secondary/5 transition-all font-label-md text-label-md" type="button">
                  Batal
                </button>
                <button 
                  :disabled="isSaving" 
                  :class="{'bg-green-600 hover:bg-green-700': isSaved}"
                  class="px-8 h-12 rounded-lg bg-primary text-on-primary font-bold hover:bg-primary-container shadow-sm hover:shadow-md transition-all font-label-md text-label-md flex items-center gap-2" 
                  type="submit">
                  <span v-if="isSaving" class="material-symbols-outlined animate-spin text-[18px]">sync</span>
                  <span v-if="isSaved" class="material-symbols-outlined text-[18px]">check_circle</span>
                  {{ isSaving ? 'Menyimpan...' : (isSaved ? 'Berhasil Disimpan' : 'Simpan Skripsi') }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
</template>
