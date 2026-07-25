<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const showPassword = ref(false)
const email = ref('')
const password = ref('')

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const handleLogin = async () => {
  const ok = await authStore.login(email.value, password.value)
  if (ok) {
    const redirect = route.query.redirect
    if (redirect && typeof redirect === 'string') {
      router.push(redirect)
    } else if (authStore.isAdmin) {
      router.push({ name: 'admin-dashboard' })
    } else {
      router.push({ name: 'mahasiswa-dashboard' })
    }
  }
}
</script>

<template>
  <div class="min-h-screen flex flex-col justify-between overflow-x-hidden bg-background">
    <!-- Background Decoration (Subtle Gradients) -->
    <div class="fixed inset-0 z-0 pointer-events-none opacity-40">
      <div class="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] bg-secondary-container/20 rounded-full blur-3xl"></div>
      <div class="absolute bottom-[-10%] left-[-5%] w-[30vw] h-[30vw] bg-primary/10 rounded-full blur-3xl"></div>
    </div>

    <!-- Main Content -->
    <main class="relative z-10 flex-grow flex items-center justify-center px-margin-mobile md:px-margin-desktop py-stack-xl">
      <div class="w-full max-w-md">
        <!-- Brand Identity -->
        <div class="text-center mb-stack-lg">
          <div class="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-xl mb-stack-md shadow-lg">
            <span class="material-symbols-outlined text-on-primary text-[32px]" style="font-variation-settings: 'FILL' 1;">school</span>
          </div>
          <h1 class="font-headline-md text-headline-md text-primary mb-1">Smart Repositori TA</h1>
          <p class="font-body-md text-on-surface-variant opacity-80">Sistem Manajemen Tugas Akhir Digital</p>
        </div>

        <!-- Login Card -->
        <div class="login-card bg-surface-container-lowest rounded-xl p-stack-lg border border-surface-container shadow-sm relative z-20">
          <header class="mb-stack-lg">
            <h2 class="font-headline-lg-mobile md:font-headline-md text-primary mb-2">Selamat Datang</h2>
            <p class="font-body-md text-on-surface-variant">Silakan masuk untuk mengakses repositori skripsi</p>
          </header>

          <!-- Error Banner -->
          <div
            v-if="authStore.error"
            class="mb-stack-md flex items-center gap-3 px-4 py-3 bg-error-container text-on-error-container rounded-lg text-body-sm font-body-md"
          >
            <span class="material-symbols-outlined text-[18px]">error</span>
            {{ authStore.error }}
          </div>

          <form @submit.prevent="handleLogin" class="space-y-stack-md">
            <!-- Email Input -->
            <div class="space-y-2">
              <label for="email" class="block font-label-md text-on-surface">Email</label>
              <div class="relative input-group">
                <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline transition-colors">mail</span>
                <input v-model="email" type="email" id="email" required placeholder="nama@email.com" class="w-full h-12 pl-10 pr-4 bg-surface-container-low border border-outline-variant rounded-lg font-body-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all">
              </div>
            </div>

            <!-- Password Input -->
            <div class="space-y-2">
              <label for="password" class="block font-label-md text-on-surface">Password</label>
              <div class="relative input-group">
                <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline transition-colors">lock</span>
                <input v-model="password" :type="showPassword ? 'text' : 'password'" id="password" required placeholder="••••••••" class="w-full h-12 pl-10 pr-12 bg-surface-container-low border border-outline-variant rounded-lg font-body-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all">
                <button type="button" @click="togglePassword" class="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors flex items-center justify-center">
                  <span class="material-symbols-outlined text-[20px]">{{ showPassword ? 'visibility_off' : 'visibility' }}</span>
                </button>
              </div>
            </div>

            <!-- Forgot Password -->
            <div class="flex justify-end mt-2">
              <a href="#" class="font-label-md text-secondary hover:text-primary underline-offset-4 hover:underline transition-colors">Lupa Password?</a>
            </div>

            <!-- Submit Button -->
            <button type="submit" :disabled="authStore.isLoading" class="w-full h-[48px] bg-primary text-on-primary font-label-md rounded-lg flex items-center justify-center gap-2 hover:bg-primary-container transition-all active:scale-[0.98] shadow-sm mt-stack-md disabled:opacity-70 disabled:cursor-not-allowed">
              <template v-if="authStore.isLoading">
                <span class="material-symbols-outlined animate-spin">progress_activity</span>
                Memproses...
              </template>
              <template v-else>
                Masuk Sekarang
                <span class="material-symbols-outlined text-[18px]">login</span>
              </template>
            </button>

            <!-- Divider -->
            <div class="relative flex items-center py-stack-md">
              <div class="flex-grow border-t border-outline-variant"></div>
              <span class="flex-shrink mx-4 text-on-surface-variant font-label-sm">atau</span>
              <div class="flex-grow border-t border-outline-variant"></div>
            </div>

            <!-- SSO Button -->
            <button type="button" class="w-full h-[48px] border-2 border-primary text-primary font-label-md rounded-lg flex items-center justify-center gap-2 hover:bg-primary/5 transition-all active:scale-[0.98]">
              <span class="material-symbols-outlined text-[20px]">account_balance</span>
              Masuk dengan SSO Universitas
            </button>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>
