import { AppStorage, createStorage, File } from '@/app/services/storage.ts';
import { USER_API } from '@/modules/user/services';
import { useUserStore } from '@/modules/user/stores/user.ts';
import { UnlistenFn } from '@tauri-apps/api/event';
import { getCurrentWebview } from '@tauri-apps/api/webview';
import {
  getCurrent as getCurrentDeepLinkUrls,
  onOpenUrl,
} from '@tauri-apps/plugin-deep-link';
import { error, info } from '@tauri-apps/plugin-log';
import { DateTime } from 'luxon';

export class DeepLinkListenerService {
  private storage: AppStorage | null = null;
  private unlistenFn: UnlistenFn | null = null;

  private async getStorage(): Promise<AppStorage> {
    if (this.storage === null) {
      this.storage = await createStorage(File.deepLinks);
    }

    return this.storage;
  }

  private async handleUrl(url: string): Promise<void> {
    try {
      const storage = await this.getStorage();
      const linksInStorage = await storage.get<string[] | undefined>('links');
      if (linksInStorage?.includes(url)) {
        return;
      }

      await storage.set('links', [...(linksInStorage ?? []), url]);

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
      // oxlint-disable-next-line no-unused-vars
    } catch (err) {
      await error(`Failed to parse URL: ${url}`);
    }
  }

  public async init(): Promise<void> {
    try {
      const urls: string[] | null = await getCurrentDeepLinkUrls();

      if (urls && urls.length > 0) {
        const url = urls[0];

        await this.handleUrl(url);
      }
      // oxlint-disable-next-line no-unused-vars
    } catch (err) {
      await error(`Failed to get initial URLs`);
    }

    try {
      this.unlistenFn = await onOpenUrl((urls) => {
        if (urls.length > 0) {
          const url = urls[0];

          this.handleUrl(url);
        }
      });
      // oxlint-disable-next-line no-unused-vars
    } catch (err) {
      await error('Failed to register deep link listener');
    }
  }

  public unlisten(): void {
    if (this.unlistenFn) {
      this.unlistenFn();
      this.unlistenFn = null;
    }
  }
}

export default new DeepLinkListenerService();
