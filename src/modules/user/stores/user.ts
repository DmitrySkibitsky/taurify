import { USER_MODULE } from '@/modules/user/services';
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

      if (!this.isLoggedIn) {
        this.userProfile = null;
        this.accessToken = null;
      }
    },
    async waitForLogin(timeoutMs: number = 5000): Promise<boolean> {
      if (this.isLoggedIn) {
        return true;
      }

      return new Promise((resolve) => {
        const timeout = setTimeout(() => {
          unwatch();
          resolve(false);
        }, timeoutMs);

        const unwatch = this.$subscribe(() => {
          if (this.isLoggedIn) {
            clearTimeout(timeout);
            unwatch();
            resolve(true);
          }
        });
      });
    },
    async setAccessToken(data: AccessTokenDTO): Promise<void> {
      this.accessToken = data;
      this.updateAuthStatus(true);

      await USER_MODULE.userStorage.saveAccessToken(data);
    },
    setUserProfile(data: IUserProfile): void {
      this.userProfile = data;
    },
  },
});
