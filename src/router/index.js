// 引入需要的模块
import { createRouter, createWebHistory } from 'vue-router'

// 下面使用了es6的对象增强写法，命名必须是routes
const routes = [
    {
        path: '/',
        name: "home",
        component: () => import('../views/HomeView.vue')
    },
    
]

// 创建路由
const router = createRouter({
    history: createWebHistory(),
    routes
})

// 导出路由
export default router