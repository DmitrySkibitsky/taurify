import { settingsRoutes } from '@/modules/settings/routes.ts';
import { SETTINGS_API } from '@/modules/settings/services';
import { useSettingsStore } from '@/modules/settings/stores/settings.ts';

export default {
  routes: settingsRoutes,
  stores: [useSettingsStore],
  async init(): Promise<string> {
    return new Promise((resolve): void => {
      SETTINGS_API.zoom.init();

      const message: string = '[settings] Module initialized';

      resolve(message);
    });
  },
};
