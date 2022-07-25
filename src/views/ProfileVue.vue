<template>
  <a-row>
    <a-col :xs="{ span: 24 }" :md="{ span: 12, offset: 6 }">
      <h1>Información de Perfil</h1>

      <div class="text-center" v-if="userStore.user?.photoUrl">
        <a-avatar :src="userStore.user.photoUrl" :size="150"></a-avatar>
      </div>

      <a-form @finish="handleSubmit" layout="vertical" :model="formState">
        <a-form-item label="Email" name="email">
          <a-input v-model:value="formState.email" disabled> </a-input>
        </a-form-item>

        <a-form-item label="Nombre de Usuario" name="username">
          <a-input v-model:value="formState.username"> </a-input>
        </a-form-item>

        <a-upload
          list-type="picture"
          :file-list="fileList"
          :before-upload="beforeUploadImage"
          @remove="handleRemoveImage"
          accept=".jpg,.png,.jpeg"
        >
          <a-button>
            <upload-outlined></upload-outlined>
            Imagen de perfil
          </a-button>
        </a-upload>

        <a-button type="primary" html-type="submit" :loading="loading">Actualizar Información</a-button>
      </a-form>
    </a-col>
  </a-row>
</template>

<script lang="ts" setup>
  import type { User } from '@/entities/user'
  import { useUserStore } from '@/stores/user.store'
  import { reactive, ref } from 'vue'
  import { message, type UploadProps } from 'ant-design-vue'
  import { userService } from '@/services/users.service'

  const userStore = useUserStore()

  const loading = ref(false)
  const fileList = ref<UploadProps['fileList']>([])

  const formState = reactive({
    email: userStore.user?.email,
    username: userStore.user?.name,
  })

  const handleSubmit = async () => {
    loading.value = true
    const newUserData: User = {
      ...userStore.user!,
      name: formState.username,
    }

    if (fileList.value!.length > 0) {
      const image = fileList.value![0]
      const imageUrl = await userService.uploadProfileImage(image as any)
      newUserData.photoUrl = imageUrl
    }

    await userStore.updateProfile(newUserData)
    message.success('Perfil Actualizado con éxito')
    loading.value = false
  }

  const beforeUploadImage: UploadProps['beforeUpload'] = (file) => {
    fileList.value = [file]
    return false
  }

  const handleRemoveImage: UploadProps['onRemove'] = (file) => {
    fileList.value = []
  }
</script>

<style>
  .mb-5 {
    margin-bottom: 5rem;
  }

  .text-center {
    text-align: center;
  }
</style>
