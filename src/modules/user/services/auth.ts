import http from '@/app/services/http.ts';
import { USER_API } from '@/modules/user/services';
import { useUserStore } from '@/modules/user/stores/user.ts';
import { isTokenExpired } from '@/modules/user/utils/auth.ts';
import { info } from '@tauri-apps/plugin-log';
import { openUrl } from '@tauri-apps/plugin-opener';
import { DateTime } from 'luxon';

export interface AccessTokenDTO {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
  created_at: string;
}

export class AuthService {
  private readonly accountsURI: string;
  private readonly redirectURI: string;
  private readonly clientId: string;

  constructor() {
    this.accountsURI = import.meta.env.VITE_SPOTIFY_ACCOUNT_URI;
    this.redirectURI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
    this.clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  }

  private getAuthUri(): string {
    const url = new URL(`${this.accountsURI}/authorize`);
    url.searchParams.set('client_id', this.clientId);
    url.searchParams.set('response_type', 'code');
    url.searchParams.set('redirect_uri', this.redirectURI);
    url.searchParams.set('scope', import.meta.env.VITE_SPOTIFY_SCOPES);

    return url.toString();
  }

  private async refreshToken(
    accessToken: AccessTokenDTO
  ): Promise<AccessTokenDTO | boolean> {
    const data = {
      grant_type: 'refresh_token',
      refresh_token: accessToken.refresh_token,
      client_id: this.clientId,
    };

    const response = await http.post<AccessTokenDTO>(
      `${this.accountsURI}/api/token`,
      data,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    if (response.data) {
      const newAccessToken: AccessTokenDTO = {
        ...response.data,
        created_at: DateTime.now().toISO(),
      };

      const userStore = useUserStore();
      await userStore.setAccessToken(newAccessToken);

      return newAccessToken;
    }

    return false;
  }

  public async checkAndRefreshToken(): Promise<void> {
    const accessToken: AccessTokenDTO | undefined =
      await USER_API.userStorage.getAccessToken();

    if (accessToken) {
      const tokenExpired: boolean = isTokenExpired(accessToken);

      await info(`tokenExpired: ${tokenExpired}`);

      if (tokenExpired) {
        const newAccessToken: boolean | AccessTokenDTO =
          await this.refreshToken(accessToken);

        if (!newAccessToken) {
          await USER_API.userStorage.resetAccessToken();
        }
      }
    }
  }

  public async login(): Promise<void> {
    await openUrl(this.getAuthUri());
  }

  public async init(): Promise<void> {
    const accessToken: AccessTokenDTO | undefined =
      await USER_API.userStorage.getAccessToken();

    if (accessToken) {
      const userStore = useUserStore();
      await userStore.setAccessToken(accessToken);
    }

    await this.checkAndRefreshToken();
  }
}

export default new AuthService();
