const routes = [
    {
        path: '/',
        redirect: '/gd/gdlist'
    },
    {
        path: '/dp',
        component: () => import('@/views/dp/index.vue')
    },
    {
        path: '/api',
        component: () => import('@/views/zb/api.vue')
    },
    {
        path: '/zb',
        component: () => import('@/views/zb/head.vue'),
        children: [
            {
                path: '/zb/zb1',
                component: () => import('@/views/zb/zb1.vue')
            },
            {
                path: '/zb/zb2',
                component: () => import('@/views/zb/zb2.vue')
            }
        ]
    },
    {
        path: '/gd',
        component: () => import('@/views/gd/head.vue'),
        children: [
            {
                path: '/gd/gdlist',
                component: () => import('@/views/gd/gdlist.vue')
            },
            {
                path: '/gd/mxConfig',
                component: () => import('@/views/gd/mxConfig.vue')
            },
            {
                path: '/gd/pg',
                component: () => import('@/views/gd/pg.vue')
            }
        ]
    },
    {
        path: '/h5',
        component: () => import('@/views/h5/head.vue'),
        children: [
            {
                path: '/h5/index',
                name: '统一待办中心',
                component: () => import('@/views/h5/home.vue')
            },
            {
                path: '/h5/ai',
                name: 'AI调度助手',
                component: () => import('@/views/h5/ai.vue')
            }
        ]
    }
];
export default routes;
