import { auth } from '@/plugins/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'

export class UserService {
  async registerWithEmailAndPassword(email: string, password: string) {
    const { user } = await createUserWithEmailAndPassword(auth, email, password)
    return user
  }
}

export const userService = new UserService()
