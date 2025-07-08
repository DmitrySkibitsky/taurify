<script setup lang="ts">
  import ArtistsGrid from '@/modules/artists/components/ArtistsGrid.vue';
  import { ARTISTS_MODULE } from '@/modules/artists/services';
  import { onMounted, ref } from 'vue';
  import { useArtistsStore } from '@/modules/artists/stores/artists.ts';
  import { storeToRefs } from 'pinia';
  import { ITimeRange } from '@/modules/artists/services/artists.ts';

  const artistsStore = useArtistsStore();

  const { topArtists, userTopArtistsRequest } = storeToRefs(artistsStore);

  const timeRanges = ref<ITimeRange[]>([]);
  const selectedTimeRange = ref<ITimeRange | null>(null);
  const loading = ref<boolean>(false);

  const loadArtists = async () => {
    loading.value = true;

    await ARTISTS_MODULE.artists.getUserTopArtists(userTopArtistsRequest.value);

    setTimeout(() => {
      loading.value = false;
    }, 1000);
  };

  const onTimeRangeChange = () => {
    if (!selectedTimeRange.value) {
      return;
    }

    artistsStore.setUserTopArtistsRequest({
      time_range: selectedTimeRange.value?.enum,
      limit: 20,
      offset: 0,
    });

    loadArtists();
  };

  onMounted(() => {
    timeRanges.value = ARTISTS_MODULE.artists.getTimeRanges();

    if (
      selectedTimeRange.value === null &&
      userTopArtistsRequest.value !== null
    ) {
      selectedTimeRange.value = ARTISTS_MODULE.artists.getTimeRangeByEnum(
        userTopArtistsRequest.value.time_range
      );
    }

    if (topArtists.value.length === 0) {
      loadArtists();
    }
  });
</script>

<template>
  <div class="d-flex justify-space-between align-center mb-6">
    <div>
      <h1 class="text-h4 font-weight-bold mb-2">Top Artists</h1>
      <p class="text-subtitle-1 text-medium-emphasis">Subtitle</p>
    </div>

    <div class="d-flex gap-3">
      <VSelect
        v-model="selectedTimeRange"
        :items="timeRanges"
        item-title="name"
        item-value="enum"
        label="Time Range"
        density="compact"
        :disabled="loading"
        :style="{
          minWidth: '200px',
        }"
        @update:model-value="onTimeRangeChange"
      />
    </div>
  </div>

  <VProgressLinear
    v-if="loading"
    class="mb-4"
    indeterminate
    color="primary"
  />

  <ArtistsGrid :artists="topArtists" />

  <VProgressLinear
    v-if="loading"
    class="mt-4"
    indeterminate
    color="primary"
  />
</template>

<style scoped>
  .gap-3 {
    gap: 12px;
  }
</style>
