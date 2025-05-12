/**
 * 自定义Service Worker
 * 这个文件需要在vite.config.js中配置
 */

// 自定义Service Worker缓存名称
const CACHE_NAME = 'offline-app-cache-v1'

// 需要缓存的资源URLs
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
]

// 安装事件 - 预缓存重要资源
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: 预缓存重要资源')
        return cache.addAll(urlsToCache)
      })
      .catch((error) => {
        console.error('预缓存失败:', error)
      })
  )
})

// 激活事件 - 清理旧缓存
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.filter((name) => {
            return name !== CACHE_NAME
          }).map((name) => {
            console.log('Service Worker: 删除旧缓存', name)
            return caches.delete(name)
          })
        )
      })
  )
  
  // 立即接管所有打开的页面
  return self.clients.claim()
})

// 检查网络状态并通知客户端
function checkNetworkAndNotify() {
  return fetch('https://www.googleapis.com/customsearch/v1?ping', { 
    method: 'HEAD',
    cache: 'no-store'
  })
    .then(() => true)
    .catch(() => false)
    .then((online) => {
      // 通知所有客户端网络状态
      return self.clients.matchAll().then((clients) => {
        clients.forEach((client) => {
          client.postMessage({
            type: 'ONLINE_STATUS_CHANGE',
            online
          })
        })
        return online
      })
    })
}

// 控制方式 - 网络优先，失败时使用缓存
self.addEventListener('fetch', (event) => {
  // 仅处理GET请求
  if (event.request.method !== 'GET') return
  
  // 忽略Chrome扩展请求和非HTTP请求
  if (!(event.request.url.startsWith('http'))) return
  
  // 处理 Axios XSRF 头部
  if (event.request.url.includes('/api/') && event.request.headers.get('X-XSRF-TOKEN')) {
    // 让 Axios 请求通过，不做缓存处理
    return
  }
  
  // API请求使用网络优先策略
  if (event.request.url.includes('/api/')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          return response
        })
        .catch((error) => {
          console.log('Service Worker: API请求失败，返回离线响应', error)
          
          // 对于API请求的失败，返回一个JSON响应
          return new Response(
            JSON.stringify({ 
              offline: true,
              error: 'You are offline'
            }),
            { 
              status: 503,
              headers: { 'Content-Type': 'application/json' } 
            }
          )
        })
    )
    return
  }
  
  // 页面和静态资源使用先缓存后网络策略
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        // 缓存命中，使用缓存
        if (cachedResponse) {
          // 在后台尝试更新缓存
          fetch(event.request)
            .then((freshResponse) => {
              if (freshResponse) {
                caches.open(CACHE_NAME)
                  .then((cache) => {
                    cache.put(event.request, freshResponse.clone())
                  })
              }
            })
            .catch(() => {
              // 网络请求失败，检查网络状态
              checkNetworkAndNotify()
            })
          
          return cachedResponse
        }
        
        // 缓存未命中，从网络获取
        return fetch(event.request)
          .then((response) => {
            // 不缓存错误响应
            if (!response || response.status !== 200) {
              return response
            }
            
            // 缓存网络响应的副本
            const responseToCache = response.clone()
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache)
              })
            
            return response
          })
          .catch((error) => {
            console.log('Service Worker: 网络请求失败，检查网络状态', error)
            // 网络请求失败，检查网络状态
            checkNetworkAndNotify()
            
            // 对于HTML请求，提供通用的离线页面
            if (event.request.headers.get('Accept') && 
                event.request.headers.get('Accept').includes('text/html')) {
              return caches.match('/')
            }
            
            // 否则返回错误
            throw error
          })
      })
  )
})

// 监听消息
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
  
  if (event.data && event.data.type === 'CHECK_NETWORK') {
    checkNetworkAndNotify()
  }
})

// 后台同步
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-data') {
    event.waitUntil(
      self.clients.matchAll().then((clients) => {
        clients.forEach((client) => {
          client.postMessage({
            type: 'SYNC_REQUESTED'
          })
        })
      })
    )
  }
})

// 周期性同步
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'check-network') {
    event.waitUntil(checkNetworkAndNotify())
  }
}) 