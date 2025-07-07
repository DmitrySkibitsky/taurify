import { routes } from '@/modules/user/routes.ts';
import { useUserStore } from '@/modules/user/stores/user.ts';

export default {
  routes: routes,
  stores: [useUserStore],
  async init(): Promise<string> {
    return new Promise((resolve): void => {
      const message: string = '[user] Module initialized';

      resolve(message);
    });
  },
};
