<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import AdminTopbar from '@/components/admin/topbar.vue'
import { get, putForm } from '@/services/api'

const router = useRouter()
const route = useRoute()

const isSaving = ref(false)
const isSaved = ref(false)
const isLoading = ref(true)
const errorMessage = ref('')
const thesisId = route.query.id

const form = reactive({
  title: '',
  abstract: '',
  author: '',
  advisor: '',
  year: '',
  keywords: '',
  file: null,
})

const errors = reactive({
  title: '',
  abstract: '',
  author: '',
  advisor: '',
  year: '',
  keywords: '',
  file: '',
})

onMounted(async () => {
  if (!thesisId) {
    errorMessage.value = 'ID skripsi tidak ditemukan.'
    isLoading.value = false
    return
  }
  try {
    const data = await get(`/api/admin/theses/${thesisId}`)
    form.title = data.title || ''
    form.abstract = data.abstract || ''
    form.author = data.author || ''
    form.advisor = data.advisor || ''
    form.year = data.year || ''
    form.keywords = data.keywords || ''
  } catch (e) {
    errorMessage.value = 'Gagal memuat data skripsi: ' + e.message
  } finally {
    isLoading.value = false
  }
})

function validate() {
  let ok = true
  Object.keys(errors).forEach(k => errors[k] = '')

  if (!form.title.trim()) {
    errors.title = 'Judul skripsi wajib diisi.'
    ok = false
  }
  if (!form.abstract.trim()) {
    errors.abstract = 'Abstrak wajib diisi.'
    ok = false
  }
  if (!form.author.trim()) {
    errors.author = 'Nama penulis wajib diisi.'
    ok = false
  }
  if (!form.advisor.trim()) {
    errors.advisor = 'Nama dosen pembimbing wajib diisi.'
    ok = false
  }
  if (!form.year) {
    errors.year = 'Tahun wajib diisi.'
    ok = false
  } else if (!/^\d{4}$/.test(form.year)) {
    errors.year = 'Tahun harus berupa 4 digit angka.'
    ok = false
  }
  if (!form.keywords.trim()) {
    errors.keywords = 'Kata kunci wajib diisi.'
    ok = false
  }

  return ok
}

async function submitForm() {
  if (!validate()) return

  isSaving.value = true
  errorMessage.value = ''
  isSaved.value = false

  try {
    const formData = new FormData()
    formData.append('title', form.title.trim())
    formData.append('abstract', form.abstract.trim())
    formData.append('author', form.author.trim())
    formData.append('advisor', form.advisor.trim())
    formData.append('year', parseInt(form.year, 10))
    formData.append('keywords', form.keywords.trim())
    if (form.file) {
      formData.append('file', form.file)
    }

    await putForm(`/api/admin/theses/${thesisId}`, formData)
    
    isSaved.value = true
    setTimeout(() => {
      isSaved.value = false
      router.push({ name: 'admin-dashboard' })
    }, 1500)
  } catch (e) {
    errorMessage.value = e.message || 'Gagal memperbarui skripsi.'
  } finally {
    isSaving.value = false
  }
}

function goBack() {
  router.push({ name: 'admin-dashboard' })
}
</script>

<template>
  <AdminTopbar title="Edit Skripsi" :show-tabs="true" :show-back-button="true" :back-to="{ name: 'admin-dashboard' }" />

  <div class="flex-grow p-margin-desktop overflow-y-auto">
    <div class="max-w-5xl mx-auto">
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
          v-if="isSaved"
          class="flex items-center gap-3 px-4 py-3 bg-green-100 text-green-700 rounded-lg text-body-sm font-body-md"
        >
          <span class="material-symbols-outlined text-[18px]">check_circle</span>
          Skripsi berhasil diperbarui. Mengalihkan ke dashboard...
        </div>

        <div v-if="isLoading" class="flex flex-col items-center justify-center py-24 gap-4">
          <span class="material-symbols-outlined animate-spin text-4xl text-primary">sync</span>
          <p class="text-body-md text-on-surface-variant">Memuat data skripsi...</p>
        </div>

        <form v-else-if="!isLoading && !errorMessage" @submit.prevent="submitForm" class="space-y-gutter">
          <!-- Title Field -->
          <div class="space-y-stack-sm">
            <label class="font-label-md text-label-md text-primary font-semibold">
              Judul Skripsi <span class="text-error">*</span>
            </label>
            <input
              v-model="form.title"
              :class="errors.title ? 'border-error focus:border-error focus:ring-error/20' : 'border-outline-variant focus:border-secondary focus:ring-secondary/20'"
              class="w-full h-12 px-4 rounded-lg border focus:ring-1 outline-none transition-all font-body-md text-body-md"
              placeholder="Masukkan judul lengkap skripsi"
              type="text"
            />
            <p v-if="errors.title" class="text-error text-body-sm">{{ errors.title }}</p>
          </div>

          <!-- Abstract Field -->
          <div class="space-y-stack-sm">
            <label class="font-label-md text-label-md text-primary font-semibold">
              Abstrak <span class="text-error">*</span>
            </label>
            <textarea
              v-model="form.abstract"
              :class="errors.abstract ? 'border-error focus:border-error focus:ring-error/20' : 'border-outline-variant focus:border-secondary focus:ring-secondary/20'"
              class="w-full px-4 py-3 rounded-lg border focus:ring-1 outline-none transition-all font-body-md text-body-md resize-none"
              placeholder="Tuliskan ringkasan penelitian..."
              rows="6"
            ></textarea>
            <p v-if="errors.abstract" class="text-error text-body-sm">{{ errors.abstract }}</p>
          </div>

          <!-- Two Column Row for Basic Info -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            <div class="space-y-stack-sm">
              <label class="font-label-md text-label-md text-primary font-semibold">
                Nama Penulis <span class="text-error">*</span>
              </label>
              <input
                v-model="form.author"
                :class="errors.author ? 'border-error focus:border-error focus:ring-error/20' : 'border-outline-variant focus:border-secondary focus:ring-secondary/20'"
                class="w-full h-12 px-4 rounded-lg border focus:ring-1 outline-none transition-all font-body-md text-body-md"
                placeholder="Nama mahasiswa lengkap"
                type="text"
              />
              <p v-if="errors.author" class="text-error text-body-sm">{{ errors.author }}</p>
            </div>
            <div class="space-y-stack-sm">
              <label class="font-label-md text-label-md text-primary font-semibold">
                Nama Dosen Pembimbing <span class="text-error">*</span>
              </label>
              <input
                v-model="form.advisor"
                :class="errors.advisor ? 'border-error focus:border-error focus:ring-error/20' : 'border-outline-variant focus:border-secondary focus:ring-secondary/20'"
                class="w-full h-12 px-4 rounded-lg border focus:ring-1 outline-none transition-all font-body-md text-body-md"
                placeholder="Nama dosen pembimbing utama"
                type="text"
              />
              <p v-if="errors.advisor" class="text-error text-body-sm">{{ errors.advisor }}</p>
            </div>
          </div>

          <!-- Two Column Row for Meta Info -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            <div class="space-y-stack-sm">
              <label class="font-label-md text-label-md text-primary font-semibold">
                Tahun <span class="text-error">*</span>
              </label>
              <input
                v-model="form.year"
                :class="errors.year ? 'border-error focus:border-error focus:ring-error/20' : 'border-outline-variant focus:border-secondary focus:ring-secondary/20'"
                class="w-full h-12 px-4 rounded-lg border focus:ring-1 outline-none transition-all font-body-md text-body-md"
                placeholder="2024"
                type="text"
                maxlength="4"
              />
              <p v-if="errors.year" class="text-error text-body-sm">{{ errors.year }}</p>
            </div>
            <div class="space-y-stack-sm">
              <label class="font-label-md text-label-md text-primary font-semibold">
                Kata Kunci <span class="text-error">*</span>
              </label>
              <input
                v-model="form.keywords"
                :class="errors.keywords ? 'border-error focus:border-error focus:ring-error/20' : 'border-outline-variant focus:border-secondary focus:ring-secondary/20'"
                class="w-full h-12 px-4 rounded-lg border focus:ring-1 outline-none transition-all font-body-md text-body-md"
                placeholder="sistem informasi, web, perpustakaan"
                type="text"
              />
              <p v-if="errors.keywords" class="text-error text-body-sm">{{ errors.keywords }}</p>
            </div>
          </div>

          <!-- File PDF -->
          <div class="space-y-stack-sm">
            <label class="font-label-md text-label-md text-primary font-semibold">
              Ganti File PDF Skripsi <span class="text-on-surface-variant text-label-sm font-normal">(Opsional)</span>
            </label>
            <input
              type="file"
              accept=".pdf"
              @change="(e) => { form.file = e.target.files?.[0] || null; if (form.file) errors.file = '' }"
              :class="errors.file ? 'ring-1 ring-error rounded-lg' : ''"
              class="block w-full text-body-md text-on-surface file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary file:text-on-primary hover:file:bg-primary-container cursor-pointer"
            />
            <p v-if="errors.file" class="text-error text-body-sm">{{ errors.file }}</p>
            <p v-else class="text-on-surface-variant text-label-sm">
              Biarkan kosong jika tidak ingin mengubah file PDF.
            </p>
          </div>

          <!-- Info Banner -->
          <div class="flex items-start gap-4 p-4 bg-secondary-fixed/30 rounded-xl border border-secondary-fixed-dim/20">
            <span class="material-symbols-outlined text-secondary text-2xl mt-0.5">info</span>
            <p class="font-body-md text-body-md text-on-secondary-container">
              Perubahan pada data ini akan langsung mengubah hasil pencarian. File PDF yang lama tetap digunakan.
            </p>
          </div>

          <!-- Form Actions -->
          <div class="flex justify-end items-center gap-4 pt-8">
            <button
              @click="goBack"
              type="button"
              class="px-8 h-12 rounded-lg border border-secondary text-secondary font-bold hover:bg-secondary/5 transition-all font-label-md text-label-md"
            >
              Batal
            </button>
            <button
              :disabled="isSaving || isSaved"
              :class="{ 'bg-green-600 hover:bg-green-700': isSaved }"
              class="px-8 h-12 rounded-lg bg-primary text-on-primary font-bold hover:bg-primary-container shadow-sm hover:shadow-md transition-all font-label-md text-label-md flex items-center gap-2"
              type="submit"
            >
              <span v-if="isSaving" class="material-symbols-outlined animate-spin text-[18px]">sync</span>
              <span v-if="isSaved" class="material-symbols-outlined text-[18px]">check_circle</span>
              {{ isSaving ? 'Menyimpan...' : (isSaved ? 'Berhasil Diperbarui' : 'Simpan Perubahan') }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
