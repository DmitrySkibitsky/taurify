import type { RouteRecordRaw } from 'vue-router';

export const settingsRoutes: RouteRecordRaw[] = [
  {
    path: '/settings',
    component: () => import('@/app/components/AppLayout.vue'),
    children: [],
  },
];
