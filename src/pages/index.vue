<script setup>
import icon from '../assets/students-icon.png'
import teacher from '../assets/teacher-icon.png'
</script>

<template class="min-h-screen">
  <Header />
  <main class="m-5 md:max-w-md">
    <div class="flex items-center m-5">
      <a href="/student">
        <div class="text-center m-5">
          <img
            :src="icon"
            class="mx-auto mb-4 w-32 rounded-lg"
            alt="Avatar"
          >
          <h5 class="mb-2 text-xl font-medium leading-tight">
            Students
          </h5>
        </div>
      </a>
      <a href="/staff">
        <div class="text-center m-5">
          <img
            :src="teacher"
            class="mx-auto mb-4 w-32 rounded-lg"
            alt="Avatar"
          >
          <h5 class="mb-2 text-xl font-medium leading-tight">
            Staff
          </h5>
        </div>
      </a>
    </div>
  </main>
</template>

<route lang="json">
  {
    "meta" : {
      "requireAuth" : true
    }
  }
</route>
