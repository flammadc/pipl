<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import AdminTopbar from '@/components/admin/topbar.vue'
import { get, patch } from '@/services/api'

const router = useRouter()

const users = ref([])
const isLoading = ref(true)
const error = ref('')
const search = ref('')
const page = ref(1)
const limit = ref(10)
const total = ref(0)
const savingId = ref(null)

const hasNext = computed(() => page.value * limit.value < total.value)
const hasPrev = computed(() => page.value > 1)

async function loadUsers() {
  isLoading.value = true
  error.value = ''
  try {
    const data = await get('/api/admin/users', {
      q: search.value,
      page: page.value,
      limit: limit.value,
    })
    users.value = data.results || []
    total.value = data.total || 0
  } catch (e) {
    error.value = e.message || 'Gagal mengambil data user.'
    users.value = []
  } finally {
    isLoading.value = false
  }
}

async function changeRole(user, newRole) {
  if (user.role === newRole) return
  savingId.value = user.id
  try {
    await patch(`/api/admin/users/${user.id}/role`, { role: newRole })
    user.role = newRole
  } catch (e) {
    error.value = e.message || 'Gagal mengubah role user.'
  } finally {
    savingId.value = null
  }
}

function nextPage() {
  if (hasNext.value) {
    page.value++
    loadUsers()
  }
}

function prevPage() {
  if (hasPrev.value) {
    page.value--
    loadUsers()
  }
}

function onSearch() {
  page.value = 1
  loadUsers()
}

onMounted(loadUsers)
</script>

<template>
  <AdminTopbar title="Manajemen User" :show-back-button="true" :show-tabs="false">
    <template #actions>
      <router-link
        :to="{ name: 'admin-dashboard' }"
        class="bg-primary text-white px-5 py-2.5 rounded-xl font-label-md text-label-md flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all shadow-sm"
      >
        <span class="material-symbols-outlined text-[20px]" data-icon="arrow_back">arrow_back</span>
        Kembali
      </router-link>
    </template>
  </AdminTopbar>

  <div class="flex-grow p-margin-desktop overflow-y-auto">
    <div class="max-w-6xl mx-auto">
      <div class="bg-white rounded-xl shadow-[0px_2px_4px_rgba(31,56,100,0.05)] border border-primary/5 overflow-hidden">
        <!-- Header & Search -->
        <div class="px-8 py-6 border-b border-surface-container-low flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white">
          <h3 class="font-headline-md text-headline-md text-primary font-bold">Daftar User</h3>
          <div class="relative">
            <input
              v-model="search"
              @keyup.enter="onSearch"
              class="pl-10 pr-4 py-2 border border-outline-variant/30 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-surface-container-low w-full md:w-80"
              placeholder="Cari nama atau email..."
              type="text"
            />
            <span class="material-symbols-outlined absolute left-3 top-2.5 text-on-surface-variant text-[18px]">search</span>
          </div>
        </div>

        <!-- Error Banner -->
        <div v-if="error" class="mx-8 mt-6 flex items-center gap-3 px-4 py-3 bg-error-container text-on-error-container rounded-lg text-body-sm font-body-md">
          <span class="material-symbols-outlined text-[18px]">error</span>
          {{ error }}
        </div>

        <!-- Loading Skeleton -->
        <div v-if="isLoading" class="p-8 space-y-4">
          <div v-for="i in 5" :key="i" class="h-12 bg-surface-container-low rounded animate-pulse"></div>
        </div>

        <!-- Empty State -->
        <div v-else-if="!users.length" class="flex flex-col items-center py-16 gap-3 text-center">
          <span class="material-symbols-outlined text-outline-variant text-4xl">person_off</span>
          <p class="text-headline-md font-headline-md text-on-surface">Tidak ada user ditemukan</p>
          <p class="text-body-md text-on-surface-variant">Coba ubah kata kunci pencarian atau tambahkan user baru.</p>
        </div>

        <!-- Table -->
        <div v-else class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead class="bg-surface-container-low/50">
              <tr>
                <th class="px-8 py-4 font-bold text-primary text-sm">Nama</th>
                <th class="px-6 py-4 font-bold text-primary text-sm">Email</th>
                <th class="px-6 py-4 font-bold text-primary text-sm">Role</th>
                <th class="px-6 py-4 font-bold text-primary text-sm">Bergabung</th>
                <th class="px-8 py-4 font-bold text-primary text-sm text-center">Aksi</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-surface-container-low">
              <tr v-for="user in users" :key="user.id" class="hover:bg-primary/5 transition-colors">
                <td class="px-8 py-5 text-sm font-medium text-on-surface">
                  {{ user.name || '—' }}
                </td>
                <td class="px-6 py-5 text-sm text-on-surface-variant">
                  {{ user.email }}
                </td>
                <td class="px-6 py-5">
                  <span
                    :class="user.role === 'admin' ? 'bg-[#C77700]/10 text-[#C77700]' : 'bg-[#2E5395]/10 text-[#2E5395]'"
                    class="px-3 py-1 rounded-full text-xs font-bold capitalize"
                  >
                    {{ user.role }}
                  </span>
                </td>
                <td class="px-6 py-5 text-sm text-on-surface-variant">
                  {{ user.created_at ? new Date(user.created_at).toLocaleDateString('id-ID') : '—' }}
                </td>
                <td class="px-8 py-5">
                  <div class="flex items-center justify-center gap-3">
                    <select
                      v-model="user.role"
                      @change="changeRole(user, $event.target.value)"
                      :disabled="savingId === user.id"
                      class="h-9 px-3 rounded-lg border border-outline-variant text-sm bg-surface-container-low focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    >
                      <option value="mahasiswa">Mahasiswa</option>
                      <option value="admin">Admin</option>
                    </select>
                    <span v-if="savingId === user.id" class="material-symbols-outlined animate-spin text-primary text-[18px]">sync</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="px-8 py-4 border-t border-surface-container-low flex items-center justify-between bg-white">
          <p class="text-sm text-on-surface-variant">
            Menampilkan {{ users.length }} dari {{ total }} user
          </p>
          <div class="flex items-center gap-2">
            <button
              @click="prevPage"
              :disabled="!hasPrev"
              class="px-3 py-2 rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container-low disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span class="material-symbols-outlined text-[18px]">chevron_left</span>
            </button>
            <span class="text-sm text-on-surface font-medium px-2">{{ page }}</span>
            <button
              @click="nextPage"
              :disabled="!hasNext"
              class="px-3 py-2 rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container-low disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span class="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
