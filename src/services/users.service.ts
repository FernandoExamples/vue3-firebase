import type { User } from '@/entities/user'
import { db } from '@/plugins/firebase'
import { doc, DocumentReference, getDoc, setDoc, type DocumentData } from 'firebase/firestore/lite'

class UserService {
  async upsertUser(user: User) {
    const userReference = doc(db, 'users', user.uid)
    setDoc(userReference, user, { merge: true })
  }
}

export const userService = new UserService()
