<script setup lang="ts">
  import { useAppStore } from '@/store/app';

  const appStore = useAppStore();
</script>

<template>

  <v-card
    :text="appStore.count"
    @click="appStore.count++"
  ></v-card>

</template>

<style scoped>

</style>

