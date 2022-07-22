import type { User } from '@/entities/user'
import { authService } from '@/services/auth.service'
import { defineStore } from 'pinia'

interface State {
  user: User | null
}

export const useUserStore = defineStore({
  id: 'user',
  state: (): State => ({
    user: null,
  }),
  getters: {},
  actions: {
    async registerWithEmailAndPassword(email: string, password: string) {
      const user = await authService.registerWithEmailAndPassword(email, password)
      this.user = user
    },

    async signInWithEmailAndPassword(email: string, password: string) {
      const user = await authService.signInWithEmailAndPassword(email, password)
      this.user = user
    },

    async logout() {
      await authService.logout()
      this.user = null
    },

    listenToAuthState() {
      authService.listenToAuthStateChange((user) => {
        this.user = user
      })
    },
  },
})
