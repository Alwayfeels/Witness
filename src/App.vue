<script setup>
import AppSidebar from './components/AppSidebar.vue'
</script>

<template>
  <div class="w-[100vw] flex">
    <AppSidebar />
    <div class="flex-1">
      <router-view />
    </div>
  </div>
</template>

<style scoped>
</style>
