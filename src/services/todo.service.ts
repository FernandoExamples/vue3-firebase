import type { Todo } from '@/entities/todo'
import { db, auth } from '@/plugins/firebase'
import { collection, getDocs, query, where } from 'firebase/firestore/lite'

class TodoService {
  async fetchTodos() {
    const querySnapshot = await getDocs(query(collection(db, 'todos'), where('uid', '==', auth.currentUser?.uid)))
    const todos = querySnapshot.docs.map<Todo>((doc) => ({
      id: doc.id,
      title: doc.data().title,
      description: doc.data().description,
      uid: auth.currentUser!.uid,
    }))
    return todos
  }
}

export const todoService = new TodoService()
