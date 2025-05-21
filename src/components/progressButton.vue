<template>
  <div :class="['relative flex items-center justify-center', sizeClass]">
    <!-- SVG 环形进度条 -->
    <svg :width="size" :height="size" :viewBox="`0 0 ${size} ${size}`" class="rotate-[-90deg]">
      <!-- 背景圆环 -->
      <circle :cx="size / 2" :cy="size / 2" :r="radius" :stroke-width="stroke" class="text-gray-200" fill="none"
        :stroke="trackColor" />
      <!-- 进度圆环 -->
      <circle :cx="size / 2" :cy="size / 2" :r="radius" :stroke-width="stroke" fill="none" :stroke="color"
        :stroke-dasharray="circumference" :stroke-dashoffset="progressOffset" stroke-linecap="round"
        class="transition-all duration-500" />
      <!-- 外部刻度 -->
      <!-- <g>
        <template v-for="n in tickCount" :key="n">
          <line :x1="getTickPos(n - 1).x1" :y1="getTickPos(n - 1).y1" :x2="getTickPos(n - 1).x2" :y2="getTickPos(n - 1).y2"
            :stroke="tickColor" :stroke-width="tickWidth" stroke-linecap="round" />
        </template>
</g> -->
    </svg>
    <!-- 中心内容 -->
    <!-- 外部阴影 -->
    <div
      class="absolute inset-0 flex flex-col items-center justify-center select-none rounded-full bg-[#d9dde2] border">
      <!-- 外部环 -->
      <div
        class="absolute inset-0 flex flex-col items-center justify-center select-none scale-80 rounded-full bg-[#fff] border border-[#fff]"
        style="box-shadow: inset -20px -20px 50px -25px #e0e4e9, 20px 20px 50px -25px #666;">
        <!-- 中心圈 -->
        <div
          class="absolute inset-0 flex flex-col items-center justify-center select-none z-10 scale-85 rounded-full bg-[#fff] text-[#c8cfd1]"
          style="box-shadow: inset 20px 20px 50px -25px #e6e8ec;">
          <!-- 内容范围 -->
          <div class="text-xs text-gray-400 font-medium mb-1">{{ label }}</div>
          <div class="text-3xl font-bold">{{ value }}</div>
          <div v-if="icon" class="mt-1">
            <component :is="icon" class="w-6 h-6" />
          </div>
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  value: { type: [Number, String], default: 0 }, // 中心数字
  label: { type: String, default: '' },         // 英文
  icon: { type: [Object, Function, String], default: null }, // 图标组件
  progress: { type: Number, default: 0 },       // 进度百分比 0-100
  size: { type: Number, default: 120 },         // 组件大小
  stroke: { type: Number, default: 8 },         // 圆环宽度
  color: { type: String, default: '#6366f1' },  // 进度颜色
  trackColor: { type: String, default: '#e5e7eb' }, // 背景圆环颜色
})

const radius = computed(() => (props.size - props.stroke) / 2)
const circumference = computed(() => 2 * Math.PI * radius.value)
const progressOffset = computed(() => circumference.value * (1 - props.progress / 100))
const sizeClass = computed(() => {
  if (props.size <= 80) return 'w-20 h-20'
  if (props.size <= 120) return 'w-32 h-32'
  return `w-[${props.size}px] h-[${props.size}px]`
})

// 刻度相关参数
const tickCount = 32 // 刻度数量
const tickLength = 8 // 刻度长度
const tickColor = '#d1d5db' // 刻度颜色
const tickWidth = 2 // 刻度宽度

function getTickPos(i) {
  const angle = (2 * Math.PI / tickCount) * i
  const r1 = props.size / 2 - 1 // 刻度更靠外
  const r2 = r1 - tickLength // 内圈终点
  const cx = props.size / 2
  const cy = props.size / 2
  return {
    x1: cx + r1 * Math.cos(angle),
    y1: cy + r1 * Math.sin(angle),
    x2: cx + r2 * Math.cos(angle),
    y2: cy + r2 * Math.sin(angle),
  }
}
</script>