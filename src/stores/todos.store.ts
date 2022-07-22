import { defineStore } from 'pinia'
import type { Todo } from '@/entities/todo'
import { todoService } from '@/services/todo.service'

interface State {
  todos: Todo[]
}

export const useTodoStore = defineStore({
  id: 'TodoStore',
  state: (): State => ({
    todos: [],
  }),
  actions: {
    async fetchTodos() {
      if (this.todos.length != 0) return
      const todos = await todoService.fetchTodos()
      console.log(todos)
      this.todos = todos
    },

    async addTodo(todo: Todo) {
      const newTodo = await todoService.addTodo(todo)
      this.todos.push(newTodo)
    },

    async deleteTodo(id: string) {
      await todoService.deleteTodo(id)
      this.todos = this.todos.filter((t) => t.id != id)
    },

    async updateTodo(id: string, todo: Todo) {
      await todoService.updateTodo(id, todo)
      this.todos = this.todos.map((t) => (t.id == id ? todo : t))
    },
  },
})
