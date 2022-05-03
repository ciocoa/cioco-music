<template>
  <div class="main-container">
    <div class="main-header">
      <a class="menu-link-main" href="#">电台</a>
      <div class="header-menu">
        <router-link to="/" active-class="is-active">专辑</router-link>
        <router-link to="/Leaderboard" active-class="is-active">排行榜</router-link>
        <router-link to="/singerlist" active-class="is-active">歌手</router-link>
        <router-link to="/dayrec" active-class="is-active">每日推荐</router-link>
      </div>
    </div>
    <div class="content-wrapper">
      <!--MV开始 -->
      <div class="content-section">
        <div class="apps-card">
          <div class="block" v-for="item in radio">
            <el-image class="songlistimg3 app-card" :src="item.picUrl"></el-image>
            <h5 class="songlisttext">{{ item.name }}</h5>
            <p class="copywriter">{{ item.copywriter }}</p>
          </div>
        </div>
        <!-- //分页 -->
        <div class="block">
          <el-pagination
            v-if="count != 0"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="20"
            layout="prev, pager, next, jumper"
            :total="count"
            :background="true"
          >
          </el-pagination>
        </div>
        <!-- 分页 -->
      </div>
      <!-- MV结束 -->
    </div>
  </div>
</template>
<style>
.songlistimg3 {
  width: 220px;
  height: 220px;
  border-radius: 10px;
  margin: 0 10px;
  cursor: pointer;
}
.songlisttext {
  text-align: center;
  font-weight: 500;
  cursor: pointer;
  margin: 5px 0;
}
.copywriter {
  text-align: center;
  color: var(--inactive-color);
  font-size: 10px;
}
</style>
