<script setup lang="ts">
  import type { Rule } from 'ant-design-vue/es/form'
  import { reactive, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useUserStore } from '../stores/user.store'
  import { message } from 'ant-design-vue'

  const userStore = useUserStore()
  const router = useRouter()

  const loading = ref(false)
  const formState = reactive({
    email: 'fernando@gmail.com',
    password: '123123',
  })

  const handleSubmit = async () => {
    loading.value = true
    try {
      await userStore.signInWithEmailAndPassword(formState.email, formState.password)
      router.replace('/')
    } catch (error: any) {
      message.error(error.message)
    }
    loading.value = false
  }

  const rules: Record<string, Rule[]> = {
    email: [{ required: true, message: 'Por favor ingresa tu email!' }],
    password: [{ required: true, message: 'Por favor ingresa tu contraseña!' }],
  }
</script>

<template>
  <a-row>
    <a-col :xs="{ span: 24 }" :md="{ span: 12, offset: 6 }">
      <h1>Login</h1>
      <a-form @finish="handleSubmit" layout="vertical" :model="formState" :rules="rules">
        <a-form-item label="Email" name="email">
          <a-input v-model:value="formState.email"> </a-input>
        </a-form-item>

        <a-form-item label="Contraseña" name="password">
          <a-input-password v-model:value="formState.password"> </a-input-password>
        </a-form-item>

        <a-button type="primary" html-type="submit" :loading="loading">Submit</a-button>
      </a-form>
    </a-col>
  </a-row>
</template>
