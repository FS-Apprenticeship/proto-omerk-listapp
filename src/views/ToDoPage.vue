<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from '../components/NavBar.vue'
import { getAllTodos, createTodo, deleteTodo, updateTodo } from '@/services/todoData'
import { getList } from '@/services/listData'

import { useAuthStore } from '@/stores/users'

const userStore = useAuthStore()
const todos = ref([])
const todoItem = ref('')
const route = useRoute()
const list_id = route.params.list_id
const list_name = ref('')

// Load todos when page mounts
onMounted(async () => {
  try {
    todos.value = await getAllTodos(userStore.client, list_id)
    list_name.value = getListName(list_id)
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

async function getListName() {
    return await getList(userStore.client, list_id).then(x => list_name.value = x.list_name)
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
  <div class="min-h-screen bg-gray-950">
    <Navbar />
    <div class="max-w-2xl mx-auto mt-10 px-4">
      <div class="bg-gray-900 border border-gray-800 rounded-lg p-8 shadow-xl">
        <h1 class="text-3xl font-bold mb-6 text-white">{{ list_name }}</h1>

        <!-- Add new todo -->
        <div class="mb-6 flex gap-2">
          <input type="text" v-model="todoItem" placeholder="Add a new todo..."
            class="flex-1 bg-gray-800 border border-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
            @keyup.enter="addTodo()" />
          <button @click="addTodo()"
            class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
            Add
          </button>
        </div>

        <!-- Todo list -->
        <ul v-if="todos.length > 0" class="space-y-2">
          <li v-for="todo in todos" :key="todo.id"
            class="flex justify-between items-center bg-gray-800 border border-gray-700 px-4 py-3 rounded-lg hover:bg-gray-750 transition-colors">
            <div class="flex items-center gap-3 flex-1">
              <input type="checkbox" :checked="todo.completed" @change="toggleTodoCompleted(todo)"
                class="h-5 w-5 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer" />
              <span :class="{ 'line-through text-gray-500': todo.completed, 'text-white': !todo.completed }"
                class="text-lg">
                {{ todo.title }}
              </span>
            </div>
            <button @click="removeTodo(todo.id)"
              class="text-red-400 hover:text-red-300 transition-colors font-medium ml-4">
              Delete
            </button>
          </li>
        </ul>

        <p v-else class="text-gray-500 text-center py-8">No todos yet. Add one above!</p>
      </div>
    </div>
  </div>
</template>
