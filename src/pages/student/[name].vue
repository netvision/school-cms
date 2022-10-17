<!-- eslint-disable no-console -->
<script setup>
import { doc, getDoc, getFirestore } from 'firebase/firestore'
import { useAuthStore } from '~/stores/authStore'
const props = defineProps({
  name: {
    type: String,
  },
})
const db = getFirestore()
const authStore = useAuthStore()
const router = useRouter()
const student = ref({})
onMounted(async () => {
  const docRef = doc(db, 'students', props.name)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    student.value = docSnap.data()
    console.log('Document data:', docSnap.data())
  }
  else {
  // doc.data() will be undefined in this case
    console.log('No such document!')
  }
})
</script>

<template>
  <div>
    <div i-carbon-pedestrian text-4xl inline-block />
    <p>
      Hi, {{ student.name }}
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
