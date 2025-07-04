<script setup lang="ts">
  import AccountMenu from '@/app/components/AppBar/AccountMenu.vue';
  import ToggleTheme from '@/app/components/AppBar/ToggleTheme.vue';
  import { useSettingsStore } from '@/modules/settings/stores/settings';

  const settingsStore = useSettingsStore();
</script>

<template>
  <VAppBar
    border="b"
    class="ps-4"
    flat
  >
    <VAppBarNavIcon
      @click="settingsStore.sidebarIsOpened = !settingsStore.sidebarIsOpened"
    />
    <VAppBarTitle>Application</VAppBarTitle>
    <VSpacer />
    <ToggleTheme />
    <AccountMenu />
  </VAppBar>
</template>
