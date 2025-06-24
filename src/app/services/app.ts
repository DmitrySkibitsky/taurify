import { USER_API } from '@/modules/user/services';
import { info } from '@tauri-apps/plugin-log';

const init = async (): Promise<void> => {
  await USER_API.auth.checkAndRefreshToken();

  await info('app init');
};

export default {
  init,
};
