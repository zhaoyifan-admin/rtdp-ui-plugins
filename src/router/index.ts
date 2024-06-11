import {createRouter, createWebHistory} from 'vue-router'
import {setDocumentTitle, webTitle} from '@/utils/util'
import GlobalLayout from '@/layouts/GlobalLayout.vue'

export const routes = [
    {
        path: '/',
        name: 'Index',
        component: GlobalLayout,
        redirect: '/home',
        children: [
            {
                path: '/home',
                name: 'Home',
                meta: {title: '首页'},
                // route level code-splitting
                // this generates a separate chunk (About.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () => import('@/views/guide/Home.vue')
            }]
    },
    {
        path: '/:pathMatch(.*)*',
        // 如果你省略了最后的 `*`，在解析或跳转时，参数中的 `/` 字符将被编码
        // path: '/:pathMatch(.*)',
        name: 'not-found',
        meta: {title: 'NotFound'},
        component: () => import('@/views/guide/NotFound.vue')
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL), // 使用history模式，hash模式：createWebHashHistory
    routes, // `routes: routes` 的缩写
    scrollBehavior(to, from, savedPosition) { // 滚动行为
        return {left: 0, top: 0, behavior: 'smooth'}
    }
})
// 注册全局前置守卫
router.beforeEach((to, from) => {
    const domTitle = to.meta.title + ' ' + String(to.name) + ' - ' + webTitle
    setDocumentTitle(domTitle)
})

export default router
