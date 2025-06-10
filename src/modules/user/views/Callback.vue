<script setup lang="ts">
  import { onMounted } from 'vue';
  import { useUserStore } from '@/modules/user/stores/user.ts';

  const userStore = useUserStore();

  onMounted(async () => {
    const code = new URLSearchParams(window.location.search).get('code');

    if (!code) {
      return;
    }

    await userStore.fetchAccessToken({
      code,
    });
  });
</script>

<template></template>

