<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import AdminTopbar from '@/components/admin/topbar.vue'
import { postForm } from '@/services/api'

const router = useRouter()

const isSaving = ref(false)
const isSaved = ref(false)
const errorMessage = ref('')

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
  year: '',
})

function resetForm() {
  form.title = ''
  form.abstract = ''
  form.author = ''
  form.advisor = ''
  form.year = ''
  form.keywords = ''
  form.file = null
  errors.title = ''
  errors.year = ''
  errorMessage.value = ''
}

function validate() {
  let ok = true
  errors.title = ''
  errors.year = ''

  if (!form.title.trim()) {
    errors.title = 'Judul skripsi wajib diisi.'
    ok = false
  }

  if (form.year && !/^\d{4}$/.test(form.year)) {
    errors.year = 'Tahun harus berupa 4 digit angka.'
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
    if (form.abstract.trim()) formData.append('abstract', form.abstract.trim())
    if (form.author.trim()) formData.append('author', form.author.trim())
    if (form.advisor.trim()) formData.append('advisor', form.advisor.trim())
    if (form.year) formData.append('year', parseInt(form.year, 10))
    if (form.keywords.trim()) formData.append('keywords', form.keywords.trim())
    if (form.file) formData.append('file', form.file)

    await postForm('/api/admin/theses', formData)
    isSaved.value = true
    setTimeout(() => {
      isSaved.value = false
      router.push({ name: 'admin-dashboard' })
    }, 1500)
  } catch (e) {
    errorMessage.value = e.message || 'Gagal menyimpan skripsi.'
  } finally {
    isSaving.value = false
  }
}

function goBack() {
  router.push({ name: 'admin-dashboard' })
}
</script>

<template>
  <AdminTopbar title="Tambah Skripsi Baru" :show-tabs="true" :show-back-button="true" :back-to="{ name: 'admin-dashboard' }" />

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
          Skripsi berhasil disimpan. Mengalihkan ke dashboard...
        </div>

        <form @submit.prevent="submitForm" class="space-y-gutter">
          <!-- Title Field -->
          <div class="space-y-stack-sm">
            <label class="font-label-md text-label-md text-primary font-semibold">
              Judul Skripsi <span class="text-error">*</span>
            </label>
            <input
              v-model="form.title"
              class="w-full h-12 px-4 rounded-lg border border-outline-variant focus:border-secondary focus:ring-1 focus:ring-secondary/20 outline-none transition-all font-body-md text-body-md"
              placeholder="Masukkan judul lengkap skripsi"
              type="text"
            />
            <p v-if="errors.title" class="text-error text-body-sm">{{ errors.title }}</p>
          </div>

          <!-- Abstract Field -->
          <div class="space-y-stack-sm">
            <label class="font-label-md text-label-md text-primary font-semibold">Abstrak</label>
            <textarea
              v-model="form.abstract"
              class="w-full px-4 py-3 rounded-lg border border-outline-variant focus:border-secondary focus:ring-1 focus:ring-secondary/20 outline-none transition-all font-body-md text-body-md resize-none"
              placeholder="Tuliskan ringkasan penelitian..."
              rows="6"
            ></textarea>
          </div>

          <!-- Two Column Row for Basic Info -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            <div class="space-y-stack-sm">
              <label class="font-label-md text-label-md text-primary font-semibold">Nama Penulis</label>
              <input
                v-model="form.author"
                class="w-full h-12 px-4 rounded-lg border border-outline-variant focus:border-secondary focus:ring-1 focus:ring-secondary/20 outline-none transition-all font-body-md text-body-md"
                placeholder="Nama mahasiswa lengkap"
                type="text"
              />
            </div>
            <div class="space-y-stack-sm">
              <label class="font-label-md text-label-md text-primary font-semibold">Nama Dosen Pembimbing</label>
              <input
                v-model="form.advisor"
                class="w-full h-12 px-4 rounded-lg border border-outline-variant focus:border-secondary focus:ring-1 focus:ring-secondary/20 outline-none transition-all font-body-md text-body-md"
                placeholder="Nama dosen pembimbing utama"
                type="text"
              />
            </div>
          </div>

          <!-- Two Column Row for Meta Info -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            <div class="space-y-stack-sm">
              <label class="font-label-md text-label-md text-primary font-semibold">Tahun</label>
              <input
                v-model="form.year"
                class="w-full h-12 px-4 rounded-lg border border-outline-variant focus:border-secondary focus:ring-1 focus:ring-secondary/20 outline-none transition-all font-body-md text-body-md"
                placeholder="2024"
                type="text"
                maxlength="4"
              />
              <p v-if="errors.year" class="text-error text-body-sm">{{ errors.year }}</p>
            </div>
            <div class="space-y-stack-sm">
              <label class="font-label-md text-label-md text-primary font-semibold">Kata Kunci</label>
              <input
                v-model="form.keywords"
                class="w-full h-12 px-4 rounded-lg border border-outline-variant focus:border-secondary focus:ring-1 focus:ring-secondary/20 outline-none transition-all font-body-md text-body-md"
                placeholder="sistem informasi, web, perpustakaan"
                type="text"
              />
            </div>
          </div>

          <!-- File PDF -->
          <div class="space-y-stack-sm">
            <label class="font-label-md text-label-md text-primary font-semibold">File PDF Skripsi</label>
            <input
              type="file"
              accept=".pdf"
              @change="(e) => { form.file = e.target.files?.[0] || null }"
              class="block w-full text-body-md text-on-surface file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary file:text-on-primary hover:file:bg-primary-container cursor-pointer"
            />
            <p class="text-on-surface-variant text-label-sm">
              Unggah file PDF skripsi (opsional). Ukuran maksimal 10 MB. File akan tersimpan di server dan dapat diakses publik.
            </p>
          </div>

          <!-- Info Banner -->
          <div class="flex items-start gap-4 p-4 bg-secondary-fixed/30 rounded-xl border border-secondary-fixed-dim/20">
            <span class="material-symbols-outlined text-secondary text-2xl mt-0.5">info</span>
            <p class="font-body-md text-body-md text-on-secondary-container">
              Data yang ditambahkan di sini akan langsung muncul di pencarian dan tren yang dilihat mahasiswa.
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
              {{ isSaving ? 'Menyimpan...' : (isSaved ? 'Berhasil Disimpan' : 'Simpan Skripsi') }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
