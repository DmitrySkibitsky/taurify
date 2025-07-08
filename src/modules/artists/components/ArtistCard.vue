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
    return props.artist.images?.[0]?.url || '';
  });

  const onPlayClick = () => {
    emit('play', props.artist);
  };
</script>

<template>
  <VCard
    class="rounded-lg overflow-hidden flex-shrink-0"
    :width="width"
    :height="height"
    elevation="2"
  >
    <div class="position-relative overflow-hidden">
      <VImg
        class="rounded-lg"
        :src="artistImage"
        :alt="artist.name"
        :height="height"
        cover
      >
        <VBtn
          class="position-absolute artist-play-btn"
          icon
          color="primary"
          size="large"
          @click="onPlayClick"
        >
          <VIcon>mdi-play</VIcon>
        </VBtn>

        <div class="position-absolute artist-name-overlay">
          <h3 class="text-white text-h6 font-weight-medium">
            {{ artist.name }}
          </h3>
        </div>
      </VImg>
    </div>
  </VCard>
</template>

<style scoped>
  .artist-play-btn {
    top: 12px;
    right: 12px;
    transition: none !important;
    transform: none !important;
  }

  .artist-play-btn:hover {
    transform: none !important;
    box-shadow: none !important;
  }

  .artist-play-btn:focus {
    transform: none !important;
    box-shadow: none !important;
  }

  .artist-play-btn:active {
    transform: none !important;
    box-shadow: none !important;
  }

  .artist-play-btn * {
    transition: none !important;
    transform: none !important;
  }

  .artist-name-overlay {
    bottom: 0;
    left: 0;
    right: 0;
    padding: 20px 16px 16px;
    background: linear-gradient(transparent, rgba(0, 0, 0, 1));
  }

  .artist-name-overlay h3 {
    text-shadow: 0 1px 30px rgba(0, 0, 0, 0.5);
    line-height: 1.3;
  }
</style>
