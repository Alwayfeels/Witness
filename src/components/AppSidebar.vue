<script setup>
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarProvider,
} from '@/components/ui/sidebar';
import { useRouter, useRoute } from 'vue-router';
import { computed } from 'vue';
import {
  CheckSquare,
  Repeat,
  Utensils,
  BarChart,
  Settings,
  GalleryVerticalEnd
} from 'lucide-vue-next';

const props = defineProps({
  side: { type: String, required: false },
  variant: { type: String, required: false },
  collapsible: { type: String, required: false },
  class: { type: null, required: false },
});

const router = useRouter();
const route = useRoute();

const iconMap = {
  CheckSquare,
  Repeat,
  Utensils,
  BarChart,
  Settings,
  GalleryVerticalEnd
};

const routes = computed(() => {
  return router.options.routes.filter(route => route.meta?.title);
});

const isActive = (path) => {
  return route.path === path;
};
</script>

<template>
  <Sidebar v-bind="props">
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" as-child>
            <a href="#">
              <div
                class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <GalleryVerticalEnd class="size-4" />
              </div>
              <div class="flex flex-col gap-0.5 leading-none">
                <span class="font-medium">Witness</span>
                <span class="">v1.0.0</span>
              </div>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarMenu>
          <SidebarMenuItem v-for="route in routes" :key="route.path" class="h-8">
            <SidebarMenuButton as-child :is-active="isActive(route.path)">
              <router-link :to="route.path" class="font-medium flex items-center gap-2">
                <component :is="iconMap[route.meta.icon]" class="size-4" />
                {{ route.meta.title }}
              </router-link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
    <SidebarRail />
  </Sidebar>
</template>
