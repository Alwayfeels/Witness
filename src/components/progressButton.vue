<template>
  <div :class="['relative overflow-visible', sizeClass]" :style="`width: ${size}px; height: ${size}px;`">
    <!-- SVG 环形进度条 -->
    <svg :width="svgSize" :height="svgSize" :viewBox="`0 0 ${svgSize} ${svgSize}`"
      class="rotate-[-90deg] scale-120 absolute z-50"
      :style="`top: ${(size - svgSize) / 2}px; left: ${(size - svgSize) / 2}px;`">
      <!-- 渐变定义 -->
      <defs>
        <linearGradient :id="gradientId" :x1="gradientCoords.x1" :y1="gradientCoords.y1" :x2="gradientCoords.x2"
          :y2="gradientCoords.y2">
          <stop offset="0%" :stop-color="progressColorStart" />
          <stop offset="100%" :stop-color="progressColorEnd" />
        </linearGradient>
      </defs>
      <!-- 外部刻度 -->
      <g v-if="tickVisible">
        <template v-for="n in tickCount" :key="n">
          <line :x1="getTickPos(n - 1).x1" :y1="getTickPos(n - 1).y1" :x2="getTickPos(n - 1).x2"
            :y2="getTickPos(n - 1).y2" :stroke="colorTick" :stroke-width="tickWidth" stroke-linecap="round" />
        </template>
      </g>
      <!-- 进度圆环 -->
      <circle :cx="svgSize / 2" :cy="svgSize / 2" :r="progressRingSize" :stroke-width="progressRingWidth" fill="none"
        :stroke="`url(#${gradientId})`" :stroke-dasharray="progressCircumference" :stroke-dashoffset="progressOffset"
        stroke-linecap="round" class="transition-all duration-500" />
    </svg>
    <!-- 中心内容 -->
    <!-- 外部阴影 outerShadow -->
    <div class="absolute flex flex-col items-center justify-center select-none rounded-full"
      :style="`background:${colorOuterBg};border:1px solid ${colorOuterBorder}; width:${size}px; height:${size}px; top: 0; left: 0;`">
      <!-- 外部环 outer -->
      <div class="absolute inset-0 flex flex-col items-center justify-center select-none scale-80 rounded-full"
        :style="`background:${colorRingBg};border:1px solid ${colorRingBorder};box-shadow:inset -20px -20px 50px -25px ${colorRingShadow1},20px 20px 50px -25px ${colorRingShadow2}`">
        <!-- 中心圈 center -->
        <div class="absolute inset-0 flex flex-col items-center justify-center select-none z-10 scale-85 rounded-full"
          :style="`background:${colorCenterBg};color:${colorCenterText};box-shadow:inset 20px 20px 50px -25px ${colorCenterShadow}`">
          <!-- 内容范围 content -->
          <slot>
            <div class="text-xs font-medium mb-1" :style="`color:${colorLabel}`">{{ label }}</div>
            <div class="text-3xl font-bold" :style="`color:${colorValue}`">{{ content }}</div>
            <div v-if="icon" class="mt-1">
              <component :is="icon" class="w-6 h-6" />
            </div>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  // 基础属性
  content: { type: [Number, String], default: 0 },
  label: { type: String, default: '' },
  icon: { type: [Object, Function, String], default: null },
  progress: { type: Number, default: 0 },
  size: { type: Number, default: 120 },
  svgSizeOffset: { type: Number, default: 20 },

  // 刻度属性
  tickCount: { type: Number, default: 12 }, // 刻度数量
  tickLength: { type: Number, default: 4 }, // 刻度长度
  tickWidth: { type: Number, default: 8 }, // 刻度宽度
  tickVisible: { type: Boolean, default: true }, // 是否显示刻度
  colorTick: { type: String, default: '#d1d5db' }, // 刻度颜色

  // 进度条属性
  progressPercent: { type: Number, default: 0 }, // 进度百分比
  progressRingSize: { type: Number, default: 55 }, // 进度圆环直径
  progressRingWidth: { type: Number, default: 8 }, // 进度圆环宽度
  progressStartAngle: { type: Number, default: 0 }, // 起始角度（度数）
  progressEndAngle: { type: Number, default: 359 }, // 结束角度（度数）
  progressColorStart: { type: String, default: '#6366f1' }, // 渐变起始颜色
  progressColorEnd: { type: String, default: '#8b5cf6' }, // 渐变结束颜色
  progressGradientAngle: { type: Number, default: 45 }, // 渐变角度（度数）

  // 盘面属性（外部环）
  colorOuterBg: { type: String, default: '#d9dde2' }, // 最外层背景色
  colorOuterBorder: { type: String, default: '#d9dde2' }, // 最外层边框色
  colorRingBg: { type: String, default: '#fff' }, // 外部环背景色
  colorRingBorder: { type: String, default: '#fff' }, // 外部环边框色
  colorRingShadow1: { type: String, default: '#e0e4e9' }, // 外部环内阴影色
  colorRingShadow2: { type: String, default: '#666' }, // 外部环外阴影色

  // 盘面属性（内部环/中心圈）
  colorCenterBg: { type: String, default: '#fff' }, // 中心圈背景色
  colorCenterText: { type: String, default: '#c8cfd1' }, // 中心圈文字色
  colorCenterShadow: { type: String, default: '#e6e8ec' }, // 中心圈阴影色
  colorLabel: { type: String, default: '#9ca3af' }, // 标签文字色
  colorValue: { type: String, default: '#c1c5c9' } // 数值文字色
})

// 生成唯一ID用于渐变引用
const gradientId = computed(() => `progress-gradient-${Math.random().toString(36).substring(2, 9)}`)

// 根据角度计算渐变坐标
const gradientCoords = computed(() => {
  const angle = (props.progressGradientAngle * Math.PI) / 180
  return {
    x1: 0.5 - 0.5 * Math.cos(angle),
    y1: 0.5 - 0.5 * Math.sin(angle),
    x2: 0.5 + 0.5 * Math.cos(angle),
    y2: 0.5 + 0.5 * Math.sin(angle)
  }
})

// SVG尺寸计算，默认比组件尺寸大20
const svgSize = computed(() => props.size + props.svgSizeOffset)
// 进度圆环周长
const progressCircumference = computed(() => 2 * Math.PI * props.progressRingSize)
// 进度偏移计算，考虑起始角度和结束角度
const progressOffset = computed(() => {
  // 计算起始角度和结束角度之间的角度差
  const angleDiff = ((props.progressEndAngle - props.progressStartAngle + 360) % 360) / 360
  // 根据角度差计算有效周长
  const effectiveCircumference = progressCircumference.value * angleDiff
  // 起始角度对应的偏移量
  const startAngleOffset = (props.progressStartAngle / 360) * progressCircumference.value
  // 使用progressPercent计算进度
  const percent = props.progressPercent !== undefined ? props.progressPercent : props.progress
  // 最终偏移量 = 总周长 - (起始偏移 + 进度比例 * 有效周长)
  return progressCircumference.value - (startAngleOffset + (percent / 100) * effectiveCircumference)
})

const sizeClass = computed(() => {
  if (props.size <= 80) return 'text-sm'
  if (props.size <= 120) return 'text-base'
  return 'text-lg'
})

function getTickPos(i) {
  const angle = (2 * Math.PI / props.tickCount) * i
  const r1 = svgSize.value / 2 - 1 // 刻度更靠外
  const r2 = r1 - props.tickLength // 内圈终点
  const cx = svgSize.value / 2
  const cy = svgSize.value / 2
  return {
    x1: cx + r1 * Math.cos(angle),
    y1: cy + r1 * Math.sin(angle),
    x2: cx + r2 * Math.cos(angle),
    y2: cy + r2 * Math.sin(angle),
  }
}
</script>