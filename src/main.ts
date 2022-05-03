import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)

import * as ElIcons from '@element-plus/icons-vue'
for (const icon in ElIcons) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  app.component(icon, (ElIcons as any)[icon])
}

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(ElementPlus)
app.use(pinia)
app.use(router)

app.mount('#app')
