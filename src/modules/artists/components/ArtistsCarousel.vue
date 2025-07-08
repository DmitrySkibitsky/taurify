<script setup lang="ts">
  import ArtistCard from '@/modules/artists/components/ArtistCard.vue';
  import { IArtist } from '@/modules/artists/services/artists.ts';
  import { computed, onMounted, onUnmounted, ref } from 'vue';

  interface Props {
    artists: IArtist[];
    title?: string;
    subtitle?: string;
    cardWidth?: number | string;
    cardHeight?: number | string;
    showArrows?: boolean;
    hideDelimiters?: boolean;
    continuous?: boolean;
    cycle?: boolean;
    interval?: number;
  }

  const props = withDefaults(defineProps<Props>(), {
    cardWidth: 250,
    cardHeight: 300,
    showArrows: true,
    hideDelimiters: true,
    continuous: false,
    cycle: false,
    interval: 6000,
  });

  const emit = defineEmits<{
    play: [artist: IArtist];
  }>();

  const currentSlide = ref(0);
  const containerRef = ref<HTMLElement>();
  const containerWidth = ref(0);
  const gap = 20;

  const updateContainerWidth = () => {
    if (containerRef.value) {
      containerWidth.value = containerRef.value.offsetWidth;
    }
  };

  const itemsPerSlide = computed(() => {
    if (!containerWidth.value) return 1;

    const cardWidthNum =
      typeof props.cardWidth === 'string'
        ? parseInt(props.cardWidth)
        : props.cardWidth;

    const availableWidth = containerWidth.value - 40;
    const itemWidthWithGap = cardWidthNum + gap;
    const maxItems = Math.floor((availableWidth + gap) / itemWidthWithGap);

    return Math.max(1, maxItems);
  });

  const artistSlides = computed(() => {
    const slides: IArtist[][] = [];
    const perSlide = itemsPerSlide.value;

    for (let i = 0; i < props.artists.length; i += perSlide) {
      slides.push(props.artists.slice(i, i + perSlide));
    }
    return slides;
  });

  const handlePlay = (artist: IArtist) => {
    emit('play', artist);
  };

  const handleResize = () => {
    updateContainerWidth();
  };

  onMounted(() => {
    updateContainerWidth();
    window.addEventListener('resize', handleResize);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
  });
</script>

<template>
  <div
    ref="containerRef"
    class="w-100"
  >
    <div class="d-flex justify-space-between align-start mb-5 ga-5">
      <div class="flex-1-1">
        <h2
          v-if="title"
          class="text-h5 font-weight-medium mb-2"
        >
          {{ title }}
        </h2>

        <p
          v-if="subtitle"
          class="text-subtitle-1 text-medium-emphasis ma-0"
        >
          {{ subtitle }}
        </p>
      </div>

      <div class="flex-shrink-0 d-flex align-center">
        <slot name="actions" />
      </div>
    </div>

    <VCarousel
      v-model="currentSlide"
      class="rounded-lg"
      :show-arrows="showArrows"
      :hide-delimiters="hideDelimiters"
      :continuous="continuous"
      :cycle="cycle"
      :interval="interval"
      height="auto"
    >
      <VCarouselItem
        v-for="(slideArtists, index) in artistSlides"
        :key="index"
        class="pa-0"
      >
        <div class="d-flex justify-center align-start ga-5">
          <ArtistCard
            v-for="artist in slideArtists"
            :key="artist.id"
            class="flex-shrink-0"
            :artist="artist"
            :width="cardWidth"
            :height="cardHeight"
            @play="handlePlay"
          />
        </div>
      </VCarouselItem>
    </VCarousel>
  </div>
</template>

<style scoped>
  @media (max-width: 768px) {
    .d-flex.ga-5 {
      gap: 15px !important;
    }
  }

  @media (max-width: 480px) {
    .d-flex.ga-5 {
      gap: 15px !important;
    }

    .pa-0 {
      padding: 15px !important;
    }
  }
</style>
