<script setup lang="ts">
  import { useUserStore } from '../stores/user.store'
  import { useTodoStore } from '@/stores/todos.store'
  import type { Todo } from '@/entities/todo'

  const { user } = useUserStore()
  const todoStore = useTodoStore()

  const deleteTodo = (todo: Todo) => {
    const confirmation = confirm('Estas seguro?')
    if (!confirmation) return

    todoStore.deleteTodo(todo.id!)
  }

  todoStore.fetchTodos()
</script>

<template>
  <h1>Hola : {{ user?.email }}</h1>
  <h3>Tus Tareas:</h3>
  <router-link :to="{ name: 'todo.create' }">Agregar tarea</router-link>
  <ul>
    <li v-for="todo in todoStore.todos" :key="todo.id">
      <p>{{ todo.title }}:</p>
      <p>{{ todo.description }}</p>
      <button @click="deleteTodo(todo)">Eliminar</button> |
      <router-link :to="{ name: 'todo.edit', params: { id: todo.id } }">Actualizar</router-link>
    </li>
  </ul>
</template>
