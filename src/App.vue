<script setup lang="ts">
  import { RouterView, useRouter } from 'vue-router'
  import { useUserStore } from './stores/user.store'

  const userStore = useUserStore()
  const router = useRouter()

  const logout = () => {
    userStore
      .logout()
      .then(() => {
        router.replace('/login')
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
