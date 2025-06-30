<script setup lang="ts">
  import AppBar from '@/app/components/AppBar.vue';
  import AppSidebar from '@/app/components/AppSidebar.vue';
  import { APP_API } from '@/app/services';
  import { SETTINGS_API } from '@/modules/settings/services';
  import { USER_API } from '@/modules/user/services';
  import { getCurrentWebview } from '@tauri-apps/api/webview';
  import { onMounted, onUnmounted } from 'vue';
  import { useTheme } from 'vuetify';

  const signIn = (): void => {
    USER_API.auth.login();
  };

  onMounted(async () => {
    try {
      await APP_API.app.init();
    } catch (e) {}
    await APP_API.deepLinkListener.init();
  });

  onUnmounted(() => {
    APP_API.deepLinkListener.unlisten();
  });

  const theme = useTheme();
  const toggleTheme = () => {
    SETTINGS_API.app.toggleTheme(theme);
  };

  const setZoom = async () => {
    await getCurrentWebview().setZoom(1);
  };
</script>

<template>
  <VLayout class="rounded rounded-md border">
    <AppSidebar />

    <AppBar />

    <VMain
      class="d-flex align-center justify-center"
      height="300"
    >
      <VContainer>
        <VBtn @click="toggleTheme">Theme</VBtn>

        <VBtn @click="setZoom">setZoom</VBtn>

        <VBtn
          color="primary"
          @click="signIn"
        >
          Sign In
        </VBtn>

        <VSheet
          border="dashed md"
          color="surface-light"
          height="200"
          rounded="lg"
          width="100%"
        ></VSheet>

        <RouterView />
      </VContainer>
    </VMain>
  </VLayout>
</template>
