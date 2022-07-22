<script setup lang="ts">
  import { useUserStore } from '../stores/user.store'
  import { useTodoStore } from '@/stores/todos.store'

  const { user } = useUserStore()
  const todoStore = useTodoStore()

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
    </li>
  </ul>
</template>
