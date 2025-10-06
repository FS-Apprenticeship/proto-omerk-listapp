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
  if (!userStore.isLoggedIn) {
    router.push('/signin')
  }
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
  <div class="min-h-screen bg-gray-50">
    <Navbar />
    <div class="max-w-3xl mx-auto mt-10">
      <h1 class="text-3xl font-bold mb-6">Your Lists</h1>

      <!-- Grid of lists -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          v-for="list in lists"
          :key="list.id"
          class="bg-white rounded shadow p-4 cursor-pointer hover:shadow-md transition"
          @click="goToList(list.id)"
        >
          <div class="flex justify-between items-start">
            <div>
              <h2 class="text-xl font-semibold">{{ list.list_name }}</h2>
              <p class="text-gray-500">{{ list.todos[0].count }} items</p>
            </div>
            <button
              @click.stop="removeList(list.id)"
              class="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      <!-- Add new list -->
      <div class="mt-6 flex space-x-2">
        <input
          v-model="newListName"
          type="text"
          placeholder="New list name"
          class="flex-1 border px-3 py-2 rounded"
        />
        <button
          @click="addList"
          class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add List
        </button>
      </div>
    </div>
  </div>
</template>
