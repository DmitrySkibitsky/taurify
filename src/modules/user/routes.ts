import type { RouteRecordRaw } from 'vue-router';

export const userRoutes: RouteRecordRaw[] = [
  {
    path: '/user',
    component: () => import('@/app/Layout.vue'),
    children: [
      {
        path: 'auth/callback',
        name: 'user.auth.callback',
        component: () => import('./views/Callback.vue'),
      },
      {
        path: 'information',
        name: 'user.information',
        component: () => import('./views/Information.vue'),
      },
    ],
  },
];
