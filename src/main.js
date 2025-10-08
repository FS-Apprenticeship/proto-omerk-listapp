import { createApp } from 'vue'
import router from './router.js'
import { createPinia } from 'pinia'
import App from './App.vue'
import './index.css'

// create app and pinia (already creating router elsewhere)
export const pinia = createPinia();
const app = createApp(App)

// add to app
app.use(pinia);
app.use(router);

app.mount('#app')
