import http from '@/app/services/api.ts';
import { USER_API } from '@/modules/user/services';
import { AccessTokenDTO } from '@/modules/user/services/types/auth.ts';
import { useUserStore } from '@/modules/user/stores/user.ts';
import { isTokenExpired } from '@/modules/user/utils/auth.ts';
import { info } from '@tauri-apps/plugin-log';
import { openUrl } from '@tauri-apps/plugin-opener';
import { DateTime } from 'luxon';

const accountsURI = import.meta.env.VITE_SPOTIFY_ACCOUNT_URI;
const redirectURI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;

const getAuthUri = (): string => {
  const url = new URL(`${accountsURI}/authorize`);
  url.searchParams.set('client_id', import.meta.env.VITE_SPOTIFY_CLIENT_ID);
  url.searchParams.set('response_type', 'code');
  url.searchParams.set('redirect_uri', redirectURI);
  url.searchParams.set('scope', import.meta.env.VITE_SPOTIFY_SCOPES);

  return url.toString();
};

const refreshToken = async (
  accessToken: AccessTokenDTO
): Promise<AccessTokenDTO | boolean> => {
  const data = {
    grant_type: 'refresh_token',
    refresh_token: accessToken.refresh_token,
    client_id: clientId,
  };

  const response = await http.post(`${accountsURI}/api/token`, data, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  if (response.status !== 200) {
    return false;
  }

  if (response.data) {
    const accessToken: AccessTokenDTO = {
      access_token: response.data.access_token,
      expires_in: response.data.expires_in,
      refresh_token: response.data.refresh_token,
      scope: response.data.scope,
      token_type: response.data.token_type,
      created_at: DateTime.now().toISO(),
    };

    const userStore = useUserStore();

    await userStore.setAccessToken(accessToken);

    return accessToken;
  }

  return false;
};

const checkAndRefreshToken = async (): Promise<void> => {
  const accessToken: AccessTokenDTO | undefined =
    await USER_API.userStorage.getAccessToken();

  if (accessToken) {
    const tokenExpired: boolean = isTokenExpired(accessToken);

    await info(`tokenExpired: ${tokenExpired}`);

    if (tokenExpired) {
      const newAccessToken: boolean | AccessTokenDTO =
        await refreshToken(accessToken);

      if (!newAccessToken) {
        await USER_API.userStorage.resetAccessToken();
      }
    }
  }
};

const login = async (): Promise<void> => {
  await openUrl(getAuthUri());
};

export default {
  login,
  checkAndRefreshToken,
};
