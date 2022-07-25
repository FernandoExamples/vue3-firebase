import type { User } from '@/entities/user'
import type { User as FirebaseUser } from 'firebase/auth'
import { auth } from '@/plugins/firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  AuthErrorCodes,
  onAuthStateChanged,
} from 'firebase/auth'

class AuthService {
  async registerWithEmailAndPassword(email: string, password: string): Promise<User> {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password)
      return this.mapFirebaseUsertoUser(user)
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
      return this.mapFirebaseUsertoUser(user)
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
      listener(user ? this.mapFirebaseUsertoUser(user) : null)
    })
  }

  getCurrentUser() {
    return new Promise<User | null>((resolve, reject) => {
      const unsuscribe = onAuthStateChanged(
        auth,
        (user) => {
          if (!user) return resolve(null)
          resolve(this.mapFirebaseUsertoUser(user))
        },
        (e) => reject(e)
      )
      unsuscribe()
    })
  }

  private mapFirebaseUsertoUser(user: FirebaseUser) {
    return {
      uid: user.uid,
      email: user.email!,
      name: user.displayName,
      photoUrl: user.photoURL,
    }
  }
}

export const authService = new AuthService()
