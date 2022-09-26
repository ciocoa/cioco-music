import type { VNode } from 'vue'
import type { RouteLocationRaw } from 'vue-router'

export {}

declare global {
  declare type LinkInfo = {
    to: RouteLocationRaw
    desc: string
    img?: string
    icon?: VNode
  }
}

export type ToolInfo = {
  click: (payload: MouseEvent) => void
  icon: VNode
}
