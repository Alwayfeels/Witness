<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-muted gap-12">
    <h1 class="text-2xl font-bold mb-8">progressButton 组件演示</h1>
    <div class="flex gap-12 flex-wrap">
      <progressButton
        :progress="60"
        :value="22"
        label="HEATING"
        :icon="LeafIcon"
        color="#6366f1"
        size="100"
      />
      <!-- <progressButton
        :progress="60"
        :value="18"
        label="COOLING"
        :icon="SnowIcon"
        color="#06b6d4"
        size="100"
      />
      <progressButton
        :progress="30"
        :value="45"
        label="HUMIDITY"
        color="#f59e42"
        size="140"
      >
        <div class="mt-2 text-xs text-gray-400">自定义slot内容</div>
      </progressButton> -->
    </div>
  </div>
</template>

<script setup>
import progressButton from '@/components/progressButton.vue'
// 示例图标
const LeafIcon = {
  template: '<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" width="24" height="24"><path d="M5 21c10 0 14-8 14-16 0 0-7 0-14 8 0 0 0 8 7 8z"/></svg>'
}
const SnowIcon = {
  template: '<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" width="24" height="24"><path d="M12 2v20M4.93 4.93l14.14 14.14M2 12h20M4.93 19.07l14.14-14.14"/></svg>'
}
</script> 