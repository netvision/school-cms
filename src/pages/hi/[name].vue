<script setup>
import { useAuthStore } from '~/stores/authStore'
const authStore = useAuthStore()
const router = useRouter()
</script>

<template>
  <div>
    <div i-carbon-pedestrian text-4xl inline-block />
    <p>
      Hi, {{ authStore.name }}
    </p>
    <p text-sm op50>
      <em>Dynamic route!</em>
    </p>

    <div>
      <button
        class="btn m-3 text-sm mt-8"
        @click="router.back()"
      >
        Back
      </button>
    </div>
  </div>
</template>

<route lang="json">
  {
    "name" : "Name",
    "meta" : {
      "requireAuth" : true
    }
  }
</route>
