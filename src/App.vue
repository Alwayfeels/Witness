<script setup>
import AppSidebar from './components/AppSidebar.vue'
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'

</script>

<template>
  <SidebarProvider>
    <AppSidebar />
    <SidebarInset>
      <header class="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger class="-ml-1" />
      </header>
      <router-view />
    </SidebarInset>
  </SidebarProvider>
</template>

<style scoped>
</style>
