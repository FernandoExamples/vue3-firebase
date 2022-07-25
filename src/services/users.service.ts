import type { User } from '@/entities/user'
import type { UploadFile } from 'ant-design-vue'
import { auth, storage } from '@/plugins/firebase'
import { updateProfile } from '@firebase/auth'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import type { FileType } from 'ant-design-vue/es/upload/interface'
class UserService {
  async updateUserProfile(user: User) {
    await updateProfile(auth.currentUser!, {
      displayName: user.name,
      photoURL: user.photoUrl,
    })
  }

  async uploadProfileImage(image: FileType): Promise<string> {
    const nameSplited = image.name.split('.')
    const extension = nameSplited[nameSplited.length - 1]
    const imagePath = `profile/${auth.currentUser?.uid}.${extension}`
    const imageRef = ref(storage, imagePath)
    await uploadBytes(imageRef, image, { contentType: image.type })
    const photoURL = await getDownloadURL(imageRef)
    return photoURL
  }
}

export const userService = new UserService()
