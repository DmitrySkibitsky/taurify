<script setup lang="ts">
  import { ref } from 'vue';

  interface Route {
    name: string;
  }

  interface MenuItem {
    title: string;
    icon: string;
    to: Route;
  }

  const items = ref<MenuItem[]>([
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
  <VMenu>
    <template v-slot:activator="{ props }">
      <VBtn
        icon="mdi-account"
        v-bind="props"
      />
    </template>
    <VList>
      <VListItem
        v-for="(item, index) in items"
        :key="index"
        :value="index"
        :prepend-icon="item.icon"
        :to="item.to"
      >
        <VListItemTitle>{{ item.title }}</VListItemTitle>
      </VListItem>
    </VList>
  </VMenu>
</template>

<style scoped></style>
