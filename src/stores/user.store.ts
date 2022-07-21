import type { User } from '@/entities/user'
import { userService } from '@/services/auth.service'
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
      try {
        const user = await userService.registerWithEmailAndPassword(email, password)
        console.log(user)
        this.user = {
          uid: user.uid,
          email: user.email!,
        }
      } catch (error: any) {
        console.log(error.message)
        throw error
      }
    },
  },
})
