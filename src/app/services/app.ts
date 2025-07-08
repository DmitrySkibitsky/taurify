import { APP_API } from '@/app/services/index.ts';
import { USER_MODULE } from '@/modules/user/services';
import { info } from '@tauri-apps/plugin-log';

const init = async (enableDeepLink: boolean = true): Promise<void> => {
  await USER_MODULE.auth.init();
  await USER_MODULE.userProfile.init();

  await info('app init');

  if (enableDeepLink) {
    await APP_API.deepLinkListener.init();
  }
};

export default {
  init,
};
