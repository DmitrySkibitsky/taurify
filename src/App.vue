<script setup lang="ts">
  import { ref } from 'vue';

  const userName = ref('Admin User');
</script>

<template>

  <v-card
    :text="userName"
    @click="() => {}"
  ></v-card>

</template>

<style scoped>

</style>

