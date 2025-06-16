<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import { onMounted, onUnmounted } from 'vue';
  import {
    getCurrent as getCurrentDeepLinkUrls,
    onOpenUrl,
  } from '@tauri-apps/plugin-deep-link';
  import { USER_API } from '@/modules/user/services';

  const router = useRouter();

  const loginWithSpotify = (): void => {
    USER_API.auth.login();
  };

  const handleUrl = (url: string): void => {
    try {
      const urlObject = new URL(url);
      console.error('urlObject:', urlObject);
      alert(urlObject.toString());
    } catch (err) {
      console.error('Failed to parse URL:', err);
    }
  };

  let unlisten: (() => void) | null = null;

  onMounted(async () => {
    try {
      const urls = await getCurrentDeepLinkUrls();
      console.log(urls);
      if (urls && urls.length > 0) {
        handleUrl(urls[0]);
      }
    } catch (err) {
      console.error('Failed to get initial URLs:', err);
    }

    try {
      unlisten = await onOpenUrl((urls) => {
        console.log(urls);
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

<template>

  <v-btn @click="loginWithSpotify"> Sign in </v-btn>

  <div style="margin-top: 20px"></div>

  <v-btn
    style="margin-right: 20px"
    @click="router.push({ name: 'user.information' })"
  >
     Modules / Users / Information
  </v-btn>

  <v-btn @click="router.push({ name: 'settings.index' })">
     Modules / Settings / Index
  </v-btn>

  <br />

  <div style="margin-top: 20px"></div>

  <router-view />

</template>

<style scoped>

</style>

