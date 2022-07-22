<script setup lang="ts">
  import type { Todo } from '@/entities/todo'
  import { todoService } from '@/services/todo.service'
  import { onMounted, ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useTodoStore } from '../stores/todos.store'
  import { useUserStore } from '../stores/user.store'

  const todoStore = useTodoStore()
  const userStore = useUserStore()
  const router = useRouter()
  const route = useRoute()

  const title = ref('')
  const description = ref('')
  const editedTodo = ref<Todo>()
  const id = route.params.id as string

  onMounted(() => {
    const fetchData = async () => {
      const todo = await todoService.fetchTodo(id)
      editedTodo.value = todo
      title.value = todo.title
      description.value = todo.description
    }

    fetchData()
  })

  const handleSubmit = async () => {
    await todoStore.updateTodo(id, {
      ...editedTodo.value!,
      title: title.value,
      description: description.value,
    })
    router.push({ name: 'home' })
  }
</script>

<template>
  <h3>Actualizar Tarea</h3>

  <a-form @submit.prevent="handleSubmit" v-if="editedTodo">
    <a-input type="text" placeholder="Título" v-model:value="title" />
    <a-textarea cols="30" :rows="10" placeholder="Descripción" v-model:value="description"></a-textarea>
    <a-button html-type="submit">Actualizar</a-button>
  </a-form>
</template>
