<template>
  <div class="main-container">
    <div class="content-wrapper">
      <div class="content-section">
        <video controls autoplay loop :src="mvUrl" style="width: 100%; border-radius: 10px"></video>
        <!-- 热门评论开始 -->
        <h4 class="fontcolor">MV评论</h4>

        <div class="content-section mvtop">
          <div class="apps-card">
            <div class="app-card app-mv" v-for="item in mvComments">
              <img :src="item.user.avatarUrl" alt=" " width="50 " class="mvimg" />
              <span>{{ item.user.nickname }}</span>
              <div class="app-card__subtext app-mv-text app-card-subtextchange">
                {{ item.content }}
              </div>
              <div class="app-card__subtext app-mv-text app-card-subtextchange">
                <span style="float: left">{{ item.likedCount }} 赞</span>
                <span style="float: right">{{ item.timeStr }}</span>
              </div>
            </div>
          </div>
          <!-- //MV分页 -->
          <div class="block">
            <el-pagination
              v-if="mvcount != 0"
              @current-change="mvhandleCurrentChange"
              :current-page.sync="mvcurrentPage"
              :page-size="15"
              layout="prev, pager, next, jumper"
              :total="mvcount"
              :background="true"
            >
            </el-pagination>
          </div>
          <!-- //MV分页 -->
        </div>
        <!-- 热门评论结束 -->
      </div>
    </div>
  </div>
</template>
<style>
.fontcolor {
  color: var(--inactive-color);
}
.mvimg {
  border-radius: 50%;
}
.app-mv {
  padding: 15px;
}
.app-mv-text {
  border-bottom: none;
}
.app-card-subtextchange {
  padding-bottom: 1px;
}
.mvtop {
  margin-top: 1px;
}
</style>
