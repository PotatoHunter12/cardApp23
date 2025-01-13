import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

console.log('Initializing Vue app');
const app = createApp(App)

app.use(router)
app.config.compilerOptions.whitespace = "preserve"
app.mount('#app')
