import { createRouter, createWebHistory } from 'vue-router'
import album from '@/views/album.vue'
import anime from '@/views/anime.vue'
import dayrec from '@/views/dayrec.vue'
import defaultList from '@/views/defaultList.vue'
import goods from '@/views/goods.vue'
import leaderBoard from '@/views/leaderBoard.vue'
import newMV from '@/views/newMV.vue'
import playList from '@/views/playList.vue'
import playMV from '@/views/playMV.vue'
import radio from '@/views/radio.vue'
import singerList from '@/views/singerList.vue'
import songSearch from '@/views/songSearch.vue'

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'goods',
      component: goods
    },
    {
      path: '/goods',
      name: 'goods',
      component: goods
    },
    {
      path: '/search',
      name: 'search',
      component: songSearch,
      props: true
    },
    {
      path: '/defaultList',
      name: 'defaultList',
      component: defaultList
    },
    {
      path: '/playmv',
      name: 'playmv',
      component: playMV
    },
    {
      path: '/mv',
      name: 'mv',
      component: newMV
    },
    {
      path: '/radio',
      name: 'radio',
      component: radio
    },
    {
      path: '/anime',
      name: 'anime',
      component: anime
    },
    {
      path: '/playList',
      name: 'playList',
      component: playList
    },
    {
      path: '/leaderBoard',
      name: 'leaderBoard',
      component: leaderBoard
    },
    {
      path: '/singerList',
      name: 'singerList',
      component: singerList
    },
    {
      path: '/album',
      name: 'album',
      component: album
    },
    {
      path: '/dayrec',
      name: 'dayrec',
      component: dayrec
    }
  ]
})
