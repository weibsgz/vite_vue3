export default [
    {
        path: '/',
        name: 'main',
        component: () => import('@/views/layout/index.vue'),
        children:[
            {
                path: '',
                name: 'home',
                component: () => import('@/views/main/index.vue')
            },
            {
                path: '/profile',
                name: 'profile',
                component: () => import('@/views/profile/index.vue'),
                //标记当前路由是用户登陆后才能访问的
                meta: {
                    user: true
                }
            },
        ],
        
    },
    {
        path:'/pins/:id',
        name:'pins',
        component: () => import('@/views/pins/index.vue')
    },
    {
        path:'/login',
        name:'login',
        component: () => import('@/views/login-register/login/index.vue')
    },
    {
        path:'/register',
        name:'register',
        component: () => import('@/views/login-register/register/index.vue')
    },
    {
        path: '/member',
        name: 'member',
        component: () => import('@/views/member/index.vue'),
        //标记当前路由是用户登陆后才能访问的
        meta: {
            user: true
        }
    },
]