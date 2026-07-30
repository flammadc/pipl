<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import AdminTopbar from '@/components/admin/topbar.vue'
import { get, post, put, patch } from '@/services/api'

const router = useRouter()

const users = ref([])
const isLoading = ref(true)
const error = ref('')
const search = ref('')
const page = ref(1)
const limit = ref(10)
const total = ref(0)

const showAddModal = ref(false)
const showEditModal = ref(false)
const showResetModal = ref(false)
const formError = ref('')
const formSuccess = ref('')
const isSaving = ref(false)

const addForm = ref({ name: '', email: '', password: '', role: 'mahasiswa' })
const editForm = ref({ id: null, name: '', email: '', role: 'mahasiswa' })
const resetForm = ref({ id: null, password: '' })

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

function resetFormState() {
  formError.value = ''
  formSuccess.value = ''
}

function openAddModal() {
  addForm.value = { name: '', email: '', password: '', role: 'mahasiswa' }
  resetFormState()
  showAddModal.value = true
}

function openEditModal(user) {
  editForm.value = { id: user.id, name: user.name, email: user.email, role: user.role }
  resetFormState()
  showEditModal.value = true
}

function openResetModal(user) {
  resetForm.value = { id: user.id, password: '' }
  resetFormState()
  showResetModal.value = true
}

function closeAddModal() {
  showAddModal.value = false
}

function closeEditModal() {
  showEditModal.value = false
}

function closeResetModal() {
  showResetModal.value = false
}

async function submitAddUser() {
  isSaving.value = true
  formError.value = ''
  formSuccess.value = ''
  try {
    const data = await post('/api/admin/users', addForm.value)
    users.value.unshift(data)
    total.value++
    formSuccess.value = 'User berhasil ditambahkan.'
    setTimeout(() => {
      closeAddModal()
      formSuccess.value = ''
    }, 1200)
  } catch (e) {
    formError.value = e.message || 'Gagal menambahkan user.'
  } finally {
    isSaving.value = false
  }
}

async function submitEditUser() {
  isSaving.value = true
  formError.value = ''
  formSuccess.value = ''
  try {
    const data = await put(`/api/admin/users/${editForm.value.id}`, editForm.value)
    const idx = users.value.findIndex(u => u.id === data.id)
    if (idx !== -1) users.value[idx] = data
    formSuccess.value = 'User berhasil diperbarui.'
    setTimeout(() => {
      closeEditModal()
      formSuccess.value = ''
    }, 1200)
  } catch (e) {
    formError.value = e.message || 'Gagal memperbarui user.'
  } finally {
    isSaving.value = false
  }
}

async function submitResetPassword() {
  isSaving.value = true
  formError.value = ''
  formSuccess.value = ''
  try {
    await patch(`/api/admin/users/${resetForm.value.id}/password`, { password: resetForm.value.password })
    formSuccess.value = 'Password berhasil direset.'
    setTimeout(() => {
      closeResetModal()
      formSuccess.value = ''
    }, 1200)
  } catch (e) {
    formError.value = e.message || 'Gagal mereset password.'
  } finally {
    isSaving.value = false
  }
}

onMounted(loadUsers)
</script>

<template>
  <AdminTopbar title="Manajemen User" :show-back-button="true" :show-tabs="false" :back-to="{ name: 'admin-dashboard' }">
    <template #actions></template>
  </AdminTopbar>

  <div class="flex-grow p-margin-desktop overflow-y-auto">
    <div class="max-w-6xl mx-auto">
      <div class="bg-white rounded-xl shadow-[0px_2px_4px_rgba(31,56,100,0.05)] border border-primary/5 overflow-hidden">
        <!-- Header & Search -->
        <div class="px-8 py-6 border-b border-surface-container-low flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white">
          <h3 class="font-headline-md text-headline-md text-primary font-bold">Daftar User</h3>
          <div class="flex items-center gap-3">
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
            <button
              @click="openAddModal"
              class="bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:opacity-90 transition-all"
            >
              <span class="material-symbols-outlined text-[18px]">person_add</span>
              Tambah User
            </button>
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
                    <button
                      @click="openEditModal(user)"
                      class="p-2 text-primary hover:bg-primary hover:text-white rounded-lg transition-all"
                      title="Edit User"
                    >
                      <span class="material-symbols-outlined text-[18px]">edit</span>
                    </button>
                    <button
                      @click="openResetModal(user)"
                      class="p-2 text-secondary hover:bg-secondary hover:text-white rounded-lg transition-all"
                      title="Reset Password"
                    >
                      <span class="material-symbols-outlined text-[18px]">lock_reset</span>
                    </button>
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

    <!-- Modal Tambah User -->
    <div v-if="showAddModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div class="bg-white rounded-xl shadow-lg w-full max-w-md p-6 space-y-4">
        <div class="flex justify-between items-center">
          <h3 class="text-headline-md font-headline-md text-primary font-bold">Tambah User Baru</h3>
          <button @click="closeAddModal" class="text-on-surface-variant hover:text-error">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>
        <div v-if="formError" class="bg-error-container text-on-error-container p-3 rounded-lg text-sm">{{ formError }}</div>
        <div v-if="formSuccess" class="bg-green-100 text-green-700 p-3 rounded-lg text-sm">{{ formSuccess }}</div>
        <div class="space-y-3">
          <div>
            <label class="block text-label-sm font-bold text-primary mb-1">Nama</label>
            <input v-model="addForm.name" class="w-full h-10 px-3 border border-outline-variant rounded-lg text-sm focus:ring-primary focus:border-primary outline-none" type="text" />
          </div>
          <div>
            <label class="block text-label-sm font-bold text-primary mb-1">Email</label>
            <input v-model="addForm.email" class="w-full h-10 px-3 border border-outline-variant rounded-lg text-sm focus:ring-primary focus:border-primary outline-none" type="email" />
          </div>
          <div>
            <label class="block text-label-sm font-bold text-primary mb-1">Password</label>
            <input v-model="addForm.password" class="w-full h-10 px-3 border border-outline-variant rounded-lg text-sm focus:ring-primary focus:border-primary outline-none" type="password" />
          </div>
          <div>
            <label class="block text-label-sm font-bold text-primary mb-1">Role</label>
            <select v-model="addForm.role" class="w-full h-10 px-3 border border-outline-variant rounded-lg text-sm bg-surface-container-low outline-none">
              <option value="mahasiswa">Mahasiswa</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>
        <div class="flex justify-end gap-3 pt-2">
          <button @click="closeAddModal" class="px-4 py-2 border border-outline-variant rounded-lg text-sm font-bold text-on-surface-variant hover:bg-surface-container-low">Batal</button>
          <button @click="submitAddUser" :disabled="isSaving" class="px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:opacity-90 disabled:opacity-60 flex items-center gap-2">
            <span v-if="isSaving" class="material-symbols-outlined animate-spin text-[16px]">sync</span>
            {{ isSaving ? 'Menyimpan...' : 'Simpan' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Modal Edit User -->
    <div v-if="showEditModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div class="bg-white rounded-xl shadow-lg w-full max-w-md p-6 space-y-4">
        <div class="flex justify-between items-center">
          <h3 class="text-headline-md font-headline-md text-primary font-bold">Edit User</h3>
          <button @click="closeEditModal" class="text-on-surface-variant hover:text-error">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>
        <div v-if="formError" class="bg-error-container text-on-error-container p-3 rounded-lg text-sm">{{ formError }}</div>
        <div v-if="formSuccess" class="bg-green-100 text-green-700 p-3 rounded-lg text-sm">{{ formSuccess }}</div>
        <div class="space-y-3">
          <div>
            <label class="block text-label-sm font-bold text-primary mb-1">Nama</label>
            <input v-model="editForm.name" class="w-full h-10 px-3 border border-outline-variant rounded-lg text-sm focus:ring-primary focus:border-primary outline-none" type="text" />
          </div>
          <div>
            <label class="block text-label-sm font-bold text-primary mb-1">Email</label>
            <input v-model="editForm.email" class="w-full h-10 px-3 border border-outline-variant rounded-lg text-sm focus:ring-primary focus:border-primary outline-none" type="email" />
          </div>
          <div>
            <label class="block text-label-sm font-bold text-primary mb-1">Role</label>
            <select v-model="editForm.role" class="w-full h-10 px-3 border border-outline-variant rounded-lg text-sm bg-surface-container-low outline-none">
              <option value="mahasiswa">Mahasiswa</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>
        <div class="flex justify-end gap-3 pt-2">
          <button @click="closeEditModal" class="px-4 py-2 border border-outline-variant rounded-lg text-sm font-bold text-on-surface-variant hover:bg-surface-container-low">Batal</button>
          <button @click="submitEditUser" :disabled="isSaving" class="px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:opacity-90 disabled:opacity-60 flex items-center gap-2">
            <span v-if="isSaving" class="material-symbols-outlined animate-spin text-[16px]">sync</span>
            {{ isSaving ? 'Menyimpan...' : 'Simpan' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Modal Reset Password -->
    <div v-if="showResetModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div class="bg-white rounded-xl shadow-lg w-full max-w-md p-6 space-y-4">
        <div class="flex justify-between items-center">
          <h3 class="text-headline-md font-headline-md text-primary font-bold">Reset Password</h3>
          <button @click="closeResetModal" class="text-on-surface-variant hover:text-error">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>
        <div v-if="formError" class="bg-error-container text-on-error-container p-3 rounded-lg text-sm">{{ formError }}</div>
        <div v-if="formSuccess" class="bg-green-100 text-green-700 p-3 rounded-lg text-sm">{{ formSuccess }}</div>
        <div>
          <label class="block text-label-sm font-bold text-primary mb-1">Password Baru</label>
          <input v-model="resetForm.password" class="w-full h-10 px-3 border border-outline-variant rounded-lg text-sm focus:ring-primary focus:border-primary outline-none" type="password" />
        </div>
        <div class="flex justify-end gap-3 pt-2">
          <button @click="closeResetModal" class="px-4 py-2 border border-outline-variant rounded-lg text-sm font-bold text-on-surface-variant hover:bg-surface-container-low">Batal</button>
          <button @click="submitResetPassword" :disabled="isSaving" class="px-4 py-2 bg-secondary text-white rounded-lg text-sm font-bold hover:opacity-90 disabled:opacity-60 flex items-center gap-2">
            <span v-if="isSaving" class="material-symbols-outlined animate-spin text-[16px]">sync</span>
            {{ isSaving ? 'Menyimpan...' : 'Reset Password' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
