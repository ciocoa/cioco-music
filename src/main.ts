import { createApp } from 'vue'

import { setupPinia } from './stores'
import { setupRouter } from './router'

import { App } from './app'

import './styles/main.scss'

const app = createApp(App)

setupPinia(app)

setupRouter(app)

app.mount('#app')
