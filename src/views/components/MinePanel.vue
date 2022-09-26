<script lang="ts" setup>
  import { useAppStore, useUserStore } from '@/stores'
  import { logoutApi } from '@/api'
  import type { MessageParamsWithType } from 'element-plus'
  import { icons } from '@/utils'

  const appStore = useAppStore()
  const userStore = useUserStore()

  const loginState = computed(() => userStore.getToken.length > 0)

  const profile = computed(() => userStore.getProfile)

  const handleLogout = async () =>
    ElMessageBox({
      type: 'warning',
      message: '确定要注销登录吗',
      showCancelButton: true,
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      beforeClose: async (action, instance, done) => {
        if (action === 'confirm') {
          try {
            instance.confirmButtonLoading = true
            const { code } = await logoutApi()
            userStore.removeUser()
            if (code === 200) done()
          } catch (error) {
            ElMessage.error(error as MessageParamsWithType)
          } finally {
            instance.confirmButtonLoading = false
          }
        } else done()
      }
    })
      .then(() => ElMessage.success('注销成功'))
      .catch(err => err)
</script>

<template>
  <ElDropdown v-if="loginState">
    <div class="avatar">
      <img :src="profile.avatarUrl" :alt="profile.avatarImgIdStr" />
    </div>
    <template #dropdown>
      <el-dropdown-item>设置</el-dropdown-item>
      <el-dropdown-item @click="handleLogout">注销</el-dropdown-item>
    </template>
  </ElDropdown>
  <div v-else @click="() => appStore.setShowLogin(true)">
    <component :is="icons.avatar" />
  </div>
</template>

<style lang="scss">
  .avatar {
    width: 32px;
    height: 32px;
    border: 2px solid var(--theme-color);
    overflow: hidden;
    border-radius: 50%;
  }

  .el-dropdown__popper {
    --el-bg-color-overlay: var(--dropdown-bg);
    --el-border-color-light: transparent;
    --el-dropdown-menuItem-hover-fill: transparent;
    --el-dropdown-menuItem-hover-color: var(--theme-color);
  }

  .el-message-box {
    background-color: var(--content-bg);
    border: var(--border-color);

    .el-button {
      --el-button-bg-color: transparent;
    }

    .el-button--primary {
      --el-button-border-color: var(--el-border-color);
      --el-button-active-bg-color: var(--button-inactive);
    }
  }
</style>
