<!-- eslint-disable no-console -->
<script setup>
import { useAuthStore } from '~/stores/authStore'
const router = useRouter()
const authStore = useAuthStore()

const signIn = () => {
  authStore.signIn()
}

const signOut = () => {
  authStore.signout()
}
</script>

<template>
  <button
    v-if="!authStore.isLoggedIn"
    class="m-3 text-sm btn"
    @click="signIn"
  >
    Log in
  </button>
  <button
    v-else
    class="m-3 text-sm btn"
    @click="signOut"
  >
    Log out
  </button>
</template>
