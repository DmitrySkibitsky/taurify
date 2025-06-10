export type FetchAccessTokenRequest = {
  code: string;
};

export type FetchAccessTokenResponse = {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
};
