import type { RouteRecordRaw } from 'vue-router';

export const settingsRoutes: RouteRecordRaw[] = [
  {
    path: '/settings',
    component: () => import('@/app/Layout.vue'),
    children: [
      {
        path: '',
        name: 'settings.index',
        component: () => import('./views/Index.vue'),
      },
    ],
  },
];
