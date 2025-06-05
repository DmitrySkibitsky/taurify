<script setup lang="ts">
  import { useAppStore } from '@/store/app';
  import { useRouter } from 'vue-router';

  const appStore = useAppStore();
  const router = useRouter();
</script>

<template>

  <v-card
    :text="appStore.count"
    @click="appStore.count++"
  ></v-card>

  <div style="margin-top: 20px"></div>

  <v-btn
    style="margin-right: 20px"
    @click="router.push({ name: 'user.information' })"
  >
     Modules / Users / Information
  </v-btn>

  <v-btn @click="router.push({ name: 'settings.index' })">
     Modules / Settings / Index
  </v-btn>

  <br />

  <div style="margin-top: 20px"></div>

  <router-view />

</template>

<style scoped>

</style>

