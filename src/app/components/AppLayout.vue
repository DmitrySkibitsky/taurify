<script setup lang="ts">
  import AppBar from '@/app/components/AppBar.vue';
  import AppSidebar from '@/app/components/AppSidebar.vue';
  import { APP_API } from '@/app/services';
  import { SETTINGS_MODULE } from '@/modules/settings/services';
  import { onMounted, onUnmounted } from 'vue';
  import { useTheme } from 'vuetify/framework';

  onMounted(async () => {
    const themeInstance = useTheme();

    await SETTINGS_MODULE.theme.init(themeInstance);

    try {
      await APP_API.app.init();
    } catch (e) {}
  });

  onUnmounted(() => {
    APP_API.deepLinkListener.unlisten();
  });
</script>

<template>
  <VLayout class="rounded rounded-md border">
    <AppSidebar />

    <AppBar />

    <VMain>
      <div class="pa-4">
        <RouterView />
      </div>
    </VMain>
  </VLayout>
</template>
