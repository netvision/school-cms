/* eslint-disable no-alert */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { defineStore } from 'pinia'
import { GoogleAuthProvider, getAuth, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: true,
    name: '',
    email: '',
    uid: '',
    photoURL: '',
  }),
  getters: {},
  actions: {
    signIn() {
      const auth = getAuth()
      const provider = new GoogleAuthProvider()
      signInWithPopup(auth, provider)
        .then((result) => {
          const user = result.user
          this.$router.push('/')
        })
        .catch((error) => {
          const errorCode = error.code
          this.errorMessage = error.message
          alert(this.errorMessage)
        })
    },

    signout() {
      const auth = getAuth()
      signOut(auth)
        .then(() => {
          alert('logged out')
          this.$router.push('/login')
        })
        .catch((error) => {
          const errorCode = error.code
          this.errorMessage = error.message
          alert(this.errorMessage)
        })
    },
  },
})
