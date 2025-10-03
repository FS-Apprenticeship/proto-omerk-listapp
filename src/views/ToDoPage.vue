<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from '../components/NavBar.vue'
import { getAllTodos, createTodo, deleteTodo, updateTodo } from '@/services/dbData'

import router from '@/router'
import { useAuthStore } from '@/stores/users'

const userStore = useAuthStore()
const todos = ref([])
const todoItem = ref('')
const route = useRoute()
const list_id = route.params.list_id

// Load todos when page mounts
onMounted(async () => {
  if (!userStore.isLoggedIn) {
    router.push('/signin')
  }
  try {
    todos.value = await getAllTodos(userStore.client, list_id)
  } catch (err) {
    console.error('Failed to load todos', err)
  }
})

async function addTodo() {
  if (!todoItem.value.trim()) return
  try {
    const newTodo = await createTodo(userStore.client, { title: todoItem.value, list_id: list_id})
    todos.value.unshift(newTodo) // add to top of list
    todoItem.value = '' // clear input
  } catch (err) {
    console.error('Create failed', err)
  }
}

async function toggleTodoCompleted(todo) {
  try {
    const updated = await updateTodo(userStore.client, todo.id, { completed: !todo.completed })
    todos.value = todos.value.map(t =>
      t.id === updated.id ? updated : t
    )
  } catch (err) {
    console.error('Toggle failed', err)
  }
}

async function removeTodo(id) {
  try {
    const deleted = await deleteTodo(userStore.client, id)
    todos.value = todos.value.filter(t => t.id !== deleted.id)
  } catch (err) {
    console.error('Delete failed', err)
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar />
    <div class="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h1 class="text-2xl font-bold mb-4">Your Todo List</h1>

      <!-- Todo list -->
      <ul v-if="todos.length > 0" class="space-y-2">
        <li v-for="todo in todos" :key="todo.id" class="flex justify-between items-center bg-gray-100 px-3 py-2 rounded">
          <div class="flex items-center space-x-3">
            <input type="checkbox" :checked="todo.completed" @change="toggleTodoCompleted(todo)" class="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
            <span :class="{ 'line-through text-gray-500': todo.completed }">
              {{ todo.title }}
            </span>
          </div>
          <button @click="removeTodo(todo.id)" class="text-red-500 hover:text-red-700">
            Delete
          </button>
        </li>
      </ul>

      <p v-else class="text-gray-500">No todos yet. Add one below!</p>

      <!-- Add new todo -->
      <div class="mt-4 flex space-x-2">
        <input
          type="text"
          v-model="todoItem"
          placeholder="New Todo"
          class="flex-1 border px-3 py-2 rounded"
        />
        <button
          @click="addTodo()"
          class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add
        </button>
      </div>
    </div>
  </div>
</template>
