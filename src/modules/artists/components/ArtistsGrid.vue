<script setup lang="ts">
  import ArtistCard from '@/modules/artists/components/ArtistCard.vue';
  import { IArtist } from '@/modules/artists/services/artists.ts';

  interface Props {
    artists: IArtist[];
    width?: number | string;
    height?: number | string;
  }

  const props = withDefaults(defineProps<Props>(), {
    width: 250,
    height: 300,
  });
</script>

<template>
  <div class="artists-grid">
    <ArtistCard
      v-for="artist in artists"
      :key="artist.id"
      :artist="artist"
      :width="width"
      :height="height"
      @play="() => {}"
    />
  </div>
</template>

<style scoped>
  .artists-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
    gap: 20px;
    padding: 20px;
  }
</style>
