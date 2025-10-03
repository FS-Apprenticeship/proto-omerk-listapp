<script setup>
import { useAuthStore } from '@/stores/users'

const userStore = useAuthStore()

// function for WHEN to display the sign out button
const showSignOut = userStore.isLoggedIn

// helper function to actually sign the person out
async function signOutHelper() {
  userStore.logout(userStore.client)
}
</script>

<template>
  <nav class="bg-blue-600 text-white px-6 py-3 flex justify-between items-center">
    <div class="font-bold text-xl">My Todo App</div>
    <button
      v-if="showSignOut"
      @click="signOutHelper()"
      class="bg-white text-blue-600 px-3 py-1 rounded"
    >
      Sign Out
    </button>
  </nav>
</template>
