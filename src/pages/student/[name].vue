<!-- eslint-disable no-console -->
<script setup>
import axios from 'axios'
import { useAuthStore } from '~/stores/authStore'
const props = defineProps({
  name: {
    type: Number,
  },
})
console.log(props.name)

const authStore = useAuthStore()
const router = useRouter()
const student = ref({})
onMounted(async () => {
  student.value = await axios.get(`https://schoolsapi.netserve.in/student-class?filter[student_id][eq]=${props.name}&expand=student,class`).then(r => r.data)
})
</script>

<template>
  <Header />
  <div class="container">
    <div i-carbon-pedestrian text-4xl inline-block />
    <p>
      Hi, {{ student[0]?.student.name }}
    </p>
    <p text-sm op50>
      <pre>{{ student }}</pre>
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
