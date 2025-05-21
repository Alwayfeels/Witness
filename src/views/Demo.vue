<template>
  <div class="min-h-screen flex flex-col items-center justify-start bg-muted gap-12 pb-12">
    <h1 class="text-2xl font-bold mt-8">progressButton 组件演示</h1>
    <div class="flex gap-24 flex-col w-full max-w-4xl items-center">
      <!-- 上侧：组件展示 -->
      <div class="flex justify-center" :style="`height: ${form.size}px; min-height: ${form.size}px`">
        <progressButton v-bind="form" :icon="LeafIcon">
        </progressButton>
      </div>
      <!-- 下侧：属性表单 -->
      <div class="min-w-[1000px] max-w-[1200px]">
        <Card>
          <CardContent>
            <!-- 基础属性 -->
            <div class="mb-6">
              <h3 class="text-md font-bold mb-2 text-gray-700 border-b pb-1">基础属性</h3>
              <div class="grid grid-cols-5 gap-x-6 gap-y-2">
                <div v-for="item in baseInputList" :key="item.key" class="flex flex-col gap-0.5">
                  <label :for="item.key" class="text-xs text-muted-foreground mb-0.5">{{ item.label }}</label>
                  <Input v-model="form[item.key]" :id="item.key" :type="item.type" :min="item.min" :max="item.max"
                    class="h-8 w-[150px]" />
                </div>
              </div>
            </div>
            
            <!-- 刻度属性 -->
            <div class="mb-6">
              <h3 class="text-md font-bold mb-2 text-gray-700 border-b pb-1">刻度属性</h3>
              <div class="grid grid-cols-5 gap-x-6 gap-y-2">
                <div v-for="item in tickInputList" :key="item.key" class="flex flex-col gap-0.5">
                  <label :for="item.key" class="text-xs text-muted-foreground mb-0.5">{{ item.label }}</label>
                  <template v-if="item.type === 'checkbox'">
                    <input 
                      type="checkbox" 
                      :id="item.key" 
                      v-model="form[item.key]" 
                      class="h-8 w-8"
                    />
                  </template>
                  <Input 
                    v-else
                    v-model="form[item.key]" 
                    :id="item.key" 
                    :type="item.type" 
                    :min="item.min" 
                    :max="item.max"
                    class="h-8 w-[150px]" 
                  />
                </div>
              </div>
            </div>
            
            <!-- 进度条属性 -->
            <div class="mb-6">
              <h3 class="text-md font-bold mb-2 text-gray-700 border-b pb-1">进度条属性</h3>
              <div class="grid grid-cols-5 gap-x-6 gap-y-2">
                <div v-for="item in progressInputList" :key="item.key" class="flex flex-col gap-0.5">
                  <label :for="item.key" class="text-xs text-muted-foreground mb-0.5">{{ item.label }}</label>
                  <Input v-model="form[item.key]" :id="item.key" :type="item.type" :min="item.min" :max="item.max"
                    class="h-8 w-[150px]" />
                </div>
              </div>
            </div>
            
            <!-- 盘面属性 -->
            <div>
              <h3 class="text-md font-bold mb-2 text-gray-700 border-b pb-1">盘面属性</h3>
              <div class="grid grid-cols-5 gap-x-6 gap-y-2">
                <div v-for="item in plateInputList" :key="item.key" class="flex flex-col gap-0.5">
                  <label :for="item.key" class="text-xs text-muted-foreground mb-0.5">{{ item.label }}</label>
                  <Input v-model="form[item.key]" :id="item.key" :type="item.type" :min="item.min" :max="item.max"
                    class="h-8 w-[150px]" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup>
import progressButton from '@/components/progressButton.vue'
import { reactive, computed } from 'vue'
import Card from '@/components/ui/card/Card.vue'
import CardContent from '@/components/ui/card/CardContent.vue'
import Input from '@/components/ui/input/Input.vue'
// 示例图标
const LeafIcon = {
  template: '<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" width="24" height="24"><path d="M5 21c10 0 14-8 14-16 0 0-7 0-14 8 0 0 0 8 7 8z"/></svg>'
}

const form = reactive({
  // 基础属性
  progress: 60,
  content: 24,
  label: 'HEATING',
  size: 100,
  svgSizeOffset: 20,
  
  // 刻度属性
  tickCount: 12,
  tickLength: 4,
  tickWidth: 2,
  tickVisible: true,
  colorTick: '#d1d5db',
  colorTrack: '#e5e7eb',
  trackWidth: 8,
  trackSize: 50,
  
  // 进度条属性
  progressRingSize: 45,
  progressRingWidth: 8,
  progressStartAngle: 0,
  progressColorStart: '#6366f1',
  progressColorEnd: '#8b5cf6',
  progressGradientAngle: 45,
  
  // 盘面属性（外部环）
  colorOuterBg: '#d9dde2',
  colorOuterBorder: '#d9dde2',
  colorRingBg: '#fff',
  colorRingBorder: '#fff',
  colorRingShadow1: '#e0e4e9',
  colorRingShadow2: '#666',
  
  // 盘面属性（内部环/中心圈）
  colorCenterBg: '#fff',
  colorCenterText: '#c8cfd1',
  colorCenterShadow: '#e6e8ec',
  colorLabel: '#9ca3af',
  colorValue: '#c1c5c9',
})

// 基础属性
const baseInputList = computed(() => [
  { key: 'progress', label: '进度(%)', type: 'number', min: 0, max: 100 },
  { key: 'content', label: '中心数值', type: 'number' },
  { key: 'label', label: '标签', type: 'text' },
  { key: 'size', label: '组件尺寸', type: 'number', min: 60, max: 300 },
  { key: 'svgSizeOffset', label: 'SVG偏移量', type: 'number', min: 0, max: 50 },
])

// 刻度属性
const tickInputList = computed(() => [
  { key: 'tickCount', label: '刻度数量', type: 'number', min: 0, max: 60 },
  { key: 'tickLength', label: '刻度长度', type: 'number', min: 1, max: 20 },
  { key: 'tickWidth', label: '刻度宽度', type: 'number', min: 1, max: 10 },
  { key: 'tickVisible', label: '显示刻度', type: 'checkbox' },
  { key: 'colorTick', label: '刻度颜色', type: 'color' },
  { key: 'colorTrack', label: '刻度环背景色', type: 'color' },
  { key: 'trackWidth', label: '刻度环宽度', type: 'number', min: 1, max: 20 },
  { key: 'trackSize', label: '刻度环直径', type: 'number', min: 30, max: 100 },
])

// 进度条属性
const progressInputList = computed(() => [
  { key: 'progressRingSize', label: '进度环直径', type: 'number', min: 30, max: 100 },
  { key: 'progressRingWidth', label: '进度环宽度', type: 'number', min: 2, max: 20 },
  { key: 'progressStartAngle', label: '起始角度', type: 'number', min: 0, max: 360 },
  { key: 'progressColorStart', label: '渐变起始色', type: 'color' },
  { key: 'progressColorEnd', label: '渐变结束色', type: 'color' },
  { key: 'progressGradientAngle', label: '渐变角度', type: 'number', min: 0, max: 360 },
])

// 盘面属性
const plateInputList = computed(() => [
  // 外部环
  { key: 'colorOuterBg', label: '最外层背景色', type: 'color' },
  { key: 'colorOuterBorder', label: '最外层边框色', type: 'color' },
  { key: 'colorRingBg', label: '外部环背景色', type: 'color' },
  { key: 'colorRingBorder', label: '外部环边框色', type: 'color' },
  { key: 'colorRingShadow1', label: '外部环内阴影', type: 'color' },
  { key: 'colorRingShadow2', label: '外部环外阴影', type: 'color' },
  // 中心圈
  { key: 'colorCenterBg', label: '中心圈背景色', type: 'color' },
  { key: 'colorCenterText', label: '中心圈文字色', type: 'color' },
  { key: 'colorCenterShadow', label: '中心圈阴影', type: 'color' },
  { key: 'colorLabel', label: '标签文字色', type: 'color' },
  { key: 'colorValue', label: '数值文字色', type: 'color' },
])
</script>