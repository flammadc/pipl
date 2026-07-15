<script setup>
import AdminSidebar from '@/components/admin/sidebar.vue'
import AdminFooter from '@/components/admin/footer.vue'
</script>

<template>
  <div class="flex min-h-screen text-on-surface bg-[#EAF0F8]">
    <AdminSidebar />
    <main class="ml-[240px] flex-1 flex flex-col w-full">
      <slot />
      <AdminFooter />
    </main>
  </div>
</template>
