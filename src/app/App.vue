<script setup lang="ts">
  import { useTheme } from 'vuetify';
  import { onMounted, onUnmounted, ref } from 'vue';
  import { APP_API } from '@/app/services';
  import { USER_API } from '@/modules/user/services';
  const signIn = (): void => {
    USER_API.auth.login();
  };

  onMounted(async () => {
    await APP_API.common.init();
    await APP_API.deepLinkListener.init();
  });

  onUnmounted(() => {
    APP_API.deepLinkListener.unlisten();
  });

  const drawer = ref(false);
  const theme = useTheme();

  const toggleTheme = (): void => {
    theme.global.name.value = theme.global.current.value.dark
      ? 'light'
      : 'dark';
  };

  import { getCurrentWebview } from '@tauri-apps/api/webview';

  const setZoom = async () => {
    await getCurrentWebview().setZoom(1);
  };
</script>

<template>

  <v-layout class="rounded rounded-md border">

    <v-navigation-drawer v-model="drawer">

      <v-list nav>

        <v-list-item
          title="Navigation drawer"
          link
        ></v-list-item>

      </v-list>

    </v-navigation-drawer>

    <v-app-bar>

      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-app-bar-title>Application</v-app-bar-title>

    </v-app-bar>

    <v-main
      class="d-flex align-center justify-center"
      height="300"
    >

      <v-container>

        <v-btn @click="toggleTheme"> Theme </v-btn>

        <v-btn @click="setZoom"> setZoom </v-btn>

        <v-btn
          color="primary"
          @click="signIn"
        >
           Sign In
        </v-btn>

        <v-sheet
          border="dashed md"
          color="surface-light"
          height="200"
          rounded="lg"
          width="100%"
        ></v-sheet>

      </v-container>

    </v-main>

  </v-layout>

  <router-view />

</template>

<style scoped></style>

