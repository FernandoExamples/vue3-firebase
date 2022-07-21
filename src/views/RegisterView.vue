<script setup lang="ts">
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useUserStore } from '../stores/user.store'

  const userStore = useUserStore()
  const router = useRouter()

  const email = ref('fernando@gmail.com')
  const password = ref('123123')

  const handleSubmit = () => {
    userStore.registerWithEmailAndPassword(email.value, password.value).then(() => {
      router.replace('/')
    })
  }
</script>

<template>
  <h1>Registro</h1>
  <form @submit.prevent="handleSubmit">
    <input type="text" v-model.trim="email" placeholder="Ingresa tu email" required />
    <input type="password" v-model.trim="password" placeholder="Ingresa tu contraseña" required />
    <button type="submit">Registrarse</button>
  </form>
</template>
