import { userRoutes } from '@/modules/user/routes.ts';
import { useUserStore } from '@/modules/user/store/user.ts';

export default {
  routes: userRoutes,
  stores: [useUserStore],
  async init(): Promise<any> {
    return new Promise((resolve): void => {
      const message: string = '[user] Module initialized';

      resolve(message);
    });
  },
};
