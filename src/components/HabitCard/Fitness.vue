<script setup lang='ts'>
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { VisXYContainer  } from '@unovis/vue'
import { VisLine } from '@unovis/vue'

const logData = [
  {
    id: 1,
    name: '俯卧撑',
    startTime: '2024-01-15 07:30',
    endTime: '2024-01-15 07:45',
    reps: 30,
    sets: 3,
    calories: 45,
  },
  // 1月16日数据
  {
    id: 5,
    name: '引体向上',
    startTime: '2024-01-16 07:15',
    endTime: '2024-01-16 07:30',
    reps: 12,
    sets: 3,
    calories: 60,
  },
  // 1月17日数据
  {
    id: 8,
    name: '哑铃划船',
    startTime: '2024-01-17 06:30',
    endTime: '2024-01-17 06:50',
    reps: 15,
    sets: 3,
    calories: 55,
    weight: '15kg',
  },
  // 1月18日数据
  {
    id: 11,
    name: '箭步蹲',
    startTime: '2024-01-18 07:30',
    endTime: '2024-01-18 07:50',
    reps: 12,
    sets: 3,
    calories: 70,
    weight: '20kg',
  },
  // 1月19日数据
  {
    id: 14,
    name: '俯卧撑',
    startTime: '2024-01-19 06:15',
    endTime: '2024-01-19 06:30',
    reps: 35,
    sets: 4,
    calories: 65,
  },
]

</script>

<template>
  <Card class="w-[350px]">
    <CardHeader class="flex justify-between">
      <CardTitle>健身</CardTitle>
      <CardDescription class="flex gap-2">
        <Badge variant="secondary">重要</Badge>
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div class="h-[200px]">
        <!-- <VisXYContainer :height="200" :width="350">
          <VisLine :data="logData" :x="(d) => new Date(d.startTime)" :y="(d) => d.calories" :color="'#90EE90'" />
        </VisXYContainer > -->
      </div>
    </CardContent>
    <CardFooter class="flex justify-between px-6 pb-6">
      <Button variant="outline">
        Cancel
      </Button>
      <Button>Deploy</Button>
    </CardFooter>
  </Card>
</template>