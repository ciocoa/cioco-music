<template>
  <div class="main-container">
    <div class="main-header">
      <div class="main-header">
        <a class="menu-link-main" href="#">歌手</a>
        <div class="header-menu">
          <router-link to="/" active-class="is-active">专辑</router-link>
          <router-link to="/Leaderboard" active-class="is-active">排行榜</router-link>
          <router-link to="/singerlist" active-class="is-active">歌手</router-link>
          <router-link to="/dayrec" active-class="is-active">每日推荐</router-link>
        </div>
      </div>
    </div>
    <div class="content-wrapper">
      <div class="content-section qx">
        <ul>
          <li class="content-button status-button" @click="singerlist(1)">华语</li>
          <li class="content-button status-button" @click="singerlist(2)">欧美</li>
          <li class="content-button status-button" @click="singerlist(3)">韩国</li>
          <li class="content-button status-button" @click="singerlist(4)">日本</li>
        </ul>
        <div class="apps-card">
          <div class="block imgsize" v-for="item in singerlistinfo" @click="openalbum(item.id)">
            <div style="width: 220px; height: 220px; margin-left: 15px">
              <img :src="item.img1v1Url" alt="" class="songlistimg2 app-card" />
              <!-- <el-image class="songlistimg app-card" :src="item.img1v1Url"></el-image> -->
            </div>
            <h5 class="songlisttext">{{ item.name }}</h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
