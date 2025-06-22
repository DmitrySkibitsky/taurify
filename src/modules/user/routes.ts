import type { RouteRecordRaw } from 'vue-router';

export const userRoutes: RouteRecordRaw[] = [
  {
    path: '/user',
    component: () => import('@/app/Layout.vue'),
    children: [
      {
        path: 'information',
        name: 'user.information',
        component: () => import('./views/Information.vue'),
      },
    ],
  },
];
