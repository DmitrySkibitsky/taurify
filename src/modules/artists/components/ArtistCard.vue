<script setup lang="ts">
  import { IArtist } from '@/modules/artists/services/artists.ts';
  import { computed } from 'vue';

  interface Props {
    artist: IArtist;
    width?: number | string;
    height?: number | string;
  }

  const props = withDefaults(defineProps<Props>(), {
    width: 250,
    height: 300,
  });

  const emit = defineEmits<{
    play: [artist: IArtist];
  }>();

  const artistImage = computed(() => {
    return props.artist.images?.[0]?.url || '/placeholder-artist.jpg';
  });

  const onPlayClick = () => {
    emit('play', props.artist);
  };
</script>

<template>
  <VCard
    class="artist-card"
    :width="width"
    :height="height"
    elevation="2"
    hover
  >
    <div class="artist-image-container">
      <VImg
        :src="artistImage"
        :alt="artist.name"
        :height="height"
        cover
        class="artist-image"
      >
        <VBtn
          icon
          class="play-btn"
          color="primary"
          size="large"
          @click="onPlayClick"
        >
          <VIcon>mdi-play</VIcon>
        </VBtn>

        <div class="artist-name-overlay">
          <h3 class="artist-name">{{ artist.name }}</h3>
        </div>
      </VImg>
    </div>
  </VCard>
</template>

<style scoped>
  .artist-card {
    border-radius: 12px;
    overflow: hidden;
    transition: none;
  }

  .artist-image-container {
    position: relative;
  }

  .artist-image {
    border-radius: 15px;
  }

  .play-btn {
    position: absolute;
    top: 12px;
    right: 12px;
  }

  .artist-name-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 20px 16px 16px;
    background: linear-gradient(transparent, rgba(0, 0, 0, 1));
  }

  .artist-name {
    color: white;
    font-size: 1.2rem;
    font-weight: 500;
    text-shadow: 0 1px 30px rgba(0, 0, 0, 0.5);
    line-height: 1.3;
  }
</style>
