import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from './views/LandingPage.vue'
import SignUpPage from './views/SignUpPage.vue'
import SignInPage from './views/SignInPage.vue'
import ToDoPage from './views/ToDoPage.vue'

const routes = [
  { path: '/', component: LandingPage },
  { path: '/signup', component: SignUpPage },
  { path: '/signin', component: SignInPage },
  { path: '/todos', component: ToDoPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
