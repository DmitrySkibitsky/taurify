<script setup lang="ts">
  import { useSettingsStore } from '@/modules/settings/stores/settings';
  import { storeToRefs } from 'pinia';

  const settingsStore = useSettingsStore();
  const { sidebarIsOpened } = storeToRefs(settingsStore);
</script>

<template>
  <VNavigationDrawer v-model="sidebarIsOpened">
    <VList nav>
      <VListItem
        title="Navigation drawer"
        link
      ></VListItem>
    </VList>
  </VNavigationDrawer>
</template>
