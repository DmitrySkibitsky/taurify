import { defineStore } from 'pinia';
import { AccessTokenDTO } from '@/modules/user/services/auth/types.ts';

export const useUserStore = defineStore('userStore', {
  state: () => ({
    accessToken: null as AccessTokenDTO | null,
  }),

  actions: {
    setAccessToken(data: AccessTokenDTO): void {
      this.accessToken = data;
    },
  },
});
