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
  },
})
