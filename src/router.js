import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from './views/LandingPage.vue'
import SignUpPage from './views/SignUpPage.vue'
import SignInPage from './views/SignInPage.vue'
import ListsPage from './views/ListsPage.vue'
import ToDoPage from './views/ToDoPage.vue'

import { pinia } from './main'
import { useAuthStore } from './stores/users'
import { useListStore } from './stores/lists'

const routes = [
  { path: '/', component: LandingPage },
  { path: '/signup', component: SignUpPage },
  { path: '/signin', component: SignInPage },
  { path: '/lists', component: ListsPage, meta: { requiresAuth: true }},
  // /todos included just so there isnt a blank page
  { path: '/todos', component: ListsPage, meta: { requiresAuth : true }},
  { path: '/todos/:list_id', component: ToDoPage, meta: { requiresAuth: true }},
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const userStore = useAuthStore(pinia)
  const listStore = useListStore(pinia)
  await userStore.loadUser()
  if (to.meta.requiresAuth && !userStore.isLoggedIn) {
    next('/signin')
  } else {
    if (userStore.isLoggedIn) {
      await listStore.getCurrentLists()
    }
    next()
  }
})

export default router
