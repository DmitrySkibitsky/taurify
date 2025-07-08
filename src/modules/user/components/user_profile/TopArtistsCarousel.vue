<script setup lang="ts">
  import ArtistsCarousel from '@/modules/artists/components/ArtistsCarousel.vue';
  import { IArtist } from '@/modules/artists/services/artists.ts';
  import { ARTISTS_MODULE } from '@/modules/artists/services';
  import { onMounted, ref } from 'vue';

  const artists = ref<IArtist[]>([]);

  onMounted(async () => {
    artists.value = await ARTISTS_MODULE.artists.getUserTopArtists();
  });
</script>

<template>
  <ArtistsCarousel
    title="Top artists this month"
    subtitle="Only visible to you"
    :artists="artists"
  >
    <template #actions>
      <VBtn
        variant="plain"
        :to="{
          name: 'user.top_artists',
        }"
      >
        Top Artists
      </VBtn>
    </template>
  </ArtistsCarousel>
</template>
