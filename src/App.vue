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
  <a-layout>
    <a-layout-header>
      <a-menu theme="dark" mode="horizontal" :style="{ lineHeight: '64px' }">
        <a-menu-item key="1" v-if="userStore.user"><router-link to="/">Home</router-link></a-menu-item>
        <a-menu-item key="2" v-if="!userStore.user"><router-link to="/login">Login</router-link></a-menu-item>
        <a-menu-item key="3" v-if="!userStore.user"><router-link to="/register">Register</router-link></a-menu-item>
        <a-menu-item key="3" v-if="userStore.user">
          <a-button type="text" @click="logout" style="color: #fff">Logout</a-button>
        </a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout-content style="padding: 3rem;">
      <RouterView />
    </a-layout-content>
    <a-layout-footer style="position: fixed; bottom: 0; right: 0; left: 0;">Footer</a-layout-footer>
  </a-layout>
</template>
