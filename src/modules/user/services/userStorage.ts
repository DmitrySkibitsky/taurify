import { AppStorage, createStorage, File } from '@/app/services/storage';
import { AccessTokenDTO } from '@/modules/user/services/auth.ts';
import { useUserStore } from '@/modules/user/stores/user.ts';

export class UserStorageService {
  private storage: AppStorage | null = null;

  private async getStorage(): Promise<AppStorage> {
    if (this.storage === null) {
      this.storage = await createStorage(File.User);
    }

    return this.storage;
  }

  public async saveAccessToken(
    data: AccessTokenDTO
  ): Promise<AccessTokenDTO | undefined> {
    const storage = await this.getStorage();

    await storage.set('accessToken', data);
    await storage.save();

    return await storage.get<AccessTokenDTO | undefined>('accessToken');
  }

  public async getAccessToken(): Promise<AccessTokenDTO | undefined> {
    const storage = await this.getStorage();

    const value = await storage.get('accessToken');

    return value as AccessTokenDTO | undefined;
  }

  public async resetAccessToken(): Promise<void> {
    const storage = await this.getStorage();

    await storage.set('accessToken', null);
    await storage.save();

    const userStore = useUserStore();
    userStore.updateAuthStatus(false);
  }
}

export default new UserStorageService();
