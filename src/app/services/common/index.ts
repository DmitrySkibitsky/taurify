import { info } from '@tauri-apps/plugin-log';

const init = async (): Promise<void> => {
  await info('app init');
};

export default {
  init,
};
