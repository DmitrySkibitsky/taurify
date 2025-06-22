<script setup lang="ts">
  import { onMounted, onUnmounted } from 'vue';
  import { APP_API } from '@/app/services';
  import { USER_API } from '@/modules/user/services';
  import { Button } from '@/components/ui/button';
  import { LogIn } from 'lucide-vue-next';
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

  <Button
    class="mt-10"
    @click="signIn"
  >

    <LogIn class="mr-2 h-4 w-4" />
     Sign in
  </Button>

  <router-view />

</template>

<style scoped></style>

