<script setup lang="ts">
  import { MenuItem } from '@/app/types/menu.ts';
  import { useSettingsStore } from '@/modules/settings/stores/settings';
  import { USER_API } from '@/modules/user/services';
  import { storeToRefs } from 'pinia';
  import { ref } from 'vue';

  const settingsStore = useSettingsStore();
  const { sidebarIsOpened } = storeToRefs(settingsStore);

  const handleLinkClick = (link: MenuItem): void => {
    if (!link.onClick) {
      return;
    }

    link.onClick();
  };

  const appendLinks: MenuItem[] = [
    {
      title: 'Sign In',
      icon: 'mdi-login',
      onClick: () => {
        USER_API.auth.login();
      },
    },
    {
      title: 'Settings',
      icon: 'mdi-cog',
      to: {
        name: 'settings.app_settings',
      },
    },
  ];

  const links = ref<MenuItem[]>([
    {
      title: 'Index',
      icon: 'mdi-view-dashboard-outline',
      to: {
        name: 'index',
      },
    },
  ]);
</script>

<template>
  <VNavigationDrawer v-model="sidebarIsOpened">
    <VList nav>
      <VListItem
        v-for="(link, index) in links"
        :key="index"
        class="ma-2"
        link
        nav
        :to="link.to"
        :prepend-icon="link.icon"
        :title="link.title"
      />
    </VList>

    <template #append>
      <VListItem
        v-for="(link, index) in appendLinks"
        :key="index"
        class="ma-2"
        :to="link.to"
        :prepend-icon="link.icon"
        :title="link.title"
        link
        nav
        @click="handleLinkClick(link)"
      />
    </template>
  </VNavigationDrawer>
</template>
