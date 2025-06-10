<script setup lang="ts">
  import { useAuthStore } from '@/modules/user/stores/auth.ts';

  const { user } = useAuthStore();
</script>

<template>

  <v-btn> {{ user.name }} </v-btn>

</template>

