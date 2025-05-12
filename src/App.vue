<script setup>
import PWABadge from './components/PWABadge.vue'
import Todolist from './components/Todolist.vue'
</script>

<template>
  <div class="flex justify-center space-x-4 mt-8">
    <a href="https://vite.dev" target="_blank">
      <img src="/favicon.svg" class="logo" alt="vite-pwa-vue logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <PWABadge />
  <Todolist />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
