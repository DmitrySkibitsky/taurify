import { userRoutes } from '@/modules/user/routes.ts';
import { useAuthStore } from '@/modules/user/stores/auth.ts';

export default {
  routes: userRoutes,
  stores: [useAuthStore],
  async init(): Promise<any> {
    return new Promise((resolve): void => {
      const message: string = '[user] Module initialized';

      resolve(message);
    });
  },
};
