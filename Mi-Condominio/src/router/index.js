import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '@/views/LoginView.vue'

import DashboardView from '@/views/DashboardView.vue'

import NotFoundView from '@/views/NotFoundView.vue'

const routes = [

    {
        path: '/',
        redirect: '/login'
    },

    {
        path: '/login',
        name: 'login',
        component: LoginView
    },

    {
        path: '/Panel-Control',
        name: 'dashboard',
        component: DashboardView,
        meta: {
            requiresAuth: true
        }
    },

    {
        path: '/:pathMatch(.*)*',
        name: 'notfound',
        component: NotFoundView
    }
]

const router = createRouter({

    history: createWebHistory(),

    routes
})

router.beforeEach((to, from, next) => {

    const token = localStorage.getItem('token')


    if (to.path === '/login' && token) {

        next('/Panel-Control')

        return
    }


    if (to.meta.requiresAuth && !token) {

        next('/login')

        return
    }

    next()
})

export default router