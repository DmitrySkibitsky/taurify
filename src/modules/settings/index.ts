import { settingsRoutes } from '@/modules/settings/routes.ts';
import { useSettingsStore } from '@/modules/settings/stores/settings.ts';

export default {
  routes: settingsRoutes,
  stores: [useSettingsStore],
  async init(): Promise<string> {
    return new Promise((resolve): void => {
      const message: string = '[settings] Module initialized';

      resolve(message);
    });
  },
};
