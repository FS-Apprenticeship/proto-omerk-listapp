<script setup>
import { ref, onMounted } from 'vue'
import Navbar from '../components/NavBar.vue'
import { getAllLists, createList, deleteList } from '@/services/listData'
import { useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/users'

const userStore = useAuthStore()
const router = useRouter()
const lists = ref([])
const newListName = ref('')

onMounted(async () => {
  await loadLists()
})

async function loadLists() {
  try {
    lists.value = await getAllLists(userStore.client)
  } catch (err) {
    console.error('Failed to load lists', err)
  }
}

async function addList() {
  if (!newListName.value.trim()) return
  try {
    await createList(userStore.client, newListName.value)
    newListName.value = ''
    await loadLists()
  } catch (err) {
    console.error('Create list failed', err)
  }
}

async function removeList(list_id) {
  try {
    await deleteList(userStore.client, list_id)
    await loadLists()
  } catch (err) {
    console.error('Delete list failed', err)
  }
}

function goToList(id) {
  router.push(`/todos/${id}`)
}
</script>

<template>
  <div class="min-h-screen bg-gray-950">
    <Navbar />
    <div class="max-w-3xl mx-auto mt-10 px-4">
      <h1 class="text-3xl font-bold mb-6 text-white">Your Lists</h1>

      <!-- Add new list -->
      <div class="mt-8 flex space-x-2 mb-6">
        <input
          v-model="newListName"
          type="text"
          placeholder="New list name"
          class="flex-1 bg-gray-900 border border-gray-800 text-white placeholder-gray-500 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          @click="addList"
          class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Add List
        </button>
      </div>

      <!-- Cards of lists available -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          v-for="list in lists"
          :key="list.id"
          class="bg-gray-900 border border-gray-800 rounded-lg shadow-lg p-6 cursor-pointer hover:border-gray-700 hover:shadow-xl transition-all"
          @click="goToList(list.id)"
        >
          <div class="flex justify-between items-start">
            <div>
              <h2 class="text-xl font-semibold text-white">{{ list.list_name }}</h2>
              <p class="text-gray-400 mt-1">{{ list.todos[0].count }} items</p>
            </div>
            <button
              @click.stop="removeList(list.id)"
              class="text-red-400 hover:text-red-300 transition-colors font-medium"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
