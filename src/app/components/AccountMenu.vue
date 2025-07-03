<script setup lang="ts">
  import { MenuItem } from '@/app/types/menu.ts';
  import { useUserStore } from '@/modules/user/stores/user.ts';
  import { ref } from 'vue';

  const links = ref<MenuItem[]>([
    {
      title: 'Settings',
      icon: 'mdi-cog',
      to: {
        name: 'settings.app_settings',
      },
    },
  ]);

  const userStore = useUserStore();
</script>

<template>
  <VBtn
    class="text-none me-2"
    height="48"
    icon
    slim
  >
    <VAvatar
      color="surface-light"
      :image="userStore.userProfile?.images[0]?.url"
      size="32"
    />

    <VMenu activator="parent">
      <VList>
        <VListItem
          v-for="(link, index) in links"
          :key="index"
          :value="index"
          :prepend-icon="link.icon"
          :to="link.to"
        >
          <VListItemTitle>{{ link.title }}</VListItemTitle>
        </VListItem>
      </VList>
    </VMenu>
  </VBtn>
</template>

<style scoped></style>
