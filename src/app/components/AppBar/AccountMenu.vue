<script setup lang="ts">
  import { MenuItem } from '@/app/types/menu.ts';
  import UserAvatar from '@/modules/user/components/user_profile/UserAvatar.vue';
  import { ref } from 'vue';

  const links = ref<MenuItem[]>([
    {
      title: 'Profile',
      icon: 'mdi-account',
      to: {
        name: 'user.profile',
      },
    },
    {
      title: 'Settings',
      icon: 'mdi-cog',
      to: {
        name: 'settings.app_settings',
      },
    },
  ]);
</script>

<template>
  <VDivider vertical />
  <VBtn
    class="text-none me-2 ms-2"
    height="48"
    icon
    slim
  >
    <UserAvatar />

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
