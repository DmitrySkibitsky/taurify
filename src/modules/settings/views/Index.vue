<script setup lang="ts">
  import { useSettingsStore } from '@/modules/settings/stores/settings.ts';

  const settingsStore = useSettingsStore();

  const clickHandler = (): void => {
    settingsStore.enabled = !settingsStore.enabled;
  };
</script>

<template>

  <v-btn @click="clickHandler"> {{ settingsStore.enabled }} </v-btn>

</template>

