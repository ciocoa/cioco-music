<template>
  <background></background>
  <topbar></topbar>
</template>

<script setup lang="ts">
import Topbar from './components/topbar/index.vue'
import Background from './components/background/index.vue'
</script>
<style>
@import '@/assets/base.css';
#app {
  max-width: 1500px;
  width: 100%;
}
</style>
