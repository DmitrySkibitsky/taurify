<script setup lang="ts">
  import { useSettingsStore } from '@/modules/settings/stores/settings';
  import { storeToRefs } from 'pinia';

  const settingsStore = useSettingsStore();
  const { sidebarIsOpened } = storeToRefs(settingsStore);
</script>

<template>
  <VAppBar>
    <VAppBarNavIcon @click="sidebarIsOpened = !sidebarIsOpened" />
    <VAppBarTitle>Application</VAppBarTitle>
  </VAppBar>
</template>
