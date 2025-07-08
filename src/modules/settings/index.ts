import { routes } from '@/modules/settings/routes.ts';
import { SETTINGS_MODULE } from '@/modules/settings/services';
import { useSettingsStore } from '@/modules/settings/stores/settings.ts';

export default {
  routes: routes,
  stores: [useSettingsStore],
  async init(): Promise<string> {
    return new Promise((resolve): void => {
      SETTINGS_MODULE.zoom.init();

      const message: string = '[settings] Module initialized';

      resolve(message);
    });
  },
};
