<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import AdminTopbar from '@/components/admin/topbar.vue'
import { postForm, getFile } from '@/services/api'

const router = useRouter()

const file = ref(null)
const fileName = ref('')
const isUploading = ref(false)
const errorMessage = ref('')
const result = ref(null)

const isValid = computed(() => !!file.value)

function handleFileSelect(e) {
  const selected = e.target.files?.[0]
  if (selected) {
    file.value = selected
    fileName.value = selected.name
    errorMessage.value = ''
  }
}

function handleDrop(e) {
  e.preventDefault()
  const dropped = e.dataTransfer?.files?.[0]
  if (dropped) {
    file.value = dropped
    fileName.value = dropped.name
    errorMessage.value = ''
  }
}

function clearFile() {
  file.value = null
  fileName.value = ''
  result.value = null
  errorMessage.value = ''
}

function downloadTemplate() {
  getFile('/api/admin/theses/bulk-template', {}, 'template-skripsi.csv')
}

async function submitImport() {
  if (!file.value) {
    errorMessage.value = 'Pilih file CSV atau XLSX terlebih dahulu.'
    return
  }

  isUploading.value = true
  errorMessage.value = ''
  result.value = null

  try {
    const formData = new FormData()
    formData.append('file', file.value)
    const data = await postForm('/api/admin/theses/bulk-import', formData)
    result.value = data
  } catch (e) {
    errorMessage.value = e.message || 'Gagal mengimpor data.'
  } finally {
    isUploading.value = false
  }
}

function goBack() {
  router.push({ name: 'admin-dashboard' })
}
</script>

<template>
  <AdminTopbar title="Tambah Skripsi Massal" :show-tabs="true" :show-back-button="true" />

  <div class="flex-grow p-margin-desktop overflow-y-auto">
    <div class="max-w-5xl mx-auto w-full">
      <div class="bg-white rounded-xl shadow-[0px_2px_4px_rgba(31,56,100,0.05)] p-stack-xl flex flex-col gap-10">
        <!-- Error Banner -->
        <div
          v-if="errorMessage"
          class="flex items-center gap-3 px-4 py-3 bg-error-container text-on-error-container rounded-lg text-body-sm font-body-md"
        >
          <span class="material-symbols-outlined text-[18px]">error</span>
          {{ errorMessage }}
        </div>

        <!-- Success Banner -->
        <div
          v-if="result && result.inserted > 0 && result.failed === 0"
          class="flex items-center gap-3 px-4 py-3 bg-green-100 text-green-700 rounded-lg text-body-sm font-body-md"
        >
          <span class="material-symbols-outlined text-[18px]">check_circle</span>
          Semua data berhasil diimpor ({{ result.inserted }} baris).
        </div>

        <!-- STEP 1: Unduh Template -->
        <section class="flex flex-col md:flex-row items-start md:items-center justify-between gap-gutter">
          <div class="flex-1">
            <div class="flex items-center gap-3 mb-2">
              <span class="w-8 h-8 flex items-center justify-center bg-primary-fixed text-primary font-label-md rounded-full text-label-md">1</span>
              <h3 class="font-label-md text-label-md text-primary">Unduh Template</h3>
            </div>
            <p class="text-on-surface-variant font-body-md max-w-xl">
              Gunakan template CSV/XLSX untuk memastikan format data benar. Kolom wajib:
              <strong>title</strong>, plus kolom opsional: abstract, author, advisor, year, keywords, file_url.
            </p>
          </div>
          <button
            @click="downloadTemplate"
            class="flex items-center gap-2 px-6 py-3 border-2 border-primary text-primary font-bold rounded-xl hover:bg-primary/5 transition-colors h-[44px]"
          >
            <span class="material-symbols-outlined" data-icon="download">download</span>
            <span class="font-label-md text-label-md">Unduh Template CSV</span>
          </button>
        </section>
        <hr class="border-surface-container" />

        <!-- STEP 2: Unggah File -->
        <section class="flex flex-col gap-stack-lg">
          <div class="flex items-center gap-3">
            <span class="w-8 h-8 flex items-center justify-center bg-primary-fixed text-primary font-label-md rounded-full text-label-md">2</span>
            <h3 class="font-label-md text-label-md text-primary">Unggah File CSV / XLSX</h3>
          </div>

          <div
            v-if="!file"
            @drop="handleDrop"
            @dragover.prevent
            class="border-2 border-dashed border-outline-variant rounded-xl p-10 flex flex-col items-center justify-center bg-surface-container-low hover:bg-surface-container hover:border-primary hover:bg-primary-fixed/10 transition-all cursor-pointer group relative overflow-hidden"
          >
            <input type="file" accept=".csv,.xlsx,.xls" class="absolute inset-0 opacity-0 cursor-pointer z-10" @change="handleFileSelect" />
            <div class="w-14 h-14 bg-primary-fixed-dim rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <span class="material-symbols-outlined text-primary text-3xl" data-icon="cloud_upload">cloud_upload</span>
            </div>
            <p class="font-label-md text-label-md text-primary mb-1 text-center">
              Seret file CSV/XLSX ke sini atau <span class="underline">klik untuk unggah</span>
            </p>
            <p class="text-on-surface-variant font-label-md text-label-md">Maksimal 5 MB</p>
          </div>

          <!-- Selected File -->
          <div v-else class="flex items-center justify-between p-4 bg-surface-container-low rounded-xl border border-outline-variant/30">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-secondary-container/20 rounded flex items-center justify-center">
                <span class="material-symbols-outlined text-secondary" data-icon="upload_file">upload_file</span>
              </div>
              <div>
                <p class="font-label-md text-label-md text-on-surface font-bold">{{ fileName }}</p>
                <p class="text-on-surface-variant text-[12px]">Siap untuk diimpor</p>
              </div>
            </div>
            <div class="flex items-center gap-4">
              <span class="material-symbols-outlined text-green-600" data-icon="check_circle">check_circle</span>
              <button @click="clearFile" class="p-1 hover:bg-error-container/20 rounded-full text-error transition-colors z-20">
                <span class="material-symbols-outlined text-xl" data-icon="close">close</span>
              </button>
            </div>
          </div>
        </section>
        <hr class="border-surface-container" />

        <!-- STEP 3: Hasil Import -->
        <section v-if="result" class="flex flex-col gap-stack-lg">
          <div class="flex items-center gap-3">
            <span class="w-8 h-8 flex items-center justify-center bg-primary-fixed text-primary font-label-md rounded-full text-label-md">3</span>
            <h3 class="font-label-md text-label-md text-primary">Hasil Impor</h3>
          </div>

          <div class="flex flex-wrap gap-4">
            <div class="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 border border-green-200 rounded-lg font-label-md text-label-md">
              <span class="w-2 h-2 rounded-full bg-green-600"></span>
              {{ result.inserted }} baris berhasil
            </div>
            <div class="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-700 border border-red-200 rounded-lg font-label-md text-label-md">
              <span class="w-2 h-2 rounded-full bg-red-600"></span>
              {{ result.failed }} baris gagal
            </div>
            <div class="flex items-center gap-2 px-4 py-2 bg-surface-container text-on-surface-variant border border-outline-variant rounded-lg font-label-md text-label-md">
              <span class="w-2 h-2 rounded-full bg-on-surface-variant"></span>
              Total {{ result.total }} baris
            </div>
          </div>

          <!-- Errors Table -->
          <div v-if="result.errors && result.errors.length" class="bg-surface-container-low rounded-xl border border-outline-variant overflow-hidden">
            <div class="px-4 py-3 bg-error-container/30 border-b border-outline-variant/30">
              <h4 class="font-label-md text-label-md text-primary font-bold">Detail Baris Bermasalah</h4>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full text-left">
                <thead class="bg-surface-container">
                  <tr>
                    <th class="px-4 py-3 text-label-sm font-bold text-primary">Baris</th>
                    <th class="px-4 py-3 text-label-sm font-bold text-primary">Keterangan</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-outline-variant/30">
                  <tr v-for="err in result.errors" :key="err.row">
                    <td class="px-4 py-3 text-label-sm text-on-surface">{{ err.row }}</td>
                    <td class="px-4 py-3 text-label-sm text-on-surface-variant">{{ err.message }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Empty Errors -->
          <div v-else class="bg-green-50 text-green-700 px-4 py-3 rounded-xl text-body-md">
            Tidak ada baris yang gagal. Semua data berhasil diimpor.
          </div>
        </section>

        <!-- Info Banner -->
        <div class="flex items-start gap-4 p-5 bg-secondary-container/10 rounded-xl border border-secondary-container/20">
          <span class="material-symbols-outlined text-secondary" data-icon="info">info</span>
          <p class="text-on-secondary-container font-body-md flex-1">
            Data yang berhasil diimpor akan langsung muncul di pencarian dan tren mahasiswa. Baris yang gagal tidak akan menghentikan proses impor (partial success).
          </p>
        </div>

        <!-- Bottom Actions -->
        <div class="flex items-center justify-end gap-4">
          <button
            @click="goBack"
            type="button"
            class="px-8 py-3 border-2 border-outline text-on-surface-variant font-bold rounded-xl hover:bg-surface-container-highest transition-colors min-h-[44px]"
          >
            Kembali
          </button>
          <button
            @click="submitImport"
            :disabled="!isValid || isUploading"
            class="px-10 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-container shadow-sm active:scale-95 transition-all min-h-[44px] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <span v-if="isUploading" class="material-symbols-outlined animate-spin text-[18px] align-middle mr-2">sync</span>
            {{ isUploading ? 'Mengimpor...' : 'Mulai Impor Data' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
