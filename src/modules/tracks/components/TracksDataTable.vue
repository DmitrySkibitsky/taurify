<script setup lang="ts">
  import { ITrack } from '@/modules/tracks/services/tracks.ts';
  import { useDisplay } from 'vuetify';

  const { mobile } = useDisplay();

  const headers = [
    {
      title: '',
      key: 'play',
      sortable: false,
      width: '60px',
    },
    {
      title: '#',
      key: 'trackNumber',
      sortable: true,
      width: '60px',
    },
    {
      title: 'Title',
      key: 'title',
      sortable: true,
    },
    {
      title: 'Plays',
      key: 'plays',
      sortable: true,
      width: '150px',
    },
    {
      title: 'Duration',
      key: 'duration',
      sortable: true,
      width: '120px',
    },
  ];

  interface Props {
    tracks: ITrack[];
  }

  const { tracks = [] } = defineProps<Props>();

  const togglePlay = (track: ITrack) => {};

  const formatPlays = (plays: number): string => {
    if (plays >= 1000000000) {
      return (plays / 1000000000).toFixed(1) + 'B';
    } else if (plays >= 1000000) {
      return (plays / 1000000).toFixed(1) + 'M';
    } else if (plays >= 1000) {
      return (plays / 1000).toFixed(1) + 'K';
    }
    return plays.toString();
  };

  const formatDuration = (milliseconds: number): string => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
</script>

<template>
  <div>
    <VDataTable
      v-if="!mobile"
      fixed-header
      item-key="id"
      :headers="headers"
      :items="tracks"
      :hover="true"
      hide-default-footer
    >
      <template v-slot:item.play="{ item }">
        <VBtn
          icon
          variant="text"
          size="small"
          :color="item.isPlaying ? 'primary' : 'default'"
          @click="togglePlay(item)"
        >
          <VIcon>
            {{ item.isPlaying ? 'mdi-pause' : 'mdi-play' }}
          </VIcon>
        </VBtn>
      </template>

      <template v-slot:item.trackNumber="{ item }">
        <span class="text-body-2 text-medium-emphasis">
          {{ item.trackNumber }}
        </span>
      </template>

      <template v-slot:item.title="{ item }">
        <div class="d-flex align-center">
          <div class="album-cover-container">
            <VImg
              class="me-3"
              :src="item.album.images[2]?.url"
              :alt="item.album.name"
              width="40"
              height="40"
              cover
            />
          </div>
          <div>
            <div class="text-subtitle-2 font-weight-medium">
              {{ item.name }}
            </div>
            <div class="text-caption text-grey">
              {{ item.artists.map((artist) => artist.name).join(', ') }}
            </div>
          </div>
        </div>
      </template>

      <template v-slot:item.plays="{ item }">
        <span class="text-body-2">
          {{ formatPlays(item.popularity) }}
        </span>
      </template>

      <template v-slot:item.duration="{ item }">
        <span class="text-body-2">
          {{ formatDuration(item.duration_ms) }}
        </span>
      </template>
    </VDataTable>

    <div
      v-else
      class="mobile-tracks-list"
    >
      <div
        v-for="track in tracks"
        :key="track.id"
        class="mobile-track-item"
        @click="togglePlay(track)"
      >
        <div class="mobile-track-content">
          <div class="track-controls">
            <div class="track-number">
              {{ track.trackNumber }}
            </div>
            <VBtn
              icon
              variant="text"
              size="small"
              :color="track.isPlaying ? 'primary' : 'default'"
              @click.stop="togglePlay(track)"
            >
              <VIcon>
                {{ track.isPlaying ? 'mdi-pause' : 'mdi-play' }}
              </VIcon>
            </VBtn>
          </div>

          <div class="track-cover">
            <VImg
              :src="track.album.images[2]?.url"
              :alt="track.album.name"
              width="48"
              height="48"
              cover
            />
          </div>

          <div class="track-info">
            <div class="track-title">
              {{ track.name }}
            </div>
            <div class="track-artist">
              {{ track.artists.map((artist) => artist.name).join(', ') }}
            </div>
          </div>

          <div class="track-meta">
            <div class="track-duration">
              {{ formatDuration(track.duration_ms) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .v-data-table {
    background: transparent;
  }

  .v-data-table >>> .v-data-table__wrapper {
    border-radius: 20px;
  }

  .v-data-table >>> tbody tr:hover {
    background-color: rgba(255, 255, 255, 0.04) !important;
  }

  .album-cover-container {
    width: 40px;
    height: 40px;
    flex-shrink: 0;
    margin-right: 12px;
  }

  .mobile-tracks-list {
    padding: 0;
  }

  .mobile-track-item {
    padding: 8px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    transition: background-color 0.2s ease;
    cursor: pointer;
  }

  .mobile-track-item:hover {
    background-color: rgba(255, 255, 255, 0.04);
  }

  .mobile-track-item:active {
    transform: scale(0.98);
  }

  .mobile-track-content {
    display: flex;
    align-items: center;
    height: 64px;
  }

  .track-controls {
    display: flex;
    align-items: center;
    width: 80px;
    flex-shrink: 0;
  }

  .track-number {
    width: 20px;
    font-size: 0.875rem;
    margin-right: 8px;
    text-align: center;
  }

  .track-cover {
    width: 48px;
    height: 48px;
    flex-shrink: 0;
    margin-right: 12px;
  }

  .track-cover .v-img {
    border-radius: 4px;
  }

  .track-info {
    flex: 1;
    min-width: 0;
    margin-right: 12px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .track-title {
    font-size: 0.875rem;
    font-weight: 500;
    margin-bottom: 2px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .track-artist {
    font-size: 0.75rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .track-meta {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    width: 60px;
    flex-shrink: 0;
  }

  .track-duration {
    font-size: 0.75rem;
  }
</style>
