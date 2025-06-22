<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import { onMounted, onUnmounted } from 'vue';
  import { APP_API } from '@/app/services';
  import { USER_API } from '@/modules/user/services';

  const router = useRouter();

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
</script>

<template>

  <v-btn @click="signIn"> Sign in </v-btn>

  <div style="margin-top: 20px"></div>

  <v-btn
    style="margin-right: 20px"
    @click="router.push({ name: 'user.information' })"
  >
     Modules / Users / Information
  </v-btn>

  <v-btn
    style="margin-right: 20px"
    @click="router.push({ name: 'user.auth' })"
  >
     Auth
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

