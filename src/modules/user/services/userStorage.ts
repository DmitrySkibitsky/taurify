import { AppStorage, createStorage, File } from '@/app/services/storage';
import { AccessTokenDTO } from '@/modules/user/services/types/auth.ts';
import { useUserStore } from '@/modules/user/stores/user.ts';

let storage: AppStorage | null = null;

const getStorage = async (): Promise<AppStorage> => {
  if (storage === null) {
    storage = await createStorage(File.User);
  }

  return storage;
};

const saveAccessToken = async (
  data: AccessTokenDTO
): Promise<AccessTokenDTO | undefined> => {
  const storage = await getStorage();

  await storage.set('accessToken', data);
  await storage.save();

  return await storage.get<AccessTokenDTO | undefined>('accessToken');
};

const getAccessToken = async (): Promise<AccessTokenDTO | undefined> => {
  storage = await getStorage();

  const value = await storage.get('accessToken');

  return value as AccessTokenDTO | undefined;
};

const resetAccessToken = async (): Promise<void> => {
  storage = await getStorage();
  await storage.set('accessToken', null);
  await storage.save();

  const userStore = useUserStore();
  userStore.updateAuthStatus(false);
};

export default {
  saveAccessToken,
  getAccessToken,
  resetAccessToken,
};
