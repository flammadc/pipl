<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <aside class="fixed left-0 top-0 h-screen w-[240px] bg-primary-container flex flex-col py-6 px-4 shadow-sm z-50">
    <!-- Brand Header -->
    <div class="mb-10 px-2">
      <h1 class="font-headline-md text-headline-md font-bold text-on-primary-container leading-tight">Smart Repositori TA</h1>
      <p class="font-label-md text-label-md text-on-primary-container/60 mt-1 uppercase tracking-wider">Academic Admin</p>
    </div>
    <!-- Navigation Links -->
    <nav class="flex-1 space-y-2">
      <router-link to="/admin" :class="route.path === '/admin' ? 'bg-secondary-container text-on-secondary-container font-bold' : 'text-on-primary-container/70 hover:text-on-primary-container hover:bg-primary/50'" class="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200">
        <span class="material-symbols-outlined" data-icon="dashboard">dashboard</span>
        <span class="font-label-md text-label-md">Dashboard</span>
      </router-link>
      <router-link to="/admin/add" :class="route.path === '/admin/add' ? 'bg-secondary-container text-on-secondary-container font-bold' : 'text-on-primary-container/70 hover:text-on-primary-container hover:bg-primary/50'" class="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200">
        <span class="material-symbols-outlined" data-icon="add">add</span>
        <span class="font-label-md text-label-md">Tambah Skripsi</span>
      </router-link>
      <router-link to="/admin/bulk" :class="route.path === '/admin/bulk' ? 'bg-secondary-container text-on-secondary-container font-bold' : 'text-on-primary-container/70 hover:text-on-primary-container hover:bg-primary/50'" class="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200">
        <span class="material-symbols-outlined" data-icon="upload_file">upload_file</span>
        <span class="font-label-md text-label-md">Impor Massal</span>
      </router-link>
      <router-link to="/admin/users" :class="route.path === '/admin/users' ? 'bg-secondary-container text-on-secondary-container font-bold' : 'text-on-primary-container/70 hover:text-on-primary-container hover:bg-primary/50'" class="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200">
        <span class="material-symbols-outlined" data-icon="manage_accounts">manage_accounts</span>
        <span class="font-label-md text-label-md">Manajemen User</span>
      </router-link>
    </nav>
    <!-- Footer Tab -->
    <div class="mt-auto border-t border-on-primary-container/10 pt-6">
      <router-link to="/admin/profile" :class="route.path === '/admin/profile' ? 'bg-secondary-container text-on-secondary-container font-bold' : 'text-on-primary-container/70 hover:text-on-primary-container hover:bg-primary/50'" class="flex items-center gap-3 px-4 py-3 transition-colors duration-200 rounded-lg">
        <span class="material-symbols-outlined" data-icon="account_circle">account_circle</span>
        <span class="font-label-md text-label-md">Profile</span>
      </router-link>
    </div>
  </aside>
</template>
