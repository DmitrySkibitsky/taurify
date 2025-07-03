import { USER_API } from '@/modules/user/services';
import { AccessTokenDTO } from '@/modules/user/services/auth.ts';
import { IUserProfile } from '@/modules/user/services/userProfile.ts';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('userStore', {
  state: () => ({
    isLoggedIn: false as boolean,
    accessToken: null as AccessTokenDTO | null,
    userProfile: null as IUserProfile | null,
  }),
  actions: {
    updateAuthStatus(status: boolean): void {
      this.isLoggedIn = status;
    },
    async setAccessToken(data: AccessTokenDTO): Promise<void> {
      this.accessToken = data;
      this.updateAuthStatus(true);

      await USER_API.userStorage.saveAccessToken(data);
    },
    setUserProfile(data: IUserProfile): void {
      this.userProfile = data;
    },
  },
});
