<script setup lang="ts">
  import { useUserStore } from '@/modules/user/stores/user.ts';

  const userStore = useUserStore();

  interface Props {
    size?: number;
  }

  const { size = 32 } = defineProps<Props>();
</script>

<template>
  <VAvatar
    color="surface-light"
    :image="userStore.userProfile?.images[0]?.url"
    :size="size"
  />
</template>

<style scoped></style>
