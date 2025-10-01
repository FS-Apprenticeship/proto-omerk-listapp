<script setup>
import { onMounted } from 'vue'
import { ref } from 'vue'

// supa IS the client here
import { supa, getAllTodos } from './services/auth'

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
