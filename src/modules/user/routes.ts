import type { RouteRecordRaw } from 'vue-router';

export const userRoutes: RouteRecordRaw[] = [
  {
    path: '/user/information',
    component: () => import('@/app/Layout.vue'),
    children: [
      {
        path: '',
        name: 'user.information',
        component: () => import('./views/Information.vue'),
      },
    ],
  },
];
