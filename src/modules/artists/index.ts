import { routes } from '@/modules/artists/routes.ts';

export default {
  routes: routes,
  stores: [],
  async init(): Promise<string> {
    return new Promise((resolve): void => {
      const message: string = '[artists] Module initialized';

      resolve(message);
    });
  },
};
