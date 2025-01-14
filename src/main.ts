import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

console.log('Initializing Vue app');
const app = createApp(App)

app.use(router)
app.config.compilerOptions.whitespace = "preserve"
app.mount('#app')

export default {
    build: {
      outDir: 'www', // Output to Cordova's www folder
    },
  };
  