<script setup lang="ts">
  import ArtistCard from '@/modules/artists/components/ArtistCard.vue';
  import { IArtist } from '@/modules/artists/services/artists.ts';
  import { computed, onMounted, onUnmounted, ref } from 'vue';

  interface Props {
    artists: IArtist[];
    title?: string;
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
    class="artists-carousel-container"
  >
    <h2
      v-if="title"
      class="carousel-title"
    >
      {{ title }}
    </h2>

    <VCarousel
      v-model="currentSlide"
      class="artists-carousel"
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
        class="carousel-slide"
      >
        <div class="artists-grid">
          <ArtistCard
            v-for="artist in slideArtists"
            :key="artist.id"
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
  .artists-carousel-container {
    width: 100%;
    padding: 20px;
  }

  .carousel-title {
    margin-bottom: 20px;
    font-size: 1.5rem;
    font-weight: 600;
  }

  .artists-carousel {
    border-radius: 12px;
  }

  .artists-grid {
    display: flex;
    justify-content: center;
    gap: 20px;
    flex-wrap: nowrap;
  }

  @media (max-width: 768px) {
    .artists-grid {
      gap: 15px;
    }
  }

  @media (max-width: 480px) {
    .artists-grid {
      gap: 15px;
    }

    .carousel-slide {
      padding: 15px;
    }
  }
</style>
