<script setup>
import AppSidebar from './components/AppSidebar.vue'
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
import { useRoute } from 'vue-router'

const route = useRoute()

</script>

<template>
  <SidebarProvider>
    <AppSidebar />
    <SidebarInset>
      <header class="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger class="-ml-1" />
        <div class="flex-1">
          <h1 class="text-2xl font-bold">{{ route.name }}</h1>
        </div>
      </header>
      <router-view />
    </SidebarInset>
  </SidebarProvider>
</template>

<style scoped>
</style>
