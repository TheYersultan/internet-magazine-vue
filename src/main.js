import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import router from './router'
import { registerPlugins } from '@/plugins'
const app = createApp(App)
app.use(autoAnimatePlugin)
app.use(router)
app.use(registerPlugins)
app.mount('#app')
