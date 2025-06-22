<script setup lang="ts">
  import { onMounted, onUnmounted } from 'vue';
  import { useUserStore } from '@/modules/user/stores/user.ts';
  import {
    getCurrent as getCurrentDeepLinkUrls,
    onOpenUrl,
  } from '@tauri-apps/plugin-deep-link';
  import { getCurrentWebview } from '@tauri-apps/api/webview';
  import { USER_API } from '@/modules/user/services';
  const userStore = useUserStore();

  const handleUrl = async (url: string): Promise<void> => {
    try {
      console.log(url);

      await getCurrentWebview().setFocus();
      const urlObject = new URL(url);
      const queryString = urlObject.search.split('?')[1] ?? '';
      console.log(queryString);
      const data = new URLSearchParams(queryString);

      const accessToken = data.get('access_token');

      data.forEach(function (item, key) {
        console.log(item, key);
      });

      if (!accessToken) {
        console.error('Access token not set');

        return;
      }

      console.log({
        access_token: accessToken ?? '',
        expires_in: Number(data.get('expires_in') ?? ''),
        refresh_token: data.get('refresh_token') ?? '',
        scope: data.get('scope') ?? '',
        token_type: data.get('token_type') ?? '',
      });

      userStore.setAccessToken({
        access_token: accessToken ?? '',
        expires_in: Number(data.get('expires_in') ?? ''),
        refresh_token: data.get('refresh_token') ?? '',
        scope: data.get('scope') ?? '',
        token_type: data.get('token_type') ?? '',
      });
    } catch (err) {
      console.error('Failed to parse URL:', err);
    }
  };

  let unlisten: (() => void) | null = null;

  onMounted(async () => {
    await USER_API.auth.login();

    try {
      const urls = await getCurrentDeepLinkUrls();

      if (urls && urls.length > 0) {
        await handleUrl(urls[0]);
      }
    } catch (err) {
      console.error('Failed to get initial URLs:', err);
    }

    try {
      unlisten = await onOpenUrl((urls) => {
        if (urls.length > 0) {
          handleUrl(urls[0]);
        }
      });
    } catch (err) {
      console.error('Failed to register deep link listener:', err);
    }
  });

  onUnmounted(() => {
    if (unlisten) {
      unlisten();
    }
  });
</script>

<template> callback </template>

