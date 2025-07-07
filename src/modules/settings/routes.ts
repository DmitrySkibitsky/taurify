import type { RouteRecordRaw } from 'vue-router';

export const routes: RouteRecordRaw[] = [
  {
    path: '/settings',
    component: () => import('@/app/components/AppLayout.vue'),
    children: [
      {
        path: '/',
        component: () => import('@/modules/settings/views/AppSettings.vue'),
        name: 'settings.app_settings',
      },
    ],
  },
];
