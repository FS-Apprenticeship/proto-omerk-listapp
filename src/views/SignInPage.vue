<script setup>

import { ref } from 'vue'
import Navbar from '../components/NavBar.vue'

import { useAuthStore } from '@/stores/users'
const userStore = useAuthStore();

const email = ref('')
const password = ref('')

async function signInHelper() {
  userStore.login(userStore.client, email.value, password.value)
}

</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen bg-gray-100">
    <Navbar />
    <div class="bg-white p-8 rounded shadow-md w-80">
      <h2 class="text-2xl font-bold mb-6 text-center">Sign In</h2>
      <form @submit.prevent="signInHelper()" class="flex flex-col space-y-4">
        <input type="email" placeholder="Email" v-model="email" class="border px-3 py-2 rounded" />
        <input
          type="password"
          placeholder="Password"
          v-model="password"
          class="border px-3 py-2 rounded"
        />
        <button type="submit" class="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Sign In
        </button>
      </form>
    </div>
  </div>
</template>
