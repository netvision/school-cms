<!-- eslint-disable no-console -->
<script setup>
import { addDoc, collection, getFirestore } from 'firebase/firestore'
import { useAuthStore } from '~/stores/authStore'
const authStore = useAuthStore()
const db = getFirestore()
const name = $ref('')
const myName = ref('')
const router = useRouter()
const logout = () => {
  authStore.signout()
}
const go = async () => {
  if (name) {
    const docRef = await addDoc(collection(db, 'profiles'), {
      name,
    })
  }
  router.push(`/hi/${encodeURIComponent(name)}`)
}

onMounted(() => {
  myName.value = authStore.name
})
</script>

<template>
  <div>
    <div i-carbon-baggage-claim text-4xl inline-block />
    <p>
      <em text-sm op75>{{ myName }}</em>
    </p>
    <button
      class="m-3 text-sm btn"
      @click="authStore.signout"
    >
      Logout
    </button>
    <div py-4 />

    <input
      id="input"
      v-model="name"
      placeholder="What's your name?"
      type="text"
      autocomplete="false"
      p="x-4 y-2"
      w="250px"
      text="center"
      bg="transparent"
      border="~ rounded gray-200 dark:gray-700"
      outline="none active:none"
      @keydown.enter="go"
    >

    <div>
      <button
        class="m-3 text-sm btn"
        :disabled="!name"
        @click="go"
      >
        Go
      </button>
    </div>
  </div>
</template>

<route lang="json">
  {
    "meta" : {
      "requireAuth" : true
    }
  }
</route>
