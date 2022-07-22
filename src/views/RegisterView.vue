<script setup lang="ts">
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useUserStore } from '../stores/user.store'

  const userStore = useUserStore()
  const router = useRouter()

  const email = ref('fernando@gmail.com')
  const password = ref('123123')
  const loading = ref(false)

  const handleSubmit = async () => {
    loading.value = true
    try {
      await userStore.registerWithEmailAndPassword(email.value, password.value)
      router.replace('/')
    } catch (error: any) {
      console.log(error.message)
    }
    loading.value = false
  }
</script>

<template>
  <h1>Registro</h1>
  <form @submit.prevent="handleSubmit">
    <input type="text" v-model.trim="email" placeholder="Ingresa tu email" required />
    <input type="password" v-model.trim="password" placeholder="Ingresa tu contraseña" required />
    <button type="submit" :disabled="loading">Registrarse</button>
  </form>
</template>
