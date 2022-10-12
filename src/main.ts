import { createApp } from 'vue'
import lang from './services/translates/'
import App from './App.vue'
const app = createApp(App)

app.use(lang)
app.mount('#app')
