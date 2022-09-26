import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/default',
    name: 'default',
    component: () => import('@/views/DefaultView.vue')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/SearchView.vue')
  },
  {
    path: '/anime',
    name: 'anime',
    component: () => import('@/views/AnimeView.vue')
  },
  {
    path: '/radio',
    name: 'radio',
    component: () => import('@/views/RadioView.vue')
  },
  {
    path: '/video',
    name: 'video',
    component: () => import('@/views/VideoView.vue')
  },
  {
    path: '/play',
    name: 'play',
    component: () => import('@/views/PlayView.vue')
  }
]
