<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { signUp } from '@/services/auth'
import { useAuthStore } from '@/stores/users'

const userStore = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const successMessage = ref('')

async function signUpHelper() {
  const { data, error } = await signUp(userStore.client, email.value, password.value)
  if (error) {
    errorMessage.value = error.message
  } else {
    successMessage.value = 'Check your email for a confirmation link.'
    // optionally redirect after a delay
    setTimeout(() => router.push('/signin'), 2000)
  }
}

</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen bg-gray-50">
    <div class="bg-white p-8 rounded shadow w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center">Sign Up</h2>

      <form @submit.prevent="signUpHelper()" class="space-y-4">
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          required
          class="w-full px-3 py-2 border rounded"
        />
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          required
          class="w-full px-3 py-2 border rounded"
        />
        <button
          type="submit"
          class="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Sign Up
        </button>
      </form>

      <p v-if="errorMessage" class="mt-4 text-red-600">{{ errorMessage }}</p>
      <p v-if="successMessage" class="mt-4 text-green-600">{{ successMessage }}</p>

      <p class="mt-6 text-center">
        Already have an account?
        <router-link to="/signin" class="text-blue-600 hover:underline">
          Sign In
        </router-link>
      </p>
    </div>
  </div>
</template>
