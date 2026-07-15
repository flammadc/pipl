<script setup>
import Navbar from '@/components/mahasiswa/navbar.vue'
import Footer from '@/components/mahasiswa/footer.vue'
</script>

<template>
  <div class="bg-background min-h-screen flex flex-col">
    <Navbar />
    <slot />
    <Footer />
  </div>
</template>
