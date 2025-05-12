<script setup>
import { reactive, ref } from 'vue'

// 使用reactive存储待办事项列表数据
const todos = reactive([
  { id: 1, text: '学习 Vue 3', completed: true },
  { id: 2, text: '完成项目', completed: false },
  { id: 3, text: '购物', completed: false }
])

// 新的待办事项输入
const newTodo = ref('')

// 添加新的待办事项
const addTodo = () => {
  if (newTodo.value.trim()) {
    todos.push({
      id: Date.now(),
      text: newTodo.value.trim(),
      completed: false
    })
    newTodo.value = ''
  }
}

// 删除待办事项
const removeTodo = (id) => {
  const index = todos.findIndex(todo => todo.id === id)
  if (index !== -1) {
    todos.splice(index, 1)
  }
}

// 切换待办事项完成状态
const toggleComplete = (id) => {
  const todo = todos.find(todo => todo.id === id)
  if (todo) {
    todo.completed = !todo.completed
  }
}
</script>

<template>
  <div class="max-w-md mx-auto p-6 bg-[#f0ece3] rounded-lg shadow-md">
    <h1 class="text-sm font-semibold text-[#6b705c] mb-4">待办事项列表</h1>
    
    <!-- 添加新的待办事项 -->
    <div class="flex mb-4">
      <input
        v-model="newTodo"
        @keyup.enter="addTodo"
        type="text"
        placeholder="添加新的待办事项..."
        class="flex-1 px-4 py-2 rounded-l-lg border-2 border-[#a5a58d] focus:outline-none focus:border-[#6b705c] bg-[#f7f5f0]"
      />
      <button
        @click="addTodo"
        class="px-4 py-2 bg-[#6b705c] text-white rounded-r-lg hover:bg-[#a5a58d] transition duration-300"
      >
        添加
      </button>
    </div>
    
    <!-- 待办事项列表 -->
    <div class="grid gap-2">
      <div 
        v-for="todo in todos" 
        :key="todo.id" 
        class="grid grid-cols-[auto_1fr_auto] items-center gap-2 p-3 rounded-lg"
        :class="todo.completed ? 'bg-[#e8e4dd]' : 'bg-[#f7f5f0]'"
      >
        <input 
          type="checkbox" 
          :checked="todo.completed" 
          @change="toggleComplete(todo.id)"
          class="w-5 h-5 cursor-pointer accent-[#6b705c]"
        />
        <span 
          class="text-[#6b705c]"
          :class="{ 'line-through text-[#a5a58d]': todo.completed }"
        >
          {{ todo.text }}
        </span>
        <button 
          @click="removeTodo(todo.id)" 
          class="p-1 text-[#cb997e] hover:text-[#b7b7a4] transition duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
    
    <!-- 完成信息 -->
    <div class="mt-4 text-sm text-[#a5a58d] text-right">
      已完成: {{ todos.filter(t => t.completed).length }} / {{ todos.length }}
    </div>
  </div>
</template>