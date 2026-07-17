import './static/scss/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from '@/routes'

import App from '@/templates/App.vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
