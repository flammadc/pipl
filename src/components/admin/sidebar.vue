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
      <a class="flex items-center gap-3 px-4 py-3 text-on-primary-container/70 hover:text-on-primary-container hover:bg-primary/50 transition-colors duration-200 rounded-lg" href="#">
        <span class="material-symbols-outlined" data-icon="description">description</span>
        <span class="font-label-md text-label-md">Data Skripsi</span>
      </a>
      <a class="flex items-center gap-3 px-4 py-3 text-on-primary-container/70 hover:text-on-primary-container hover:bg-primary/50 transition-colors duration-200 rounded-lg" href="#">
        <span class="material-symbols-outlined" data-icon="cluster">flutter</span>
        <span class="font-label-md text-label-md">Klaster</span>
      </a>
      <a class="flex items-center gap-3 px-4 py-3 text-on-primary-container/70 hover:text-on-primary-container hover:bg-primary/50 transition-colors duration-200 rounded-lg" href="#">
        <span class="material-symbols-outlined" data-icon="history">history</span>
        <span class="font-label-md text-label-md">Riwayat Pencarian</span>
      </a>
      <a class="flex items-center gap-3 px-4 py-3 text-on-primary-container/70 hover:text-on-primary-container hover:bg-primary/50 transition-colors duration-200 rounded-lg" href="#">
        <span class="material-symbols-outlined" data-icon="settings">settings</span>
        <span class="font-label-md text-label-md">Pengaturan</span>
      </a>
    </nav>
    <!-- Footer Tab -->
    <div class="mt-auto border-t border-on-primary-container/10 pt-6">
      <a class="flex items-center gap-3 px-4 py-3 text-on-primary-container/70 hover:text-on-primary-container hover:bg-primary/50 transition-colors duration-200 rounded-lg" href="#">
        <span class="material-symbols-outlined" data-icon="account_circle">account_circle</span>
        <span class="font-label-md text-label-md">Profile</span>
      </a>
    </div>
  </aside>
</template>
