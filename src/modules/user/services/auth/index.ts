import { WebviewWindow } from '@tauri-apps/api/webviewWindow';
import { getCurrentWindow } from '@tauri-apps/api/window';
import { getCurrentWebview } from '@tauri-apps/api/webview';

const accountsURI = import.meta.env.VITE_SPOTIFY_ACCOUNT_URI;
const redirectURI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;

const getAuthUri = (): string => {
  const url = new URL(`${accountsURI}/authorize`);
  url.searchParams.set('client_id', import.meta.env.VITE_SPOTIFY_CLIENT_ID);
  url.searchParams.set('response_type', 'code');
  url.searchParams.set('redirect_uri', redirectURI);
  url.searchParams.set('scope', import.meta.env.VITE_SPOTIFY_SCOPES);

  return url.toString();
};

const login = async (): Promise<void> => {
  const authWindow = new WebviewWindow('spotify-auth', {
    url: getAuthUri(),
    width: 500,
    height: 700,
    resizable: false,
    title: 'Spotify Authorization',
  });

  authWindow.once('tauri://url', (event) => {
    console.log('Auth window navigated to allowed URL:', event.payload);
    const url = new URL(event.payload as string);
    console.log(url.toString());
    const accessToken = url.searchParams.get('access_token');
    const refreshToken = url.searchParams.get('refresh_token');

    if (accessToken && refreshToken) {
      console.log('Received tokens:', accessToken, refreshToken);
      authWindow.close();
    }
  });

  authWindow.once('tauri://created', async function () {
    console.log('Spotify Authorization');
    await getCurrentWindow().center();
    await getCurrentWebview().listen('auth_complete', ({ event, payload }) => {
      console.log(event);
      console.log(payload);
    });
  });
  authWindow.once('tauri://error', function (e) {
    console.error(e);
  });
};

export default {
  login,
};
