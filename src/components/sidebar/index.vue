<template>
  <div class="wrapper">
    <div class="left-side">
      <div class="side-wrapper">
        <div class="side-title">推荐</div>
        <div class="side-menu">
          <router-link to="/">
            <el-icon size="1.5rem"><coffee-cup /></el-icon>猜你喜欢
          </router-link>
          <router-link :to="{ path: '/search', query: { keyworks: songStore.songKeyworks } }">
            <el-icon size="1.5rem"><search /></el-icon>歌曲搜索
            <span class="notification-number updates" v-show="Number(songStore.songCount) != 0">{{
              songStore.songCount
            }}</span>
          </router-link>
        </div>
      </div>
      <div class="side-wrapper">
        <div class="side-title">我的音乐</div>
        <div class="side-menu">
          <a href="#">
            <el-icon size="1.5rem"><star /></el-icon>我的收藏
          </a>
          <a href="#">
            <el-icon size="1.5rem"><headset /></el-icon>我的电台
          </a>
          <a href="#">
            <el-icon size="1.5rem"><download /></el-icon>本地下载
          </a>
          <a href="#">
            <el-icon size="1.5rem"><cloudy /></el-icon>音乐云盘
          </a>
          <a href="#">
            <el-icon size="1.5rem"><clock /></el-icon>最近播放
          </a>
          <router-link to="/defaultList">
            <el-icon size="1.5rem"><histogram /></el-icon>默认列表
          </router-link>
        </div>
      </div>

      <div class="side-wrapper">
        <div class="side-title">我的歌单</div>
        <div class="side-menu">
          <a href="#" v-for="item in userSongList" @click="openSongList(item.id)">
            <img :src="item.coverImgUrl" alt="" width="30px" height="30px" />
            {{ item.name }}
          </a>
          <!-- <a href="#"> <img src="../../static/images/歌单图标/2.jpg" alt="" /> 默认歌单 </a>
          <router-link :to="{ path: '/Playlist', query: { playlistid: 7324595205 } }">
            <img src="../../static/images/歌单图标/3.jpg" alt="" /> English Songs
          </router-link>
          <a href="#"> <img src="../../static/images/歌单图标/4.jpg" alt="" /> 旋律纯音 </a>
          <a href="#"> <img src="../../static/images/歌单图标/5.jpg" alt="" /> 电音 </a> -->
        </div>
      </div>
    </div>
    <!-- main -->
    <router-view :key="key"></router-view>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSongStore } from '@/stores/song'
const route = useRoute()
const router = useRouter()
const songStore = useSongStore()
const userSongList = computed(() => songStore.userSongList)
const key = () => route.fullPath
const openSongList = (id: number) => router.push({ path: '/playList', query: { playlistid: id } })
</script>
