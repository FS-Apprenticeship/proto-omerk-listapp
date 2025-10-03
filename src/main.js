import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js'
import './index.css'

import { createPinia } from 'pinia'

// create app and pinia (already creating router elsewhere)
const app = createApp(App)
const pinia = createPinia();

// add to app
app.use(router);
app.use(pinia);

app.mount('#app')
