<template>
  <div class="video-bg">
    <video autoplay loop muted>
      <source type="video/mp4" src="https://assets.codepen.io/3364143/7btrrd.mp4" />
      {{ msg }}
    </video>
  </div>
</template>
<script setup lang="ts">
const msg = 'Sorry! Your browser does not support the video tag.'
</script>
<style scoped lang="scss">
.video-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  video {
    width: 100%;
    height: 100%;
    -o-object-fit: cover;
    object-fit: cover;
  }
}
</style>
