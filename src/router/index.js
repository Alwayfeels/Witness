import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/todo'
  },
  {
    path: '/todo',
    name: 'Todo',
    component: () => import('@/views/Todo.vue'),
    meta: {
      title: '待办事项',
      icon: 'CheckSquare'
    }
  },
  {
    path: '/habit',
    name: 'Habit',
    component: () => import('@/views/Habit.vue'),
    meta: {
      title: '习惯养成',
      icon: 'Repeat'
    }
  },
  {
    path: '/food',
    name: 'Food',
    component: () => import('@/views/Food.vue'),
    meta: {
      title: '饮食记录',
      icon: 'Utensils'
    }
  },
  {
    path: '/statistics',
    name: 'Statistics',
    component: () => import('@/views/Statistics.vue'),
    meta: {
      title: '数据统计',
      icon: 'BarChart'
    }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('@/views/Settings.vue'),
    meta: {
      title: '设置',
      icon: 'Settings'
    }
  },
  {
    path: '/demo',
    name: 'Demo',
    component: () => import('@/views/Demo.vue'),
    meta: {
      title: '进度按钮演示',
      icon: 'GalleryVerticalEnd'
    }
  },
  {
    path: '/demo-button',
    name: 'DemoButton',
    component: () => import('@/views/DemoButton.vue'),
    meta: {
      title: '按钮演示',
      icon: 'GalleryVerticalEnd'
    }
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 