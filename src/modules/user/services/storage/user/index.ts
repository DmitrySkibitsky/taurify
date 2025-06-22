import { load, Store } from '@tauri-apps/plugin-store';
import { AccessTokenDTO } from '@/modules/user/services/auth/types.ts';
import { useUserStore } from '@/modules/user/stores/user.ts';

enum File {
  User = 'user.json',
}

const getStore = async (): Promise<Store> => {
  return await load(File.User, {
    autoSave: false,
  });
};

const saveAccessToken = async (
  data: AccessTokenDTO
): Promise<AccessTokenDTO | undefined> => {
  const store: Store = await getStore();

  await store.set('accessToken', data);
  await store.save();

  return await store.get<AccessTokenDTO | undefined>('accessToken');
};

const getAccessToken = async (): Promise<AccessTokenDTO | undefined> => {
  const store: Store = await getStore();

  return await store.get<AccessTokenDTO | undefined>('accessToken');
};

const resetAccessToken = async (): Promise<void> => {
  const store: Store = await getStore();
  const userStore = useUserStore();

  await store.set('accessToken', null);
  userStore.updateAuthStatus(false);
};

export default {
  saveAccessToken,
  getAccessToken,
  resetAccessToken,
};
