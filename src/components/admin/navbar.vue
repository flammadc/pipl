<template>
  <div>
    <!-- SideNavBar -->
    <aside class="fixed left-0 top-0 h-screen w-[240px] bg-primary-container flex flex-col py-6 px-4 shadow-sm z-50">
      <!-- Brand Header -->
      <div class="mb-10 px-2">
        <h1 class="font-headline-md text-headline-md font-bold text-on-primary-container leading-tight">Smart Repositori TA</h1>
        <p class="font-label-md text-label-md text-on-primary-container/60 mt-1 uppercase tracking-wider">Academic Admin</p>
      </div>
      <!-- Navigation Links -->
      <nav class="flex-1 space-y-2">
        <a class="flex items-center gap-3 px-4 py-3 bg-secondary-container text-on-secondary-container rounded-lg font-bold transition-all scale-95 duration-200" href="#">
          <span class="material-symbols-outlined" data-icon="dashboard">dashboard</span>
          <span class="font-label-md text-label-md">Dashboard</span>
        </a>
        <a class="flex items-center gap-3 px-4 py-3 text-on-primary-container/70 hover:text-on-primary-container hover:bg-primary/50 transition-colors duration-200 rounded-lg" href="#">
          <span class="material-symbols-outlined" data-icon="description">description</span>
          <span class="font-label-md text-label-md">Data Skripsi</span>
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

    <!-- Main Content Area with TopAppBar -->
    <div class="ml-[240px] flex-1 flex flex-col">
      <header class="flex justify-between items-center w-full h-16 px-8 bg-surface shadow-sm sticky top-0 z-40">
        <div class="flex items-center gap-4">
          <h2 class="font-headline-md text-headline-md font-bold text-primary">Dashboard</h2>
        </div>
        <div class="flex items-center gap-6">
          <button class="bg-primary text-white px-5 py-2.5 rounded-xl font-label-md text-label-md flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all shadow-sm">
            <span class="material-symbols-outlined text-[20px]" data-icon="add">add</span>
            Tambah Skripsi
          </button>
          <div class="h-8 w-[1px] bg-outline-variant/30"></div>
          <div class="flex items-center gap-4">
            <button class="text-on-surface-variant hover:text-primary transition-colors">
              <span class="material-symbols-outlined" data-icon="notifications">notifications</span>
            </button>
            <button class="text-on-surface-variant hover:text-primary transition-colors">
              <span class="material-symbols-outlined" data-icon="help_outline">help_outline</span>
            </button>
            <div class="w-9 h-9 rounded-full overflow-hidden border-2 border-primary/10">
              <img class="w-full h-full object-cover" alt="Profile" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJCj-H03iqnoPWZuG8KOqiOw2xd7Ho5c_H7IjlRpRpk5dYVWM970gAhe2l4JhiVuuq8QbU61sbSNsTGWn9FrKwJCsLEnhPSHFYAB2N3viuwLYqVaFq0Q_Cqvnahr7SQJZc2Wp_c6RFCihuUVrFA5lAbXKKVpADx0JK55ZZ6lvRB92P-FPsUcOCsUCa466Ja7yCX949m2jKU-BN58lAVSd1U1YiY1pwC4WjPeAimqr68S13VIpheEh3uOSpZctm96QhbKvPVYMMYw"/>
            </div>
          </div>
        </div>
      </header>
    </div>
  </div>
</template>
