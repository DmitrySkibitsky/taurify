<script setup lang="ts">
  import { useRouter } from 'vue-router';

  const router = useRouter();
</script>

<template>

  <v-btn @click="router.push({ name: 'user.login' })"> Sign in </v-btn>

  <div style="margin-top: 20px"></div>

  <v-btn
    style="margin-right: 20px"
    @click="router.push({ name: 'user.information' })"
  >
     Modules / Users / Information
  </v-btn>

  <v-btn
    style="margin-right: 20px"
    @click="router.push({ name: 'user.auth' })"
  >
     Auth
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

