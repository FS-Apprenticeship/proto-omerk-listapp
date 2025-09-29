<script setup>
import Navbar from '../components/NavBar.vue'
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar />
    <div class="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h1 class="text-2xl font-bold mb-4">Your Todo List</h1>
      <ul class="space-y-2">
        <li class="flex justify-between items-center bg-gray-100 px-3 py-2 rounded">
          <span>Sample Todo Item</span>
          <button class="text-red-500">Delete</button>
        </li>
      </ul>
      <div class="mt-4 flex space-x-2">
        <input type="text" placeholder="New Todo" class="flex-1 border px-3 py-2 rounded" />
        <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add</button>
      </div>
    </div>
  </div>
</template>
