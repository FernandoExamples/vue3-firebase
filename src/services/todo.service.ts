import type { Todo } from '@/entities/todo'
import { db, auth } from '@/plugins/firebase'
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore/lite'

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
  async fetchTodo(id: string): Promise<Todo> {
    const docReference = doc(db, 'todos', id)
    const docSnapshot = await getDoc(docReference)

    if (!docSnapshot.exists()) throw new Error('No existe la tarea con id: ' + id)

    const { title, uid, description } = docSnapshot.data()

    return { id: docSnapshot.id, title, uid, description }
  }

  async addTodo(todo: Todo): Promise<Todo> {
    const newTodo = await addDoc(collection(db, 'todos'), todo)
    return { id: newTodo.id, ...todo }
  }

  async deleteTodo(id: string) {
    const docReference = doc(db, 'todos', id)
    const docSnapshot = await getDoc(docReference)

    if (!docSnapshot.exists()) throw new Error('No existe la tarea con id: ' + id)
    if (docSnapshot.data().uid !== auth.currentUser?.uid) throw new Error('Esta tarea no te pertenece')
    await deleteDoc(docReference)
  }

  async updateTodo(id: string, todo: Todo) {
    const docReference = doc(db, 'todos', id)
    const docSnapshot = await getDoc(docReference)

    if (!docSnapshot.exists()) throw new Error('No existe la tarea con id: ' + id)
    if (docSnapshot.data().uid !== auth.currentUser?.uid) throw new Error('Esta tarea no te pertenece')

    await updateDoc(docReference, { ...todo })
  }
}

export const todoService = new TodoService()
