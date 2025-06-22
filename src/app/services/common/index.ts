import { info } from '@tauri-apps/plugin-log';
import { USER_API } from '@/modules/user/services';

const init = async (): Promise<void> => {
  await USER_API.auth.checkAndRefreshToken();

  await info('app init');
};

export default {
  init,
};
