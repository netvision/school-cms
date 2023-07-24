<script setup>
const st = ref()
</script>

<template>
  <div>{{ st }}</div>
</template>

<route lang="json">
  {
    "meta" : {
      "requireAuth" : true
    }
  }
</route>
