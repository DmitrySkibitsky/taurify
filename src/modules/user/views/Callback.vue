<script setup lang="ts">
  import { onMounted } from 'vue';
  import { useAuthStore } from '@/modules/user/stores/auth.ts';

  const authStore = useAuthStore();

  onMounted(async () => {
    const code = new URLSearchParams(window.location.search).get('code');

    if (!code) {
      return;
    }

    await authStore.fetchAccessToken({
      code,
    });
  });
</script>

<template></template>

