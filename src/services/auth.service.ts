import type { User } from '@/entities/user'
import { auth } from '@/plugins/firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  AuthErrorCodes,
  onAuthStateChanged,
} from 'firebase/auth'
export class AuthService {
  async registerWithEmailAndPassword(email: string, password: string): Promise<User> {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password)
      return {
        uid: user.uid,
        email: user.email!,
      }
    } catch (error: any) {
      if (error.code == AuthErrorCodes.EMAIL_EXISTS) {
        throw new Error('El email ya está en uso')
      }
      throw new Error('Error al realizar el registro: ' + error.message)
    }
  }

  async signInWithEmailAndPassword(email: string, password: string): Promise<User> {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password)
      return {
        uid: user.uid,
        email: user.email!,
      }
    } catch (error: any) {
      if (error.code == AuthErrorCodes.USER_DELETED) {
        throw new Error('Credenciales incorrectas')
      }
      throw new Error('Error al realizar hacer login: ' + error.message)
    }
  }

  async logout() {
    await signOut(auth)
  }

  async listenToAuthStateChange(listener: (user: User | null) => void) {
    onAuthStateChanged(auth, (user) => {
      listener(user ? { uid: user.uid, email: user.email! } : null)
    })
  }
}

export const authService = new AuthService()
