<script setup lang="ts">
  import { RouterView, useRouter } from 'vue-router'
  import { useTodoStore } from './stores/todos.store'
  import { useUserStore } from './stores/user.store'
  import { authService } from './services/auth.service'

  const userStore = useUserStore()
  const todoStore = useTodoStore()
  const router = useRouter()

  const logout = () => {
    authService
      .logout()
      .then(() => {
        router.replace('/login')
        userStore.$reset()
        todoStore.$reset()
      })
      .catch((error) => {
        console.log(error.message)
      })
  }

  userStore.listenToAuthState()
</script>

<template>
  <h1>App</h1>
  <nav>
    <router-link to="/" v-if="userStore.user">Home | </router-link>
    <router-link to="/login" v-if="!userStore.user">Login | </router-link>
    <router-link to="/register" v-if="!userStore.user">Register | </router-link>
    <button @click="logout" v-if="userStore.user">Logout</button>
  </nav>
  <RouterView />
</template>
