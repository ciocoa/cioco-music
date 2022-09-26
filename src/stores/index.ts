import type { App } from 'vue'
import { default as piniaPluginPersistedstate } from 'pinia-plugin-persistedstate'

const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)

export const setupPinia = (app: App<Element>) => app.use(pinia)

export * from './app'

export * from './user'
