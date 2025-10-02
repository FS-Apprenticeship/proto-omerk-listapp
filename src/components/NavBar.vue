<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
// const showSignOut = computed(() => route.path === '/todos')
const showSignOut = computed(() => {
  if (route.path.includes('/todos')) {
    return true
  } else if (route.path === '/lists') {
    return true
  } else {
    return false
  }
})
</script>

<template>
  <nav class="bg-blue-600 text-white px-6 py-3 flex justify-between items-center">
    <div class="font-bold text-xl">My Todo App</div>
    <button
      v-if="showSignOut"
      @click="$router.push('/')"
      class="bg-white text-blue-600 px-3 py-1 rounded"
    >
      Sign Out
    </button>
  </nav>
</template>
