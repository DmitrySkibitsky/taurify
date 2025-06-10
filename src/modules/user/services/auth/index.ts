import http from '@/app/services/api.ts';
import { APIResponse } from '@/app/services/types.ts';
import { FetchAccessTokenRequest, FetchAccessTokenResponse } from './types';

const accountsURI = import.meta.env.VITE_SPOTIFY_ACCOUNT_URI;
const redirectURI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;

const login = (): void => {
  const url = new URL(`${accountsURI}/authorize`);
  url.searchParams.set('client_id', import.meta.env.VITE_SPOTIFY_CLIENT_ID);
  url.searchParams.set('response_type', 'code');
  url.searchParams.set('redirect_uri', redirectURI);
  url.searchParams.set('scope', import.meta.env.VITE_SPOTIFY_SCOPES);

  window.location.href = url.toString();
};

const fetchAccessToken = async (
  request: FetchAccessTokenRequest
): Promise<APIResponse<FetchAccessTokenResponse>> => {
  const data = {
    code: request.code,
    redirect_uri: redirectURI,
    grant_type: 'authorization_code',
  };

  return await http.post(`${accountsURI}/api/token`, data, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
};

// @todo It is necessary to add cached token and refresh token

export default {
  login,
  fetchAccessToken,
};
