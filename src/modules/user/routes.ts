import type { RouteRecordRaw } from 'vue-router';

export const routes: RouteRecordRaw[] = [
  {
    path: '/user',
    component: () => import('@/app/components/AppLayout.vue'),
    children: [
      {
        path: 'profile',
        component: () => import('@/modules/user/views/UserProfile.vue'),
        name: 'user.profile',
        meta: { requiresAuth: true },
      },
      {
        path: 'top/artists',
        component: () => import('@/modules/user/views/UserTopArtists.vue'),
        name: 'user.top_artists',
        meta: { requiresAuth: true },
      },
    ],
  },
];
