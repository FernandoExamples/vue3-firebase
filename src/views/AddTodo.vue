<script setup lang="ts">
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useTodoStore } from '../stores/todos.store'
  import { useUserStore } from '../stores/user.store'

  const todoStore = useTodoStore()
  const userStore = useUserStore()
  const router = useRouter()

  const title = ref('')
  const description = ref('')

  const handleSubmit = async () => {
    await todoStore.addTodo({ uid: userStore.user!.uid, title: title.value, description: description.value })
    router.push({ name: 'home' })
  }
</script>

<template>
  <h3>Agregar Nueva Tarea</h3>
  <a-form @submit.prevent="handleSubmit">
    <a-input type="text" placeholder="Título" v-model:value="title" />
    <a-textarea :rows="10" placeholder="Descripción" v-model:value="description"></a-textarea>
    <a-button html-type="submit">Agregar</a-button>
  </a-form>
</template>
