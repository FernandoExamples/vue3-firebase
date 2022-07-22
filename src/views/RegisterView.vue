<script setup lang="ts">
  import type { Rule } from 'ant-design-vue/es/form'
  import { ref, reactive } from 'vue'
  import { useRouter } from 'vue-router'
  import { useUserStore } from '../stores/user.store'
  import { message } from 'ant-design-vue'

  const userStore = useUserStore()
  const router = useRouter()

  const loading = ref(false)
  const formState = reactive({
    email: '',
    password: '',
    passwordConfirm: '',
  })

  const handleSubmit = async () => {
    loading.value = true
    try {
      await userStore.registerWithEmailAndPassword(formState.email, formState.password)
      router.replace('/')
    } catch (error: any) {
      message.error(error.message)
    }
    loading.value = false
  }

  let verifyMatchPasswords = async (_rule: Rule, value: string) => {
    if (formState.passwordConfirm != formState.password) return Promise.reject('Las contarseñas no coinciden!')

    return Promise.resolve()
  }

  const rules: Record<string, Rule[]> = {
    email: [{ required: true, message: 'Por favor ingresa tu email!' }],
    password: [
      { required: true, message: 'Por favor ingresa tu contraseña!' },
      { min: 6, message: 'La contraseña debe de ser de 6 caracteres' },
    ],
    checkPass: [{ validator: verifyMatchPasswords, trigger: 'change' }],
  }
</script>

<template>
  <a-row>
    <a-col :xs="{ span: 24 }" :md="{ span: 12, offset: 6 }">
      <h1>Registro</h1>
      <a-form @finish="handleSubmit" layout="vertical" :model="formState" :rules="rules">
        <a-form-item label="Email" name="email">
          <a-input v-model:value="formState.email" type="email" />
        </a-form-item>

        <a-form-item label="Contraseña" name="password">
          <a-input-password v-model:value="formState.password" autocomplete="off" />
        </a-form-item>

        <a-form-item label="Repite tu contraseña" name="checkPass">
          <a-input-password v-model:value="formState.passwordConfirm" autocomplete="off" />
        </a-form-item>

        <a-button type="primary" html-type="submit" :loading="loading">Submit</a-button>
      </a-form>
    </a-col>
  </a-row>
</template>
