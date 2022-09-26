import type { App, Component, Plugin } from 'vue'

export type SFCWithInstall<T> = T & Plugin

export const withInstall = <T>(comp: T, alias?: string) => {
  ;(comp as SFCWithInstall<T>).install = (app: App) => {
    const { name, displayName } = comp as unknown as { name: string; displayName: string }
    app.component(name || displayName, comp as Component)
    if (alias) app.config.globalProperties[alias] = comp
  }
  return comp as T & Plugin
}
