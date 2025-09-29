<script setup>
import Navbar from '../components/NavBar.vue'
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen bg-gray-50">
    <Navbar />
    <h1 class="text-4xl font-bold mb-6">Welcome to My Todo App</h1>
    <router-link to="/signin" class="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">
      Sign In
    </router-link>
  </div>
</template>
