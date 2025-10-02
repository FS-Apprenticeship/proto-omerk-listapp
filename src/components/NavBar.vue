<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { supa, signOut } from '@/services/auth'

const route = useRoute()
const router = useRouter()

// function for WHEN to display the sign out button
// this assumes todos and lists can only be accessed when auth == true
const showSignOut = computed(() => {
  if (route.path.includes('/todos')) {
    return true
  } else if (route.path === '/lists') {
    return true
  } else {
    return false
  }
})

// helper function to actually sign the person out
async function signOutHelper(supa) {
  try {
    await signOut(supa);
    router.push('/')
  } catch (e) {
    throw new e;
  }
}
</script>

<template>
  <nav class="bg-blue-600 text-white px-6 py-3 flex justify-between items-center">
    <div class="font-bold text-xl">My Todo App</div>
    <button
      v-if="showSignOut"
      @click="signOutHelper(supa)"
      class="bg-white text-blue-600 px-3 py-1 rounded"
    >
      Sign Out
    </button>
  </nav>
</template>
