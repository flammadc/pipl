<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { put, patch } from '@/services/api'

const authStore = useAuthStore()

const isSaving = ref(false)
const isSavingPassword = ref(false)
const error = ref('')
const success = ref('')
const passwordError = ref('')
const passwordSuccess = ref('')

const name = ref(authStore.user?.name || '')
const isAdmin = computed(() => authStore.user?.role === 'admin')

const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')

async function saveProfile() {
  if (!name.value.trim()) {
    error.value = 'Nama wajib diisi.'
    return
  }
  isSaving.value = true
  error.value = ''
  success.value = ''
  try {
    const data = await put('/api/auth/me', { name: name.value.trim() })
    success.value = 'Profil berhasil diperbarui.'
    if (data.user) {
      authStore.user = data.user
      localStorage.setItem('auth_user', JSON.stringify(data.user))
    }
  } catch (e) {
    error.value = e.message || 'Gagal memperbarui profil.'
  } finally {
    isSaving.value = false
  }
}

async function changePassword() {
  passwordError.value = ''
  passwordSuccess.value = ''
  if (!currentPassword.value || !newPassword.value) {
    passwordError.value = 'Password lama dan password baru wajib diisi.'
    return
  }
  if (newPassword.value.length < 6) {
    passwordError.value = 'Password baru minimal 6 karakter.'
    return
  }
  if (newPassword.value !== confirmPassword.value) {
    passwordError.value = 'Konfirmasi password tidak cocok.'
    return
  }

  isSavingPassword.value = true
  try {
    await patch('/api/auth/password', {
      currentPassword: currentPassword.value,
      newPassword: newPassword.value,
    })
    passwordSuccess.value = 'Password berhasil diubah.'
    currentPassword.value = ''
    newPassword.value = ''
    confirmPassword.value = ''
  } catch (e) {
    passwordError.value = e.message || 'Gagal mengubah password.'
  } finally {
    isSavingPassword.value = false
  }
}
</script>

<template>
  <main class="flex-grow max-w-container-max mx-auto w-full px-margin-desktop py-stack-lg">
    <div class="max-w-2xl mx-auto space-y-stack-lg">
      <h1 class="text-headline-lg font-headline-lg text-primary">Profile</h1>

      <!-- Info Card -->
      <div class="bg-white rounded-xl shadow-sm border border-surface-variant p-stack-lg space-y-stack-md">
        <div class="flex items-center gap-4">
          <div class="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white text-headline-md font-bold">
            {{ (authStore.user?.name || '?').charAt(0).toUpperCase() }}
          </div>
          <div>
            <h2 class="text-body-lg font-bold text-on-surface">{{ authStore.user?.name || '—' }}</h2>
            <p class="text-body-md text-on-surface-variant">{{ authStore.user?.email || '—' }}</p>
            <span class="inline-block mt-1 px-3 py-1 rounded-full text-label-sm font-bold capitalize" :class="isAdmin ? 'bg-[#C77700]/10 text-[#C77700]' : 'bg-[#2E5395]/10 text-[#2E5395]'">
              {{ authStore.user?.role || '—' }}
            </span>
          </div>
        </div>
      </div>

      <!-- Edit Name Card -->
      <div class="bg-white rounded-xl shadow-sm border border-surface-variant p-stack-lg space-y-stack-md">
        <h3 class="text-headline-md font-headline-md text-primary font-bold">Edit Profil</h3>
        <div v-if="error" class="bg-error-container text-on-error-container p-4 rounded-lg text-body-sm">{{ error }}</div>
        <div v-if="success" class="bg-green-100 text-green-700 p-4 rounded-lg text-body-sm">{{ success }}</div>
        <div class="space-y-stack-sm">
          <label class="font-label-md text-label-md text-primary font-semibold">Nama</label>
          <input
            v-model="name"
            type="text"
            class="w-full h-12 px-4 rounded-lg border border-outline-variant focus:border-secondary focus:ring-1 focus:ring-secondary/20 outline-none transition-all font-body-md text-body-md"
            placeholder="Nama lengkap"
          />
        </div>
        <div class="flex justify-end">
          <button
            @click="saveProfile"
            :disabled="isSaving"
            class="px-6 py-3 bg-primary text-white font-bold rounded-lg hover:opacity-90 transition-all disabled:opacity-60 flex items-center gap-2"
          >
            <span v-if="isSaving" class="material-symbols-outlined animate-spin text-[18px]">sync</span>
            {{ isSaving ? 'Menyimpan...' : 'Simpan Perubahan' }}
          </button>
        </div>
      </div>

      <!-- Change Password Card (admin only) -->
      <div v-if="isAdmin" class="bg-white rounded-xl shadow-sm border border-surface-variant p-stack-lg space-y-stack-md">
        <h3 class="text-headline-md font-headline-md text-primary font-bold">Ubah Password</h3>
        <div v-if="passwordError" class="bg-error-container text-on-error-container p-4 rounded-lg text-body-sm">{{ passwordError }}</div>
        <div v-if="passwordSuccess" class="bg-green-100 text-green-700 p-4 rounded-lg text-body-sm">{{ passwordSuccess }}</div>
        <div class="space-y-stack-sm">
          <label class="font-label-md text-label-md text-primary font-semibold">Password Lama</label>
          <input
            v-model="currentPassword"
            type="password"
            class="w-full h-12 px-4 rounded-lg border border-outline-variant focus:border-secondary focus:ring-1 focus:ring-secondary/20 outline-none transition-all font-body-md text-body-md"
            placeholder="Password saat ini"
          />
        </div>
        <div class="space-y-stack-sm">
          <label class="font-label-md text-label-md text-primary font-semibold">Password Baru</label>
          <input
            v-model="newPassword"
            type="password"
            class="w-full h-12 px-4 rounded-lg border border-outline-variant focus:border-secondary focus:ring-1 focus:ring-secondary/20 outline-none transition-all font-body-md text-body-md"
            placeholder="Minimal 6 karakter"
          />
        </div>
        <div class="space-y-stack-sm">
          <label class="font-label-md text-label-md text-primary font-semibold">Konfirmasi Password Baru</label>
          <input
            v-model="confirmPassword"
            type="password"
            class="w-full h-12 px-4 rounded-lg border border-outline-variant focus:border-secondary focus:ring-1 focus:ring-secondary/20 outline-none transition-all font-body-md text-body-md"
            placeholder="Ulangi password baru"
          />
        </div>
        <div class="flex justify-end">
          <button
            @click="changePassword"
            :disabled="isSavingPassword"
            class="px-6 py-3 bg-secondary text-white font-bold rounded-lg hover:opacity-90 transition-all disabled:opacity-60 flex items-center gap-2"
          >
            <span v-if="isSavingPassword" class="material-symbols-outlined animate-spin text-[18px]">sync</span>
            {{ isSavingPassword ? 'Menyimpan...' : 'Ubah Password' }}
          </button>
        </div>
      </div>
    </div>
  </main>
</template>
