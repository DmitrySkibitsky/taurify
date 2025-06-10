import { defineStore } from 'pinia';
import {
  FetchAccessTokenRequest,
  FetchAccessTokenResponse,
} from '@/modules/user/services/auth/types.ts';
import { AxiosError } from 'axios';
import { USER_API } from '@/modules/user/services';

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    accessToken: null as FetchAccessTokenResponse | null,
  }),

  actions: {
    setAccessToken(data: FetchAccessTokenResponse): void {
      this.accessToken = data;
    },
    async fetchAccessToken(request: FetchAccessTokenRequest) {
      try {
        const { data, status } = await USER_API.auth.fetchAccessToken({
          code: request.code,
        });

        if (status === 200) {
          this.setAccessToken(data);

          return {
            status,
          };
        }
      } catch (error) {
        const _error = error as AxiosError<string>;

        return {
          status: _error.response?.status,
        };
      }
    },
  },
});
