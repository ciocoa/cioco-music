<template>
  <div class="topbar-container">
    <div class="header">
      <div class="top-wrap">
        <ul>
          <li @click="left">
            <el-icon color="#fff" size="1.2em"><arrow-left></arrow-left></el-icon>
          </li>
          <li @click="right">
            <el-icon color="#fff" size="1.2em"><arrow-right></arrow-right></el-icon>
          </li>
          <li @click="refresh">
            <el-icon color="#fff" size="1.2em"><refresh-left></refresh-left></el-icon>
          </li>
        </ul>
      </div>
      <div class="header-menu">
        <router-link class="menu-link" to="/" active-class="is-active">音乐</router-link>
        <router-link class="menu-link" to="/mv" active-class="is-active">MV</router-link>
        <router-link class="menu-link" to="/radio" active-class="is-active">电台</router-link>
        <router-link class="menu-link" to="/anime" active-class="is-active">动漫</router-link>
      </div>
      <div class="search-bar">
        <input type="text" placeholder="搜索" @keyup.enter="search" v-model="searchValue" />
      </div>
      <div class="header-profile">
        <ul>
          <li>
            <el-icon size="1.3rem"><brush></brush></el-icon>
          </li>
          <li class="notify">
            <el-icon size="1.3rem"><bell></bell></el-icon>
          </li>
          <li>
            <el-icon size="1.3rem"><cloudy></cloudy></el-icon>
          </li>
          <li class="avatar" @click="login"><img :src="defaultAvatar" /></li>
        </ul>
        <login-panel v-model:showLoginPanel="loginData.showLoginPanel"></login-panel>
      </div>
    </div>
    <sidebar></sidebar>
    <div class="overlay-app"></div>
  </div>
</template>
<script setup lang="ts">
import Sidebar from '../sidebar/index.vue'
import LoginPanel from './components/LoginPanel.vue'
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import defaultAvatar from '@/assets/avatar.jpeg'

const router = useRouter()
const searchValue = ref('')
const loginData = reactive({
  showLoginPanel: false
})

const left = () => router.back()
const right = () => router.go(1)
const refresh = () => router.go(0)

const search = () => {
  if (searchValue.value == '') {
    ElMessage.error({
      message: '内容不能为空!',
      duration: 2000
    })
  } else {
    router.push({ path: '/search', query: { keyworks: searchValue.value } })
  }
}
const login = () => {
  loginData.showLoginPanel = true
}
</script>
<style scoped lang="scss">
.topbar-container {
  background-color: var(--theme-bg-color);
  min-width: 700px;
  max-height: 880px;
  height: 99vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 14px;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  font-size: 15px;
  font-weight: 500;
  @media screen and (max-width: 480px) {
    .header {
      padding: 0 16px;
    }
  }
  .header {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    height: 58px;
    width: 100%;
    border-bottom: 1px solid var(--border-color);
    padding: 0 30px;
    white-space: nowrap;
    .top-wrap {
      margin-right: 105px;
      ul {
        display: flex;
        flex-direction: row;
        margin: 0;
        padding: 0;
        li {
          list-style: none;
          margin: 0 10px;
          cursor: pointer;
          width: 16px;
          height: 16px;
        }
      }
    }
    .search-bar {
      height: 40px;
      display: flex;
      width: 100%;
      max-width: 400px;
      padding-left: 16px;
      border-radius: 4px;
      input {
        width: 100%;
        height: 100%;
        border: none;
        background-color: var(--search-bg);
        border-radius: 4px;
        font-family: var(--body-font);
        font-size: 15px;
        font-weight: 500;
        padding: 0 20px 0 40px;
        box-shadow: 0 0 0 2px rgba(134, 140, 160, 0.02);
        background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 56.966 56.966' fill='%23717790c7'%3e%3cpath d='M55.146 51.887L41.588 37.786A22.926 22.926 0 0046.984 23c0-12.682-10.318-23-23-23s-23 10.318-23 23 10.318 23 23 23c4.761 0 9.298-1.436 13.177-4.162l13.661 14.208c.571.593 1.339.92 2.162.92.779 0 1.518-.297 2.079-.837a3.004 3.004 0 00.083-4.242zM23.984 6c9.374 0 17 7.626 17 17s-7.626 17-17 17-17-7.626-17-17 7.626-17 17-17z'/%3e%3c/svg%3e");
        background-size: 14px;
        background-repeat: no-repeat;
        background-position: 16px 48%;
        color: var(--theme-color);
        &::placeholder {
          font-family: var(--body-font);
          color: var(--inactive-color);
          font-size: 15px;
          font-weight: 500;
        }
      }
    }
    .header-profile {
      display: flex;
      align-items: center;
      padding: 0 16px 0 40px;
      margin-left: auto;
      flex-shrink: 0;
      ul {
        display: flex;
        flex-direction: row;
        margin: 0;
        align-items: center;
        li {
          color: var(--theme-color);
          list-style: none;
          margin: 0 1rem;
          cursor: pointer;
          width: 16px;
          height: 16px;
        }
        @media screen and (max-width: 1055px) {
          .notify {
            display: none;
          }
        }
        .notify {
          position: relative;
          &::before {
            content: '';
            position: absolute;
            background-color: #3a6df0;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            left: 18px;
            bottom: 14px;
          }
        }
        .avatar {
          width: 30px;
          height: 30px;
          border: 2px solid var(--theme-color);
          overflow: hidden;
          border-radius: 50%;
        }
      }
    }
  }
  .overlay-app {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    pointer-events: all;
    background-color: rgba(36, 39, 59, 0.8);
    opacity: 0;
    visibility: hidden;
    transition: 0.3s;
  }

  .overlay-app.is-active {
    visibility: visible;
    opacity: 1;
  }
}
</style>
