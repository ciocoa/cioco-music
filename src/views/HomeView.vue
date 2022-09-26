<script lang="ts" setup>
  import { useUserStore } from '@/stores'

  const userStore = useUserStore()

  const user = userStore.getProfile
</script>

<template>
  <div style="margin: 100px auto; width: 360px; text-align: center">
    <h3>{{ user.nickname }}</h3>
    <img :src="user.backgroundUrl" :alt="user.backgroundImgIdStr" />
  </div>
</template>
