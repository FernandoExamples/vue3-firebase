import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore/lite'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyBuB8fSnuSS_OL6blibB5-Cg7bSRjiFyyo',
  authDomain: 'vue3-firebase-f9d77.firebaseapp.com',
  projectId: 'vue3-firebase-f9d77',
  storageBucket: 'vue3-firebase-f9d77.appspot.com',
  messagingSenderId: '1098312501900',
  appId: '1:1098312501900:web:73e1f91fb9ba5d6acc09a9',
}

initializeApp(firebaseConfig)
const db = getFirestore()
const auth = getAuth()

export { db, auth }
