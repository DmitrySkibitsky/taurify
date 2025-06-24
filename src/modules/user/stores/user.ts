import { USER_API } from '@/modules/user/services';
import { AccessTokenDTO } from '@/modules/user/services/types/auth.ts';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('userStore', {
  state: () => ({
    isLoggedIn: false as boolean,
    accessToken: null as AccessTokenDTO | null,
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
  },
});
