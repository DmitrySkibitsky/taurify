export type FetchAccessTokenRequest = {
  code: string;
};

export type AccessTokenDTO = {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
};
