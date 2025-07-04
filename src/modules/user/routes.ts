import type { RouteRecordRaw } from 'vue-router';

export const userRoutes: RouteRecordRaw[] = [
  {
    path: '/user',
    component: () => import('@/app/components/AppLayout.vue'),
    children: [
      {
        path: 'profile',
        component: () => import('@/modules/user/views/UserProfile.vue'),
        name: 'user.profile',
      },
    ],
  },
];
