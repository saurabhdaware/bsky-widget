<script setup lang="ts">
import "bsky-widget";
</script>

<template>
  <bsky-widget handle="vuejs.org"></bsky-widget>
</template>

<style scoped>
bsky-widget {
  min-height: 300px;
  width: 350px;

  /* theme override */
  --bsky-primary: #41B883;
  --bsky-primary-hover: #4ecb93;
}
</style>
