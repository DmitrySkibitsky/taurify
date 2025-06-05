<script setup lang="ts">
  import { useUserStore } from '@/modules/user/store/user.ts';

  const { user } = useUserStore();
</script>

<template>

  <v-btn> {{ user.name }} </v-btn>

</template>

