import { routes } from '@/modules/tracks/routes.ts';

export default {
  routes: routes,
  stores: [],
  async init(): Promise<string> {
    return new Promise((resolve): void => {
      const message: string = '[tracks] Module initialized';

      resolve(message);
    });
  },
};
