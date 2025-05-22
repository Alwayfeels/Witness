<template>
  <!-- 
  <div class="relative flex flex-col items-center justify-center select-none rounded-full"
    :style="`background:${colorOuterBg};border:1px solid ${colorOuterBorder}; width:${size}px; height:${size}px; top: 0; left: 0;`">
    <div class="absolute inset-0 flex flex-col items-center justify-center select-none scale-80 rounded-full"
      :style="`background:${colorRingBg};border:1px solid ${colorRingBorder};box-shadow:inset -20px -20px 50px -25px ${colorRingShadow1},20px 20px 50px -25px ${colorRingShadow2}`">
      <div class="absolute inset-0 flex flex-col items-center justify-center select-none z-10 scale-85 rounded-full"
        :style="`background:${colorCenterBg};color:${colorCenterText};box-shadow:inset 20px 20px 50px -25px ${colorCenterShadow}`">
        <slot>
          <div class="text-xs font-medium mb-1" :style="`color:${colorLabel}`">{{ label }}</div>
          <div class="text-3xl font-bold" :style="`color:${colorValue}`">{{ content }}</div>
          <div v-if="icon" class="mt-1">
            <component :is="icon" class="w-6 h-6" />
          </div>
        </slot>
      </div>
    </div>
  </div> -->
  <!-- 外部阴影 outerShadow -->
  <div class="relative flex flex-col items-center justify-center select-none rounded-full box-border"
    :style="`background: #fff;border:1px solid ${colorOuterBorder}; width:${size}px; height:${size / 2}px; top: 0; left: 0;`">
    <!-- 外部环 outer -->
    <!-- <div class="absolute inset-0 flex flex-col items-center justify-center select-none scale-80 rounded-full"
      :style="showButtonShadow ? buttonShadowStyle : ''"> -->
    <!-- 中心圈 center -->
    <div
      class="absolute inset-0 flex flex-col items-center justify-center select-none z-10 scale-90 rounded-full bg-linear-120 from-gray-100 to-gray-300">
      <!-- 内容范围 content -->
      <slot>
        <div class="text-xs font-medium mb-1" :style="`color:${colorLabel}`">{{ label }}</div>
        <div class="text-3xl font-bold" :style="`color:${colorValue}`">{{ content }}</div>
        <div v-if="icon" class="mt-1">
          <component :is="icon" class="w-6 h-6" />
        </div>
      </slot>
    </div>
    <!-- </div> -->
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  content: { type: [Number, String], default: 0 },
  label: { type: String, default: '' },
  icon: { type: [Object, Function, String], default: null },
  size: { type: Number, default: 220 },
  colorOuterBg: { type: String, default: '#d9dde2' },
  colorOuterBorder: { type: String, default: '#d9dde2' },
  colorRingBg: { type: String, default: '#fff' },
  colorRingBorder: { type: String, default: '#fff' },
  colorRingShadow1: { type: String, default: '#e0e4e9' },
  colorRingShadow2: { type: String, default: '#666' },
  colorCenterBg: { type: String, default: '#fff' },
  colorCenterText: { type: String, default: '#c8cfd1' },
  colorCenterShadow: { type: String, default: '#e6e8ec' },
  colorLabel: { type: String, default: '#9ca3af' },
  colorValue: { type: String, default: '#c1c5c9' }
})

const buttonShadowStyle = `background:${props.colorRingBg}; box-shadow:inset -20px -20px 50px -25px ${props.colorRingShadow1},20px 20px 50px -25px ${props.colorRingShadow2}`
const showButtonShadow = ref(true)
</script>

<style scoped>
</style>