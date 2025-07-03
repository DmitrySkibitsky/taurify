import { APP_API } from '@/app/services/index.ts';
import { USER_API } from '@/modules/user/services';
import { info } from '@tauri-apps/plugin-log';

const init = async (): Promise<void> => {
  await USER_API.auth.init();
  await USER_API.userProfile.init();

  await info('app init');

  await APP_API.deepLinkListener.init();
};

export default {
  init,
};
