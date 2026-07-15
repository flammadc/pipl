import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    userRole: 'mahasiswa', // or 'admin'
  }),
  actions: {
    setRole(role) {
      this.userRole = role
    },
  },
})
