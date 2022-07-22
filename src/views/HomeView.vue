<script setup lang="ts">
  import { useUserStore } from '../stores/user.store'
  const { user } = useUserStore()
</script>

<template>
  <h1>Hola : {{ user?.email }}</h1>
</template>
