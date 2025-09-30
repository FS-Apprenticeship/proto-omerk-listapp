<script setup>
import { onMounted } from 'vue'
import { ref } from 'vue'

import { getClient, getAllTodos } from './services/auth'

const supa = getClient()
const todos = ref([])

onMounted(async () => {
  let tempData = await getAllTodos(supa);
  todos.value = tempData;
})
</script>

<template>
  <div>
    <router-view />
  </div>
</template>

<style scoped></style>
