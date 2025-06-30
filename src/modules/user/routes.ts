import type { RouteRecordRaw } from 'vue-router';

export const userRoutes: RouteRecordRaw[] = [
  {
    path: '/user',
    component: () => import('@/app/components/AppLayout.vue'),
    children: [],
  },
];
