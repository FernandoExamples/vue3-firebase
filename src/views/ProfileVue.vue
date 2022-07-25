<template>
  <a-row>
    <a-col :xs="{ span: 24 }" :md="{ span: 12, offset: 6 }">
      <h1>Información de Perfil</h1>
      <a-form @finish="handleSubmit" layout="vertical" :model="formState">
        <a-form-item label="Email" name="email">
          <a-input v-model:value="formState.email" disabled> </a-input>
        </a-form-item>

        <a-form-item label="Nombre de Usuario" name="username">
          <a-input v-model:value="formState.username"> </a-input>
        </a-form-item>

        <a-form-item label="Foto de perfil" name="image">
          <a-input type="file"> </a-input>
        </a-form-item>

        <a-button type="primary" html-type="submit" :loading="loading">Actualizar Información</a-button>
      </a-form>
    </a-col>
  </a-row>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue'

  const loading = ref(false)
  const formState = reactive({
    email: '',
    username: '',
  })

  const handleSubmit = () => {
    //
  }
</script>
