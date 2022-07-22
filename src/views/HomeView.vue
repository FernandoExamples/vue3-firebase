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

  <a-list item-layout="horizontal" :data-source="todoStore.todos">
    <template #renderItem="{ item }">
      <a-list-item>
        <a-list-item-meta :description="item.description">
          <template #title>
            <p>{{ item.title }}</p>
          </template>
        </a-list-item-meta>
        <a-button @click="deleteTodo(item)">Eliminar</a-button>
        <a-button>
          <router-link :to="{ name: 'todo.edit', params: { id: item.id } }">Actualizar</router-link>
        </a-button>
      </a-list-item>
    </template>
  </a-list>
</template>
