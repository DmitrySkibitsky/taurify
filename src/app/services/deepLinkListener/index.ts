import { useUserStore } from '@/modules/user/stores/user.ts';
import {
  getCurrent as getCurrentDeepLinkUrls,
  onOpenUrl,
} from '@tauri-apps/plugin-deep-link';
import { getCurrentWebview } from '@tauri-apps/api/webview';
import { UnlistenFn } from '@tauri-apps/api/event';
import { DateTime } from 'luxon';
import { error, info } from '@tauri-apps/plugin-log';
import { USER_API } from '@/modules/user/services';

let unlistenFn: null | UnlistenFn;

const unlisten = (): void => {
  if (unlistenFn) {
    unlistenFn();
  }
};

const handleUrl = async (url: string): Promise<void> => {
  try {
    await getCurrentWebview().setFocus();
    const urlObject = new URL(url);
    const data = urlObject.searchParams;

    const accessToken = data.get('access_token');

    if (!accessToken) {
      await error('Access token not set');

      return;
    }
    const userStore = useUserStore();

    await userStore.setAccessToken({
      access_token: accessToken ?? '',
      expires_in: Number(data.get('expires_in') ?? ''),
      refresh_token: data.get('refresh_token') ?? '',
      scope: data.get('scope') ?? '',
      token_type: data.get('token_type') ?? '',
      created_at: DateTime.now().toISO(),
    });

    await info('accessToken is set');

    await USER_API.auth.checkAndRefreshToken();
  } catch (err) {
    await error(`Failed to parse URL: ${url}`);
  }
};

const init = async (): Promise<void> => {
  try {
    const urls: string[] | null = await getCurrentDeepLinkUrls();

    if (urls && urls.length > 0) {
      await handleUrl(urls[0]);
    }
  } catch (err) {
    await error(`Failed to get initial URLs`);
  }

  try {
    unlistenFn = await onOpenUrl((urls) => {
      if (urls.length > 0) {
        handleUrl(urls[0]);
      }
    });
  } catch (err) {
    await error('Failed to register deep link listener');
  }
};

export default {
  init,
  unlisten,
};
