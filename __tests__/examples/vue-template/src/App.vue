<script setup lang="ts">
import 'bsky-widget';
</script>

<template>
  <bsky-widget handle="vuejs.org" theme="dim"></bsky-widget>
</template>

<style scoped>
bsky-widget {
  min-height: 300px;
  width: 350px;
  box-shadow: 1px 1px 8px 1px #4ecb93;

  /* theme override */
  --bsky-primary: #41b883;
  --bsky-primary-hover: #4ecb93;
}
</style>
